/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["observables-rjs"] = factory();
	else
		root["observables-rjs"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(typeof globalThis !== \"undefined\" ? globalThis : typeof self !== \"undefined\" ? self : this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n\n  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, \"get\"); return _classApplyDescriptorGet(receiver, descriptor); }\n\n  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }\n\n  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError(\"attempted to get private field on non-instance\"); } return fn; }\n\n  function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }\n\n  function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError(\"Private static access of wrong provenance\"); } }\n\n  function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, \"set\"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }\n\n  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError(\"attempted to \" + action + \" private field on non-instance\"); } return privateMap.get(receiver); }\n\n  function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError(\"attempted to set read only private field\"); } descriptor.value = value; } }\n\n  var _observable = new WeakMap();\n\n  var _createSubscription = new WeakSet();\n\n  var _wrapObserver = new WeakSet();\n\n  class Observable {\n    /**\n     *\n     * @param observable\n     */\n    constructor(observable) {\n      _wrapObserver.add(this);\n\n      _createSubscription.add(this);\n\n      _observable.set(this, {\n        writable: true,\n        value: void 0\n      });\n\n      _classPrivateFieldSet(this, _observable, observable || (() => {}));\n    }\n    /**\n     *\n     * @param object\n     * @returns {(function())|*}\n     */\n\n\n    /**\n     *\n     * @param observer\n     * @returns {{unsubscribe: (function(): boolean)}}\n     */\n    subscribe(...observer) {\n      const {\n        wrappedObserver,\n        unsubscribe\n      } = _classPrivateMethodGet(this, _wrapObserver, _wrapObserver2).call(this, observer);\n\n      try {\n        _classPrivateFieldGet(this, _observable).call(null, wrappedObserver);\n      } catch (exception) {\n        wrappedObserver.error.call(null, exception);\n      }\n\n      return {\n        unsubscribe\n      };\n    }\n\n  }\n\n  _exports.default = Observable;\n\n  function _getIfFnEmptyFnOtherwise(object) {\n    if (typeof object === 'function') {\n      return object;\n    }\n\n    return () => {};\n  }\n\n  function _parseObserver(observer) {\n    if (observer.length === 1 && typeof observer[0] !== 'function') {\n      return {\n        next: _classStaticPrivateMethodGet(Observable, Observable, _getIfFnEmptyFnOtherwise).call(Observable, observer[0].next),\n        complete: _classStaticPrivateMethodGet(Observable, Observable, _getIfFnEmptyFnOtherwise).call(Observable, observer[0].complete),\n        error: _classStaticPrivateMethodGet(Observable, Observable, _getIfFnEmptyFnOtherwise).call(Observable, observer[0].error)\n      };\n    }\n\n    if (!Array.isArray(observer)) {\n      observer = [];\n    }\n\n    const [next, complete, error] = [0, 1, 2].map(hookIndex => _classStaticPrivateMethodGet(Observable, Observable, _getIfFnEmptyFnOtherwise).call(Observable, observer[hookIndex]));\n    return {\n      next,\n      complete,\n      error\n    };\n  }\n\n  function _createSubscription2(observer) {\n    let subscription;\n    let subscribed = true;\n\n    const unsubscribe = () => {\n      subscribed = false;\n      subscription = null;\n    };\n\n    subscription = {\n      unsubscribe,\n      wrappedObserver: {\n        next: (...args) => subscribed && observer.next.call(null, ...args),\n        complete: (...args) => {\n          if (subscribed) {\n            subscribed = false;\n            observer.complete.call(null, ...args);\n          }\n        },\n        error: (...args) => {\n          if (subscribed) {\n            subscribed = false;\n            observer.error.call(null, ...args);\n          }\n        }\n      }\n    };\n    return subscription;\n  }\n\n  function _wrapObserver2(observer) {\n    observer = _classStaticPrivateMethodGet(Observable, Observable, _parseObserver).call(Observable, observer);\n    return _classPrivateMethodGet(this, _createSubscription, _createSubscription2).call(this, observer);\n  }\n});\n\n//# sourceURL=webpack://observables-rjs/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});