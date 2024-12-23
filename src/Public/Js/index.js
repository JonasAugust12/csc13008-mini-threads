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

//Like post
document.addEventListener('DOMContentLoaded', () => {
    const postLikes = document.querySelectorAll('.post-like');

    postLikes.forEach((postLike) => {
        postLike.addEventListener('click', () => {
            const postId = postLike.id.replace('like-button-', ''); // Sửa biến `button` thành `postLike`
            const svg = postLike.querySelector('svg path');
            const likeNum = postLike.querySelector('.like-num');
            const currentLikes = parseInt(likeNum.textContent.trim(), 10);

            // Kiểm tra trạng thái hiện tại của nút
            if (svg.getAttribute('fill') === 'red') {
                // Nếu đã like thì gửi yêu cầu API để "unlike"
                fetch(`/post/like-post/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        postId: postId, // Gửi postId trong request body
                        action: 'unlike', // Đưa thêm action để biết đây là yêu cầu unlike
                    }),
                });

                // Bỏ thích trên UI
                svg.setAttribute('fill', 'none');
                svg.setAttribute('stroke', 'currentColor');
                likeNum.textContent = currentLikes - 1; // Giảm số lượt thích
                if (likeNum.textContent === '0') likeNum.classList.add('hidden');
                likeNum.style.color = '#ccc';
            } else {
                // Nếu chưa thích thì gửi yêu cầu API để "like"
                fetch(`/post/like-post/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        postId: postId, // Gửi postId trong request body
                        action: 'like', // Đưa thêm action để biết đây là yêu cầu like
                    }),
                });

                // Thích trên UI
                svg.setAttribute('fill', 'red');
                svg.setAttribute('stroke', 'red');
                likeNum.textContent = currentLikes + 1; // Tăng số lượt thích
                if (likeNum.textContent !== '0') likeNum.classList.remove('hidden');
                likeNum.style.color = 'red';
            }
        });
    });
});

// xoá bài viết
const deletePostButtons = document.querySelectorAll('.delete-post');
deletePostButtons.forEach((deletePostButton) => {
    deletePostButton.addEventListener('click', (e) => {
        // Lấy các phần tử liên quan đến confirm delete và overlay
        const confirmDeleteBox = document.querySelector('.confirm-delete');
        const overlay = document.querySelector('.overlay');
        const confirmTitle = document.querySelector('.delete-title');
        confirmTitle.textContent = 'Delete post';
        const confirmContent = document.querySelector('.delete-content');
        confirmContent.textContent = "If you delete this post, you won't be able to restore it.";
        const confirmCancelBtn = document.querySelector('.confirm-cancel-btn');
        const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
        const loadingToast = document.querySelector('.loading-post-toast');
        const toastContent = document.querySelector('.toast__loading-content');

        // Hiển thị hộp xác nhận
        confirmDeleteBox.classList.remove('hidden');
        overlay.classList.remove('hidden');

        const postId = e.target.closest('.delete-post').getAttribute('post-id').split('-')[2];

        confirmCancelBtn.addEventListener('click', () => {
            confirmDeleteBox.classList.add('hidden');
            overlay.classList.add('hidden');
        });

        // Thêm sự kiện chỉ một lần cho button delete
        const handleDelete = async () => {
            loadingToast.classList.remove('hidden');
            toastContent.textContent = 'Deleting post...';
            try {
                await fetch(`/post/delete-post/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(() => {
                    loadingToast.classList.add('hidden');
                    const postContainer = e.target.closest('.post-container');
                    if (postContainer) {
                        postContainer.remove();
                    } else {
                        window.location.href = '/';
                    }
                    confirmDeleteBox.classList.add('hidden');
                    overlay.classList.add('hidden');
                });
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the post.');
            }
        };

        confirmDeleteBtn.addEventListener('click', handleDelete, { once: true });
    });
});

const startThreadBtn = document.querySelector('.start-thread');
function showModal() {
    createModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}
startThreadBtn.addEventListener('click', showModal);
