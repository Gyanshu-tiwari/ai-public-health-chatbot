import jwt from 'jsonwebtoken'
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY,
    { expiresIn: "15m" } // ✅ REQUIRED
  );
};
