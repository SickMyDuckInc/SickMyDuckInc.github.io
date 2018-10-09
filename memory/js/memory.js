$(document).ready(function(){
    $(".flipper").on("click", function(){
        if(!$(this).hasClass("selected")){
            $(this).addClass("selected");
            setTimeout(turnAround, 1000, $(this));
        }
        else{            
            $(this).removeClass("selected");
        }
    });
});

function turnAround(element){
    $(element).removeClass("selected");
}