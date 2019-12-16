$(function () {
    "use strict";
    Morris.Area({
        element: 'synthese-marge-chart'
        , data: [{
            period: '2018-01'
            , marge: 2837
            , va: 80
        }, {
            period: '2018-02'
            , marge: 2887
            , va: 100
        }, {
            period: '2018-03'
            , marge: 3219
            , va: 100
        }, {
            period: '2018-04'
            , marge: 3919
            , va: 100
        }, {
            period: '2018-05'
            , marge: 4218
            , va: 100
        }, {
            period: '2018-06'
            , marge: 3989
            , va: 100
        }, {
            period: '2018-07'
            , marge: 5430
            , va: 100
        }, {
            period: '2018-08'
            , marge: 6319
            , va: 100
        }, {
            period: '2018-09'
            , marge: 6508
            , va: 100
        },{
            period: '2018-10'
            , marge: 7120
            , va: 100
        },{
            period: '2018-11'
            , marge: 7328
            , va: 100
        },{
            period: '2018-12'
            , marge: 7472
            , va: 100
        },{
            period: '2019-01'
            , marge: 6598
            , va: 10
        },{
            period: '2019-02'
            , marge: 6129
            , va: 100
        },{
            period: '2019-03'
            , marge: 7239
            , va: 100
        },{
            period: '2019-04'
            , marge: 7692
            , va: 100
        },{
            period: '2019-05'
            , marge: 8727
            , va: 100
        }]
        , xkey: 'period'
        , ykeys: ['marge', 'va']
        , labels: ['Marge', 'VA']
        , pointSize: 3
        , fillOpacity: 0
        , pointStrokeColors: ['#00bfc7', '#fb9678']
        , behaveLikeLine: true
        , gridLineColor: '#e0e0e0'
        , lineWidth: 3
        , hideHover: 'auto'
        , lineColors: ['#00bfc7', '#fb9678']
        , resize: true
    });
    
    var sparklineLogin = function () {
        $('#sales1').sparkline([20, 40, 30], {
            type: 'pie'
            , height: '130'
            , resize: true
            , sliceColors: ['#808f8f', '#fecd36', '#f1f2f7']
        });
        $('#sales2').sparkline([6, 10, 9, 11, 9, 10, 12], {
            type: 'bar'
            , height: '154'
            , barWidth: '4'
            , resize: true
            , barSpacing: '10'
            , barColor: '#25a6f7'
        });
        $('#synthese-top-marge').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
            type: 'bar'
            , chartRangeMin: 2500
            , height: '50'
            , barWidth: '5'
            , resize: true
            , barSpacing: '3'
            , barColor: '#4caf50'
        });
        $('#sparklinedash2').sparkline([0, 5, 6, 10, 9, 12, 4, 9, 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar'
            , height: '50'
            , barWidth: '5'
            , resize: true
            , barSpacing: '3'
            , barColor: '#9675ce'
        });
        $('#sparklinedash3').sparkline([0, 5, 6, 10, 9, 12, 4, 9, 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar'
            , height: '30'
            , barWidth: '5'
            , resize: true
            , barSpacing: '3'
            , barColor: '#03a9f3'
        });
        $('#sparklinedash4').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar'
            , height: '30'
            , barWidth: '4'
            , resize: true
            , barSpacing: '5'
            , barColor: '#f96262'
        });


        $('#prescripteurs-top-nb').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '9'
         , resize: true
         , barSpacing: '3'
         , barColor: '#4caf50'
     });
        $('#prescripteurs-devis-mb').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '9'
         , resize: true
         , barSpacing: '3'
         , barColor: '#9675ce'
     });        
        $('#prescripteur-devis-attente').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '9'
         , resize: true
         , barSpacing: '3'
         , barColor: '#03a9f3'
     });





        $('#nouveau_devis').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '5'
         , resize: true
         , barSpacing: '3'
         , barColor: '#4caf50'
     });
        $('#devis_valide').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '5'
         , resize: true
         , barSpacing: '3'
         , barColor: '#9675ce'
     });        
        $('#devis_en_attente').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '5'
         , resize: true
         , barSpacing: '3'
         , barColor: '#03a9f3'
     });

        $('#Devis_refuse').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '5'
         , resize: true
         , barSpacing: '3'
         , barColor: '#4caf50'
     });




        $('#staffe').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '9'
         , resize: true
         , barSpacing: '3'
         , barColor: '#4caf50'
     });        
        $('#defaut_paiement').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '9'
         , resize: true
         , barSpacing: '3'
         , barColor: '#9675ce'
     });

        $('#frais_de_gestion').sparkline([2930, 3203, 3329, 3782, 3228, 3739, 4228, 3828, 3029, 2782, 3228, 4239], {
         type: 'bar'
         , chartRangeMin: 0
         , height: '50'
         , barWidth: '9'
         , resize: true
         , barSpacing: '3'
         , barColor: '#03a9f3'
     });





        $("#sparkline8").sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
            type: 'line'
            , width: '100%'
            , height: '50'
            , lineColor: '#99d683'
            , fillColor: '#99d683'
            , maxSpotColor: '#99d683'
            , highlightLineColor: 'rgba(0, 0, 0, 0.2)'
            , highlightSpotColor: '#99d683'
        });
        $("#sparkline9").sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
            type: 'line'
            , width: '100%'
            , height: '50'
            , lineColor: '#13dafe'
            , fillColor: '#13dafe'
            , minSpotColor: '#13dafe'
            , maxSpotColor: '#13dafe'
            , highlightLineColor: 'rgba(0, 0, 0, 0.2)'
            , highlightSpotColor: '#13dafe'
        });
        $("#sparkline10").sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
            type: 'line'
            , width: '100%'
            , height: '50'
            , lineColor: '#ffdb4a'
            , fillColor: '#ffdb4a'
            , maxSpotColor: '#ffdb4a'
            , highlightLineColor: 'rgba(0, 0, 0, 0.2)'
            , highlightSpotColor: '#ffdb4a'
        });



    }
    var sparkResize;
    $(window).resize(function (e) {
        clearTimeout(sparkResize);
        sparkResize = setTimeout(sparklineLogin, 500);
    });
    sparklineLogin();
});

// Sky Icons
var icons = new Skycons({
    "color": "#ff6849"
})
, list = [
"clear-day", "clear-night", "partly-cloudy-day"
, "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind"
, "fog"
]
, i;
for (i = list.length; i--;) {
    var weatherType = list[i]
    , elements = document.getElementsByClassName(weatherType);
    for (e = elements.length; e--;) {
        icons.set(elements[e], weatherType);
    }
}
icons.play();

