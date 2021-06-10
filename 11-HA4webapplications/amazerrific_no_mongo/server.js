var express = require("express"),
	http = require("http"),
	app = express();

//var toDos = require("./todos.json")
//
var toDos = [
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
		];


http.createServer(app).listen(8888);

console.log("server avviato su porto 8888...");

app.use(express.static(__dirname + "/client"));


// ROTTA /todos.json


app.get("/todos.json", function(req, res){

	console.log("Request method " + req.method);
	console.log("Request hostname " + req.hostname);
	res.json(toDos);

});

app.use(express.urlencoded());

app.post("/todos", function(req, res){

	
	var newToDo = req.body;

	toDos.push(newToDo);

	res.json({"messaggio": "POSTATO"});

});




