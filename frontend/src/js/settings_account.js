const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const deactivateProfileOption = $('.settings__option--deactivate-profile');
const personalInfoOption = $('.settings__option--personal-info');
const securityOption = $('.settings__option--security');

const deactivateProfileOverlay = $('.settings-overlay--deactivate-profile');
const personalInfoOverlay = $('.settings-overlay--personal-info');
const securityOverlay = $('.settings-overlay--security');

const deactivateProfilePopup = deactivateProfileOverlay.querySelector('.settings-overlay__popup');
const personalInfoPopup = personalInfoOverlay.querySelector('.settings-overlay__popup');
const securityPopup = securityOverlay.querySelector('.settings-overlay__popup');

function toggleOverlay(overlay) {
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

// Mở overlay khi click vào mục "Deactivate or Delete Profile"
deactivateProfileOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(deactivateProfileOverlay);
});

// Mở overlay khi click vào mục "Personal Information"
personalInfoOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(personalInfoOverlay);
});

// Mở overlay khi click vào mục "Security"
securityOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(securityOverlay);
});

// Đóng overlay khi click bên ngoài
document.addEventListener('click', function (event) {
    if (deactivateProfileOverlay.style.display === 'flex' && !deactivateProfilePopup.contains(event.target)) {
        deactivateProfileOverlay.style.display = 'none';
    }
    if (personalInfoOverlay.style.display === 'flex' && !personalInfoPopup.contains(event.target)) {
        personalInfoOverlay.style.display = 'none';
    }
    if (securityOverlay.style.display === 'flex' && !securityPopup.contains(event.target)) {
        securityOverlay.style.display = 'none';
    }
});
