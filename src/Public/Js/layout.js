window.addEventListener('resize', adjustHeadingWidth);
window.addEventListener('DOMContentLoaded', adjustHeadingWidth);

function adjustHeadingWidth() {
    const tabletBreakpoint = 700;
    const contentSection = document.querySelector('.content-section');
    const headingSection = document.querySelector('.heading__section');
    const contentBorder = document.querySelector('.content-border');

    if (window.innerWidth > tabletBreakpoint) {
        const contentWidth = window.getComputedStyle(contentSection).width;
        headingSection.style.minWidth = contentWidth;
        contentBorder.style.minWidth = contentWidth;
    } else {
        headingSection.style.minWidth = '';
    }
}

// Lấy các phần tử cần dùng
const createModal = document.querySelector('.create-post-modal');
const overlay = document.querySelector('.overlay');
const createBtn = document.querySelector('.create-btn');
const navUtilityCreate = document.querySelector('.nav-utility-create');
const cancelBtn = document.querySelector('.create-post__header__cancel-btn');

// Hàm hiển thị modal và overlay
function showModal() {
    createModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Hàm ẩn modal và overlay
function hideModal() {
    createModal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Thêm sự kiện click để hiển thị modal khi bấm vào nav-utility-create hoặc create-btn
createBtn.addEventListener('click', showModal);
navUtilityCreate.addEventListener('click', showModal);

// // Thêm sự kiện click để ẩn modal khi bấm vào overlay hoặc cancelBtn
// overlay.addEventListener('click', hideModal);
// cancelBtn.addEventListener('click', hideModal);

const moreBtn = document.querySelector('.navbar__setting-btn--more');
const moreMenu = document.querySelector('.navbar__setting-more-menu');

moreBtn.addEventListener('click', function () {
    moreMenu.style.display = 'flex';
});

document.addEventListener('click', function (event) {
    if (!moreMenu.contains(event.target) && !moreBtn.contains(event.target)) {
        moreMenu.style.display = 'none';
    }
});

const moreBtnTbl = document.querySelector('.top-nav__right-setting');
const moreMenuTbl = document.querySelector('.top-nav__setting-more-menu');

moreBtnTbl.addEventListener('click', function () {
    moreMenuTbl.style.display = 'flex';
});

document.addEventListener('click', function (event) {
    if (!moreMenuTbl.contains(event.target) && !moreBtnTbl.contains(event.target)) {
        moreMenuTbl.style.display = 'none';
    }
});

const logoutBtn = document.querySelector('.menu__btn--logout');

logoutBtn.addEventListener('click', function () {
    window.location.href = '../Pages/login.html';
});
