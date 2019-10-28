/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"common":"common"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./index.js","vendor~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _src_Main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/Main */ \"./src/Main.jsx\");\n/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./redux/store */ \"./redux/store.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_redux_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux-toastr */ \"./node_modules/react-redux-toastr/lib/index.js\");\n/* harmony import */ var react_redux_toastr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux_toastr__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_5__[\"Provider\"], {\n  store: _redux_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"BrowserRouter\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_Main__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux_toastr__WEBPACK_IMPORTED_MODULE_6___default.a, {\n  timeOut: 8000,\n  newestOnTop: false,\n  preventDuplicates: true,\n  position: \"top-center\",\n  transitionIn: \"fadeIn\",\n  transitionOut: \"fadeOut\",\n  progressBar: true,\n  closeOnToastrClick: true\n}))), document.getElementById('app'));\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./redux/action-creator/user.js":
/*!**************************************!*\
  !*** ./redux/action-creator/user.js ***!
  \**************************************/
/*! exports provided: setUser, checkUserLogin, createUser, fetchUser, logOut, getAllUsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUser\", function() { return setUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkUserLogin\", function() { return checkUserLogin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createUser\", function() { return createUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchUser\", function() { return fetchUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logOut\", function() { return logOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAllUsers\", function() { return getAllUsers; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./redux/constants.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar setUser = function setUser(user) {\n  return {\n    type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_USER\"],\n    user: user\n  };\n};\n\nvar setUsers = function setUsers(users) {\n  return {\n    type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_USERS\"],\n    users: users\n  };\n};\n\nvar checkUserLogin = function checkUserLogin(data) {\n  return function (dispatch) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/user/login', data).then(function (res) {\n      return res.data;\n    }).then(function (usuario) {\n      return dispatch(setUser(usuario));\n    });\n  };\n};\nvar createUser = function createUser(user) {\n  return function () {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/user/create', {\n      user: user\n    });\n  };\n};\nvar fetchUser = function fetchUser() {\n  return function (dispatch) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/api/user/user').then(function (res) {\n      return res.data;\n    }).then(function (user) {\n      return dispatch(setUser(user));\n    });\n  };\n};\nvar logOut = function logOut() {\n  return function (dispatch) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/api/user/logOut').then(function (res) {\n      return res.data;\n    }).then(function (user) {\n      dispatch(setUser(user));\n    });\n  };\n};\nvar getAllUsers = function getAllUsers() {\n  return function (dispatch) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/api/user/getAll').then(function (res) {\n      return res.data;\n    }).then(function (users) {\n      return dispatch(setUsers(users));\n    });\n  };\n};\n\n//# sourceURL=webpack:///./redux/action-creator/user.js?");

/***/ }),

/***/ "./redux/constants.js":
/*!****************************!*\
  !*** ./redux/constants.js ***!
  \****************************/
