const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

document.addEventListener('DOMContentLoaded', function () {
    const inputs = $$('.signup-form__input');
    const inputWrappers = $$('.signup-form__group');
    const signupButton = $('.signup-form__button');

    inputs.forEach((input, index) => {
        const inputWrapper = inputWrappers[index];

        input.addEventListener('input', function () {
            validateInput(input, inputWrapper);
            checkFormValidity();
        });

        // Xử lý sự kiện blur (khi mất focus)
        input.addEventListener('blur', function () {
            validateInput(input, inputWrapper);
            checkFormValidity();
        });
    });

    function validateInput(input, inputWrapper) {
        if (!input.value.trim()) {
            inputWrapper.classList.add('error');
        } else {
            inputWrapper.classList.remove('error');
        }

        if (input.name === 'email') {
            if (!validateEmail(input.value.trim())) {
                inputWrapper.classList.add('error');
            } else {
                inputWrapper.classList.remove('error');
            }
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function checkFormValidity() {
        let allValid = true;

        inputs.forEach((input, index) => {
            const inputWrapper = inputWrappers[index];

            if (inputWrapper.classList.contains('error') || (input.required && !input.value.trim())) {
                allValid = false;
            }
        });

        signupButton.disabled = !allValid;
    }
});
