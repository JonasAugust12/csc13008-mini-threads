const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const privacySecurityHelpOption = $('.settings__option--privacy-security-help');
const supportRequestsOption = $('.settings__option--support-requests');
const helpCentreOption = $('.settings__option--help-centre');
const privacyPolicyOption = $('.settings__option--privacy-policy');
const termsOfUseOption = $('.settings__option--terms-of-use');

const privacySecurityHelpOverlay = $('.settings-overlay--privacy-security-help');
const supportRequestsOverlay = $('.settings-overlay--support-requests');
const helpCentreOverlay = $('.settings-overlay--help-centre');
const privacyPolicyOverlay = $('.settings-overlay--privacy-policy');
const termsOfUseOverlay = $('.settings-overlay--terms-of-use');

const privacySecurityHelpPopup = privacySecurityHelpOverlay.querySelector('.settings-overlay__popup');
const supportRequestsPopup = supportRequestsOverlay.querySelector('.settings-overlay__popup');
const helpCentrePopup = helpCentreOverlay.querySelector('.settings-overlay__popup');
const privacyPolicyPopup = privacyPolicyOverlay.querySelector('.settings-overlay__popup');
const termsOfUsePopup = termsOfUseOverlay.querySelector('.settings-overlay__popup');

function toggleOverlay(overlay) {
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

// Mở overlay khi click vào mục "Privacy and Security Help"
privacySecurityHelpOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(privacySecurityHelpOverlay);
});

// Mở overlay khi click vào mục "Support Requests"
supportRequestsOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(supportRequestsOverlay);
});

// Mở overlay khi click vào mục "Help Centre"
helpCentreOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(helpCentreOverlay);
});

// Mở overlay khi click vào mục "Privacy Policy"
privacyPolicyOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(privacyPolicyOverlay);
});

// Mở overlay khi click vào mục "Terms of Use"
termsOfUseOption.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleOverlay(termsOfUseOverlay);
});

// Đóng overlay khi click bên ngoài
document.addEventListener('click', function (event) {
    if (privacySecurityHelpOverlay.style.display === 'flex' && !privacySecurityHelpPopup.contains(event.target)) {
        privacySecurityHelpOverlay.style.display = 'none';
    }
    if (supportRequestsOverlay.style.display === 'flex' && !supportRequestsPopup.contains(event.target)) {
        supportRequestsOverlay.style.display = 'none';
    }
    if (helpCentreOverlay.style.display === 'flex' && !helpCentrePopup.contains(event.target)) {
        helpCentreOverlay.style.display = 'none';
    }
    if (privacyPolicyOverlay.style.display === 'flex' && !privacyPolicyPopup.contains(event.target)) {
        privacyPolicyOverlay.style.display = 'none';
    }
    if (termsOfUseOverlay.style.display === 'flex' && !termsOfUsePopup.contains(event.target)) {
        termsOfUseOverlay.style.display = 'none';
    }
});
