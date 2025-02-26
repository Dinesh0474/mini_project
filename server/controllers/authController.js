const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/db.js');

const signUp = async (req, res, next) => {
  try {
    const { username, fullName, email, passwordHash, age, profession } = req.body;

    const existingUser = await pool.query(
      'SELECT 1 FROM "Profile" WHERE username = $1 OR email = $2 LIMIT 1',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordHash, salt);

    const result = await pool.query(
      'INSERT INTO "Profile" (username, fullName, email, passwordHash, age, profession) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, fullName, email, hashedPassword, age, profession]
    );
    console.log(result);

    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: result.rows[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      'SELECT * FROM "Profile" WHERE email = $1 LIMIT 1',
      [email]
    );
    console.log(user.rows[0].passwordhash, user.rows[0].id);
    console.log(password);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].passwordhash);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: user.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { signUp, signIn };
