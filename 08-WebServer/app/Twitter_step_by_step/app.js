var main = function () {
    "use strict";


    //1. Proviamo prima a chiamare solo getJSON
    
    $.getJSON("/counts.json", function (wordCounts){
    
    	console.log(wordCounts)
    
    });


    //2. Successivamente creiamo una funzione che aggiunga il testo
    // al paragrafo nell'index.html
    
    var insertCountsIntoDOM = function (counts) {
        $("p").text("awesome: " + counts.awesome);
    };
    
    setInterval(function () {
        $.getJSON("/counts.json", insertCountsIntoDOM);
    }, 5000);

    // the interval waits 5 seconds before it starts,
    // so we go ahead and do one just to get things
    // going
    $.getJSON("/counts.json", insertCountsIntoDOM);
    
};

$(document).ready(main);
