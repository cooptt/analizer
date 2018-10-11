
const mysql = require('mysql');


class AnalizerPersistance {
    
    connect(host,user,password,database){
    	this._db = mysql.createConnection({
    		host:host,
    		user:user,
    		password:password,
    		database:database
    	});

    	this._db.connect( function(err) {
    		if (err){
    			throw err;
    		}

    		console.log("connected...");
    		console.log(this._db );
    	});



    }

    addUser(properties){

    }

    addVideoGame(properties){

    }

    addOffer(properties){

    }

    updateUser(properties){

    }

    updateOffer(properties){

    }

    deleteUser(userId){

    }

    deleteVideoGame(videoGameId){

    }

    deleteOffer(offerId){

    }


    // Returns All rows of User's table
    loadUsers(){

    }

    // Returns all rows of VideoGames's table
    loadCatalogue(){

    }

    // Returns all rows of Offers' table
    loadOffers(){

    }


}



exports.AnalizerPersistance = AnalizerPersistance;