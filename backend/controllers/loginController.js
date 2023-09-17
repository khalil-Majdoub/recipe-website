const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const asynchandler = require("express-async-handler");
const fs = require("fs").promises;

const LoginController = async (req, res) => {
  const { email, userName, password } = req.body;

  console.log("Received body parameters:", req.body);
  try {
    const findEmailId = await User.findOne({ email }).exec();
    // console.log(findEmailId);
    if (findEmailId) {
      const Id = findEmailId ? findEmailId._id : null;
      const userId = findEmailId ? findEmailId.username : null;
      const passwordId = findEmailId ? findEmailId.password : null;
      const userIdM = userId.toString().toLowerCase();
      const compareName = userIdM === userName;
      if (!compareName)
        return res.status(404).json({ message: "username isn't found" });

      const comparePass = await bcrypt.compare(password, passwordId);
      if (!comparePass)
        return res.status(404).json({ message: "password not found" });

      // console.log(Id);
      // console.log(userId);
      // console.log(compareName);
      // console.log(comparePass);

      const accessToken = jwt.sign(
        {
          userInfo: {
            username: findEmailId.username,
            roles: findEmailId.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
      );
      const refreshToken = jwt.sign(
        {
          userInfo: findEmailId.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response = {
        emailUsed: !!findEmailId,
        userUsed: !!compareName,
        passUsed: !!comparePass,
      };
      console.log("login have been done successfully");

      res.json({ ...response, accessToken });
    } else {
      const response = {
        emailUsed: false,
        userUsed: false,
        passUsed: false,
      };
      return res.status(404).json({ message: "User not found", response });
    }
  } catch (err) {
    console.error(err);
  }
};
const Refresh = (req, res) => {
  const cookie = req.cookie;
  if (!cookie?.jwt) return res.status(401).json({ messgae: "Unauthorized" });

  refreshToken = cookie.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asynchandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
      );

      res.json({ accessToken });
    })
  );
};

module.exports = {
  LoginController,
  Refresh,
};
