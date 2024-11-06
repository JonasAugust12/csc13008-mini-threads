const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const refreshBtn = $('.refresh-btn');
const options = $$('.result-options__link');

document.addEventListener('DOMContentLoaded', function () {
    const searchValue = localStorage.getItem('searchValue');

    if (searchValue) {
        refreshBtn.textContent = searchValue;
    }
});

options.forEach((option) => {
    option.addEventListener('click', function () {
        options.forEach((opt) => opt.classList.remove('chosen'));
        option.classList.add('chosen');
    });
});
