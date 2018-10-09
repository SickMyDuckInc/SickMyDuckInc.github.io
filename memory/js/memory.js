
var flipedCard;
var flipedId;
var index_c = 0;
$( document ).ready(function() {    
    /*
    var cartas = ["eva","eva"];
    $(".js_carta").each(function() {
        $(this).data("valor", cartas[index_c] );
        index_c++;
      });
      */
    $(".js_carta").click(function(){
        if(!$(this).hasClass("selected")){
            $(this).addClass("selected");
            //setTimeout(turnAround, 1000, $(this));
        }
        else{            
            $(this).removeClass("selected");
        }
        if(flipedCard == null){
            flipedCard = $(this).data("valor");
            flipedId = $(this).attr('id');
        } else if(flipedId==$(this).attr('id')){            
            flipedCard = null;
            flipedId=null;
        }
        else{
            if(flipedCard == $(this).data("valor")){
                $(this).addClass("selected");
                setTimeout(flip,800, $(this))
            }
            else{
                $(this).addClass("selected");
                setTimeout(flip_back, 800, $(this));
            }
        }
    });
});


function turnAround(element){
    $(element).removeClass("selected");
}

function flip(element) {
    $("#"+flipedId).remove();
    $(element).remove();
    flipedId=null;
    flipedCard = null;
}

function flip_back(element){
    $("#"+flipedId).removeClass("selected");
    $(element).removeClass("selected");
    flipedId=null;
    flipedCard = null;
}