/*! exports provided: SET_INTERVIEW, SET_USER, SET_USERS, CHECK_USER, SET_OBS, SET_ANSWERSHR, SET_ANSWERS_SIST, SET_SKILL_ARRAY, SET_QUESTIONS, EDIT_QUESTION, SET_QUESTIONSIS, SET_HRQUESTIONS, DELETE_QUESTION, SET_CANDIDATE_QUESTIONS, SET_CANDIDATE, SET_CANDIDATES, SET_MYCANDIDATES, SET_CANDIDATE_LIST, SET_CANDIDATE_GROUP_LIST, SET_CANDIDATE_INTERVW_ID, SET_SIZE_ALLCANDIDATES_LIST, SET_MY_CANDIDATE_GROUP_LIST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_INTERVIEW\", function() { return SET_INTERVIEW; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_USER\", function() { return SET_USER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_USERS\", function() { return SET_USERS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHECK_USER\", function() { return CHECK_USER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_OBS\", function() { return SET_OBS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_ANSWERSHR\", function() { return SET_ANSWERSHR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_ANSWERS_SIST\", function() { return SET_ANSWERS_SIST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_SKILL_ARRAY\", function() { return SET_SKILL_ARRAY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_QUESTIONS\", function() { return SET_QUESTIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EDIT_QUESTION\", function() { return EDIT_QUESTION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_QUESTIONSIS\", function() { return SET_QUESTIONSIS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_HRQUESTIONS\", function() { return SET_HRQUESTIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DELETE_QUESTION\", function() { return DELETE_QUESTION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_CANDIDATE_QUESTIONS\", function() { return SET_CANDIDATE_QUESTIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_CANDIDATE\", function() { return SET_CANDIDATE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_CANDIDATES\", function() { return SET_CANDIDATES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_MYCANDIDATES\", function() { return SET_MYCANDIDATES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_CANDIDATE_LIST\", function() { return SET_CANDIDATE_LIST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_CANDIDATE_GROUP_LIST\", function() { return SET_CANDIDATE_GROUP_LIST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_CANDIDATE_INTERVW_ID\", function() { return SET_CANDIDATE_INTERVW_ID; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_SIZE_ALLCANDIDATES_LIST\", function() { return SET_SIZE_ALLCANDIDATES_LIST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_MY_CANDIDATE_GROUP_LIST\", function() { return SET_MY_CANDIDATE_GROUP_LIST; });\n// Interviews constants\nvar SET_INTERVIEW = 'SET_INTERVIEW'; // Users constants\n\nvar SET_USER = 'SET_USER';\nvar SET_USERS = 'SET_USERS';\nvar CHECK_USER = 'CHECK_USER'; // Answers constants\n\nvar SET_OBS = 'SET_OBS';\nvar SET_ANSWERSHR = 'SET_ANSWERSHR';\nvar SET_ANSWERS_SIST = 'export const'; // Questions constants\n\nvar SET_SKILL_ARRAY = 'SET_SKILL_ARRAY';\nvar SET_QUESTIONS = 'SET_QUESTIONS';\nvar EDIT_QUESTION = 'EDIT_QUESTION';\nvar SET_QUESTIONSIS = 'SET_QUESTIONSIS';\nvar SET_HRQUESTIONS = 'SET_HRQUESTIONS';\nvar DELETE_QUESTION = 'DELETE_QUESTION';\nvar SET_CANDIDATE_QUESTIONS = 'SET_CANDIDATE_QUESTIONS'; // Candidates constants\n\nvar SET_CANDIDATE = 'SET_CANDIDATE';\nvar SET_CANDIDATES = 'SET_CANDIDATES';\nvar SET_MYCANDIDATES = 'SET_MYCANDIDATES';\nvar SET_CANDIDATE_LIST = 'SET_CANDIDATE_LIST';\nvar SET_CANDIDATE_GROUP_LIST = 'SET_CANDIDATE_GROUP_LIST';\nvar SET_CANDIDATE_INTERVW_ID = 'SET_CANDIDATE_INTERVW_ID';\nvar SET_SIZE_ALLCANDIDATES_LIST = 'SET_SIZE_ALLCANDIDATES_LIST';\nvar SET_MY_CANDIDATE_GROUP_LIST = 'SET_MY_CANDIDATE_GROUP_LIST';\n\n//# sourceURL=webpack:///./redux/constants.js?");

/***/ }),

/***/ "./redux/reducer/answer.js":
/*!*********************************!*\
  !*** ./redux/reducer/answer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./redux/constants.js\");\n\nvar initialState = {\n  answersHR: [],\n  answersSIST: []\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_OBS\"]:\n      return Object.assign({}, state, action.observations);\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_ANSWERSHR\"]:\n      return Object.assign({}, state, {\n        answersHR: action.answersHR\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_ANSWERS_SIST\"]:\n      return Object.assign({}, state, {\n        answersSIST: action.answersSIST\n      });\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./redux/reducer/answer.js?");

/***/ }),

/***/ "./redux/reducer/candidate.js":
/*!************************************!*\
  !*** ./redux/reducer/candidate.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./redux/constants.js\");\n\nvar initialState = {\n  candidate: {},\n  candidates: [],\n  myCandidates: [],\n  interviewID: {},\n  candidateList: []\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_CANDIDATE\"]:\n      return Object.assign({}, state, {\n        candidate: action.candidate\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_CANDIDATES\"]:\n      return Object.assign({}, state, {\n        candidates: action.candidates\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_MYCANDIDATES\"]:\n      return Object.assign({}, state, {\n        myCandidates: action.candidates\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_CANDIDATE_LIST\"]:\n      return Object.assign({}, state, {\n        candidateList: action.candidates\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_CANDIDATE_GROUP_LIST\"]:\n      return Object.assign({}, state, {\n        candidateList: action.candidateGoupList\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_MY_CANDIDATE_GROUP_LIST\"]:\n      return Object.assign({}, state, {\n        candidateList: action.myCandidateGoupList\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_CANDIDATE_INTERVW_ID\"]:\n      return Object.assign({}, state, {\n        interviewID: action.candidateInterviewID\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_SIZE_ALLCANDIDATES_LIST\"]:\n      return Object.assign({}, state, {\n        totalCandidatesCount: action.totalCandidatesCount\n      });\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./redux/reducer/candidate.js?");

/***/ }),

/***/ "./redux/reducer/interview.js":
/*!************************************!*\
  !*** ./redux/reducer/interview.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./redux/constants.js\");\n\nvar initialState = {\n  interview: {}\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_INTERVIEW\"]:\n      return Object.assign({}, state, {\n        interview: action.interview\n      });\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./redux/reducer/interview.js?");

/***/ }),

