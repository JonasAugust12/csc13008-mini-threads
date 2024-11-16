document.querySelectorAll('.monitor-btn').forEach(function (button) {
    button.addEventListener('click', function () {
        this.classList.toggle('bg-[#1E1E1E]');
        this.classList.toggle('text-[#777777]');
        this.classList.toggle('bg-white');
        this.classList.toggle('text-black');
    });
});

const moreButtons = document.querySelectorAll('.main-post-more-btn');
const moreLists = document.querySelectorAll('.main-post-more-list');

// Hàm để hiển thị và ẩn danh sách
function toggleMoreList(moreList) {
    if (moreList.style.display === 'flex') {
        moreList.style.display = 'none';
    } else {
        moreList.style.display = 'flex';
    }
}

// Ẩn danh sách khi bấm ra ngoài hoặc cuộn
document.addEventListener('click', (event) => {
    moreLists.forEach((moreList) => {
        moreList.style.display = 'none';
    });
});

// Thêm sự kiện click vào nút More để hiển thị danh sách
moreButtons.forEach((moreButton, index) => {
    const moreList = moreLists[index];
    moreButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        toggleMoreList(moreList);
    });
});

document.querySelectorAll('.post-username').forEach((username) => {
    const userCard = username.querySelector('.user-card');

    username.addEventListener('mouseenter', () => {
        userCard.classList.remove('hidden');
        userCard.classList.remove('opacity-0');
        userCard.classList.add('opacity-100');
    });

    username.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!userCard.matches(':hover')) {
                userCard.classList.add('opacity-0');
                userCard.classList.remove('opacity-100');
                userCard.classList.add('hidden');
            }
        }, 100);
    });

    userCard.addEventListener('mouseleave', () => {
        userCard.classList.add('opacity-0');
        userCard.classList.remove('opacity-100');
        userCard.classList.add('hidden');
    });
});
// document.addEventListener('DOMContentLoaded', () => {
//     // Lấy tất cả các nút và danh sách liên quan
//     const buttons = document.querySelectorAll('.replies-post-more-btn');

//     buttons.forEach((button) => {
//         const dropdown = button.querySelector('.replies-post-more-list');

//         // Gắn sự kiện click vào nút
//         button.addEventListener('click', (event) => {
//             event.stopPropagation();

//             // Ẩn tất cả các danh sách khác
//             buttons.forEach((btn) => {
//                 const otherDropdown = btn.querySelector('.replies-post-more-list');
//                 if (otherDropdown !== dropdown) {
//                     otherDropdown.style.display = 'none'; // Ẩn danh sách khác
//                 }
//             });

//             // Toggle trạng thái hiện/ẩn danh sách của nút hiện tại
//             dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
//         });
//     });

//     // Khi bấm ra ngoài, ẩn tất cả danh sách
//     document.addEventListener('click', () => {
//         buttons.forEach((button) => {
//             const dropdown = button.querySelector('.replies-post-more-list');
//             dropdown.style.display = 'none'; // Ẩn tất cả danh sách
//         });
//     });
// });
