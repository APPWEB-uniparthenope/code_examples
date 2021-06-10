var main = function () {
    "use strict";

    //4. se cambiamo dog in altro animale (e.g., cat, dolphin)
    // vedremmo altre immagini
    
    //5. creiamo un pulsante con una input box per fare lo show di img
    // a seconda del tag che inseriamo
    
    var $input, $button;
    var requestURL, requestURL_search;
    
    $input = $("<input>");
    $button = $("<button>SEARCH</button>");
    $("main").prepend($button).prepend($input);
    
    $button.on("click", function(){
               
               if ($input.val()!="")
                    console.log("text: " + $input.val());
                    requestURL_search = "http://api.flickr.com/services/feeds/photos_public.gne?tags="+ $input.val()+"&format=json&jsoncallback=?";
                    $input.val("");
               slide_show(requestURL_search);
    });
    
    /*
    var requestURL = "http://api.flickr.com/services/feeds/photos_public.gne?tags=dolphin&format=json&jsoncallback=?";

     */
    
    
    var data = "data.json"
    
    
    var slide_show = function(requestURL) {
        
        //6. dobbiamo aggiungere questo all'inizio
        $("main .photos").empty();
        
        $.getJSON(requestURL, function(flickrResponse) {
                  //$.getJSON(data, function(flickrResponse) {
                  
                  //console.log(data)
                  //1. Proviamo solo a stampare flickrResponse
                  //console.log(flickrResponse);
                  
                  //2. Proviamo solo a stampare l'elemento .media.m
                  flickrResponse.items.forEach(function (photo){
                                               console.log(photo);
                                               });
                  // 3. aggiungiamo il codice
                  
                  flickrResponse.items.forEach(function (item) {
                                               
                                               // create a new JQuery element to hold the image
                                               // but hide it so we can fade it in
                                               var $img = $("<img>").hide();
                                               
                                               // set the attribute to the url
                                               // contained in the response
                                               $img.attr("src", item.media.m);
                                               
                                               // attach the img tag to the main
                                               // photos element and then fade it in
                                               $("main .photos").append($img);
                                               $img.fadeIn();
                                               });
                  
                  });
        
        
    };
    
};

$(document).ready(main);
