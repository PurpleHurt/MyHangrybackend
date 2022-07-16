const mongoose = require('mongoose');

const recipeSchema = mongoose.schema ({

user_id:{ 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'},
recipename: { type: String, required: true },
image: { type: String, default: 'http://placekitten.com/350/350'},
cuisines: { type: String, required: true },
difficulty: { type: Array, enum: [Easy, Medium, Hard], required: true},
preptime: { type: String },
cooktime: { type: String },
ingredients: { type:Array, required: true },
instructions: { type: String, required: true }


})


module.exports = mongoose.model('recipe', recipeSchema);