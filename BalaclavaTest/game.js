function OnAppReady(){
    gameInstance.SetFullscreen(1);
}

var fullscreen = false;
$(document).ready(function(){
    $("body").on("click",function(){
        if(!fullscreen){
            gameInstance.SetFullscreen(1);
            fullscreen = true;
        }
    });
});