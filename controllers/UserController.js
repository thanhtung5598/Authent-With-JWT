const User = require("./../models/User");
const { registerValidation, loginValidation } = require("./../validations");

module.exports.register = async (req, res) => {
  // lets validate the data before we use
  const { error, value } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the email is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if(emailExist){
    return res.status(400).send("Email already exists")
  }

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const userSave = await user.save();
    res.send(userSave);
  } catch (error) {
    res.status(400).send(error);
  }
};
