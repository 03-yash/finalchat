const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const chatUsers = require("../models/userModel");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");



const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,pImage } = req.body;
console.log(name, email, password, pImage)
  if (!name || !email || !password ||!pImage) {
    res.status(400);
    throw new Error("Please fill all details");
  }

  // check if user already exists
  const userExist = await chatUsers.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  // create user
  const user = await chatUsers.create({
    name,
    email,
    password: hashPass,
    image: pImage,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});




const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  // check user and pass
  const user = await chatUsers.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image : user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credential");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const protectedResponse = (req, res) => {
  res.status(200).json(req.user);
};

const allUsers = expressAsyncHandler(async(req,res)=>{
try {
  const users = await chatUsers.find({}, "-password");
  res.status(200).json(users)
  
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
}
})

module.exports = { loginUser, registerUser, protectedResponse , allUsers};
