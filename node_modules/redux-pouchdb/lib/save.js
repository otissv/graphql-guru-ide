'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _load = require('./load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unpersistedQueue = {};
var isUpdating = {};

exports.default = function (db, madeBy) {
  var loadReducer = (0, _load2.default)(db);

  var saveReducer = function saveReducer(reducerName, reducerState) {
    if (isUpdating[reducerName]) {
      //enqueue promise
      unpersistedQueue[reducerName] = unpersistedQueue[reducerName] || [];
      unpersistedQueue[reducerName].push(reducerState);

      return Promise.resolve();
    }

    isUpdating[reducerName] = true;

    return loadReducer(reducerName).then(function (doc) {
      var newDoc = _extends({}, doc, { madeBy: madeBy, state: reducerState });
      return newDoc;
    }).then(function (newDoc) {
      return db.put(newDoc);
    }).then(function () {
      isUpdating[reducerName] = false;
      if (unpersistedQueue[reducerName] && unpersistedQueue[reducerName].length) {
        var next = unpersistedQueue[reducerName].shift();

        return saveReducer(reducerName, next);
      }
    }).catch(console.error.bind(console));
  };

  return saveReducer;
};