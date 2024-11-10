var button_done = document.querySelector('.edit-profile__button');

var edit_form = document.querySelector('.edit-profile');
var overlay = document.querySelector('.overlay');

var edit = document.querySelector('.edit-btn');

// click button done -> display form and overlay none
button_done.addEventListener('click', function () {
    // display form none

    edit_form.style.display = 'none';
    overlay.style.display = 'none';
});

// click button edit -> display form and overlay block
edit.addEventListener('click', function () {
    // display form block
    edit_form.style.display = 'block';
    overlay.style.display = 'none';
});
