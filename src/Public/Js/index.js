document.querySelectorAll('.monitor-btn').forEach(function (button) {
    button.addEventListener('click', function () {
        this.classList.toggle('bg-[#1E1E1E]');
        this.classList.toggle('text-[#777777]');
        this.classList.toggle('bg-white');
        this.classList.toggle('text-black');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các nút và danh sách liên quan
    const buttons = document.querySelectorAll('.main-post-more-btn');

    buttons.forEach((button) => {
        const dropdown = button.querySelector('.main-post-more-list');

        // Gắn sự kiện click vào nút
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            // Ẩn tất cả các danh sách khác
            buttons.forEach((btn) => {
                const otherDropdown = btn.querySelector('.main-post-more-list');
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
            const dropdown = button.querySelector('.main-post-more-list');
            dropdown.style.display = 'none'; // Ẩn tất cả danh sách
        });
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

document.addEventListener('DOMContentLoaded', () => {
    const refreshOption = document.getElementById('refresh-option');
    const refreshList = document.getElementById('refresh-list');

    // Hiển thị hoặc ẩn danh sách khi nhấn vào nút
    refreshOption.addEventListener('click', (event) => {
        event.stopPropagation(); // Ngăn không cho sự kiện lan ra ngoài
        const isVisible = refreshList.classList.contains('opacity-100');

        // Đặt trạng thái ẩn/hiện
        if (isVisible) {
            refreshList.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            refreshList.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
        } else {
            refreshList.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none');
            refreshList.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    });

    // Ẩn danh sách khi nhấn ra ngoài
    document.addEventListener('click', () => {
        refreshList.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        refreshList.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const postLikes = document.querySelectorAll('.post-like');

    postLikes.forEach((postLike) => {
        postLike.addEventListener('click', () => {
            const svg = postLike.querySelector('svg path');
            const likeNum = postLike.querySelector('.like-num');
            const currentLikes = parseInt(likeNum.textContent.trim(), 10);

            // Kiểm tra trạng thái hiện tại của nút
            if (svg.getAttribute('fill') === 'red') {
                // Nếu đang thích -> Bỏ thích
                svg.setAttribute('fill', 'none');
                svg.setAttribute('stroke', 'currentColor');
                likeNum.textContent = currentLikes - 1;
            } else {
                // Nếu chưa thích -> Thích
                svg.setAttribute('fill', 'red');
                svg.setAttribute('stroke', 'red');
                likeNum.textContent = currentLikes + 1;
            }
        });
    });
});

const startThreadBtn = document.querySelector('.start-thread');
function showModal() {
    createModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}
startThreadBtn.addEventListener('click', showModal);
