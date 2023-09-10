const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const RecipeSchema = new schema({
  title:{
    type: String,
    required:true,
  },
  picture:{
    type:String,
    required:true,
  },
  dis:{
    type: String,
    required:true,
  },
  recipe: {
    type:String,
    require:true,
  }
})
module.exports = mongoose.model('recipe',RecipeSchema);
