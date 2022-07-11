const express = require("express");
const app = express();

const morgan = require('morgan');
const cors = require('cors');

// require database connection 
const dbConnect = require("./db/dbConnect");

// execute database connection 
dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use("/", require("./routes/usersRoutes"));

module.exports = app;