//Abbiamo dichiarato 3 variabili, e importato il modulo twitter tramite il metodo ntwitter



var ntwitter = require('ntwitter'),
    credentials = require('./credentials.json'),
    twitter,
    counts = {};

// set up our twitter objects
twitter = ntwitter(credentials);

// initialize our counters
counts.awesome = 0;

//Il metodo stream permette di specificare 
//1. il tipo di stream (filtraggio), 
//2. il secondo parametro specifica le regole di filtraggio (vediamo l’occorrenza di una parola), 
//3. il terzo parmetro è una callback chiamata quando lo stream viene creato… ci mettiamo in ascolto 
//   sull’evento data (come facevamo per il click)…in questo caso, l’evento data è quando arrivano dati sullo stream!


twitter.stream(

    'statuses/filter',

    { track: ["awesome", "cool", "rad", "gnarly", "groovy"] },

    function(stream) {
        stream.on('data', function(tweet) {
            
	    
	    if (tweet.text.indexOf("awesome") > -1) {
                // increment the awesome counter
                counts.awesome = counts.awesome + 1;
            }
        });
    }
);

setInterval(function () {
    console.log("awesome: " + counts.awesome);
}, 3000);

module.exports = counts;
