let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let db = require('./app/utils/database');
db.dbConnection();
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

//import all routes
let routes = require('./app/routes/route');

//use all routes
app.use('/', routes);

app.listen(process.env.PORT, '0.0.0.0', function(){
    console.log('Server listening the port 3030');
});