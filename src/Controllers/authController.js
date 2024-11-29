const bcrypt = require("bcrypt"); // hash password
const User = require("../Models/User"); // model user
const jwt = require("jsonwebtoken"); // token

// GENERATE ACCESS TOKEN
generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    // key bí mật
    process.env.JWT_ACCESS_KEY,
    // hạn sử dụng token
    { expiresIn: "1h" }
  );
};
// GENERATE REFRESH TOKEN

generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    // key bí mật
    process.env.JWT_REFRESH_KEY,
    // hạn sử dụng token
    { expiresIn: "7d" }
  );
};
// ĐĂNG NHẬP
const loginController = async (req, res) => {
  try {
    // tìm user trong db

    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    console.log(user);
    // nếu không tìm thấy
    if (!user) {
      return res.status(404).json("Wrong username");
    }

    // so sánh password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // nếu sai password
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }
    // nếu đúng cả username và password
    if (user && validPassword) {
      // tạo token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // lưu trữ token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // deploy chuyển thành true
        path: "/",
        // ngăn chặn CSRF
        sameSite: "strict",
      });

      const { password, ...other } = user._doc;
      res.status(200).json({ ...other, accessToken });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json(err);
  }
};

// ĐĂNG KÝ
const signupController = async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body;

    // Kiểm tra xem các trường bắt buộc đã được nhập chưa
    if (!username || !email || !password || !fullname) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    // tạo user mới
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      fullname: req.body.fullname,
    });

    // lưu vào db
    const user = await newUser.save();

    // trả về kết quả
    res.status(200).json(user);
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json(err);
  }
};

//REFRESH TOKEN
requestRefreshToken = async (req, res) => {
  // Lấy refreshToken từ cookie
  const refreshToken = req.cookies.refreshToken;

  // Nếu không có refreshToken (chưa đăng nhập,...)
  if (!refreshToken) return res.status(401).json("You are not authenticated");

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");

    // không lỗi -> tạo token mới
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // lưu vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // deploy chuyển thành true
      path: "/",
      // ngăn chặn CSRF
      sameSite: "strict",
    });

    // trả về token mới
    res.status(200).json({ accessToken: newAccessToken });
  });
};

// LOGOUT
const logoutController = async (req, res) => {
  // xóa cookie refreshToken
  res.clearCookie("refreshToken");

  // xóa refreshToken trong mảng để ngăn chặn việc sử dụng token cũ
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );

  // trả về kết quả
  res.status(200).json("Logged out successfully");
};

module.exports = {
  loginController,
  signupController,
  requestRefreshToken,
  logoutController,
};
