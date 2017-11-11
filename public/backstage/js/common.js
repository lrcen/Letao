if(location.href.indexOf('login.html') == -1) {
    $.ajax({
        url: '/employee/checkRootLogin',
        success: function(data) {
            if(data.error) {
                location.href = 'login.html';
            }
        }
    })
}

$("#section .topbar a:first-of-type").on('click', function() {

    $('#aside').toggleClass('active');
    $('#section').toggleClass('active');
})

$("#section .topbar a:last-of-type").on('click', function() {

    $("#logoutmodal").modal('show');
   
})

$(".btn-logout").on('click', function() {
     $.ajax({
        url: '/employee/employeeLogout',
        success: function(data) {
            if(data.success) {
                location.href = 'login.html';
            }
        }
    })
})

$(".sort").prev().on('click', function() {
    $(this).next().slideToggle();
})