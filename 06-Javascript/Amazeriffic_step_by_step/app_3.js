var main = function () {
    "use strict";
    
    // 1. aggiungere il contenuto dei tab in una variabile array
    var toDos = [
                 "Finish writing this book",
                 "Take Gracie to the park",
                 "Answer emails",
                 "Prep for Monday's class",
                 "Make up some new ToDos",
                 "Get Groceries"
                 ];
    
    $(".tabs a span").toArray().forEach(function (element) {
            // create a click handler for this element
            $(element).on("click", function () {
                // since we're using the jQuery version of element,
                // we'll go ahead and create a temporary variable
                // so we don't need to keep recreating it
                var $content, $input, $button, i;
                var $element = $(element);
                $(".tabs a span").removeClass("active");
                $element.addClass("active");
                $("main .content").empty();
                          
                          
                if ($element.parent().is(":nth-child(1)")) {
                              console.log("FIRST TAB CLICKED!");
                          // 2. aggiungiamo il contenuto quando viene cliccato il 2° tab
                          // creiamo un elemento ul, aggiungiamo gli elementi li e
                          // aggiungiamo il tutto a main .content
                          $content = $("<ul>");
                          for (i = toDos.length-1; i >= 0; i--) {
                            $content.append($("<li>").text(toDos[i]));
                          }
                } else if ($element.parent().is(":nth-child(2)")) {
                          console.log("SECOND TAB CLICKED!");
                          // 3. aggiungiamo il contenuto quando viene cliccato il 2° tab
                          // creiamo un elemento ul, aggiungiamo gli elementi li e
                          // aggiungiamo il tutto a main .content
                          $content = $("<ul>");
                          toDos.forEach(function (todo) {
                                        $content.append($("<li>").text(todo));
                                        // Ricordate che append() auto chiude i tag
                                        //$content.append($("</li>"));
                          });
                          //$content.append($("</ul>"));
                          
                } else if ($element.parent().is(":nth-child(3)")) {
                              console.log("THIRD TAB CLICKED!");
                          
                          // 4. Aggiungiamo il bottone la text box etc.
                          
                          // input a new to-do
                          $input = $("<input>"),
                          $button = $("<button>").text("+");
                          
                          $button.on("click", function () {
                                     if ($input.val() !== "") {
                                        //aggiorniamo il TODO array
                                        toDos.push($input.val());
                                        $input.val("");
                                     }
                          });
                          
                          $content = $("<div>").append($input).append($button);
                          /* append() permette aggiunte multiple, quindi potremmo fare:
                            $content = $("<div>").append($input, $button); */
                }
                
                // aggiungere qui, in modo da essere comune a tutti i tab
                $("main .content").append($content);
                return false;
                        
            });
    });
    
    // 3. add fake click in modo da attivare il primo tab
    // possiamo quindi rimuovere nel file html il TODO list hardcoded
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);
