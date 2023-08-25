const User = require ('../model/User');
const bcrypt = require ('bcrypt');
const fspromises = require('fs').promises;
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
    const finalResult = Result +'/n';
    await fspromises.appendFile("../routes/users.txt", finalResult, 'utf-8');
    res.status(201).json({'success': `new user have been created  ${usernameValue}`})
  } catch (err){
    res.status(500).json({'message': err.message});
  }

}

const handleLogin = async (req, res ) => {
  let{emailValue, usernameValue, passwordValue} = req.body;
  try{
  const findEmailId = await User.findOne({email : emailValue}). select('_id').exec();
  const Id = findEmailId._id
  if (!findEmailId) {
    res.status(404).json({ message: 'User not found' });
    const response = {
      emailUsed: false,
      nameUsed: false,
      passwordUsed: false,
    }
    console.log(res);
    res.json(response);
  }else if(findEmailId){
    const usernameId = await User.findById(Id).select('username').exec();
    if (usernameId.username === usernameValue){
      const response = {
        emailUsed:true,
        nameUsed: true,
        passwordUsed: false,
      }
      res.json(response);
      const passwordId = await User.findById(Id).select('password').exec();
      const hashedPwd = await bcrypt.hash(passwordValue,12);
      
      if (passwordId.password === hashedPwd){
        const response = {
          emailUsed: true,
          nameUsed: true,
          passwordUsed: true,
        }
        res.json(response);
      }else if (passwordId.password !== hashedPwd){
        const response = {
          emailUsed: true,
          nameUsed: true,
          passwordUsed: false,
        }
        res.json(response);

      }
      res.json(response);

    }else if (usernameId.username !== usernameValue){
      const response = {
        emailUsed : true,
        nameUsed: false,
        passwordUsed: false,
      }
      res.json(response);

    }
    res.json(response);
  }

  // res.status(200).json({ userId: user._id });
  }catch (err) {
  res.status(500).json({ message: err.message });
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
  handleLogin
};

