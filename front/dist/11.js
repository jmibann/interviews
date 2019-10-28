(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./src/components/app/Header.jsx":
/*!***************************************!*\
  !*** ./src/components/app/Header.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _redux_action_creator_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../redux/action-creator/user */ \"./redux/action-creator/user.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\n\n\n\n\nvar Header = function Header(props) {\n  return props.user && props.user.id ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"header\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"pull-left\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n    to: \"/candidates/allCandidates\"\n  }, \" \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: \"imgLogoHeader\",\n    src: \"/img/logo.png\"\n  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"main-nav\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n    activeClassName: \"active\",\n    to: \"/candidates/allCandidates\"\n  }, \"Candidates \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-user-tie\"\n  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, props.user.isAdmin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n    activeClassName: \"active\",\n    to: \"/users/allUsers\"\n  }, \"Users \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-user-friends\"\n  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, props.user.isAdmin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n    activeClassName: \"active\",\n    to: \"/configuration\"\n  }, \"Configuration \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-wrench\"\n  }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"log-out\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n    className: \"dropdown\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: \"username\"\n  }, props.user.nombre), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    href: \"#\",\n    className: \"dropdown-toggle\",\n    \"data-toggle\": \"dropdown\",\n    role: \"button\",\n    \"aria-haspopup\": \"true\",\n    \"aria-expanded\": \"false\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: \"userimage\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-user-circle\"\n  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n    className: \"dropdown-menu\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: \"\",\n    className: \"logout\",\n    onClick: function onClick(e) {\n      e.preventDefault();\n      props.logOut().then(function () {\n        return props.history.push('/login');\n      });\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-power-off\"\n  }), \" Logout\")))))) : null;\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.user.user\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    logOut: function logOut() {\n      return dispatch(Object(_redux_action_creator_user__WEBPACK_IMPORTED_MODULE_2__[\"logOut\"])());\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Header));\n\n//# sourceURL=webpack:///./src/components/app/Header.jsx?");

/***/ })

}]);