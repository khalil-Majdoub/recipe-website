const User = require ('../model/User');
const bcrypt = require ('bcrypt');
const fs = require('fs').promises;

const LoginController = async (req, res ) => {
  // let{emailValue, usernameValue, passwordValue} = req.query;
  const email = req.query.email;
  const user = req.query.user;
  const password = req.query.password;
  console.log('Received query parameters:', req.query);
  try{
    const findEmailId = await User.findOne({email : email}).select('_id').exec();
    const Id = findEmailId ? findEmailId._id : null;
    console.log(findEmailId);
    console.log(Id)

    const response = {
      emailUsed: false,
      nameUsed: false,
      passwordUsed: false,
    }
    if (!findEmailId) {
      res.status(404).json({ message: 'User not found' , response});
      console.log(res);
      return;
    }
    // const usernameId = await User.findById(Id).select('username').exec();
    // const passwordId = await User.findById(Id).select('password').exec();
    // const ispasswordMatch = await bcrypt.compare(passwordValue, passwordId.password);
        
        
    res.json(response);
    
  

    // res.status(200).json({ userId: user._id });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
  
}

module.exports = LoginController