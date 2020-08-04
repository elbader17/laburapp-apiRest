const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const portService = 3030;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");

  next();
}
app.use(allowCrossDomain);

require("./routes/usuarios.routes.js")(app);

// set port, listen for requests API Rest 
app.listen(portService, () => {
  console.log("Api de laburapp is running on port "+portService);
});