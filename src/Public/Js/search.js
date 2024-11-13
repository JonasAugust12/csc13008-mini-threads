const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchInput = $('.search-box__input');
const userProfiles = $$('.user-profile');

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
