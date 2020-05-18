const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const { registerValidation, loginValidation } = require("./../validations");

module.exports.register = async (req, res) => {
  // lets validate the data before we use
  const { error, value } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the email is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const haskPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: haskPassword,
  });
  try {
    const userSave = await user.save();
    res.send({
      user: userSave._id,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.login = async (req, res) => {
  //Let validate the data before we use
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");
  // checking if the password correct
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send("Invalid password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token); // And we added to our header
};
