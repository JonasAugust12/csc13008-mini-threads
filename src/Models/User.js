const mongoose = require("mongoose");

// Khung xương chứa thuộc tính người dùng
const userScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,

      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,

      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profile: {
      display_name: {
        type: String,
        required: true, // Cần phải có tên hiển thị
        default: function () {
          return this.fullname; // Tên hiển thị mặc định là họ và tên
        },
      },
      avt: {
        type: String,
        default: null, // Avatar mặc định là null
      },
      bio: {
        type: String,
        default: null, // Tiểu sử mặc định là null
      },
      nick_name: {
        type: String,
        default: function () {
          return this.username; // Sử dụng username làm nick name ban đầu
        },
      },
    },
    followers_count: {
      type: Number,
      default: 0, // Ban đầu số người theo dõi là 0
    },
    following_count: {
      type: Number,
      default: 0, // Ban đầu số người mà tài khoản này theo dõi là 0
    },
  },
  // cho biết tạo acc lúc nào
  { timestamps: true }
);

module.exports = mongoose.model("User", userScheme);
