const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// initialize env (if applicable)
dotenv.config()

// create app
const app = express();

// middleware
const corsOptions = {
    allRoutes: true,
    origin: 'http://localhost:3001',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    headers: 'content-type'
};

// cors
app.use(cors(corsOptions));
// dev logger
app.use(logger('dev'));
// json
app.use(express.json());
// url encoding
app.use(express.urlencoded({extended: false}));
// body parsing
app.use(bodyParser.json());
// cookie parsing
app.use(cookieParser());

// connect to mongoose
mongoose.connect(process.env.MONGODB_CON, {useNewUrlParser: true}, () => {
    console.log("Connected to mongodb database");
});

module.exports = app;
