const User = require ('../model/User');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;


const LoginController = async (req, res ) => {
  const {email, userName, password} = req.query;

  console.log('Received query parameters:', req.query);
  if (email!== "" || userName !== "" || password!==""){
    try{
      const findEmailId = await User.findOne({email : email}).exec();
      if (findEmailId !== null) {
        const Id = findEmailId? findEmailId._id: null;
        const userId = findEmailId? findEmailId.username: null;
        const passwordId = findEmailId? findEmailId.password: null;
        const userIdM = userId.toString().toLowerCase();
        const compareName = userIdM === userName; // Note: This is a comparison, not case-insensitive comparison
        const comparePass = await bcrypt.compare(password, passwordId);    

        console.log(findEmailId);
        console.log(Id);
        console.log(userId);
        console.log(compareName);
        console.log(comparePass);
        
        const response = {
          emailUsed: !!findEmailId,
          userUsed: !!compareName,
          passUsed: !!comparePass,
        }
        res.json(response);
      } else {
        console.log('findEmailId is null.');
      }

      if (!findEmailId) {
        res.status(404).json({ message: 'User not found' , response});
        console.log(res);
        return;
      }

    }catch(err){
      console.error(err);
    }
  }
}

module.exports = {
  LoginController,
}