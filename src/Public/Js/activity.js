document.addEventListener('DOMContentLoaded', () => {
    const followButtons = document.querySelectorAll('.activity__post-follow-btn');

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

document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các nút và danh sách liên quan
    const buttons = document.querySelectorAll('.activity-post__more-btn');

    buttons.forEach((button) => {
        const dropdown = button.querySelector('.activity-post-more-list');

        // Gắn sự kiện click vào nút
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            // Ẩn tất cả các danh sách khác
            buttons.forEach((btn) => {
                const otherDropdown = btn.querySelector('.activity-post-more-list');
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
            const dropdown = button.querySelector('.activity-post-more-list');
            dropdown.style.display = 'none'; // Ẩn tất cả danh sách
        });
    });
});

// Đánh dấu thông báo là đã đọc
async function handleMarkAsRead(notificationId) {
    try {
        const response = await fetch(`/activity/mark-as-read/${notificationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        // Kiểm tra nếu API trả về lỗi
        if (!response.ok) {
            console.error('Failed to mark as read');
            return;
        }
        // Xóa class `bg-[#222222]` nếu element tồn tại
        const notiElement = document.getElementById(`activity-post-${notificationId}`);
        if (notiElement) {
            notiElement.classList.remove('bg-[#222222]');
        }
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
}
async function handleMarkAsReadAndNavigate(notificationId, url) {
    await handleMarkAsRead(notificationId);
    window.location.href = url;
}

// Like và unlike comment (tương tự với cái bên detail-post.js)
document.addEventListener('DOMContentLoaded', () => {
    const commentLikes = document.querySelectorAll('.like-comment');

    commentLikes.forEach((likeButton) => {
        likeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const commentId = likeButton.id.replace('like-comment-', '');
            const svg = likeButton.querySelector('svg path');
            const likeNum = likeButton.querySelector('.like-comment-num');
            const currentLikes = parseInt(likeNum.textContent.trim(), 10) || 0;

            if (svg.getAttribute('fill') === 'red') {
                // Unlike comment
                fetch(`/post/like-comment/${commentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ action: 'unlike' }),
                }).then(() => {
                    svg.setAttribute('fill', 'none');
                    svg.setAttribute('stroke', 'currentColor');
                    likeNum.textContent = currentLikes - 1;
                    if (currentLikes - 1 === 0) likeNum.classList.add('hidden');
                });
            } else {
                // Like comment
                fetch(`/post/like-comment/${commentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ action: 'like' }),
                }).then(() => {
                    svg.setAttribute('fill', 'red');
                    svg.setAttribute('stroke', 'red');
                    likeNum.textContent = currentLikes + 1;
                    likeNum.classList.remove('hidden');
                });
            }
        });
    });
});

// xoá notification
const deleteNotiButtons = document.querySelectorAll('.delete-noti');
deleteNotiButtons.forEach((deleteNotiButton) => {
    deleteNotiButton.addEventListener('click', async (e) => {
        // Lấy thông tin ID của thông báo
        const notiId = e.target.closest('.delete-noti').getAttribute('activity-id').split('-')[2];

        // Hiển thị hộp xác nhận
        const confirmDeleteBox = document.querySelector('.confirm-delete');
        const overlay = document.querySelector('.overlay');
        const confirmTitle = document.querySelector('.delete-title');
        const confirmContent = document.querySelector('.delete-content');
        const confirmCancelBtn = document.querySelector('.confirm-cancel-btn');
        const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');

        confirmTitle.textContent = 'Delete Notification';
        confirmContent.textContent = 'Are you sure you want to delete this notification?';
        confirmDeleteBox.classList.remove('hidden');
        overlay.classList.remove('hidden');

        // Sự kiện hủy
        confirmCancelBtn.addEventListener('click', () => {
            confirmDeleteBox.classList.add('hidden');
            overlay.classList.add('hidden');
        });

        // Thêm sự kiện chỉ một lần cho nút delete
        const handleDelete = async () => {
            try {
                const response = await fetch(`/activity/delete/${notiId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Xoá thông báo khỏi giao diện
                    const notiContainer = e.target.closest('.activity-post');
                    if (notiContainer) {
                        notiContainer.remove();
                    }

                    confirmDeleteBox.classList.add('hidden');
                    overlay.classList.add('hidden');
                } else {
                    console.error('Failed to delete notification.');
                    alert('An error occurred while deleting the notification.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the notification.');
            }
        };

        confirmDeleteBtn.addEventListener('click', handleDelete, { once: true });
    });
});
