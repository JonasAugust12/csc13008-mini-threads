window.addEventListener("resize", adjustHeadingWidth);
window.addEventListener("DOMContentLoaded", adjustHeadingWidth);

function adjustHeadingWidth() {
  const tabletBreakpoint = 700;
  const contentSection = document.querySelector(".content-section");
  const headingSection = document.querySelector(".heading__section");
  const contentBorder = document.querySelector(".content-border");

  if (window.innerWidth > tabletBreakpoint) {
    const contentWidth = window.getComputedStyle(contentSection).width;
    headingSection.style.minWidth = contentWidth;
    contentBorder.style.minWidth = contentWidth;
  } else {
    headingSection.style.minWidth = "";
  }
}

const createModal = document.querySelector(".create-post-modal");
const overlay = document.querySelector(".overlay");
const createBtn = document.querySelector(".create-btn");
const navUtilityCreate = document.querySelector(".nav-utility-create");
const cancelBtn = document.querySelector(".create-post__header__cancel-btn");
function showModal() {
  if (!accessToken) {
    showPopup("popup");
  } else {
    createModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }
}
function hideModal() {
  createModal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
  edit_form.classList.add("hidden");
  follower_popup.classList.add("hidden");
}
createBtn.addEventListener("click", showModal);
navUtilityCreate.addEventListener("click", showModal);
overlay.addEventListener("click", hideModal);
cancelBtn.addEventListener("click", hideModal);

const privacyButton = document.querySelector(".create-post__footer__privacy");
const privacyList = document.querySelector(".create-post__privacy-list");
const privacyItems = document.querySelectorAll(
  ".create-post__privacy-list__item"
);
const privacyTitle = privacyButton.querySelector(
  ".create-post__footer__privacy-title"
);
privacyButton.addEventListener("click", (event) => {
  event.stopPropagation();
  privacyList.classList.toggle("hidden");
});
document.addEventListener("click", (event) => {
  if (
    !privacyButton.contains(event.target) &&
    !privacyList.contains(event.target)
  ) {
    privacyList.classList.add("hidden");
  }
});
privacyItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (item.textContent === "Anyone") {
      privacyTitle.textContent = "Anyone can reply & quote";
    } else if (item.textContent === "Profiles you follow") {
      privacyTitle.textContent = "Profiles you follow can reply & quote";
    }
    privacyList.classList.add("hidden");
    event.stopPropagation();
  });
});

const moreBtn = document.querySelector(".navbar__setting-btn--more");
const moreMenu = document.querySelector(".navbar__setting-more-menu");
moreBtn.addEventListener("click", function () {
  moreMenu.style.display = "flex";
});
document.addEventListener("click", function (event) {
  if (!moreMenu.contains(event.target) && !moreBtn.contains(event.target)) {
    moreMenu.style.display = "none";
  }
});
const moreBtnTbl = document.querySelector(".top-nav__right-setting");
const moreMenuTbl = document.querySelector(".top-nav__setting-more-menu");
moreBtnTbl.addEventListener("click", function () {
  moreMenuTbl.style.display = "flex";
});
document.addEventListener("click", function (event) {
  if (
    !moreMenuTbl.contains(event.target) &&
    !moreBtnTbl.contains(event.target)
  ) {
    moreMenuTbl.style.display = "none";
  }
});

// query theo id
const logoutBtn = document.getElementById("menu-logout");

logoutBtn.addEventListener("click", async function () {
  // fetch api logout
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      // xóa access token và chuyển hướng về trang login
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }
  } catch (error) {
    console.error(error);
  }
});

// show popup
const showPopup = (id) => {
  const popup = document.getElementById(id);
  popup.classList.remove("hidden");
  // close popup when click outside
  window.onclick = (event) => {
    if (event.target == popup) {
      popup.classList.add("hidden");
    }
  };
};

// KHI CHƯA ĐĂNG NHẬP MÀ BẤM VÀO PROFILE VÀ ACTIVITY -> HIỆN POPUP
// hide popup
const hidePopup = (id) => {
  const popup = document.getElementById(id);
  popup.classList.add("hidden");
};
var continue_with_thread_button = document.querySelector(
  ".continue_with_thread"
);
continue_with_thread_button.addEventListener("click", () => {
  window.location.href = "/auth/login";
});
// lấy ra element nav-utility-profile
const navUtilityProfile = document.querySelector(".nav-utility-profile");
// nếu bấm vào nút này thì chuyển hướng đến trang profile
navUtilityProfile.addEventListener("click", () => {
  // lấy ra access token từ localStorage
  const accessToken = localStorage.getItem("accessToken");
  // nếu không có access token thì hiện popup
  if (!accessToken) {
    showPopup("popup");
    return;
  } else {
    // nếu có access token thì chuyển hướng đến trang profile
    window.location.href = "/profile";
  }
});
// lấy ra element nav-utility-noti
const navUtilityActivity = document.querySelector(".nav-utility-noti");
// nếu bấm vào nút này thì chuyển hướng đến trang activity
navUtilityActivity.addEventListener("click", () => {
  // lấy ra access token từ localStorage
  const accessToken = localStorage.getItem("accessToken");
  // nếu không có access token thì hiện popup
  if (!accessToken) {
    showPopup("popup");
    return;
  } else {
    // nếu có access token thì chuyển hướng đến trang activity
    window.location.href = "/activity";
  }
});

