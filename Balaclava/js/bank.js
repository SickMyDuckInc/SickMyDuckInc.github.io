(function($){
    $(document).ready(function(){
        var id = getUrlParameter("id");
        if(id!=undefined){
            var thisBank = $("[data-bankid='" + id + "']");
            thisBank.addClass("active");
            var drop = thisBank.data("dropdown");
            $("#" + drop).dropdown('toggle');
            $("#" + drop).dropdown('update');
            //$(".dropdown-toggle").dropdown("toggle");
        }
    });
})(jQuery);

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