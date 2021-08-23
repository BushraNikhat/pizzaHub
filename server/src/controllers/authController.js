const User = require("../model/user");
const bcrypt = require("bcrypt");

exports.registerRoute = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json("All fields are mandatory");
    } else {
      const user = await User.find({ email });
      if (user.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
          name,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json("Registered successfully");
      } else {
        res.status(400).json("User already exists");
      }
    }
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
};

exports.loginRoute = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json("All fields are mandatory");
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json("wrong email or password");
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          res.status(200).json({_id:user._id,role:user.role});
        } else {
          res.status(404).json("wrong email or password");
        }
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
