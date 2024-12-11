// Modal functionality
const modal = document.getElementById('modal-popup');
const modalMessage = document.getElementById('modal-message');

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
    modal.style.opacity = '1';
    modal.style.transform = 'translateY(0)';
    setTimeout(hideModal, 4000); // Automatically hide modal after 4 seconds
}

function hideModal() {
    modal.style.opacity = '0';
    modal.style.transform = 'translateY(100%)';
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 500); // Delay to allow transition to complete
}
// Thêm sự kiện lắng nghe khi người dùng thay đổi giá trị trong các trường input
document.querySelectorAll('.signup-form__input').forEach((input) => {
    input.addEventListener('input', checkFormValidity);
});

// Kiểm tra nhập đủ
function checkFormValidity() {
    const form = document.getElementById('signup-form');
    const submitButton = document.querySelector('.signup-form__button');

    // Kiểm tra tất cả các trường input trong form (chỉ cần kiểm tra không rỗng)
    const isFormValid = Array.from(form.querySelectorAll('input')).every((input) => input.value.trim() !== '');

    // Nếu form hợp lệ, bật nút, nếu không thì giữ nút bị vô hiệu hóa
    submitButton.disabled = !isFormValid;
}
// Form submission
document.getElementById('signup-form').addEventListener('submit', async function (event) {
    // Ngăn chặn hành vi mặc định của form
    event.preventDefault();
    // Lấy dữ liệu từ form
    const formData = new FormData(event.target);
    // Chuyển dữ liệu từ FormData sang object
    const formFields = Object.fromEntries(formData.entries());

    const username = formFields.username;
    const password = formFields.password;
    const password_confirm = formFields.password_confirm;
    const email = formFields.email;
    // kiểm tra password có ít nhất 6 ký tự
    if (password.length < 6) {
        showModal('Password must be at least 6 characters long');
        return;
    }
    // kiểm tra email hợp lệ
    if (!email.includes('@') || !email.includes('.')) {
        showModal('Invalid email address');
        return;
    }
    // kiểm tra password và password_confirm giống nhau
    if (password !== password_confirm) {
        showModal('Password and Confirm Password do not match');
        return;
    }

    // Kiểm tra username không chứa khoảng trắng
    if (username.includes(' ')) {
        showModal('Username cannot contain spaces');
        return;
    }
    // Submit data
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formFields),
        });

        if (response.ok) {
            showModal('Sign up successful!');
            window.location.href = '/auth/login';
        } else {
            const error = await response.json();
            // email đã tồn tại
            if (error.code === 11000 && error.keyValue && error.keyValue.email) {
                showModal('This email is already in use.'); // Hiển thị thông báo lỗi
            } else if (error.code === 11000 && error.keyValue && error.keyValue.username) {
                showModal('This username is already in use.'); // Hiển thị thông báo lỗi
            } else {
                // Hiển thị thông báo lỗi chung nếu không phải lỗi trùng email
                showModal(`${error.message}`);
            }
        }
    } catch (error) {
        console.error('Error during sign up:', error);
        showModal('Something went wrong. Please try again.');
    }
});
