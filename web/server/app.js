const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// config for .env files
dotenv.config();

// routers
const indexRouter = require('./routes/index');
const clientRouter = require('./routes/client/client');

// create app
const app = express();

// middleWares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/', indexRouter);
app.use('/client', clientRouter);

// connect to mongoose
mongoose.connect(process.env.MONGODB_CON, {useNewUrlParser: true}, () => {
    console.log("Connected to mongodb database.");
});

module.exports = app;
