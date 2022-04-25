const sql = require("../config/connection");
// constructor
const User = function(user) {
    this.name = user.name
    this.username = user.username
    this.biografia=user.biografia
    this.gravatar=user.gravatar
    this.password = user.password

};
User.create = (newUser, result) => {
  
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      return result(err, null);
    }
    return result(null, { id: res.insertId, ...newUser});
  });
};
User.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
    if (err) {
      return result(err, null);
    }
    if (res.length) {
      return result(null, res[0]);
    }
    // not found User with the id
 
    result({ kind: "not_found" }, null);
  });
};
User.getAll = (result) => {
  let query = "admin"
  sql.query("SELECT * FROM user",[query], (err, res) => {
    if (err) {
     return result(null, err);
    }
   
   return  result(null, res);
  });
};
User.login = (username, result) => {
  sql.query("SELECT * FROM user WHERE username = ?",[username] , (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res)
  });
};
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET name = ?, username = ?, biografia = ?, password=?, gravatar=? WHERE id = ?",
    [user.name, user.username, user.biografia, user.password, user.gravatar, id],
    (err, res) => {
      if (err) {
        return result(null, err);
      }
      if (res.affectedRows == 0) {
        return result({ kind: "not_found" }, null);
      }
      return result(null, { id: id, ...user });
    }
  );
};
User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
    if (err) {
     return result(null, err);
    }
    if (res.affectedRows == 0) {
     return result({ kind: "not_found" }, null);

    }
    return result(null, res);
  });
};

module.exports = User;