



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

exports.compareSets = compareSets;