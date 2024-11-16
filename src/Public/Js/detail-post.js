// Lấy các phần tử cần thiết
const mainPostMoreBtn = document.querySelector('.view-activity-btn');
const postActivityWrapper = document.querySelector('.post-activity-wrapper');
const postActivityBackBtn = document.querySelector('.post-activity-back-btn');

// Hiển thị `post-activity-wrapper` khi bấm vào `view-activity-btn`
mainPostMoreBtn.addEventListener('click', () => {
    postActivityWrapper.classList.remove('hidden'); // Bỏ `hidden`
    postActivityWrapper.classList.add('flex'); // Thêm `flex`

    // Thêm class `overflow-hidden` vào <body> để chặn cuộn trang
    document.body.classList.add('overflow-hidden');
});

// Ẩn `post-activity-wrapper` khi bấm vào `post-activity-back-btn` hoặc ngoài `post-activity`
postActivityWrapper.addEventListener('click', (event) => {
    // Kiểm tra nếu bấm ngoài vùng `post-activity` hoặc bấm vào nút Back
    if (
        event.target === postActivityWrapper || // Bấm ngoài vùng `post-activity`
        event.target.closest('.post-activity-back-btn') // Bấm vào nút Back
    ) {
        postActivityWrapper.classList.add('hidden'); // Thêm `hidden`
        postActivityWrapper.classList.remove('flex'); // Bỏ `flex`

        // Xóa class `overflow-hidden` khỏi <body> khi đóng modal
        document.body.classList.remove('overflow-hidden');
    }
});

// Lấy các phần tử cần dùng
const moreButton = document.querySelector('.main-post-more-btn');
const moreList = document.querySelector('.main-post-more-list');

// Hàm để hiển thị và ẩn danh sách
function toggleMoreList(event) {
    if (moreList.style.display === 'flex') {
        moreList.style.display = 'none';
    } else {
        moreList.style.display = 'flex';
    }
}

// Ẩn danh sách khi bấm ra ngoài hoặc cuộn
document.addEventListener('click', (event) => {
    if (!moreButton.contains(event.target)) {
        moreList.style.display = 'none';
    }
});

// Thêm sự kiện click vào nút More để hiển thị danh sách
moreButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    toggleMoreList();
});

document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các nút và danh sách liên quan
    const buttons = document.querySelectorAll('.replies-post-more-btn');

    buttons.forEach((button) => {
        const dropdown = button.querySelector('.replies-post-more-list');

        // Gắn sự kiện click vào nút
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            // Ẩn tất cả các danh sách khác
            buttons.forEach((btn) => {
                const otherDropdown = btn.querySelector('.replies-post-more-list');
                if (otherDropdown !== dropdown) {
                    otherDropdown.style.display = 'none'; // Ẩn danh sách khác
                }
            });

            // Toggle trạng thái hiện/ẩn danh sách của nút hiện tại
            dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        });
    });

    // Khi bấm ra ngoài, ẩn tất cả danh sách
    document.addEventListener('click', () => {
        buttons.forEach((button) => {
            const dropdown = button.querySelector('.replies-post-more-list');
            dropdown.style.display = 'none'; // Ẩn tất cả danh sách
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const followButtons = document.querySelectorAll('.user-liked-follow-btn');

    followButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.textContent.trim() === 'Following') {
                button.textContent = 'Follow';
                button.classList.remove('text-secondary-text');
                button.classList.add('text-primary-text');
            } else {
                button.textContent = 'Following';
                button.classList.remove('text-primary-text');
                button.classList.add('text-secondary-text');
            }
        });
    });
});
