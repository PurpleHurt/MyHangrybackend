const express = require("express");
const router = express.Router();
const {check ,validationResult} = require('express-validator');

//register user
router.post('/', (req,res) => {
    console.log(req.body);
    res.send('User route');
});

module.exports = router;