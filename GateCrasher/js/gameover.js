$(document).ready(function(){
    var win = getUrlParameter("win");
    var stars = getUrlParameter("score");

    if(win == 0){
        $("#stars").hide();
        $("#next").hide();
        $("#win_loose").attr("src","/res/menus/game_over.png");
    }
    else{
        $("#win_loose").attr("src","/res/menus/enhorabuena.png");
        $("#stars").attr("src","/res/menus/stars/stars"+stars+".png");
    }
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};