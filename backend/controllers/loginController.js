const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require("fs").promises;

const LoginController = async (req, res) => {
  const { email, userName, password } = req.body;

  console.log("Received body parameters:", req.body);
  try {
    const findEmailId = await User.findOne({ email }).exec();
    console.log(findEmailId);
    if (findEmailId) {
      const Id = findEmailId ? findEmailId._id : null;
      const userId = findEmailId ? findEmailId.username : null;
      const passwordId = findEmailId ? findEmailId.password : null;
      const userIdM = userId.toString().toLowerCase();
      const compareName = userIdM === userName;
      const comparePass = await bcrypt.compare(password, passwordId);

      console.log(Id);
      console.log(userId);
      console.log(compareName);
      console.log(comparePass);

      const acessToken = jwt.sign(
        {
          "userInfo":{
            "username":findEmailId.username,
            "roles": findEmailId.roles,
          }
          
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "10s"}
      )
      const refreshToken = jwt.sign(
        {
          "userInfo": findEmailId.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"20"}
      )
      function isTokenExpired(token) {
        try {
          const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
          return decoded.exp < currentTime;
        } catch (error) {
          // Token is invalid or expired
          return true;
        }
      }
      
      // Example usage:
      const isAccessTokenExpired = isTokenExpired(acessToken);
      const isRefreshTokenExpired = isTokenExpired(refreshToken);

      const response = {
        emailUsed: !!findEmailId,
        userUsed: !!compareName,
        passUsed: !!comparePass,
      };
      res.json(...response,acessToken,refreshToken, isAccessTokenExpired, isRefreshTokenExpired);
    } else {
      const response = {
        emailUsed: false,
        userUsed: false,
        passUsed: false,
      };
      return res.status(404).json({ message: "User not found", response });
    }

    // const acessToken = jwt.sign(
    //   {
    //     "userInfo":{
    //       "username":findEmailId.username,
    //       "roles": findEmailId.roles,
    //     }
        
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   {expiresIn: "10s"}
    // )
    // const refreshToken = jwt.sign(
    //   {
    //     "userInfo": findEmailId.username,
    //   },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   {expiresIn:"1w"}
    // )

  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  LoginController,
};
