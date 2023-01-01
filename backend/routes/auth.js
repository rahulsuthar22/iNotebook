const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Rahul";

//Route:1 Create a new user using : /api/auth/createUser
router.post(
  "/createuser",
  [body("name", "Enter the valid name").isLength({ min: 3 }), body("email", "Enter the valid email").isEmail(), body("password", "Enter the valid password").isLength({ min: 5 })],
  async (req, res) => {
    // If there are errors, return bad request and error
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      // Check whether the email exists or not
      let user = await User.findOne({ email: req.body.email });

      //Adding the salt
      let salt = await bcrypt.genSalt(10);

      //Securing password using hash function
      let secPass = await bcrypt.hash(req.body.password, salt);

      // Creating new user , No login required
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //Payload for the sign method for creating the authtoken
      const data = {
        user: {
          id: user.id,
        },
      };

      //Authorization token
      const authToken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      res.json({ authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Interanal Server Error", msg: err.message });
    }
  }
);

//Route:2 Authenticate a user using : /api/auth/login , no login require

router.post("/login", [body("email", "Enter the valid email").isEmail(), body("password", "Password cannot be blank").exists()], async (req, res) => {
  // If there are errors, return bad request and error
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    //Destructuring the email and password
    const { email, password } = req.body;

    //Finding the email from database
    let user = await User.findOne({ email });

    //If user does not exists , give error
    if (!user) {
      return res.status(400).json({
        err: "Please try to login with the correct credentials",
      });
    }

    //Comparing the password using the bcrypt.compare() function and checking that password match or not
    const passwordCompare = await bcrypt.compare(password, user.password);
    // console.log(passwordCompare);
    if (!passwordCompare) {
      return res.status(400).json({
        err: "Please try to login with the correct credentials",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  } catch (err) {
    res.status(500).json({
      err: "Internal Server Error",
      msg: err.message,
    });
  }
});

//Route:3 Get LoggedIn user details using : /api/auth/getuser, Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
