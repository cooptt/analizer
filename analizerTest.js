

var Analizer = require("./analizer").Analizer;


var basicTest = function(){
    var analizer = new Analizer();
    analizer.addUser();
    analizer.addVideoGame("God of War", "god_of_war.jpg");
    analizer.addSellOffer(0,0,17);
    analizer.addBuyOffer(0,0,18)
    //console.log(analizer.getUser(0))
    //console.log(analizer.getVideoGame(0)._sellTree.min());
    //console.log(analizer.getVideoGame(0)._buyTree.min());
}


var testAddUsers = function() {
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
    console.log("testAddUsers: ",result);
}


var testOfferAddedToUsersLists = function() {
    var analizer = new Analizer();
    analizer.loadCatalogue();
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

    console.log("testOfferAddedToUsersLists: ",result);

}



var testOfferAddedToBuyTrees = function(){
    var analizer = new Analizer();
    analizer.loadCatalogue();
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
    console.log("testOfferAddedToBuyTrees : ", result);
}

var testOfferAddedToSellTrees = function(){
    var analizer = new Analizer();
    analizer.loadCatalogue();
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
    console.log("testOfferAddedToSellTrees : ", result);
}





var testGetUserSellList = function(){
	var analizer = new Analizer();
	analizer.addVideoGame("God of War", "god_of_war.jpg");
    analizer.addVideoGame("Halo", "halo.jpg");
    //analizer.addVideoGame("Call of Duty", "call_of_duty.jpg");
	
	analizer.addUser();

	analizer.addSellOffer(0,0,300);
	analizer.addSellOffer(0,1,500);
	var userSellList = analizer.getUserSellList(0);

	var originaUserSellList = [
		{
			offerId:0,
			title:"God of War",
			image:"god_of_war.jpg",
			price:300 },
		{
			offerId:1,
			title:"Halo",
			image:"halo.jpg",
			price:500 }
	]

	var result = true;

	if( originaUserSellList !== userSellList ){
		result = false;
		console.log("Sell List differ ");
		console.log("originaUserSellList : ", originaUserSellList);
		console.log("found: ",userSellList);
	}

	console.log("testGetUserSellList :",result);
}



var runAllTests = function(){
	//basicTest();
    testAddUsers();
    testOfferAddedToUsersLists();
    testOfferAddedToBuyTrees();
    testOfferAddedToSellTrees();
    testGetUserSellList();
}




runAllTests();


