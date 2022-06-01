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


const multer = require('multer');
const upload = multer({
  dest: 'dossiers/'
});

router.post('/api/upload', upload.single('cv'), function (req, res, next) {
  console.log(req.file);

  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });
  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});




/* GET users listing. */
//Candidat routes
router.post('/add', upload.single('cv'), async function (req, res, next) {
  try {
    console.log(req.file)
    let {
      nom,
      prenom,
      email,
      daten,
      sexe,
      tel,
      bacs,
      niveau_actuel,
      description,
      formation_demande,
      niveau_demande,
      demande_manuscrite,
      photocopie_diplome,
      cv,
      acte_de_naissance
    } = req.body;

    // const hashed_password = md5(pwd.toString())
    const checkUsername = `Select email FROM dossiers WHERE email = ?`;
    con.query(checkUsername, [email], (err, result, fields) => {
      if (!result.length) {
        const sql = `INSERT INTO dossiers (nom, prenom, email, daten, sexe, tel, bacs, niveau_actuel, description, formation_demande, niveau_demande, demande_manuscrite, photocopie_diplome, cv, acte_de_naissance) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        con.query(
          sql, [nom, prenom, email, daten, sexe, tel, bacs, niveau_actuel, description, formation_demande, niveau_demande, demande_manuscrite, photocopie_diplome, cv, acte_de_naissance],
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

              /**
               * Upload des fichiers
               */

              // File upload settings  
              // const PATH = './uploads';
              // let storage = multer.diskStorage({
              // destination: (req, file, cb) => {
              //     cb(null, PATH);
              // },
              // filename: (req, file, cb) => {
              //     cb(null, file.fieldname + '-' + Date.now())
              // }
              // });
              // let upload = multer({
              // storage: storage
              // });
              // POST File
              // app.post('/upload', upload.single('foto'), function (req, res) {
              //     if (!req.file) {
              //     console.log("No file is available!");
              //     return res.send({
              //         success: false
              //     });
              //     } else {
              //     console.log('File is available!');
              //     return res.send({
              //         success: true
              //     })
              //     }
              // });
              /**
               * end upload
               */
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

//

router.get('/list', async function (req, res, next) {
  try {
    const sql = ` SELECT * from dossiers where statut='ras'`
    con.query(
      sql,
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

  } catch (error) {
    res.send({
      status: 0,
      error: error
    });
  }
});

router.get('/list/:string', async function (req, res, next) {
  try {
    const sql = ` SELECT * from dossiers where statut='ras' and(nom LIKE '%${string}%' OR prenom LIKE '%${string}%' OR email LIKE '%${string}%')`
    con.query(
      sql,
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
          console.log(result);
        }

      })

  } catch (error) {
    res.send({
      status: 0,
      error: error
    });
  }
});

//
router.get('/one', async function (req, res, next) {
  try {
    let {
      email,

    } = req.body;

    // const hashed_password = md5(pwd.toString())
    const sql = `SELECT * FROM dossiers WHERE email = ? `
    con.query(
      sql, [email],
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
      id,
      statut
    } = req.body;

    // const hashed_password = md5(pwd.toString())
    const sql = `UPDATE dossiers SET statut=? where id = ?`;
    con.query(
      sql, [statut, id],
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
// router.post('/search', async function (req, res, next) {
//   try {
//     let { nom } = req.body; 

//     // const hashed_password = md5(pwd.toString())
//     const sql = `SELECT * FROM candidats WHERE nom = ?`
//     con.query(
//       sql, [nom],
//     function(err, result, fields){
//       if(err){
//         res.send({ status: 0, data: err });
//       }else{
//         let token = jwt.sign({ data: result }, 'secret')
//         res.send({ status: 1, data: result, token: token });
//       }

//     })
//   } catch (error) {
//     res.send({ status: 0, error: error });
//   }
// });

/////

/////
router.get('/getstatut', async function (req, res, next) {
  try {
    let {
      email
    } = req.body;

    // const hashed_password = md5(pwd.toString())
    const sql = `SELECT statut FROM dossiers WHERE email = ? `
    con.query(
      sql, [email],
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