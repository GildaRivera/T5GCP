/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 const functions = require('@google-cloud/functions-framework'); 
 const mysql = require("mysql"); 
 const connection = mysql.createConnection({ 
   connectionLimit: 10, 
   host: "34.123.10.235", 
   user: "root", 
   password: "proyectobd", 
   database: "gcpBackend", 
 })
 exports.user = (req, res) => {
   connection.query("SELECT * FROM user", (req,res)=>{
         if(err) return res.json(err) 
     res.json(user) 
   })
   let message = req.query.message || req.body.message || 'Hello World!';
   res.status(200).send(message);
 };
 
 