"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PrefixedLocalStorage =
/*#__PURE__*/
function () {
  function PrefixedLocalStorage(prefix) {
    _classCallCheck(this, PrefixedLocalStorage);

    this.prefix = prefix;
    this.changed = false;
    this.all = new Map();
    this.keys = [];
    this.setThisAll();
  }

  _createClass(PrefixedLocalStorage, [{
    key: "removeItem",
    value: function removeItem(key) {
      this.changed = true;
      return localStorage.removeItem(this.prefix + key);
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this.changed = true;
      return localStorage.setItem(this.prefix + key, value);
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      if (this.changed == true) this.setThisAll();
      return localStorage.getItem(this.prefix + key);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      if (this.changed == true) this.setThisAll();
      return this.all;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.changed = true;

      for (var key in localStorage) {
        if (!key.startsWith(this.prefix)) continue;
        localStorage.removeItem(key);
      }
    }
  }, {
    key: "key",
    value: function key(id) {
      if (this.changed == true) this.setThisAll();
      return this.keys[id];
    }
  }, {
    key: "getKeys",
    value: function getKeys() {
      if (this.changed == true) this.setThisAll();
      return this.keys;
    }
  }, {
    key: "setThisAll",
    value: function setThisAll() {
      this.changed = false;
      this.all = new Map();
      this.keys = [];

      for (var key in localStorage) {
        if (!key.startsWith(this.prefix)) continue;
        var k = key.slice(this.prefix.length);
        this.all.set(k, localStorage.getItem(key));
        this.keys.push(k);
      }

      return this.all;
    }
  }, {
    key: "length",
    get: function get() {
      if (this.changed == true) this.setThisAll();
      return this.all.size;
    }
  }]);

  return PrefixedLocalStorage;
}();