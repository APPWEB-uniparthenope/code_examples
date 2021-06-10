//Abbiamo dichiarato 3 variabili, e importato il modulo twitter tramite il metodo ntwitter



var ntwitter = require('ntwitter'),
    credentials = require('./credentials.json'),
    twitter,
    counts = {};

// set up our twitter objects
twitter = ntwitter(credentials);

// initialize our counters
counts.awesome = 0;
counts.cool = 0;
counts.rad  = 0;
counts.gnarly = 0;
counts.groovy = 0;

twitter.stream(

    'statuses/filter',

    { track: ["awesome", "cool", "rad", "gnarly", "groovy"] },

    function(stream) {
        stream.on('data', function(tweet) {
	    
   	    //console.log(tweet.text);
            
	    //2. incrementa il counter per awesome 
	    if (tweet.text.indexOf("awesome") > -1) {
                // increment the awesome counter
                counts.awesome = counts.awesome + 1;
            }
        });
    }
);

//4. stampiamo periodicamente il contenuto del counter awesome
setInterval(function () {
    console.log("awesome: " + counts.awesome);
}, 3000);

//3. Convertiamo il nostro tweet counter in un modulo!!! L'alternativa
//sarebbe creare un web server all'interno del tweet counter

module.exports = counts;
