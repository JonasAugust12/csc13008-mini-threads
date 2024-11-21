var button_done = document.querySelector(".edit-profile__button");
var edit_form = document.querySelector(".edit-profile");
var edit = document.querySelector(".edit-btn");
var profile_info = document.querySelector(".profile__info");
var top_nav_right_setting = document.querySelector(".top-nav__right-setting");
var btn_done_mobile = document.querySelector(".top_button_done_mobile");
var profile_follower = document.querySelector(".information__follower");
var follower_popup = document.querySelector(".follower-popup");
var close_follower = document.querySelector(
  ".follower-popup__header__close-btn"
);

close_follower.addEventListener("click", function () {
  overlay.classList.add("hidden");
  follower_popup.classList.add("hidden");
});

profile_follower.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  follower_popup.classList.remove("hidden");
});
btn_done_mobile.addEventListener("click", function () {
  edit_form.classList.add("hidden");
  profile_info.classList.remove("hidden");
  overlay.classList.add("hidden");
  btn_done_mobile.classList.add("hidden");
  top_nav_right_setting.classList.remove("hidden");
});
// click button done -> display form and overlay none
button_done.addEventListener("click", function () {
  // add class hidden to form block

  edit_form.classList.add("hidden");
  profile_info.classList.remove("hidden");
  overlay.classList.add("hidden");
  // btn_done_mobile.classList.add('hidden');
  top_nav_right_setting.classList.remove("hidden");
});

// click button edit -> display form and overlay block
edit.addEventListener("click", function () {
  console.log("click");
  //kiểm tra thiết thị
  if (window.innerWidth < 700) {
    // add class hidden to form block
    edit_form.classList.remove("hidden");
    profile_info.classList.add("hidden");
    top_nav_right_setting.classList.add("hidden");
    btn_done_mobile.classList.remove("hidden");
  } else {
    // remove class hidden to display form block
    edit_form.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth < 700) {
    if (!edit_form.classList.contains("hidden")) {
      profile_info.classList.add("hidden");
      overlay.classList.add("hidden");
      btn_done_mobile.classList.remove("hidden");
    }
  } else {
    if (!edit_form.classList.contains("hidden")) {
      profile_info.classList.remove("hidden");
      overlay.classList.remove("hidden");
    }
  }
});
