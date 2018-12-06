function redirect() {
    let user = sessionStorage.getItem('user');
    if (user) {
        window.location.href = "/chat.html";
    }
}
$('#main-form').on('submit', function (e) {
    e.preventDefault();
    let name = $('#name').val();
    let room = $('#room').val();
    let keys = {
        name: name,
        room: room
    }

    sessionStorage.setItem('user', JSON.stringify(keys));
    redirect();
});

window.onload = function () {
    redirect();
}
