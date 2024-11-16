const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const settings = [
    // Đã có các cấu hình trước đó:
    {
        option: '.settings__option--mentions',
        overlay: '.settings-overlay--mentions',
        menu: '.settings-overlay__popup',
        statusElement: '.settings__option-current-status',
        optionsSelector: '.settings-overlay__option',
    },
    {
        option: '.settings__option--online-status',
        overlay: '.settings-overlay--online-status',
        menu: '.settings-overlay__popup',
        statusElement: '.settings__option-current-status',
        optionsSelector: '.settings-overlay__option',
    },
    {
        option: '.settings__option--blocked-profiles',
        overlay: '.settings-overlay--blocked-profiles',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
    // Thêm các cấu hình khác:
    {
        option: '.settings__option--deactivate-profile',
        overlay: '.settings-overlay--deactivate-profile',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
    {
        option: '.settings__option--personal-info',
        overlay: '.settings-overlay--personal-info',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
    {
        option: '.settings__option--security',
        overlay: '.settings-overlay--security',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
    {
        option: '.settings__option--privacy-security-help',
        overlay: '.settings-overlay--privacy-security-help',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
    {
        option: '.settings__option--support-requests',
        overlay: '.settings-overlay--support-requests',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
    {
        option: '.settings__option--help-centre',
        overlay: '.settings-overlay--help-centre',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
    {
        option: '.settings__option--privacy-policy',
        overlay: '.settings-overlay--privacy-policy',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
    {
        option: '.settings__option--terms-of-use',
        overlay: '.settings-overlay--terms-of-use',
        menu: '.settings-overlay__popup',
        statusElement: null,
        optionsSelector: null,
    },
];

function toggleOverlay(overlay) {
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

// Hàm xử lý sự kiện click cho từng tùy chọn
function handleOptionClick({ option, overlay, menu, statusElement, optionsSelector }) {
    const optionElement = $(option);
    const overlayElement = $(overlay);
    const menuElement = overlayElement.querySelector(menu);
    const statusElementNode = statusElement ? optionElement.querySelector(statusElement) : null;
    const options = optionsSelector ? overlayElement.querySelectorAll(optionsSelector) : null;
    const backButton = overlayElement.querySelector('.settings-overlay__header-back');

    optionElement.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleOverlay(overlayElement);
    });

    // Đóng overlay khi nhấn nút "Back"
    backButton?.addEventListener('click', function () {
        overlayElement.style.display = 'none';
    });

    // Đóng overlay khi click ngoài
    document.addEventListener('click', function (event) {
        if (overlayElement.style.display === 'flex' && !menuElement.contains(event.target)) {
            overlayElement.style.display = 'none';
        }
    });

    // Cập nhật trạng thái khi chọn một tùy chọn
    if (options) {
        options.forEach((option) => {
            option.addEventListener('click', function () {
                const selectedStatus = option.getAttribute('data-status');
                if (statusElementNode) {
                    statusElementNode.textContent = selectedStatus;
                }
            });
        });
    }
}

settings.forEach((config) => handleOptionClick(config));
