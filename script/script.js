/**
 * Created by Capitoneo on 2017-06-11.
 */
$(document).ready(init);

function init() {
    // default user data
    if(!localStorage.getItem('name') || !localStorage.getItem('birthday') || !localStorage.getItem('city')) {
        setUserData('John', '06.07.2008', 'Budapest');
    }
    // navbar btn active
    $('#nav a').each(function() {
        var url = location.pathname;
        url = url.substr(url.lastIndexOf('/') + 1);
        if( this.getAttribute('href').replace(/^[#/]/, '').indexOf(url.replace('.html','')) >= 0 ) {
            $(this).parent().addClass('active').siblings('li').removeClass('active');
        }
    });
    // load user data
    if (localStorage) {
        var name = localStorage.getItem('name');
        var birthday = localStorage.getItem('birthday');
        var city = localStorage.getItem('city');

        if ($('#user-name')&&$('#user-birthday')&&$('#user-city')) {
            $('#user-name').text(name);
            $('#user-birthday').text(birthday);
            $('#user-city').text(city);
        }
        if ($('#is-name')&&$('#is-birthday')&&$('#is-city')){
            $('#is-name').val(name);
            $('#is-birthday').val(birthday);
            $('#is-city').val(city);
        }
    }
    // ajax links
    var links = $('a');
    links.unbind('click');
    links.click(loadAsyncHTML);
}

function loadAsyncHTML() {
    var nURL = $(this).attr('href');

    if (nURL.length > 1) {
        $('#wrapper').fadeOut('fast', loadContent);
    }

    function loadContent() {
        $('#wrapper').load(nURL + " #content", showNewContent);
    }

    function showNewContent() {
        $('#wrapper').fadeIn('fast');
        window.history.pushState({}, $('h1').textContent, nURL);
        init();
    }

    return false;
}

function setUserData(name, birthday, city) {
    localStorage.setItem('name', name);
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('city', city);
}

function userDataForm() {
    var name = $("#is-name").val();
    var birthday = $("#is-birthday").val();
    var city = $("#is-city").val();

    setUserData(name, birthday, city);
    //console.log(name + ' ' + birthday + ' ' + city);
}