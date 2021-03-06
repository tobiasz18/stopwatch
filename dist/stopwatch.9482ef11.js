// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"g51H":[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        this.elem = this.display(); //main parent (container)
        this.times = this.time();
        this.flag = true;
        this.createElements();
        this.handleElements();
        this.counter();
    }

    _createClass(Stopwatch, [{
        key: 'start',
        value: function start() {
            var _this = this;

            if (this.flag) {
                this.myTimer = setInterval(function () {
                    _this.times.miliseconds++;
                    _this.calculate();
                    _this.counter();
                    _this.flag = false;
                    _this.spitt = true;
                }, 10);
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.flag = true;
            clearInterval(this.myTimer);
        }
    }, {
        key: 'split',
        value: function split() {
            if (!this.flag) {
                var li = document.createElement('li');
                this.elem.childNodes[6].appendChild(li);
                li.innerHTML = '' + this.show;
            }
        }
    }, {
        key: 'clearSplit',
        value: function clearSplit() {
            var li_Elem = this.elem.childNodes[6].children.length;
            if (li_Elem != 0) {
                var i = li_Elem;
                while (i) {
                    i--;
                    this.elem.childNodes[6].children[i].remove();
                }
            }
            this.flag = true;
        }
    }, {
        key: 'clearAll',
        value: function clearAll() {
            this.times.minutes = 0;
            this.times.seconds = 0;
            this.times.miliseconds = 0;
            this.counter();
            this.clearSplit();
            clearInterval(this.myTimer);
            this.flag = true;
            this.spitt = false;
        }
    }, {
        key: 'counter',
        value: function counter() {
            this.show = this.elem.childNodes[0].innerHTML = '\n            ' + this.addZero(this.times.minutes) + ':' + this.addZero(this.times.seconds) + ':' + this.addZero(this.times.miliseconds);
        }
    }, {
        key: 'time',
        value: function time() {
            var time = {
                miliseconds: 0,
                seconds: 0,
                minutes: 0
            };
            return time;
        }
    }, {
        key: 'handleElements',
        value: function handleElements() {
            var _this2 = this;

            this.elem.childNodes[1].onclick = function () {
                _this2.start();
            };
            this.elem.childNodes[2].onclick = function () {
                _this2.stop();
            };
            this.elem.childNodes[3].onclick = function () {
                _this2.split();
            };
            this.elem.childNodes[4].onclick = function () {
                _this2.clearSplit();
            };
            this.elem.childNodes[5].onclick = function () {
                _this2.clearAll();
            };
            //NodeList = console.log(this.elem.childNodes)
        }
    }, {
        key: 'addZero',
        value: function addZero(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            if (this.times.miliseconds >= 100) {
                this.times.seconds++;
                this.times.miliseconds = 0;
            } else if (this.times.seconds >= 60) {
                this.times.minutes++;
                this.times.seconds = 0;
            }
        }
    }, {
        key: 'createElements',
        value: function createElements() {
            //we will refer to elements by nodes e.g this.elem.children[0] //this.elem.childNodes[length]
            var buttonStart = document.createElement('button');
            var buttonStop = document.createElement('button');
            var buttonSplit = document.createElement('button');
            var buttonClear = document.createElement('button');
            var buttonClearSplit = document.createElement('button');
            var span = document.createElement('span');
            var ol = document.createElement('ol');
            buttonStart.textContent = 'Start';
            buttonStop.textContent = 'Stop';
            buttonSplit.textContent = 'Split';
            buttonClear.textContent = 'Clear All';
            buttonClearSplit.textContent = 'Clear Split';
            buttonStart.setAttribute('id', 'btn_start');
            buttonStop.setAttribute('id', 'btn_stop');
            buttonSplit.setAttribute('id', 'btn_lop');
            buttonClear.setAttribute('id', 'btn_clear');
            buttonClearSplit.setAttribute('id', 'btn_clearLop');
            buttonStart.setAttribute('class', 'btn start');
            buttonStop.setAttribute('class', 'btn stop');
            buttonSplit.setAttribute('class', 'btn lop');
            buttonClear.setAttribute('class', 'btn clear');
            buttonClearSplit.setAttribute('class', 'btn clearLop');
            span.setAttribute('class', 'timer');
            this.elem.appendChild(span);
            this.elem.appendChild(buttonStart);
            this.elem.appendChild(buttonStop);
            this.elem.appendChild(buttonSplit);
            this.elem.appendChild(buttonClearSplit);
            this.elem.appendChild(buttonClear);
            this.elem.appendChild(ol);
        }
    }, {
        key: 'display',
        value: function display() {
            var container = document.createElement('div');
            container.setAttribute('id', 'container_id');
            container.setAttribute('class', 'container_class');

            return container;
        }
    }]);

    return Stopwatch;
}();

var stopwatch = new Stopwatch();
document.body.appendChild(stopwatch.elem);
},{}]},{},["g51H"], null)
//# sourceMappingURL=stopwatch.9482ef11.map