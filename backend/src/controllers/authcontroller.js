const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // 2. check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. check input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // 2. find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // 3. check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 4. create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
};