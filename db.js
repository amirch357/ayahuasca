const mongoose = require('mongoose');
const conn = "mongodb+srv://ishtiaq:06nL5SD5v0jznPic@apps.gsvy3es.mongodb.net/shopit";
mongoose.set('strictQuery', false);
mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then( () => { console.log("connected"); })
  .catch(err => console.log(err.reason));

  module.exports = mongoose