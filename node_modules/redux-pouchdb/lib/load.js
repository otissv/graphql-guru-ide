"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (db) {
  return function (_id) {
    return db.get(_id).catch(function (err) {
      if (err.status === 404) {
        return { _id: _id };
      } else {
        throw err;
      }
    }).catch(console.error.bind(console));
  };
};