// lấy ra element login_button
const login_button = document.querySelector(".login-btn");
// nếu bấm vào nút này thì chuyển hướng đến trang login
login_button.addEventListener("click", () => {
  window.location.href = "/auth/login";
});
// kiểm tra trang hiện tại đã đăng nhập hay chưa (tức là đã có access token còn hạn hay chưa), nếu có -> ẩn nút login
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  login_button.style.display = "none";
}
const thread_start = document.querySelector(".start-thread");
// const accessToken = localStorage.getItem("accessToken");

if (!accessToken) {
  thread_start.classList.add("hidden");
}
const create_btn = document.querySelector(".create-btn");
create_btn.addEventListener("click", () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    showPopup("popup");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.querySelector(".create-post__info-post__status");
  const addToThread = document.querySelector(".create-post__next-post-info");
  const postButton = document.querySelector(".create-post__footer__post-btn");
  const imageInput = document.getElementById("imageInput");
  const selectedImage = document.getElementById("selectedImage");
  const imageContainer = document.querySelector(".create-post__info-post__img");
  const removeImageButton = document.querySelector(
    ".create-post__info-post__remove-img"
  );
  const loadingToast = document.querySelector(".loading-post-toast");

  const checkButtonState = () => {
    const hasContent =
      textarea.value.trim().length > 0 ||
      !imageContainer.classList.contains("hidden");
    if (hasContent) {
      addToThread.classList.replace("text-[#353535]", "text-secondary-text");
      addToThread.classList.replace("cursor-not-allowed", "cursor-pointer");
      postButton.classList.replace("cursor-not-allowed", "cursor-pointer");
      postButton.classList.replace(
        "tbl:cursor-not-allowed",
        "tbl:cursor-pointer"
      );
      postButton.classList.remove("opacity-30");
    } else {
      addToThread.classList.replace("cursor-pointer", "cursor-not-allowed");
      addToThread.classList.replace("text-secondary-text", "text-[#353535]");
      postButton.classList.replace(
        "tbl:cursor-pointer",
        "tbl:cursor-not-allowed"
      );
      postButton.classList.replace("cursor-pointer", "cursor-not-allowed");
      postButton.classList.add("opacity-30");
    }
  };

  document
    .querySelector(".create-post__utilities-icon")
    .addEventListener("click", () => {
      imageInput.click();
    });

  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImage.src = e.target.result;
        imageContainer.classList.remove("hidden");
        checkButtonState();
      };
      reader.readAsDataURL(file);
    }
  });

  removeImageButton.addEventListener("click", () => {
    selectedImage.src = "";
    imageContainer.classList.add("hidden");
    imageInput.value = "";
    checkButtonState();
  });

  textarea.addEventListener("input", checkButtonState);

  postButton.addEventListener("click", () => {
    createModal.classList.add("hidden");
    overlay.classList.add("hidden");
    loadingToast.classList.remove("hidden");
    const postContent = textarea.value.trim();
    const postImage = imageInput.files[0];

    if (postContent.length > 0 || postImage) {
      const formData = new FormData();
      formData.append("post_quote", postContent);
      if (postImage) formData.append("post_image", postImage);

      fetch("/post", { method: "POST", body: formData })
        .then((response) => {
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then(() => {
          loadingToast.classList.add("hidden");
          window.location.reload();
        })
        .catch((error) => console.error("Error occurred:", error));
    } else {
      console.warn("Post content and image are both empty. Nothing to post.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const timeElements = document.querySelectorAll(".post-time-stamp");
  timeElements.forEach((element) => {
    const createdAt = new Date(element.getAttribute("data-created-at"));
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdAt) / 1000);
    let timeAgo = "";

    if (diffInSeconds < 60) {
      timeAgo = `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      timeAgo = `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
      timeAgo = `${Math.floor(diffInSeconds / 3600)}h`;
    } else {
      timeAgo = `${Math.floor(diffInSeconds / 86400)}d`;
    }

    element.innerText = timeAgo;
  });
});
