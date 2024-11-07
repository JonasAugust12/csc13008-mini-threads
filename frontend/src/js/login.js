const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputs = $$('.login-form__input');
const loginButton = $('.login-form__button');
const loginText = $('.login-form__button-text');

function toggleLoginButton() {
    const allFilled = Array.from(inputs).every((input) => input.value.trim() !== '');
    loginButton.disabled = !allFilled;
}

inputs.forEach((input) => {
    input.addEventListener('input', toggleLoginButton);
});

document.addEventListener('DOMContentLoaded', function () {
    const overlay = $('.overlay-container');
    const qr = $('.qr-section');
    const closeButton = $('.close-button');

    qr.addEventListener('click', function () {
        overlay.style.display = 'flex';
    });

    closeButton.onclick = function () {
        overlay.style.display = 'none';
    };
});
