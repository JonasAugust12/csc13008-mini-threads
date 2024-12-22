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
    const postLikes = document.querySelectorAll('.activity__post-action-like');

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
