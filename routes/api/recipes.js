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
  
  router.get('/value/:query', auth, async (req, res) => {
    try {
      //  const { name } = req.query;
      const recipes = await 
      Recipe.findOne({recipename: { $regex: '.*' + req.params.query + '.*' } });
      res.json(recipes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
     
    }
  });
  
  // post a comment
router.post(
  '/comment/:id',
   auth,
 
  
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const recipe = await Recipe.findById(req.params.id);

      const  newComment = {
        text: req.body.text,
        name: user.username,
        avatar: user.avatar,
        user: req.user.id
      };
       recipe.comments.unshift(newComment)
       await recipe.save();

      res.json(recipe.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//delete comment
router.delete(
  '/comment/:id/:comment_id',
   auth, async (req, res) => {
   
    try {
      
      const recipe = await Recipe.findById(req.params.id);
      // get the comment from the recipe
      const comment = recipe.comments.find(comment=> comment.id == req.params.comment_id);
      if (!comment){
        return res.status(404).json({msg: 'Comment does not exist'});
      }
      // check user 
      if (comment.user.toString()!== req.user.id){
        return res.status(401).json({msg: "User not authorized"});
      }
    // remove index
    const removeIndex = recipe.comments.map(comment=> comment.user.toString())
    .indexOf(req.user.id);
    recipe.comments.splice(removeIndex,1);
    await recipe.save();
    res.json(recipe.comments)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;