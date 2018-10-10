
const analizerHelper = require("./analizerHelper");
const User = analizerHelper.User;
const utils = require("./utils");
const compareSets = utils.compareSets;



class UserTest {

	testAddSellOffers(){
		var user = new User(0);
		var offerIds = [5,2,7,5,9];
		for(var i=0;i<offerIds.length;i++){
			user.addSellOffer(offerIds[i]);
		}

		offerIds = new Set(offerIds);
		var sellList = new Set(user.getSellList() );

		var result = true;
		if(compareSets(offerIds,sellList)==false){
			result = false;
			console.log("Lists differ, original:",offerIds," , found:",sellList);
		}
		console.log("testAddSellOffers : ",result);
	}

	testAddBuyOffers(){
		var user = new User(0);
		var offerIds = [5,2,7,5,9];
		for(var i=0;i<offerIds.length;i++){
			user.addBuyOffer(offerIds[i]);
		}

		offerIds = new Set(offerIds);
		var buyList = new Set(user.getBuyList() );

		var result = true;
		if(compareSets(offerIds,buyList)==false){
			result = false;
			console.log("Lists differ, original:",offerIds," , found:",sellList);
		}
		console.log("testAddBuyOffers : ",result);
	}

	testAllTests(){
		this.testAddSellOffers();
		this.testAddBuyOffers();
	}
}


userTest = new UserTest();

userTest.testAllTests();