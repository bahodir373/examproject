const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token yuborilmadi yoki noto'g'ri formatda" });
  }

  const token = authHeader.split(" ")[1];

  // console.log("Authorization Header:", authHeader);
  //   console.log("Token:", authHeader?.split(" ")[1]);


  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token yaroqsiz", error: err.message });
  }
};
