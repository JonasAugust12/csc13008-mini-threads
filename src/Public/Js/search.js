const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchInput = $('.search-box__input');
const userProfiles = $$('.user-profile');
const clearButton = $('.search-box__clear-btn');
const suggestionHeading = $('.suggestion-box__heading');
const followBtns = $$('.user-profile__follow-btn');

searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    if (query.length > 0) {
        suggestionHeading.style.display = 'none';
    } else {
        suggestionHeading.style.display = 'flex';
    }

    userProfiles.forEach((profile) => {
        const username = profile.querySelector('.user-profile__username-link').textContent.toLowerCase();
        const name = profile.querySelector('.user-profile__name-text').textContent.toLowerCase();

        if (username.includes(query) || name.includes(query)) {
            profile.style.display = 'flex';
        } else {
            profile.style.display = 'none';
        }
    });
});

clearButton.onclick = function () {
    searchInput.value = '';

    userProfiles.forEach((profile) => {
        profile.style.display = 'flex';
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const followers = $$('.user-profile__followers-count');

    followers.forEach((count) => {
        const numFollowers = parseInt(count.textContent);
        count.textContent = formatFollowers(numFollowers) + ' followers';
    });
});

function formatFollowers(followers) {
    if (followers >= 1_000_000) {
        return (followers / 1_000_000).toFixed(1) + 'M';
    } else if (followers >= 100_000) {
        return Math.floor(followers / 1000) + 'K';
    } else if (followers >= 10_000) {
        return (followers / 1000).toFixed(1) + 'K';
    } else if (followers >= 1000) {
        return followers.toLocaleString();
    } else {
        return followers.toString();
    }
}

followBtns.forEach(function (followBtn) {
    followBtn.addEventListener('click', async function () {
        const userId = followBtn.getAttribute('data-user-id');
        const action = followBtn.innerText === 'Follow' ? 'follow' : 'unfollow';

        if (action === 'follow') {
            followBtn.innerText = 'Following';
            followBtn.style.color = '#777777';
        } else {
            followBtn.innerText = 'Follow';
            followBtn.style.color = '#f3f5f7';
        }

        try {
            const response = await fetch(`/search/follow/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action }), // Gửi action (follow/unfollow) vào body
            });

            if (response.ok) {
                const data = await response.json();
                if (action === 'follow') {
                    followBtn.innerText = 'Following';
                    followBtn.style.color = '#777777';
                } else {
                    followBtn.innerText = 'Follow';
                    followBtn.style.color = '#f3f5f7';
                }
            } else {
                console.error('Error:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        localStorage.setItem('searchValue', searchInput.value);
        window.location.href = 'search_result.html';
    }
});

// searchInput.addEventListener('input', function () {
//     if (searchInput.value === '') {
//         clearButton.style.display = 'none';
//     } else {
//         clearButton.style.display = 'flex';
//     }
// });

// clearButton.onclick = function () {
//     searchInput.value = '';
// };
