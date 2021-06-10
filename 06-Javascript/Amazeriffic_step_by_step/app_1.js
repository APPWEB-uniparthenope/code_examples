var main = function () {
    
    "use strict";
    
    $(".tabs a:nth-child(1)").on("click", function () { // make all the tabs inactive
                                 $(".tabs span").removeClass("active");
                                 // make the first tab active
                                 $(".tabs a:nth-child(1) span").addClass("active"); // empty the main content so we can recreate it
                                 $("main .content").empty();
                                 // return false so we don't follow the link
                                 return false;
                        
    });
    $(".tabs a:nth-child(2)").on("click", function () {
                                 $(".tabs span").removeClass("active");
                                 $(".tabs a:nth-child(2) span").addClass("active");
                                 $("main .content").empty();
                                 return false;
                    
    });
    $(".tabs a:nth-child(3)").on("click", function () {
                                 $(".tabs span").removeClass("active");
                                 $(".tabs a:nth-child(3) span").addClass("active");
                                 $("main .content").empty();
                                 return false;
                                 
    });
};

$(document).ready(main);

// far vedere esempio di refactoring utilizzando una function

/*
var main = function () { "use strict";
    var makeTabActive = function (tabNumber) {
        // construct the selector from the tabNumber
        var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
        $(".tabs span").removeClass("active");
        $(tabSelector).addClass("active");
    };
    $(".tabs a:nth-child(1)").on("click", function () {
        makeTabActive(1);
        return false;
    });
    $(".tabs a:nth-child(2)").on("click", function () {
        makeTabActive(2);
        return false;
    });
    $(".tabs a:nth-child(3)").on("click", function () {
        makeTabActive(3);
        return false;
    });
 
};
*/

// far vedere esempio di refactoring utilizzando un loop

/*
var main = function () { "use strict";
    var tabNumber;
    for (tabNumber = 1; tabNumber <= 3; tabNumber++) {
 
        ///// ATTENZIONE la soluzione vista cosa non funziona
        // perchè .on è asincrono, quindi ho un effetto anomalo,
        //il ciclo for finisce prima dell'aggiunta dei listener..
        //soluzione, aggiungo una chiamata a funzione nel ciclo!!!
        var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
        $(tabSelector).on("click", function () {
                          $(".tabs span").removeClass("active");
                          $(tabSelector).addClass("active");
                          return false;
        });
    }
};

*/

// far vedere esempio di refactoring utilizzando forEach

// qui è necessario il metodo toArray() per convertire gli elementi del DOM in un oggetto iterabile
/*
var main = function () { "use strict";
    $(".tabs a span").toArray().forEach(function (element) {
            // create a click handler for this element
            $(element).on("click", function () {
                    $(".tabs a span").removeClass("active"); $(element).addClass("active");
                    $("main .content").empty();
                    return false;
            });
    });
};
*/
