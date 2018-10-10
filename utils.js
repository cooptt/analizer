

class IdMap {

    constructor(){
        this._idcount = 0;
        this._map = new Map();
    }

    insert(item){
        this._map.set(this._idcount, item);
        this._idcount++;
        return this._idcount-1;
    }

    get(id){
        return this._map.get(id);
    }

    remove(id){
        var r = this._map.get(id);
        this._map.delete(id);
        return r;
    }

    nextId(){
        return this._idcount;
    }

    size(){
        return this._map.size;
    }
}

function compareSets(a,b){
	if(a.size!==b.size){
		return false;
	}

	ar = Array.from(a);

	for(var i=0;i<ar.length;i++){
		if(b.has(ar[i])===false){
			return false;
		}
	}

	return true;
} 

exports.IdMap = IdMap;
exports.compareSets = compareSets;