const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const moreButton = $('.navbar__setting-btn--more');
const moreMenu = $('.navbar__setting-more-menu');

moreButton.addEventListener('click', function () {
    moreMenu.style.display = 'flex';
});

document.addEventListener('click', function (event) {
    if (!moreMenu.contains(event.target) && !moreButton.contains(event.target)) {
        moreMenu.style.display = 'none';
    }
});
