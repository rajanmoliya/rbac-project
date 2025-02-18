const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  const hashedPasword = await bcrypt.hash(password, 10);

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return res.status(400).json({
      msg: "Email already exists",
    });
  }

  const user = await User.create({
    email,
    role,
    password: hashedPasword,
  });

  const token = createToken(user._id, user.role);

  await user.save();

  res.status(201).json({
    msg: "User created successfully",
    data: { user, token },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      msg: "Invalid Password",
    });
  }

  const token = createToken(user._id, user.role);

  res.status(200).json({
    msg: "User logged in successfully",
    data: { user, token },
  });
};
