const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

var port = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(res=>{
  console.log("DB Connected!")
}).catch(err => {
console.log(Error, err.message);
});

// routes
app.use(require("./routes/api.js"));

var server=app.listen(port,function() {
  console.log("app running on port 8080"); });