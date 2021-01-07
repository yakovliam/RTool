const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sanitize = require('mongo-sanitize');

// models
const User = require('../../model/user');

// validation
const Validate = require('../../validation/validate');

// temporary commented out
// router.post('/', async (req, res) => {
//     return deny(req, res, "Access Denied.");
// });

/**
 * Logout
 */
router.post('/logout', async (req, res) => {
    res.clearCookie("token");
    res.cookie('token', {maxAge: Date.now()});
    return res.status(200).send("Logged out.");
});

/**
 * Get user data
 */
router.post('/get', async (req, res) => {

    // get JWT token for session
    const token = sanitize(req.cookies.token);

    if (!token) {
        return deny(req, res, "Invalid token!");
    }

    let userFromToken;

    try {
        userFromToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (e) {
        return deny(req, res, "Invalid token!");
    }

    let user;

    try {
        user = await User.findOne({_id: userFromToken._id});

        if (!user)
            throw new Error('Invalid token was provided');

    } catch (e) {
        return deny(req, res, "Invalid token!");
    }

    // ---------------- SURE USER EXISTS, NOW GIVE DATA --------------------

    return res.status(200).send({response: {_id: user._id, username: user.username, date: user.date}});
});

/**
 * Login
 */
router.post('/login', async (req, res) => {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    if (!email || !password) {
        return badRequest(req, res, "Incorrect fields!");
    }

    // -------------------- VALIDATE -----------------------

    /* does it comply with general validation? */
    const {error} = Validate.loginSchema.validate({email: email, password: password});
    if (error) {
        return badRequest(req, res, error.details[0].message);
    }

    /* check existence */
    const emailExists = await User.findOne({email: email});

    if (!emailExists) {
        return deny(req, res, "Incorrect Email or Password!");
    }

    const user = emailExists;

    /* check password */

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return deny(req, res, "Incorrect Email or Password!");

    // -------------------- VALIDATE -----------------------

    // ---------------------- SIGN -------------------------

    // JSONWebToken - used to allow access via session
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    // set token as header
    return res.cookie("token", token, {httpOnly: true}).status(200).send({id: user._id}); // send cookie along w/ it (http ONLY for security)
});

/**
 * Register a new user
 */
router.post('/register', async (req, res) => {

    const email = sanitize(req.body.email);
    const username = sanitize(req.body.username);
    const password = sanitize(req.body.password);

    if (!email || !username || !password) {
        return badRequest(req, res, "Incorrect fields!");
    }

    // -------------------- VALIDATE -----------------------

    /* does it comply with general validation? */

    const {error} = Validate.registerSchema.validate({email: email, username: username, password: password});
    if (error) {
        return badRequest(req, res, error.details[0].message);
    }

    /* does the params already exist? */
    const emailExists = await User.findOne({email: email});
    if (emailExists) {
        return badRequest(req, res, "A user with that email already exists!");
    }

    const usernameExists = await User.findOne({username: username});
    if (usernameExists) {
        return badRequest(req, res, "A user with that username already exists!");
    }

    // --------------------- CREATE ------------------------

    // hash password for entry into the database
    const salt = await bcrypt.genSalt(10); // generate salt for hashing
    const hashed = await bcrypt.hash(password, salt); // generate hashed password

    // create, save
    let user = await User.create({
        email: email,
        username: username,
        password: hashed
    });

    res.status(200).send({id: user._id});
});

/**
 * Utility functions
 */

// Bad request
const badRequest = async (req, res, message) => {
    res.status(400).send({response: message});
};

// Deny access
const deny = async (req, res, message) => {
    res.status(403).send({response: message});
};

module.exports = router;