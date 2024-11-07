const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const mentionOption = $('.settings__option--mentions');
const mentionOverlay = $('.settings-overlay--mentions');
const mentionMenu = mentionOverlay.querySelector('.settings-overlay__popup');
const mentionStatus = mentionOption.querySelector('.settings__option-current-status');
const mentionOptions = mentionOverlay.querySelectorAll('.settings-overlay__option');

const onlineStatusOption = $('.settings__option--online-status');
const onlineStatusOverlay = $('.settings-overlay--online-status');
const onlineStatusMenu = onlineStatusOverlay.querySelector('.settings-overlay__popup');
const onlineStatusCurrent = onlineStatusOption.querySelector('.settings__option-current-status');
const onlineStatusOptions = onlineStatusOverlay.querySelectorAll('.settings-overlay__option');

const blockedProfilesOption = $('.settings__option--blocked-profiles');
const blockedProfilesOverlay = $('.settings-overlay--blocked-profiles');
const blockedProfilesPopup = blockedProfilesOverlay.querySelector('.settings-overlay__popup');

function toggleOverlay(overlay) {
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

mentionOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(mentionOverlay);
});

onlineStatusOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(onlineStatusOverlay);
});

blockedProfilesOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(blockedProfilesOverlay);
});

// Close overlays when clicked outside
document.addEventListener('click', function (event) {
    if (
        (mentionOverlay.style.display === 'flex' && !mentionMenu.contains(event.target)) ||
        (onlineStatusOverlay.style.display === 'flex' && !onlineStatusMenu.contains(event.target)) ||
        (blockedProfilesOverlay.style.display === 'flex' && !blockedProfilesPopup.contains(event.target))
    ) {
        mentionOverlay.style.display = 'none';
        onlineStatusOverlay.style.display = 'none';
        blockedProfilesOverlay.style.display = 'none';
    }
});

// Set the selected status when clicked
mentionOptions.forEach((option) => {
    option.addEventListener('click', () => {
        mentionStatus.textContent = option.getAttribute('data-status');
    });
});

onlineStatusOptions.forEach((option) => {
    option.addEventListener('click', () => {
        onlineStatusCurrent.textContent = option.getAttribute('data-status');
    });
});
