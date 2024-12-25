document.querySelectorAll('.monitor-btn').forEach(function (button) {
    button.addEventListener('click', function () {
        this.classList.toggle('bg-[#1E1E1E]');
        this.classList.toggle('text-[#777777]');
        this.classList.toggle('bg-white');
        this.classList.toggle('text-black');
    });
});

document.querySelectorAll('.post-username').forEach((username) => {
    const userCard = username.querySelector('.user-card');

    username.addEventListener('mouseenter', () => {
        userCard.classList.remove('hidden');
        userCard.classList.remove('opacity-0');
        userCard.classList.add('opacity-100');
    });

    username.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!userCard.matches(':hover')) {
                userCard.classList.add('opacity-0');
                userCard.classList.remove('opacity-100');
                userCard.classList.add('hidden');
            }
        }, 100);
    });

    userCard.addEventListener('mouseleave', () => {
        userCard.classList.add('opacity-0');
        userCard.classList.remove('opacity-100');
        userCard.classList.add('hidden');
    });
});
