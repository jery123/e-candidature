const express = require("express");
const cors = require("cors");
const app = express();
const indexRouter = require('./app/routes/index');

///
path = require('path'),
  multer = require('multer'),
  bodyParser = require('body-parser');

var corsOptions = {
  origin: "http://localhost:8081"
};
/**
 * send mail
 */
//import modules installed at the previous step. We need them to run Node.js server and send emails
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// create a new Express application instance
// const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
// app.use(cors({origin: "*" }));
// app.use(bodyParser.json());

////end send mail

// File upload settings  
const PATH = './uploads';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname)
  }
});
let upload = multer({
  storage: storage
});
// Express settings
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/api', function (req, res) {
  res.end('File catcher');
});
// POST File 
app.post('/api/upload', upload.single('foto'), function (req, res) {
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

/**
 * cv
 */
app.post('/cv/upload', upload.single('cv'), function (req, res) {
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
});/**
* demande mascri
*/
app.post('/demande/upload', upload.single('demande'), function (req, res) {
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
/**
 * acte
 */
app.post('/acte/upload', upload.single('acte'), function (req, res) {
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
/**
 * diplome
 */
app.post('/diplome/upload', upload.single('diplome'), function (req, res) {
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


app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
const db = require("./app/models");

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to iuc_e-candidature application."
  });
});
app.use('/', indexRouter);
// set port, listen for requests
db.sequelize.sync({
  force: true
}).then(() => {
  console.log("Drop and re-sync db.");
});
require("./app/routes/turorial.routes")(app);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
















var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cors = require("cors");
// var bodyParser = require('body-parser');
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// const app = express();

// app.use(cors(corsOptions));
// const db = require("./app/models");
// db.sequelize.sync();
// const bookRoute = require('./app/routes/book.routes.js');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(cors());

// // Static directory path
// app.use(express.static(path.join(__dirname, 'dist/angular-mean-crud-tutorial')));


// // API root
// app.use('/api', bookRoute)

// // PORT
// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//     console.log('Listening on port ' + port)
// })

// // 404 Handler
// app.use((req, res, next) => {
//     next(createError(404));
// });

// // Base Route
// app.get('/', (req, res) => {
//     res.send('invaild endpoint');
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/angular-mean-crud-tutorial/index.html'));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);
// });



// define a sendmail endpoint, which will send emails and response with the corresponding status

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`Message bien envoyé 😃 et l'id est ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "bienvenu a IUC 👻", // Subject line
    html: `<h1>Hi ${user.nom}</h1><br>
    <h4>Mercie pour le message </h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
