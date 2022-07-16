const express = require("express");
const router = express.Router();
const recipeController = require('../controllers/recipeController');


router.get('/', (req,res) => res.send('User route'));
router.get('/newrecipe', recipeController.submit);

module.exports = router;