class PrefixedLocalStorage{


	constructor(prefix){
		this.prefix = prefix;
		this.changed = false;
		this.all = new Map();
	}

	removeItem(key){
		this.changed = true;
		localStorage.removeItem(this.prefix + key);
	}

	setItem(key,value){
	    this.changed = true;
		localStorage.setItem(this.prefix + key, value);
	}

	getItem(key){
		localStorage.getItem(this.prefix + key);
	}

	getAll(){
		if(this.changed==true)setThisAll();
		return this.all();
	}

	setThisAll(){
		this.changed = false;
		this.all = new Map();
		for(var key in localStorage){
			if(!key.startsWith(prefix))continue;
			var k = key.slice(this.prefix.length);
			this.all.set(k, localStorage.getItem(key));	
			//todo finish this		
		}
	}
}