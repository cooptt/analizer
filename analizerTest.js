

const Analizer = require("./analizer").Analizer;
const analizerHelperTest = require("./analizerHelperTest")
const UserTest = analizerHelperTest.UserTest;
const VideoGameTest = analizerHelperTest.VideoGameTest;
const OfferTest = analizerHelperTest.OfferTest; 


class AnalizerTest {

	basicTest(){
	    var analizer = new Analizer();
	    analizer.addUser();
	    analizer.addVideoGame("God of War", "god_of_war.jpg");
	    analizer.addSellOffer(0,0,17);
	    analizer.addBuyOffer(0,0,18);
	}

	testAddUsers() {
	    var analizer = new Analizer();
	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();
	    var result = true;
	    if( analizer._users.size() != 5 ){
	        result = false;
	        console.log("size differ, original: ",5, " , found: ", analizer._users.size() );
	    }
	    if(result===false)
	    	console.log("testAddUsers: ",result);
	}

	testOfferAddedToUsersLists() {
	    var analizer = new Analizer();
	    
	    analizer.addVideoGame("God of War", "god_of_war.jpg");
        analizer.addVideoGame("Halo", "halo.jpg");
        analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");
        analizer.addVideoGame("Crash Bandicoot", "crass_bandicoot.jpg");

	    analizer.addUser();
	    analizer.addBuyOffer(0,0,17);
	    analizer.addBuyOffer(0,1,18);
	    analizer.addBuyOffer(0,2,20);
	    analizer.addSellOffer(0,2,19);
	    analizer.addSellOffer(0,3,21);

	    var result = true;

	    if( analizer.getUser(0)._buyList.size !==3){
	        result = false;
	    }

	    if ( analizer.getUser(0)._sellList.size !==2 ){
	        result = false;
	    }

	    if(result===false)
	    	console.log("testOfferAddedToUsersLists: ",result);

	}

	testOfferAddedToBuyTrees () {
	    var analizer = new Analizer();
	    
	    analizer.addVideoGame("God of War", "god_of_war.jpg");
        analizer.addVideoGame("Halo", "halo.jpg");
        analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");
        analizer.addVideoGame("Crash Bandicoot", "crass_bandicoot.jpg");

	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();

	    analizer.addBuyOffer(0,0,300);
	    analizer.addBuyOffer(1,0,700);
	    analizer.addBuyOffer(2,0,500);
	    analizer.addBuyOffer(3,0,700);

	    analizer.addBuyOffer(0,1,200);
	    analizer.addBuyOffer(1,1,100);
	    analizer.addBuyOffer(2,1,100);
	   
	    var prices =[ [300,500,700], [100,200] ];
	    var sizes = [ [1,1,2], [2,1] ];

	    var result = true;

	    for(var i=0; i<analizer.getCatalogueSize(); i++ ){
	        var it = analizer.getVideoGame(i)._buyTree.iterator();
	        var node;
	        var mcount = 0;
	        while( (node=it.next()) !== null ){
	            if(node._price!=prices[i][mcount]){
	                result = false;
	                console.log("Prices differ, original:",prices[i][mcount],", found:",node._price);
	            }

	            if(node._offers.size !== sizes[i][mcount] ){
	                result = false;
	            }

	            mcount += 1;
	        }
	    }
	    if(result===false)
	    	console.log("testOfferAddedToBuyTrees : ", result);
	}

	testOfferAddedToSellTrees() {
	    var analizer = new Analizer();
	    
	    analizer.addVideoGame("God of War", "god_of_war.jpg");
        analizer.addVideoGame("Halo", "halo.jpg");
        analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");
        analizer.addVideoGame("Crash Bandicoot", "crass_bandicoot.jpg");

	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();
	    analizer.addUser();

	    analizer.addSellOffer(0,0,300);
	    analizer.addSellOffer(1,0,700);
	    analizer.addSellOffer(2,0,500);
	    analizer.addSellOffer(3,0,700);

	    analizer.addSellOffer(0,1,200);
	    analizer.addSellOffer(1,1,100);
	    analizer.addSellOffer(2,1,100);
	   
	    var prices =[ [700,500,300], [200,100] ];
	    var sizes = [ [2,1,1], [1,2] ];

	    var result = true;

	    for(var i=0; i<analizer.getCatalogueSize(); i++ ){
	        var it = analizer.getVideoGame(i)._sellTree.iterator();
	        var node;
	        var mcount = 0;
	        while( (node=it.next()) !== null ){
	            if(node._price!=prices[i][mcount]){
	                result = false;
	                console.log("Prices differ, original:",prices[i][mcount],", found:",node._price);
	            }

	            if(node._offers.size !== sizes[i][mcount] ){
	                result = false;
	            }

	            mcount += 1;
	        }
	    }

	    if(result===false)
	    	console.log("testOfferAddedToSellTrees : ", result);
	}

