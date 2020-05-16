const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// config for .env files
dotenv.config();

// routers
const indexRouter = require('./routes/index');
const clientRouter = require('./routes/client/client');
const userRouter = require('./routes/user/user');
const clientServiceRouter = require('./routes/user/clientservice');

// create app
const app = express();

// middleWares
const corsOptions = {
    allRoutes: true,
    origin: 'http://localhost:3001',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    headers: 'content-type'
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/user', userRouter);
app.use('/user/client', clientServiceRouter);

// connect to mongoose
mongoose.connect(process.env.MONGODB_CON, {useNewUrlParser: true}, () => {
    console.log("Connected to mongodb database.");
});

module.exports = app;
