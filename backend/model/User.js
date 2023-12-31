const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  email : {
    type : String,
    required : true
  },
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  roles : {
    User : {
      type : Number,
      default : 2001
    },
    Editor : Number,
    Admin : Number
  },
  accessToken:String,
  refreshtoken : String
});

module.exports = mongoose.model('User',userSchema);
