const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//const fileUpload = require('express-fileupload');
//const morgan = require('morgan');



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(fileUpload({
//   createParentPath: true
// }));
// app.use(morgan('dev'));

// set port, listen for requests
require("./app/routes/routes")(app);
const PORT = 5000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });