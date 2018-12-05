$(document).ready(function(){
    var win = getUrlParameter("win");
    var stars = getUrlParameter("stars");
    var level = getUrlParameter("level");
    $("#samelevel").attr("href","game.html?level="+level);
    if(win == 0){
        $("#stars").hide();
        $("#stars_parent").hide();
        $("#nextlevel").hide();
        $("#win_loose").attr("src","res/menus/game_over.png");
    }
    else{
        $("#win_loose").attr("src","res/menus/enhorabuena.png");
        $("#stars").attr("src","res/menus/stars/stars"+stars+".png");
        
        if(level <3){
            var nexlevel = parseInt(level) +1;
            $("#nextlevel").attr("href","game.html?level="+nexlevel);
        }
        else{
            $("#nextlevel").hide();
        }
        
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