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

        var mapsDiv = $("#jqMaps");
        var checkboxDiv = $("#jqMapCheck");
        $.getJSON("js/sucursales.json", function(data){
            var numberOfMaps = data[id].number;
            console.log(numberOfMaps);
            var first = normalMap.replace("%SUCURSAL_NUMBER%", id);
            for(i = 1; i<=numberOfMaps; i++){
                var map = overlayMap.replace("%SUCURSAL_NUMBER%", id).replace(/%OVERLAY_INDEX%/g, i);
                mapsDiv.append(map);
                var check = checkBoxItem.replace("%GUARD_NAME%", data[id].names[i-1]).replace("%INDEX%", i);
                checkboxDiv.append(check);
            }
            mapsDiv.append(first);
        });

        $(document).on("change", ".mapCheck", function(){
            console.log("change");
            var target = $(this).data("target");
            if(this.checked){
                $("#" + target).show();
            }
            else{
                $("#" + target).hide();
            }
        })
    });
})(jQuery);

var normalMap='<img class="top-width" src="res/img/maps/%SUCURSAL_NUMBER%/map.png">';
var overlayMap = '<img class="top-width overlay" id="jqMap%OVERLAY_INDEX%" src="res/img/maps/%SUCURSAL_NUMBER%/map_overlay%OVERLAY_INDEX%.png">';

var checkBoxItem = '<div class="form-check">' +
'<input class="form-check-input mapCheck" type="checkbox" value="" id="defaultCheck1" checked data-target="jqMap%INDEX%">' +
'<label class="form-check-label" for="defaultCheck1">' +
'%GUARD_NAME%</label>' +
'</div>';

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