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

const createModal = document.querySelector('.create-post-modal');
const overlay = document.querySelector('.overlay');
const createBtn = document.querySelector('.create-btn');
const navUtilityCreate = document.querySelector('.nav-utility-create');
const cancelBtn = document.querySelector('.create-post__header__cancel-btn');
function showModal() {
    createModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}
function hideModal() {
    createModal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    edit_form.classList.add('hidden');
    follower_popup.classList.add('hidden');
}
createBtn.addEventListener('click', showModal);
navUtilityCreate.addEventListener('click', showModal);
overlay.addEventListener('click', hideModal);
cancelBtn.addEventListener('click', hideModal);

const privacyButton = document.querySelector('.create-post__footer__privacy');
const privacyList = document.querySelector('.create-post__privacy-list');
const privacyItems = document.querySelectorAll('.create-post__privacy-list__item');
const privacyTitle = privacyButton.querySelector('.create-post__footer__privacy-title');
privacyButton.addEventListener('click', (event) => {
    event.stopPropagation();
    privacyList.classList.toggle('hidden');
});
document.addEventListener('click', (event) => {
    if (!privacyButton.contains(event.target) && !privacyList.contains(event.target)) {
        privacyList.classList.add('hidden');
    }
});
privacyItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        if (item.textContent === 'Anyone') {
            privacyTitle.textContent = 'Anyone can reply & quote';
        } else if (item.textContent === 'Profiles you follow') {
            privacyTitle.textContent = 'Profiles you follow can reply & quote';
        }
        privacyList.classList.add('hidden');
        event.stopPropagation();
    });
});

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