	testGetUserSellList() {
		var analizer = new Analizer();
		analizer.addVideoGame("God of War", "god_of_war.jpg");
	    analizer.addVideoGame("Halo", "halo.jpg");
	    analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");
		
		analizer.addUser();

		analizer.addSellOffer(0,0,300);
		analizer.addSellOffer(0,1,500);
		analizer.addSellOffer(0,2,400);
		var userSellList = analizer.getUserSellList(0);
		userSellList.sort( function(a,b){
			return a.offerId - b.offerId;
		});

		var originalUserSellList = [
			{
				offerId:0,
				title:"God of War",
				image:"god_of_war.jpg",
				price:300 },
			{
				offerId:1,
				title:"Halo",
				image:"halo.jpg",
				price:500 },
			{
				offerId:2,
				title:"Call of Duty",
				image:"call_of_duty.jpg",
				price:400 }
		]

		var result = true;

		if( JSON.stringify(originalUserSellList) !== JSON.stringify(userSellList) ){
			result = false;
			console.log("Sell List differ ");
			console.log("originalUserSelllList : ", originalUserSellList);
			console.log("found: ",userSellList);
		}

		if(result===false)
			console.log("testGetUserSellList :",result);
	}


	testGetUserBuyList() {
		var analizer = new Analizer();
		analizer.addVideoGame("God of War", "god_of_war.jpg");
	    analizer.addVideoGame("Halo", "halo.jpg");
	    analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");
		
		analizer.addUser();

		analizer.addBuyOffer(0,0,300);
		analizer.addBuyOffer(0,1,500);
		analizer.addBuyOffer(0,2,400);
		var userBuyList = analizer.getUserBuyList(0);
		userBuyList.sort( function(a,b){
			return a.offerId - b.offerId;
		});

		var originalUserBuyList = [
			{
				offerId:0,
				title:"God of War",
				image:"god_of_war.jpg",
				price:300 },
			{
				offerId:1,
				title:"Halo",
				image:"halo.jpg",
				price:500 },
			{
				offerId:2,
				title:"Call of Duty",
				image:"call_of_duty.jpg",
				price:400 }
		]

		var result = true;

		if( JSON.stringify(originalUserBuyList) !== JSON.stringify(userBuyList) ){
			result = false;
			console.log("Buy List differ ");
			console.log("originalUserBuylList : ", originalUserBuyList);
			console.log("found: ",userBuyList);
		}

		if(result===false)
			console.log("testGetUserBuyList :",result);
	}


	testGetUserSellListWithDeletes() {
		var analizer = new Analizer();
		analizer.addVideoGame("God of War", "god_of_war.jpg");
	    analizer.addVideoGame("Halo", "halo.jpg");
	    analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");
		
		analizer.addUser();

		analizer.addSellOffer(0,0,300);
		analizer.addSellOffer(0,1,500);
		analizer.addSellOffer(0,2,400);
		analizer.deleteOffer(2);
		analizer.deleteOffer(1);
		analizer.addSellOffer(0,1,500);
		analizer.addSellOffer(0,2,400);
		var userSellList = analizer.getUserSellList(0);
		userSellList.sort( function(a,b){
			return a.offerId - b.offerId;
		});

		var originalUserSellList = [
			{
				offerId:0,
				title:"God of War",
				image:"god_of_war.jpg",
				price:300 },
			{
				offerId:3,
				title:"Halo",
				image:"halo.jpg",
				price:500 },
			{
				offerId:4,
				title:"Call of Duty",
				image:"call_of_duty.jpg",
				price:400 } 
		]

		var result = true;

		if( JSON.stringify(originalUserSellList) !== JSON.stringify(userSellList) ){
			result = false;
			console.log("Sell List differ ");
			console.log("originalUserSelllList : ", originalUserSellList);
			console.log("found: ",userSellList);
		}

		if(result===false)
			console.log("testGetUserSellListWithDeletes :",result);
	}

	testGetUserBuyListWithDeletes() {
		var analizer = new Analizer();
		analizer.addVideoGame("God of War", "god_of_war.jpg");
	    analizer.addVideoGame("Halo", "halo.jpg");
	    analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");
		
		analizer.addUser();

		analizer.addBuyOffer(0,0,300);
		analizer.addBuyOffer(0,1,500);
		analizer.addBuyOffer(0,2,400);
		analizer.deleteOffer(2);
		analizer.deleteOffer(1);
		analizer.addBuyOffer(0,1,500);
		analizer.addBuyOffer(0,2,400);
		var userBuyList = analizer.getUserBuyList(0);
		userBuyList.sort( function(a,b){
			return a.offerId - b.offerId;
		});

		var originalUserBuyList = [
			{
				offerId:0,
				title:"God of War",
				image:"god_of_war.jpg",
				price:300 },
			{
				offerId:3,
				title:"Halo",
				image:"halo.jpg",
				price:500 },
			{
				offerId:4,
				title:"Call of Duty",
				image:"call_of_duty.jpg",
				price:400 } 
		]

		var result = true;

		if( JSON.stringify(originalUserBuyList) !== JSON.stringify(userBuyList) ){
			result = false;
			console.log("Buy List differ ");
			console.log("originalUserBuylList : ", originalUserBuyList);
			console.log("found: ",userBuyList);
		}

		if(result===false)
			console.log("testGetUserBuyListWithDeletes :",result);
	}

