const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const socket_io = require('socket.io');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");

// routers
const userRouter = require('./routes/user/user');
const clientRouter = require('./routes/user/client/client');
const indexRouter = require('./routes/index');

// initialize env (if applicable)
dotenv.config();

// create app
const app = express();

// use rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
    // default message is "Too many requests, please try again later."
});

//  apply to all requests
app.use(limiter);

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
app.use(express.urlencoded({extended: true}));
// body parsing
app.use(bodyParser.json());
// Sanitization
app.use(mongoSanitize());
// cookie parsing
app.use(cookieParser());

// routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/user/client', clientRouter);

// connect to mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    console.log("Connected to mongodb database");
});

/**
 * Socket io
 * @type {*}
 */
let io = socket_io();
app.io = io;
require('./io/socket')(io);

module.exports = app;
