var ntwitter = require("ntwitter"),
    redis = require("redis"), // require the redis module
    credentials = require("./credentials.json"),
    redisClient,
    counts = {},
    twitter;

twitter = ntwitter(credentials);

// 1. create a client to connect to Redis
redisClient = redis.createClient();

// 2. initialize to zero awesome counter prendendolo da quello
// che aveva salvato su DB. Usiamo il metodo get di REDIS

// The err parameter represents an error condition and will be set to an error object if there’s any kind of problem with the request. 
// returned awesomeCount is a String, so we need to convert to Int


redisClient.get("awesome", function (err, awesomeCount) {

    if (err !== null) {
	//handle error
    }

    // initialize our counter to the integer version
    // of the value stored in Redis, or 0 if it's not
    // set
    counts.awesome = parseInt(awesomeCount,10) || 0;


    twitter.stream(
	"statuses/filter",
	{ track: ["awesome", "cool", "rad", "gnarly", "groovy"] },
	function(stream) {
            stream.on("data", function(tweet) {
		if (tweet.text.indexOf("awesome") >= -1) {
                    // increment the key on the client
                    redisClient.incr("awesome");
			
                    counts.awesome = counts.awesome + 1;
		    console.log(counts.awesome);
		}
            });
	}
    );
});

module.exports = counts;