/***/ "./redux/reducer/question.js":
/*!***********************************!*\
  !*** ./redux/reducer/question.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./redux/constants.js\");\n\nvar initialState = {\n  allQuestions: [],\n  questId: null,\n  questions: [],\n  candidateQuestions: [],\n  questionSIS: [],\n  questionsHR: [],\n  skillArray: []\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"DELETE_QUESTION\"]:\n      return Object.assign({}, state, {\n        questId: action.questId\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"EDIT_QUESTION\"]:\n      return Object.assign({}, state, {\n        questId: action.questId\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_SKILL_ARRAY\"]:\n      return Object.assign({}, state, {\n        skillArray: action.skillArray\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_QUESTIONSIS\"]:\n      return Object.assign({}, state, {\n        questionSIS: action.questionSIS\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_QUESTIONS\"]:\n      return Object.assign({}, state, {\n        allQuestions: action.questions\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_HRQUESTIONS\"]:\n      return Object.assign({}, state, {\n        questionsHR: action.questionsHR\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_CANDIDATE_QUESTIONS\"]:\n      return Object.assign({}, state, {\n        candidateQuestions: action.candidateQuestions\n      });\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./redux/reducer/question.js?");

/***/ }),

/***/ "./redux/reducer/reducer.js":
/*!**********************************!*\
  !*** ./redux/reducer/reducer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/index.js\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./redux/reducer/user.js\");\n/* harmony import */ var _candidate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./candidate */ \"./redux/reducer/candidate.js\");\n/* harmony import */ var _question__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./question */ \"./redux/reducer/question.js\");\n/* harmony import */ var _interview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interview */ \"./redux/reducer/interview.js\");\n/* harmony import */ var _answer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./answer.js */ \"./redux/reducer/answer.js\");\n/* harmony import */ var react_redux_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux-toastr */ \"./node_modules/react-redux-toastr/lib/index.js\");\n/* harmony import */ var react_redux_toastr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux_toastr__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  user: _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  candidate: _candidate__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  question: _question__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  interview: _interview__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  answers: _answer_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  toastr: react_redux_toastr__WEBPACK_IMPORTED_MODULE_6__[\"reducer\"]\n}));\n\n//# sourceURL=webpack:///./redux/reducer/reducer.js?");

/***/ }),

/***/ "./redux/reducer/user.js":
/*!*******************************!*\
  !*** ./redux/reducer/user.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./redux/constants.js\");\n\nvar initialState = {\n  user: {},\n  users: []\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_USER\"]:\n      return Object.assign({}, state, {\n        user: action.user\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_USERS\"]:\n      return Object.assign({}, state, {\n        users: action.users\n      });\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./redux/reducer/user.js?");

/***/ }),

/***/ "./redux/store.js":
/*!************************!*\
  !*** ./redux/store.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/index.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ \"./node_modules/redux-logger/dist/redux-logger.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n/* harmony import */ var _reducer_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducer/reducer */ \"./redux/reducer/reducer.js\");\n\n\n\n\nvar composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducer_reducer__WEBPACK_IMPORTED_MODULE_3__[\"default\"], composeEnhancers(Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(Object(redux_logger__WEBPACK_IMPORTED_MODULE_1__[\"createLogger\"])(), redux_thunk__WEBPACK_IMPORTED_MODULE_2__[\"default\"]))));\n\n//# sourceURL=webpack:///./redux/store.js?");

/***/ }),

