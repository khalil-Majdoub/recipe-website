const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const employeesSchema = new schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Employee' ,employeesSchema)