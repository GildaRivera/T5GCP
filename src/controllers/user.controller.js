const User = require("../models/user.models");
var gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
// Create and Save a user
exports.createUser = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }
  // Create a user
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    biografia: req.body.biografia,
    password: req.body.password,
    gravatar: gravatar.url(req.body.username,{protocol: 'http'})
  });
  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {   
       const token = generateAccessToken( {id:data.id} );
      return res.status(200).send({data:data, token:token})
    }
  });
};
// Retrieve all users
exports.getAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving users",
      });
    else {
      if (data.length == 0) {
        return res.status(403).send({
          message: "Not users found",
        });
      }
      return res.send(data);
    }
  });
};

// Find a single user with a id
exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          error: `Not found user with id ${req.params.id}.`,
        });
      } else {
        return res.status(500).send({
          error: "Error retrieving user with id " + req.params.id,
        });
      }
    } else return res.send(data);
  });
};
// Login user
exports.loginUser = (req, res) => {
  User.login(req.body.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          error: `Not found user with username ${req.body.username}.`,
        });
      } else {
        return res.status(500).send({
          error: "Error retrieving user with username" + req.body.username,
        });
      }
    } else if (data.length == 0) {
      return res.status(404).send({
        error: `Not found user with username${req.body.username}.`,
      });
    }
    if (data[0].password == req.body.password) {
      const token = generateAccessToken( {id:data[0].id} );
      return res.send({data:data, token:token})
    }
    return res.status(404).send({
      error: `Not found user with username${req.body.username}.`,
    });
  });
};
// Update a user identified by the id in the request
exports.updateUser = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }

  jwt.verify(token, process.env.TOKEN, (err, user) => {
    req.user = user;
  });

  User.updateById(req.user.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          error: `Not found`,
        });
      } else {
        return res.status(500).send({
          error: "Error updating user with id " + req.params.id,
        });
      }
    } else {
      return res.send(data)}
  });
};
// Delete a user with the specified id in the request
exports.deleteUser = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN, (err, user) => {
    req.user = user;
  });

  User.remove(req.user.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          error: `Not found`,
        });
      } else {
        return res.status(500).send({
          error: "Could not delete user with id " + req.params.id,
        });
      }
    } else return res.send({ message: `User was deleted successfully` });
  });
};

// Get version
exports.version = (req, res) => {
  return res.send({ version: "2.0" });
};

function generateAccessToken(id) {
  process.env.TOKEN;
  try{
  return jwt.sign(id, process.env.TOKEN, { expiresIn: '1800s' });}
  catch(e){
    console.log(e)
  }
}
