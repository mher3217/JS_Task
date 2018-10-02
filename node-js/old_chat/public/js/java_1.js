/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function myFunction() {
    document.getElementById("m_1").classList.toggle("show");
}

var index = 1;
function plusIndex(){
	index = index + 1;
	show_image(index);
	}	
show_image(1);
function show_image(n){
	var i;
	var x = document.getElementsByClassName("slyder_fade");
	if(n > x.length){
		index = 1;
	}
	if(n < 1){
		index = x.length;
	}
	for(var i = 0; i < x.length; ++i){
		x[i].style.display = "none";
	}
	x[index - 1].style.display = "block";
}

auto_change();
function auto_change(){
	var i;
	var x = document.getElementsByClassName("slyder_fade");
	for(var i = 0; i < x.length; ++i){
		x[i].style.display = "none";
	}
	if(index > x.length){
		index = 1;
	}
	x[index - 1].style.display = "block";	
	index ++;
	setTimeout(auto_change,2000);
}

function topFunction_0() {
    window.scrollTo(0, 0);
}
function topFunction_1() {
    window.scrollTo(0, 500);
}
function topFunction_2() {
    window.scrollTo(0, 1800);
}
function topFunction_3() {
    window.scrollTo(0, 3000);
}

window.onscroll = function(){scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/*	//jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){
    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;
    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
*/
