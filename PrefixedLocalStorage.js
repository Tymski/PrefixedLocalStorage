class PrefixedLocalStorage {
    constructor(prefix) {
        this.prefix = prefix;
        this.changed = false;
        this.all = new Map();
        this.setThisAll();
    }

    removeItem(key) {
        this.changed = true;
        return localStorage.removeItem(this.prefix + key);
    }

    setItem(key, value) {
        this.changed = true;
        return localStorage.setItem(this.prefix + key, value);
    }

    getItem(key) {
        return localStorage.getItem(this.prefix + key);
    }

    getAll() {
        if (this.changed == true) this.setThisAll();
        return this.all;
    }

    clear(){
        this.changed = true;
        for (var key in localStorage) {
            if (!key.startsWith(this.prefix)) continue;
            localStorage.removeItem(key);
		}
    }

    get length(){
        if (this.changed == true) this.setThisAll();
        return this.all.size;
    }

    setThisAll() {
        this.changed = false;
        this.all = new Map();
        for (var key in localStorage) {
            if (!key.startsWith(this.prefix)) continue;
            var k = key.slice(this.prefix.length);
            this.all.set(k, localStorage.getItem(key));
		}
        return this.all;
    }
}