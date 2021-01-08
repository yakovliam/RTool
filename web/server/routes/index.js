const express = require('express');
const router = express.Router();

// temporary commented out
router.get('/', async (req, res) => {
    return deny(req, res, "Access Denied.");
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