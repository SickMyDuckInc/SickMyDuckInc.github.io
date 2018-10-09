
var flipedCard;
var flipedId;
var index_c = 0;
class Card {
    constructor(nombre, img) {
        this.nombre = nombre;
        this.img = img;
    }

    getNombre() {
        return this.nombre;
    }

    getImg() {
        return this.img;
    }
}
var baraja = [];
baraja[0] = new Card("emoji1", "src/imagenes/Emoji1_ph.png");
baraja[1] = new Card("emoji1", "src/imagenes/Emoji1_ph.png");
baraja[2] = new Card("emoji2", "src/imagenes/Emoji2_ph.png");
baraja[3] = new Card("emoji2", "src/imagenes/Emoji2_ph.png");
baraja[4] = new Card("emoji3", "src/imagenes/Emoji3_ph.png");
baraja[5] = new Card("emoji3", "src/imagenes/Emoji3_ph.png");

$( document ).ready(function() {
    $(".js_carta").each(function() {
        $(this).data("valor", baraja[index_c].getNombre() );
        $(this).find(".back img").attr("src", baraja[index_c].getImg());
        index_c++;
    });
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