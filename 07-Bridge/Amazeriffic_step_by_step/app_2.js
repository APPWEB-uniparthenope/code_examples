

var main = function (toDoObjects) {
    "use strict";

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
             * 3. Creiamo una struttura intermedia tags che converta le nostre entry in todos.json
             * del tipo
             *
                {
                    "description" : "Get groceries",
                    "tags"  : [ "shopping", "chores" ]
                },
                ...
             in
             
                {
                    "name" : "shopping",
                    "todos"  : [ "Get groceries" ]
                },
             
                ...
             
             */
            } else if ($element.parent().is(":nth-child(3)")) {
                
                //var organizedByTag = organizeByTag(toDoObjects);
                
                // creo il nostro array di tag usando la funzione indexOf
                // tale funzione ritorna l'indice (partendo da 0) dell'oggetto (se esiste)
                // nell'array
                var tags = [];
                
                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                      
                      // così evito duplicati di tags
                      if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                      }
                    });
                });
                // proviamo a stamparlo
                console.log(tags);

                // in questo secondo step mappo i tag associandogli il nome e la lista
                // dei toDos.
                    
                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    // cerchiamo per tutti i todo a quale tag appartiene
                    // popolando l'array toDosWithTag
                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });
                    // terminato il loop di prima avremo per ogni tag, la lista dei
                    // todo
                    return { "name": tag, "toDos": toDosWithTag };
                });
                console.log(tagObjects);
            
                // fatto questo aggiungiamo gli elementi HTML
                
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

            // 4. Adesso dobbiamo aggiornare il bottone che ci aggiunge nuovi TODO
            // considerando che per ogni TODO è associato un TAG
            // Aggiungiamo una ulteriore input box con un paragrafo per la descrizione
            // e una input box per la lista dei tag (separati da ,).
            // Sfruttiamo il metodo .split per ottenere un array di tag.
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

                    // update toDos...attenzione questa variabile è globale!!!
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    $input.val("");
                    $tagInput.val("");
                });

                // creiamo un divisor che appenderemo al "main .content"
                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);

            // IMPORTANTE -> return false so we don't follow the link
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
