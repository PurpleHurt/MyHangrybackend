const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

const Recipe = require('../../models/Recipe');
const checkObjectId = require('../../middleware/checkObjectId');


// post a recipe
router.post(
    '/',
     auth,
    check('recipename', 'Recipe name is required').notEmpty(),
    check('cuisines', 'Cuisine is required').notEmpty(),
    check('ingredients', 'Recipe ingredients are required').notEmpty(),
    check('directions', 'Directions are required').notEmpty(),
    check('steps', 'Steps required').notEmpty(),
    
    check('description', 'Description is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
  
        const  recipe = new Recipe({
          recipename: req.body.recipename,
          image: req.body.image,
          cuisines: req.body.cuisines,
          difficulty: req.body.difficulty,
          preptime: req.body.preptime,
          cooktime: req.body.cooktime,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
          steps: req.body.steps,
          description: req.body.description,
          
          name: user.username,
          avatar: user.avatar,
          user: req.user.id
        });
  
         await recipe.save();
  
        res.json(recipe);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  // get all users recipes
  router.get('/', auth, async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ date: -1 });
      res.json(recipes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  // get logged in user recipes
  router.get('/myrecipes', auth, async (req, res) => {
    try {
      const recipes = await Recipe.find({user: req.user.id}).sort({ date: -1 });
      res.json(recipes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/myrecipes', auth, async (req, res) => {
    try {
      const recipes = await Recipe.find({user: req.user.id}).sort({ date: -1 });
      res.json(recipes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
 
  router.get('/search/:query', auth, async (req, res) => {
    try {
      //  const { name } = req.query;
      const recipes = await 
      Recipe.find({ingredients: { $regex: '.*' + req.params.query + '.*' } });
      res.json(recipes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
     
    }
  });
  
  

module.exports = router;