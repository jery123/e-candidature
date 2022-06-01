const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "candidature"
});
/* GET users listing. */
//Candiday routes
router.post('/register', async function (req, res, next) {
  try {
    let { nom, prenom, email, tel, pwd, natio, sexe, date } = req.body; 
   
    const hashed_password = md5(pwd.toString())
    const checkUsername = `Select email FROM userss WHERE email = ?`;
    con.query(checkUsername, [email], (err, result, fields) => {
      if(!result.length){
        const sql = `Insert Into userss (nom, prenom, email, tel, pwd, natio, sexe, date) VALUES ( ?, ?, ?,?, ?, ?,?, ? )`
        con.query(
          sql, [nom, prenom, email, tel, hashed_password, natio, sexe, date ],
        (err, result, fields) =>{
          if(err){
            res.send({ status: 0, data: err });
          }else{
            let token = jwt.sign({ data: result }, 'secret')
            res.send({ status: 1, data: result, token : token });
          }
         
        })
      }
    });
    
   
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
router.post('/login', async function (req, res, next) {
  try {
    let { email, pwd } = req.body; 
   
    const hashed_password = md5(pwd.toString())
    const sql = `SELECT * FROM userss WHERE email = ? AND pwd = ?`
    con.query(
      sql, [email, hashed_password],
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: err });
      }else{
        let token = jwt.sign({ data: result }, 'secret')
        res.send({ status: 1, data: result, token: token });
      }
     
    })
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
module.exports = router;