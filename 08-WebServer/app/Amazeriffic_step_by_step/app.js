var url = "http://192.168.100.247:3000";

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

            } else if ($element.parent().is(":nth-child(3)")) {
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
                        tags = $tagInput.val().split(","),
                        // create the new to-do item
                        newToDo = {"description":description, "tags":tags};
                                 
                    toDoObjects.push({"description":description, "tags":tags});

                    // here we'll do a quick post to our todos route
                    
                    $.post(url + "/todos", newToDo, function (response) {
                        console.log("We posted and the server responded!");
                        console.log(response);
                    });
                    
                   
                    // In alternativa a $.post possiamo ancora usare il metodo ajax
                    /*
                    $.ajax({
                        method: "POST",
                        dataType: "json",
                        url: url + "/todos",
                        data: newToDo,
                        success: function(response){
                
                            console.log("$.ajax method fot POST");
                            console.log("We posted and the server responded!");
                            console.log(response);
                    
                        }
                    });
                    */
                           
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
    
    
    $.getJSON(url + "/todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
    
    /* FARE VEDERE COME GESTIRE GLI ERRORI */
    /*
    $.getJSON("todos.json", function (toDoObjects) {
            
            //main(toDoObjects);
            alert("success");
            
            })
    //in vecchi script js potete trovare anche .success ma è deprecato!
    //già la callback viene eseguita in caso di successo
     //success si attiva solo se la chiamata AJAX ha esito positivo, ovvero alla fine restituisce uno stato HTTP 200.
     //fail si attiva se fallisce
     //complete quando la richiesta termina, indipendentemente dal successo.
    .success(function (toDoObjects){
           main(toDoObjects);
           })
    .complete(function() { alert("Done");
            })
    .fail(function (jqXHR, textStatus, error){
        
        console.log(jqXHR);
        console.log(textStatus);
        console.log(error);
        
        if (jqXHR.status === 404){
        
        alert("ERROR 404 NOT FOUND!");
        }
        
        });
     */
    // possiamo usare anche il metodo ajax....proviamo!!!

    /*
    $.ajax({
           method: "GET",
           dataType: "json",
           url: url + "/todos.json",
           
           success: function(toDoObjects){
           
                main(toDoObjects);
                console.log("$.ajax method fot GET");
                console.log(toDoObjects);
           }
    });
    */
                  
    

});
