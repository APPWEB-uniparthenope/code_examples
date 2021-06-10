var main = function () { "use strict";
    $(".tabs a span").toArray().forEach(function (element) {
            // create a click handler for this element
            $(element).on("click", function () {
                // since we're using the jQuery version of element,
                // we'll go ahead and create a temporary variable
                // so we don't need to keep recreating it
                var $element = $(element);
                $(".tabs a span").removeClass("active");
                $element.addClass("active");
                $("main .content").empty();
                if ($element.parent().is(":nth-child(1)")) {
                              console.log("FIRST TAB CLICKED!");
                } else if ($element.parent().is(":nth-child(2)")) {
                              console.log("SECOND TAB CLICKED!");
                } else if ($element.parent().is(":nth-child(3)")) {
                              console.log("THIRD TAB CLICKED!");
                }
                return false;
                        
            });
    });
};

$(document).ready(main);
