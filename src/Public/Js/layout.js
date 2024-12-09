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
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'index.html' || currentPage === '') {
        window.location.href = './src/Public/Pages/login.html';
    } else {
        window.location.href = '../Pages/login.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('.create-post__info-post__status');
    const addToThread = document.querySelector('.create-post__next-post-info');
    const postButton = document.querySelector('.create-post__footer__post-btn');
    const postsContainer = document.querySelector('.my-posts');

    textarea.addEventListener('input', () => {
        if (textarea.value.trim().length > 0) {
            addToThread.classList.remove('text-[#353535]');
            addToThread.classList.add('text-secondary-text');
            addToThread.classList.remove('cursor-not-allowed');
            addToThread.classList.add('cursor-pointer');

            postButton.classList.remove('tbl:cursor-not-allowed');
            postButton.classList.add('tbl:cursor-pointer');
            postButton.classList.remove('tbl:text-[#5a5b5b]');
            postButton.classList.add('tbl:text-white');
            postButton.classList.remove('opacity-30');
            postButton.classList.remove('cursor-not-allowed');
            postButton.classList.add('cursor-pointer');
        } else {
            addToThread.classList.remove('cursor-pointer');
            addToThread.classList.add('cursor-not-allowed');
            addToThread.classList.remove('text-secondary-text');
            addToThread.classList.add('text-[#353535]');

            postButton.classList.remove('tbl:cursor-pointer');
            postButton.classList.add('tbl:cursor-not-allowed');
            postButton.classList.add('opacity-30');
            postButton.classList.add('tbl:text-[#5a5b5b]');
            postButton.classList.remove('tbl:text-white');
        }
    });

    postButton.addEventListener('click', () => {
        const postContent = textarea.value.trim();
        const postImage = imageInput.files[0]; // Lấy ảnh đầu tiên người dùng chọn (nếu có)
        console.log('Post content:', postContent); // Debug: kiểm tra nội dung nhập vào
        console.log('Post image:', postImage); // Debug: kiểm tra ảnh người dùng đã chọn (nếu có)

        if (postContent.length > 0 || postImage) {
            const formData = new FormData();
            formData.append('post_quote', postContent);
            if (postImage) {
                formData.append('post_image', postImage);
            }

            // Gửi yêu cầu POST đến backend để thêm bài post
            fetch('/post', {
                method: 'POST',
                body: formData, // Gửi FormData thay vì JSON
            })
                .then((response) => {
                    console.log('Response status:', response.status); // Debug: kiểm tra trạng thái phản hồi từ backend
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Response data:', data); // Debug: kiểm tra dữ liệu trả về từ backend
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error occurred:', error); // Debug: kiểm tra lỗi xảy ra
                });
        } else {
            console.warn('Post content and image are both empty. Nothing to post.'); // Debug: cảnh báo khi cả nội dung và ảnh đều trống
        }
    });
});

// Lấy phần tử input và phần tử img
const imageInput = document.getElementById('imageInput');
const selectedImage = document.getElementById('selectedImage');
const imageContainer = document.querySelector('.create-post__info-post__img');

// Lắng nghe sự kiện click của phần tử chứa biểu tượng SVG để mở cửa sổ chọn ảnh
document.querySelector('.create-post__utilities-icon').addEventListener('click', () => {
    imageInput.click(); // Mở cửa sổ chọn ảnh
});

// Lắng nghe sự kiện thay đổi của input file để hiển thị ảnh đã chọn
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result; // Đặt đường dẫn ảnh vào src của img
            imageContainer.classList.remove('hidden'); // Hiển thị phần tử chứa ảnh
        };

        reader.readAsDataURL(file); // Đọc ảnh và tạo URL để hiển thị
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const timeElements = document.querySelectorAll('.post-time-stamp');

    timeElements.forEach((element) => {
        const createdAt = new Date(element.getAttribute('data-created-at'));
        const now = new Date();
        const diffInSeconds = Math.floor((now - createdAt) / 1000);

        let timeAgo = '';

        if (diffInSeconds < 60) {
            timeAgo = `${diffInSeconds}s`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            timeAgo = `${minutes}m`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            timeAgo = `${hours}h`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            timeAgo = `${days}d`;
        }

        element.innerText = timeAgo;
    });
});
