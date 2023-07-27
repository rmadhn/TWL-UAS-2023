const router = require("express").Router();
const { User } = require("../models/user.js");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found for email:", req.body.email);
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      console.log("Invalid password for email:", req.body.email);
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    console.log("User authenticated:", user.email);

    const token = jwt.sign(
      { Id: user._id, username: user.username },
      "Hakuna Matata",
      {
        expiresIn: "1h", // Mengatur waktu kedaluwarsa token
      }
    );

    return res.json({ token }); // Mengirimkan token sebagai respon JSON
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
