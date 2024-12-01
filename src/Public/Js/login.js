// Đảm bảo đã import axios (nếu dùng module)
var axios = require("axios").default;
// sử dụng CDN

var signUpButton = document.querySelector(".sign-up__text-wrapper");

signUpButton.addEventListener("click", function () {
  window.location.href = "/go-to-signup";
});

// Lấy các phần tử input và nút login
const emailOrUsernameInput = document.querySelector('[name="username"]');
const passwordInput = document.querySelector('[name="password"]');
const loginButton = document.querySelector('button[type="submit"]');

// Hàm kiểm tra các trường nhập
function checkInputs() {
  if (
    emailOrUsernameInput.value.trim() !== "" &&
    passwordInput.value.trim() !== ""
  ) {
    loginButton.disabled = false; // Bật nút login
  } else {
    loginButton.disabled = true; // Tắt nút login
  }
}

// Lắng nghe sự kiện khi người dùng thay đổi giá trị trong các input
emailOrUsernameInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

// Kiểm tra lần đầu tiên khi trang tải
checkInputs();

document
  .getElementById("login_form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngừng reload trang khi submit

    const form = document.getElementById("login_form");
    const formFields = {
      username: form.querySelector('[name="username"]').value,
      password: form.querySelector('[name="password"]').value,
    };

    try {
      const response = await axios.post("/auth/login", formFields, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Nếu login thành công, lưu trữ access token và chuyển hướng
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken); // Lưu token vào localStorage

        // Đăng nhập thành công, hiển thị thông báo
        showModal(response.data.message);

        // Chuyển hướng về trang home sau 1 s
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        showModal(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response.status === 400 || error.response.status === 404) {
        showModal(error.response.data.message);
      } else {
        showModal("Login failed! Something went wrong.");
      }
    }
  });

// Hàm hiển thị modal
function showModal(message) {
  const modalMessage = document.getElementById("modal-message");
  const modal = document.getElementById("modal-popup");
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
  modal.style.opacity = "1";
  modal.style.transform = "translateY(0)";
  setTimeout(hideModal, 4000); // Tự động ẩn modal sau 4 giây
}

// Hàm ẩn modal
function hideModal() {
  const modal = document.getElementById("modal-popup");
  modal.style.opacity = "0";
  modal.style.transform = "translateY(100%)";
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 500); // Đợi một chút để hoàn thành hiệu ứng
}
