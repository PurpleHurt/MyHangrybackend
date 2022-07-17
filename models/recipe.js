const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RecipeSchema = new Schema ({

user:{ 
    type: Schema.Types.ObjectId,
    ref: "users"
    },
recipename: { type: String, required: true },
image: { type: String, default: 'http://placekitten.com/350/350'},
cuisines: { type: String, required: true },
// difficulty: { type: Array, enum: ["Easy", "Medium", "Hard"], required: true},
preptime: { type: String },
cooktime: { type: String },
// ingredients: { type:Array, required: true },
// steps: { type:Array, required: true },
description: { type: String, required: true },
name: {
    type: String
  },
avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }

})


module.exports = Recipe= mongoose.model('recipe', RecipeSchema);