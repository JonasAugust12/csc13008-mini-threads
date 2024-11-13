var button_done = document.querySelector('.edit-profile__button');
var edit_form = document.querySelector('.edit-profile');
var edit = document.querySelector('.edit-btn');
var profile_info = document.querySelector('.profile__info');
var overlay = document.querySelector('.overlay');
// click button done -> display form and overlay none
button_done.addEventListener('click', function () {
    // add class hidden to form block

    edit_form.classList.add('hidden');
    profile_info.classList.remove('hidden');
    overlay.classList.add('hidden');
});

// click button edit -> display form and overlay block
edit.addEventListener('click', function () {
    //kiểm tra thiết thị
    if (window.innerWidth < 870) {
        // add class hidden to form block
        edit_form.classList.remove('hidden');
        profile_info.classList.add('hidden');
    } else {
        // remove class hidden to display form block
        edit_form.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth < 870) {
        if (!edit_form.classList.contains('hidden')) {
            profile_info.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    } else {
        if (!edit_form.classList.contains('hidden')) {
            profile_info.classList.remove('hidden');
            overlay.classList.remove('hidden');
        }
    }
});
