var button_done = document.querySelector('.edit-profile__button');
var mobile_cancel_btn = document.querySelector('.edit-info__cancel');
var edit_form = document.querySelector('.edit-profile');
var edit = document.querySelector('.edit-btn');
var profile_info = document.querySelector('.profile__info');
var top_nav_right_setting = document.querySelector('.top-nav__right-setting');
var profile_follower = document.querySelector('.information__follower');
var follower_popup = document.querySelector('.follower-popup');
var close_follower = document.querySelector('.follower-popup__header__close-btn');

if (close_follower) {
    close_follower.addEventListener('click', function () {
        overlay.classList.add('hidden');
        follower_popup.classList.add('hidden');
    });
}

if (profile_follower) {
    profile_follower.addEventListener('click', function () {
        overlay.classList.remove('hidden');
        follower_popup.classList.remove('hidden');
    });
}

if (mobile_cancel_btn) {
    mobile_cancel_btn.addEventListener('click', function () {
        edit_form.classList.add('hidden');
        overlay.classList.add('hidden');
    });
}

// click button edit -> display form and overlay block
if (edit) {
    edit.addEventListener('click', function () {
        //kiểm tra thiết thị
        if (window.innerWidth < 700) {
            // add class hidden to form block
            edit_form.classList.remove('hidden');
            top_nav_right_setting.classList.add('hidden');
        } else {
            // remove class hidden to display form block
            edit_form.classList.remove('hidden');
            overlay.classList.remove('hidden');
        }
    });
}

window.addEventListener('resize', function () {
    if (window.innerWidth < 700) {
        if (!edit_form.classList.contains('hidden')) {
            overlay.classList.add('hidden');
        }
    } else {
        if (!edit_form.classList.contains('hidden')) {
            overlay.classList.remove('hidden');
        }
    }
});

function handleFollowClick(userId, event) {
    event.stopPropagation();
    console.log('click follow');
    fetch(`/profile/follow/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
    })
        .then((response) => {
            console.log('response ', response);
            if (response.ok) {
                window.location.reload();
                //document.querySelector('.follow-btn1 p').textContent = 'Following';
            } else {
                alert('Failed to follow');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred');
        });
}
