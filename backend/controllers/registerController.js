// const { response } = require('express');
const User = require ('../model/User');
const bcrypt = require ('bcrypt');
const fs = require('fs').promises;
// const duplicate = require ("../routes/api/duplicate");

const handleNewUser = async (req, res) =>{
  const {emailValue, usernameValue, passwordValue} = req.body;
  // duplicate(emailValue, usernameValue);
  try{
    // const duplicateResult = await duplicate.checkDuplicates(emailValue, usernameValue);

    const hashedPwd = await bcrypt.hash(passwordValue,12);
    
    const Result = await User.create({
      email: emailValue,
      username: usernameValue,
      password: hashedPwd
    });
    const finalResult = Result +'\n';
    const filePath = '/home/khalil/mythings/main/backend/routes/users.txt';
    await fs.appendFile(filePath, finalResult, 'utf-8');
    res.status(201).json({'success': `new user have been created  ${usernameValue}`})
  } catch (err){
    res.status(500).json({'message': err.message});
  }

}



const handleDuplicateCheck = async (req, res) => {
  let { emailValue, usernameValue } = req.query;

  if (emailValue) {
    emailValue = emailValue.toLowerCase();
  }

  if (usernameValue) {
    usernameValue = usernameValue.toLowerCase();
  }

  const duplicateEmail = await User.findOne({ email: emailValue }).exec();
  const duplicateName = await User.findOne({ username: usernameValue }).exec();

  const response = {
    emailUsed: !!duplicateEmail,
    nameUsed: !!duplicateName,
  };

  res.json(response);
};

module.exports = {
  handleNewUser,
  handleDuplicateCheck, // Add this new function
};