	testGetCatalogue(){
		var analizer = new Analizer();
		analizer.addVideoGame("God of War", "god_of_war.jpg");
	    analizer.addVideoGame("Halo", "halo.jpg");
	    analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");

	    let originalCatalogue = [ 
	    	{ title: 'God of War', image: 'god_of_war.jpg' },
			{ title: 'Halo', image: 'halo.jpg' },
			{ title: 'Call of Duty', image: 'call_of_duty.jpg' } ];


	    let catalogue = analizer.getCatalogue();
	    let result = true;

	    if( JSON.stringify(originalCatalogue)!== JSON.stringify(catalogue) ){
	    	result = false;
	    	console.log("catalogue differs, ");
	    	console.log("original :",originalCatalogue);
	    	console.log("found :",catalogue);
	    }

	    if(result===false){
	    	console.log("testGetCatalogue :",result);
	    }
	}


	testEmptinessAtBeginning(){
		let analizer = new Analizer();
		let result = true;

		if( analizer.getUsersSize()!==0 ){
			result = false;
		}

		if (analizer.getCatalogueSize() !==0 ){
			result = false;
		}

		if(analizer.getOffersSize() !==0 ){
			result = false;
		}

		if( result===false ){
			console.log("testEmptinessAtBeginning: ",result);
		}
	}

	testGetUserData(){
		let analizer = new Analizer();
		let result = true;

		analizer.addUser(/*loginServiceId*/ 17);

		let userData = analizer.getUserData(0);

		let original = {
			userId:0,
			loginServiceId:17
		}

		if( JSON.stringify(original) !== JSON.stringify(userData) ){
			result = false;
			console.log("userData differ ");
			console.log("original :", original);
			console.log("found : ", userData);
		}

		if(result===false){
			console.log("testGetUserId(): ", result);
		}
	}

	testLoadCatalogue(){
		
		let analizerResult = new Analizer();

		analizerResult.addVideoGame("animal crossing eds juego compra disponible","3DS/animal_crossing_eds_juego_compra_disponible.png");
		analizerResult.addVideoGame("fifa soccer 2016 u.e ps3 -","PS3/fifa_soccer_2016_u.e_ps3_-.png");
		analizerResult.addVideoGame("","PS4/.png");
		analizerResult.addVideoGame("crash bandicoot n. sane trilogy","SWITCH/crash_bandicoot_n._sane_trilogy.png");
		analizerResult.addVideoGame("angry birds trilogy -","WiiU/angry_birds_trilogy_-.png");
		analizerResult.addVideoGame("far cry","XBOX360/far_cry.png");
		analizerResult.addVideoGame("assassins creed odyssey gold edition","XBOXONE/assassins_creed_odyssey_gold_edition.png");

		analizerResult._catalogue.sort(function(a, b) {
  			return a.getTitle() > b.getTitle();
		});

		let analizerTest = new Analizer();

		analizerTest.loadCatalogueFromFolders("catalogue/");

		setTimeout(
			function() {

				if(analizerResult.getCatalogueSize() !== analizerTest.getCatalogueSize()){
					console.log("testLoadCatalogue : Different sizes", false);
					return;
				}

				analizerTest._catalogue.sort(function(a, b) {
  					return a.getTitle() > b.getTitle();
				});

				for(let i = 0; i < analizerResult.getCatalogueSize(); i++){
					let gameA = analizerResult._catalogue[i];
					let gameB = analizerTest._catalogue[i];

					if(gameA._title !== gameB._title || gameA._image !== gameB._image){
						console.log("testLoadCatalogue : Different games", false);
						return;
					}
				}

				console.log("testLoadCatalogue :", true);

			}, 1000);
	}

	runAllTests() {
		console.log("AnalizerTest started ...");
	    this.testAddUsers();
	    this.testOfferAddedToUsersLists();
	    this.testOfferAddedToBuyTrees();
	    this.testOfferAddedToSellTrees();
	    this.testGetUserSellList();
	    this.testGetUserBuyList();
	    this.testGetUserSellListWithDeletes();
	    this.testGetUserBuyListWithDeletes();
	    this.testGetCatalogue();
	    this.testEmptinessAtBeginning();
	    this.testGetUserData();		
	    this.testLoadCatalogue();	

	    setTimeout(function() {
    			console.log("AnalizerTest ended ...\n")
		}
	    , 2000);
	}


}

let startTest = function(){
	let userTest = new UserTest();
	let videoGameTest = new VideoGameTest();
	let analizerTest = new AnalizerTest();
	let offerTest = new OfferTest();

	userTest.runAllTests();
	videoGameTest.runAllTests();
	offerTest.runAllTests();
	analizerTest.runAllTests();
}


startTest();
