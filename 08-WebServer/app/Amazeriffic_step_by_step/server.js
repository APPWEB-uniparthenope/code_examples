var express = require("express"),
    http = require("http"),
    app = express(),
    toDos = [
        { 
            "description" : "Get groceries",
            "tags"  : [ "shopping", "chores" ]
        },
        { 
            "description" : "Make up some new ToDos",
            "tags"  : [ "writing", "work" ]
        },
        {
            "description" : "Prep for Monday's class",
            "tags"  : [ "work", "teaching" ]
        },
        { 
            "description" : "Answer emails",
            "tags"  : [ "work" ]
        },
        { 
            "description" : "Take Gracie to the park",
            "tags"  : [ "chores", "pets" ]
        },
        { 
            "description" : "Finish writing this book",
            "tags"  : [ "writing", "work" ]
        }
    ]
        
//app.use(express.static(__dirname + "/client"));

//// Add headers
app.use(function (req, res, next) {

     console.log("Enable Access-Control-Allow-Origin...");

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// tell Express to parse incoming
// JSON objects
app.use(express.urlencoded());

http.createServer(app).listen(3000);

// This route takes the place of our
// todos.json file in our example from
// Chapter 5
app.get("/todos.json", function (req, res) {
    console.log("GET on route todos.json...");
    console.log("Request req.method: " + req.method);
    console.log("Request req.hostname: " + req.hostname);
    res.json(toDos);
});

app.post("/todos", function (req, res) {
    // the object is now stored in req.body
    console.log("POST on route todos...");
    console.log("Request req.method: " + req.method);
    console.log("Request req.hostname: " + req.hostname);

    var newToDo = req.body;

    console.log(newToDo);

    toDos.push(newToDo);

    // send back a simple object
    res.json({"message":"You posted to the server!"});
});
