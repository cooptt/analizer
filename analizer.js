

const analizerHelper = require("./analizerHelper");
const utils = require("./utils");
const User = analizerHelper.User;
const TreeNode = analizerHelper.TreeNode;
const VideoGame = analizerHelper.VideoGame;
const Offer = analizerHelper.Offer;
const IdMap = utils.IdMap;

class Analizer {

    constructor(){ 
        this._BUY = 0;
        this._SELL = 1;
        this._catalogue = new IdMap();
        this._users = new IdMap();
        this._offers = new IdMap();
        this._loginServiceMap = new Map();
    }

    // PUBLIC FUNCTIONS

    // Get data functions

    getUserIdFromLoginServiceId(loginServiceId){
        return this._loginServiceMap.get(loginServiceId);
    }

    getUsersSize(){
        return this._users.size();
    }

    getOffersSize(){
        return this._offers.size();
    }

    getCatalogueSize(){
        return this._catalogue.size();
    }

    getUserData(userId){
        let user = this.getUser(userId);
        return {
            userId:user.getUserId(),
            loginServiceId:user.getLoginServiceId()
        }
    }

    getCatalogue() {
        let catalogue = [];
        for(let i=0;i<this.getCatalogueSize();i++){
            let videoGame = this.getVideoGame(i);
            catalogue.push({
                title:videoGame.getTitle(),
                image:videoGame.getImage()
            });
        }
        return catalogue;
    }

    getUserSellList(userId){
        var user = this.getUser(userId);
        var sellList = user.getSellList();
        return this._createUserOffersList(sellList);
    }

    getUserBuyList(userId){
        var user = this.getUser(userId);
        var buyList = user.getBuyList();
        return this._createUserOffersList(buyList);
    }



    // Add, Update, Delete functions

    addUser(loginServiceId) {
        this._loginServiceMap.set(loginServiceId, this._users.nextId() );
        this._users.insert( new User(this._users.nextId(), loginServiceId ) );
    }

    addSellOffer(userId, videoGameId, price) {
        var offerId = this._offers.insert( new Offer(this._offers.nextId(), userId, videoGameId, price, this._SELL) );
        this.getUser(userId).addSellOffer(offerId);
        this.getVideoGame(videoGameId).addSellOffer(offerId, price);
    }

    addBuyOffer(userId, videoGameId, price) {
        var offerId = this._offers.insert( new Offer(this._offers.nextId(), userId, videoGameId, price, this._BUY) );
        this.getUser(userId).addBuyOffer(offerId);
        this.getVideoGame(videoGameId).addBuyOffer(offerId, price);
    }

    updateUser(userId, properties){

    }

    updateOffer(offerId, properties){

    }

    deleteUser() {

    }

    deleteOffer(offerId) {
        var offer = this.getOffer(offerId);
        this.getUser(offer.getUserId()).deleteOffer(offerId);
        this.getVideoGame(offer.getVideoGameId()).deleteOffer(offerId, offer.getType(), offer.getPrice() );
    }

    

    




    // PRIVATE FUNCTIONS


    getOffer(offerId){
        return this._offers.get(offerId);
    }


    getUser(userId) {
        return this._users.get(userId);
    }
    
    getVideoGame(videoGameId) {
        return this._catalogue.get(videoGameId);
    }

    addVideoGame(title, image){
        this._catalogue.insert(new VideoGame(this._catalogue.nextId(), title, image) );
    }


    _createUserOffersList(offerIdList){
        var userOffersList = [];
        for(var i=0;i<offerIdList.length;i++){
            var offer = this.getOffer(offerIdList[i]);
            var videoGame = this.getVideoGame(offer.getVideoGameId());
            userOffersList.push({
                offerId : offer.getOfferId(),
                title : videoGame.getTitle(),
                image : videoGame.getImage(),
                price : offer.getPrice(),
            });
        }
        return userOffersList;
    }

    loadCatalogueFromFolders(cataloguePath) {
        const fs = require('fs');

        fs.readdir(cataloguePath, (err, consoleFolders) => {
            consoleFolders.forEach(consoleFolder => {

                let consolePath = cataloguePath + '/' + consoleFolder;

                fs.readdir(consolePath, (err, imagesNames) => {
                    imagesNames.forEach(imageName => {
                       

                        let videoGamePath = consoleFolder + '/' + imageName;

                        let videoGameName = imageName.replace(/_/g, ' ').slice(0, imageName.length - 4);

                        this.addVideoGame(videoGameName, videoGamePath);
                    });
                })

            });
        });

        return;
    }

 
}



class AnalizerPersitance {
    

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


}


exports.Analizer = Analizer;
