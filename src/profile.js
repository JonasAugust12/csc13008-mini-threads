var button_done = document.querySelector('.edit-profile__button');
var edit_form = document.querySelector('.edit-profile');
var edit = document.querySelector('.edit-btn');
var profile_info = document.querySelector('.profile__info');
// click button done -> display form and overlay none
button_done.addEventListener('click', function () {
    // add class hidden to form block
    edit_form.classList.add('hidden');
    profile_info.classList.remove('hidden');
});

// click button edit -> display form and overlay block
edit.addEventListener('click', function () {
    // remove class hidden to display form block
    edit_form.classList.remove('hidden');
    profile_info.classList.add('hidden');
});
