const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchInput = $('.search-box__input');
const userProfiles = $$('.user-profile');
const clearButton = $('.search-box__clear-btn');

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

const followBtns = $$('.user-profile__follow-btn');

followBtns.forEach(function (followBtn) {
    followBtn.addEventListener('click', function () {
        if (followBtn.innerText === 'Follow') {
            followBtn.innerText = 'Following';
            followBtn.style.color = '#777777';
        } else {
            followBtn.innerText = 'Follow';
            followBtn.style.color = '#f3f5f7';
        }
    });
});

searchInput.addEventListener('input', function () {
    if (searchInput.value === '') {
        clearButton.style.display = 'none';
    } else {
        clearButton.style.display = 'flex';
    }
});

clearButton.onclick = function () {
    searchInput.value = '';
    _;
    userProfiles.forEach((profile) => {
        profile.style.display = 'flex';
    });
};
