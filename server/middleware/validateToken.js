import jwt from "jsonwebtoken";
import pool from '../models/db.js';
 
const validateToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
 
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not provided, Unauthorized" });
    }
 
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
 
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token, Unauthorized" });
    }
 
    const user = await pool.query(
        'SELECT * FROM "Profile" WHERE id = $1 LIMIT 1',
        [decoded.userId]
    );
   
    if (!user) {
      return res.status(404).json({ message: "User not found, Unauthorized" });
    }
 
    req.user = user.rows[0];

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
 
export default validateToken;