// 1. toDoObjects contiene la struttura dei todo tramite il JSON

var main = function (toDoObjects) {
    "use strict";

    /*
     * 2. In base ai dati in toDoObjects (todos.json) dobbiamo rimappare
     * il nostro array di stringhe, in array di oggetti con la descrizione.
     */
    var toDos = toDoObjects.map(function (toDo) {
          // we'll just return the description
          // of this toDoObject
          return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });

            /*
             * 3. Dobbiamo aggiungere il tab che specifica il TAG
             * Specifichiamo il comportamento che ho quando clicco sul 3° tab
             * In questo caso dobbiamo mostrare tutti i todo appartenenti
             * al tag specifico mostrato come se fosse un header della tabella
             */
            } else if ($element.parent().is(":nth-child(3)")) {
                
                // l'obiettivo finale è iterare su questa struttura
                // prendere il campo name che è il nostro tag, metterlo come h3
                // e poi iterare sul campo toDos per fillare la nostra lista <ul>
                // infine aggiornare la nostra sezione "main .content"
                /*
                var organizedByTag = [ {
                                          "name": "shopping",
                                          "toDos": ["Get groceries"]
                                          },
                                          {
                                          "name": "chores",
                                          "toDos": ["Get groceries", "Take Gracie to the park"]
                                          },
                                          // etc,
                ];
                */
                    
                // il nostro array di tag
                var tags = [];

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });
                console.log(tags);

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });

                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });

            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: "),
                    $button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(",");
                                 
                    toDoObjects.push({"description":description, "tags":tags});

                    // update toDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    $input.val("");
                    $tagInput.val("");
                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    // 1. passiamo il JSON tramite la variabile toDoObjects
    // al nostro main
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
