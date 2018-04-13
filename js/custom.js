

$(".power-of-coding-button").click(function () {
    $(".power-of-coding-container").animate({
        left: '100%'
    });
    $(".jumbotron").fadeOut(1000);
//    introJs().start();
//
});


function calculateAge(){

    //A variable which contains your date of birth
    var year_of_birth = 1985;

    //The loop that calculates your age
    for (year = 2016; year > year_of_birth; year--) {

        var age = year - year_of_birth;
        $("#age-list").append('<li>' + 'In ' + year + ' I was ' + age  + '</li>');

    }

    $('#calculate-age-button').remove();

}

$('#kickass').on('click',function(){
    var KICKASSVERSION='2.0';
    var s = document.createElement('script');
    s.type='text/javascript';
    document.body.appendChild(s);
    s.src='js/shoot.js';
    //anim();
    $('#c').show();

});

//<a class="btn btn-secondary" href="javascript:var%20KICKASSVERSION='2.0';var%20s%20=%20document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='//hi.kickassapp.com/kickass.js';void(0);">Kick Ass</a>
