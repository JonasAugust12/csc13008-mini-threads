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

// Lấy các phần tử
const moreButtons = document.querySelectorAll('.activity-post__more-btn');
const actionsWrapper = document.querySelector('.activity-actions-wrapper');
const actions = document.querySelector('.activity-actions');
const actionItems = document.querySelectorAll('.activity-actions-opt > div');

// Xử lý khi bấm vào từng nút More
moreButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Ngăn sự kiện lan truyền
        actionsWrapper.classList.add('flex'); // Hiển thị modal
        actionsWrapper.classList.remove('hidden'); // Loại bỏ lớp hidden

        // Thêm class `overflow-hidden` vào <body> để chặn cuộn trang
        document.body.classList.add('overflow-hidden');
    });
});

// Ẩn modal khi bấm ra ngoài activity-actions
document.addEventListener('click', (event) => {
    if (!actions.contains(event.target)) {
        actionsWrapper.classList.add('hidden'); // Thêm lớp hidden
        actionsWrapper.classList.remove('flex'); // Loại bỏ lớp flex

        // Xóa class `overflow-hidden` khỏi <body> khi đóng modal
        document.body.classList.remove('overflow-hidden');
    }
});

// Ngăn modal bị ẩn khi bấm vào bên trong activity-actions
actions.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Ẩn modal khi chọn một mục bên trong
actionItems.forEach((item) => {
    item.addEventListener('click', () => {
        actionsWrapper.classList.add('hidden'); // Thêm lớp hidden
        actionsWrapper.classList.remove('flex'); // Loại bỏ lớp flex

        // Xóa class `overflow-hidden` khỏi <body> khi đóng modal
        document.body.classList.remove('overflow-hidden');
    });
});
