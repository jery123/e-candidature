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


//formation routes
router.post('/add', async function (req, res, next) {
  try {
    let {
      intitule,
      description
    } = req.body;

    //   const hashed_password = md5(pwd.toString())
    const checkUsername = `Select intitule FROM formations WHERE intitule = ?`;
    con.query(checkUsername, [intitule], (err, result, fields) => {
      if (!result.length) {
        const sql = `Insert Into formations (intitule, description) VALUES ( ?, ?)`
        con.query(
          sql, [intitule, description],
          (err, result, fields) => {
            if (err) {
              res.send({
                status: 0,
                data: err
              });
            } else {
              let token = jwt.sign({
                data: result
              }, 'secret')
              res.send({
                status: 1,
                data: result,
                token: token
              });
            }

          })
      }
    });


  } catch (error) {
    res.send({
      status: 0,
      error: error
    });
  }
});

router.post('/delete', async function (req, res, next) {
  try {
    let {
      intitule
    } = req.body;

    //   const hashed_password = md5(pwd.toString())
    const sql = `DELETE FROM formations WHERE intitule=?`
    con.query(
      sql, [intitule],
      function (err, result, fields) {
        if (err) {
          res.send({
            status: 0,
            data: err
          });
        } else {
          let token = jwt.sign({
            data: result
          }, 'secret')
          res.send({
            status: 1,
            data: result,
            token: token
          });
        }

      })
  } catch (error) {
    res.send({
      status: 0,
      error: error
    });
  }
});

router.put('/update/:id', async function (req, res, next) {
  try {
    let {
      intitule,
      description,
      id
    } = req.body;

    //   const hashed_password = md5(pwd.toString())
    const sql = `UPDATE formations SET intitule=?,description=? WHERE idF=?`
    con.query(
      sql, [intitule, description, id],
      function (err, result, fields) {
        if (err) {
          res.send({
            status: 0,
            data: err
          });
        } else {
          let token = jwt.sign({
            data: result
          }, 'secret')
          res.send({
            status: 1,
            data: result,
            token: token
          });
        }

      })
  } catch (error) {
    res.send({
      status: 0,
      error: error
    });
  }
});


router.get('/search', async function (req, res, next) {
  try {
    let {
      id
    } = req.body;

    //   const hashed_password = md5(pwd.toString())
    const sql = `SELECT * FROM formations WHERE idF=?`
    con.query(
      sql, [id],
      function (err, result, fields) {
        if (err) {
          res.send({
            status: 0,
            data: err
          });
        } else {
          let token = jwt.sign({
            data: result
          }, 'secret')
          res.send({
            status: 1,
            data: result,
            token: token
          });
        }

      })
  } catch (error) {
    res.send({
      status: 0,
      error: error
    });
  }
});


router.delete('/delete/:id', async function (req, res, next) {
  try {
    let {
      id
    } = req.body;

    //   const hashed_password = md5(pwd.toString())
    const sql = `DELETE FROM formations WHERE  idF=?`
    con.query(
      sql, [id],
      function (err, result, fields) {
        if (err) {
          res.send({
            status: 0,
            data: err
          });
        } else {
          let token = jwt.sign({
            data: result
          }, 'secret')
          res.send({
            status: 1,
            data: result,
            token: token
          });
        }

      })
  } catch (error) {
    res.send({
      status: 0,
      error: error
    });
  }
});

router.get('/list', async function (req, res, next) {
  try {
    // let { intitule,description,id } = req.body; 

    //   const hashed_password = md5(pwd.toString())
    const sql = `SELECT * from formations `
    con.query(
      sql,
      function (err, result, fields) {
        if (err) {
          res.send({
            status: 0,
            data: err
          });
        } else {
          let token = jwt.sign({
            data: result
          }, 'secret')
          res.send({
            status: 1,
            data: result,
            token: token
          });
        }

      })
  } catch (error) {
    res.send({
      status: 0,
      error: error
    });
  }
});

module.exports = router;