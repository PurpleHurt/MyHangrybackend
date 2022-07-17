const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

const Recipe = require('../../models/Recipe');
const checkObjectId = require('../../middleware/checkObjectId');



router.post(
    '/',
    [auth,[
    check('recipename', 'Recipe name is required').notEmpty(),
    check('cuisines', 'Cuisine is required').notEmpty(),
    check('ingredients', 'Recipe ingredients are required').notEmpty(),
    check('steps', 'Steps are required').notEmpty(),
    check('directions', 'Directions are required').notEmpty(),
    check('description', 'Description is required').notEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
  
        const newRecipe = new Recipe({
          recipename: req.body.recipename,
          cuisines: req.body.cuisines,
          ingredients: req.body.ingredients,
          steps: req.body.steps,
          directions: req.body.directions,
          description: req.body.description,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        });
  
        const recipe = await newRecipe.save();
  
        res.json(recipe);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );


module.exports = router;