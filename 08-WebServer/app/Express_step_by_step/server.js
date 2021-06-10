var express = require("express"),
http = require("http"),
app = express();


// 2. Create our Express-powered HTTP server
http.createServer(app).listen(3000);

// 3. set up our routes
app.get("/hello", function (req, res) {
        res.send("Hello World!");
        });

app.get("/goodbye", function (req, res) {
        res.send("Goodbye World!");
        });

// 4. set up the root route
// possiamo settare la route di default...ma dobbiamo rimuovere il file index.html
// se vogliamo vedere questa stringa..PROVARE
app.get("/", function (req, res) {
        res.send("This is the root route!");
        });

//5. E' possibile aggiungere il comportamento quando il web server invia un'intera pagina html

app.get("/index_prova.html", function (req, res) {
        
        res.send("<html><head></head><body><h1>Hello World! INDEX PROVA</h1></body></html>");
        
        });

// 6. usiamo app.use per creare una directory per il nostro server per i file statici
app.use(express.static(__dirname + "/client"));
