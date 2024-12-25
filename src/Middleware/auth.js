const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  // log ra content type

  console.log(req.headers.authorization);
  // Nếu đường dẫn là '/', bỏ qua việc xác thực token, nhưng vẫn kiểm tra token nếu có
  if (req.path === "/") {
    if (token) {
      jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          console.log("Something wrong with token");
          return res.sendStatus(403);
        }
        req.userId = user.id;
        next();
      });
    } else {
      next();
    }
  } else {
    if (!token) {
      next();
    }

    jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log("Something wrong with token");
        return res.sendStatus(403);
      }
      req.userId = user.id;
      next();
    });
  }
};

module.exports = authenticateToken;

  

