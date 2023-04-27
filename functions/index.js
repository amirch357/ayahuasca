const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const serverless = require("serverless-http")

const db =  require('../db');
db;
const app = express();
app.use(helmet());

app.use(function (req, res, next) {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
  next()
})

app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors({
  credentials: true,
  exposedHeaders: ['SET-COOKIE'],
  origin: 'http://localhost:3000',
}));

app.use(morgan('combined'))
const AdminRoutes = require('../routes/AdminRoutes')
app.use(AdminRoutes);


// const port = 3007;
// app.listen(port, () => {
//   console.log(`Application is start on port: ${port}`)
// });
module.exports.handler=serverless(app)