/***/ "./src/Main.jsx":
/*!**********************!*\
  !*** ./src/Main.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _helpers_Async__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/Async */ \"./src/helpers/Async.jsx\");\n/* harmony import */ var _redux_action_creator_user__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../redux/action-creator/user */ \"./redux/action-creator/user.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar AsyncAllCandidates = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"common\"), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ./components/candidate/AllCandidates.container */ \"./src/components/candidate/AllCandidates.container.jsx\"));\n});\nvar AsyncAllUsers = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"common\"), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ./components/user/AllUsers.container */ \"./src/components/user/AllUsers.container.jsx\"));\n});\nvar AsyncConfiguration = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"common\"), __webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./components/app/Configuration.container */ \"./src/components/app/Configuration.container.jsx\"));\n});\nvar AsyncHeader = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ./components/app/Header */ \"./src/components/app/Header.jsx\"));\n});\nvar AsyncInterviewSisCont = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"common\"), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, /*! ./components/interview/InterviewSisCont.container */ \"./src/components/interview/InterviewSisCont.container.jsx\"));\n});\nvar AsyncLogin = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"common\"), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, /*! ./components/login/Login.container */ \"./src/components/login/Login.container.jsx\"));\n});\nvar AsyncPreSistInterview = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"common\"), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ./components/interview/PreSistInterview.container */ \"./src/components/interview/PreSistInterview.container.jsx\"));\n});\nvar AsyncSistReport = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"common\"), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ./components/report/SistReport */ \"./src/components/report/SistReport.jsx\"));\n});\nvar AsyncCandidateInfo = Object(_helpers_Async__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ \"common\").then(__webpack_require__.bind(null, /*! ./components/app/CandidateInfo */ \"./src/components/app/CandidateInfo.jsx\"));\n});\n\nvar Main =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Main, _React$Component);\n\n  function Main(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Main);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Main).call(this, props));\n    _this.state = {\n      loading: true\n    };\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Main, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      this.props.fetchUser().then(function () {\n        return _this2.setState({\n          loading: false\n        });\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this3 = this;\n\n      return !this.state.loading ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        render: function render(_ref) {\n          var history = _ref.history;\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncHeader, {\n            fetchUser: _this3.props.fetchUser,\n            user: _this3.props.user,\n            history: history\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(\"div\", {\n        className: \"container-fluid\"\n      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Switch\"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        exact: true,\n        path: \"/\",\n        render: function render(_ref2) {\n          var history = _ref2.history;\n          return _this3.props.user ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Redirect\"], {\n            to: \"/candidate\"\n          }) : react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Redirect\"], {\n            to: \"/login\"\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        exact: true,\n        path: \"/login\",\n        render: function render(_ref3) {\n          var history = _ref3.history;\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncLogin, {\n            history: history,\n            user: _this3.props.user\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        exact: true,\n        path: \"/candidate/interview/:idCand\",\n        render: function render(_ref4) {\n          var history = _ref4.history,\n              match = _ref4.match;\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncInterviewSisCont, {\n            idCand: match.params.idCand,\n            history: history,\n            user: _this3.props.user\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        exact: true,\n        path: \"/candidate/info/:idCand\",\n        render: function render(_ref5) {\n          var history = _ref5.history,\n              match = _ref5.match;\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncCandidateInfo, {\n            history: history,\n            user: _this3.props.user,\n            candID: match.params.idCand\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        exact: true,\n        path: \"/candidate/:idCand/interview/:idInterv\",\n        render: function render(_ref6) {\n          var history = _ref6.history,\n              match = _ref6.match;\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncSistReport, {\n            history: history,\n            idCand: match.params.idCand,\n            questions: _this3.props.questionsHR,\n            candidate: _this3.props.candidate,\n            idInter: _this3.props.idInter\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        path: \"/candidate\",\n        render: function render(props) {\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncAllCandidates, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {\n            user: _this3.props.user\n          }));\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        exact: true,\n        path: \"/configuration\",\n        render: function render(_ref7) {\n          var history = _ref7.history;\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncConfiguration, {\n            history: history,\n            user: _this3.props.user\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        exact: true,\n        path: \"/users\",\n        render: function render(_ref8) {\n          var history = _ref8.history;\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncAllUsers, {\n            user: _this3.props.user,\n            history: history\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[\"Route\"], {\n        exact: true,\n        path: \"/preinterview/:candID\",\n        render: function render(_ref9) {\n          var history = _ref9.history,\n              match = _ref9.match;\n          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AsyncPreSistInterview, {\n            history: history,\n            user: _this3.props.user,\n            candID: match.params.candID\n          });\n        }\n      })))) : null;\n    }\n  }]);\n\n  return Main;\n}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.user.user\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    fetchUser: function fetchUser() {\n      return dispatch(Object(_redux_action_creator_user__WEBPACK_IMPORTED_MODULE_10__[\"fetchUser\"])());\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Main));\n\n//# sourceURL=webpack:///./src/Main.jsx?");

/***/ }),

/***/ "./src/helpers/Async.jsx":
/*!*******************************!*\
  !*** ./src/helpers/Async.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nvar async = function async(component) {\n  var _temp;\n\n  return _temp =\n  /*#__PURE__*/\n  function (_Component) {\n    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(_temp, _Component);\n\n    function _temp() {\n      var _getPrototypeOf2;\n\n      var _this;\n\n      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, _temp);\n\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(_temp)).call.apply(_getPrototypeOf2, [this].concat(args)));\n      _this.state = {\n        component: null\n      };\n      return _this;\n    }\n\n    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(_temp, [{\n      key: \"componentDidMount\",\n      value: function componentDidMount() {\n        var _this2 = this;\n\n        component().then(function (cmp) {\n          _this2.setState({\n            component: cmp.default\n          });\n        });\n      }\n    }, {\n      key: \"render\",\n      value: function render() {\n        var C = this.state.component;\n        return C ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(C, this.props) : null;\n      }\n    }]);\n\n    return _temp;\n  }(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]), _temp;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (async);\n\n//# sourceURL=webpack:///./src/helpers/Async.jsx?");

/***/ })

/******/ });