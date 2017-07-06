"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createStore(rawActions, update) {
  var state = {};
  var actions = {};

  var makeAction = function makeAction(a, name) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var response = a.apply(undefined, [action({ state: state, effects: [] })].concat(args)).fold();
      state = response.state;
      response.effects.map(function (e) {
        return e(response.state, actions);
      });
      update(state, actions);
    };
  };

  for (var key in rawActions) {
    actions[key] = makeAction(rawActions[key], key);
  }
  return actions;
}

function action(s) {
  return {
    map: function map(f) {
      return action({ effects: s.effects, state: f(s.state) });
    },
    addEffect: function addEffect(e) {
      return action({ effects: [].concat(_toConsumableArray(s.effects), [e]), state: s.state });
    },
    chain: function chain(a) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return a.apply(undefined, [action(s)].concat(args));
    },
    log: function log() {
      return action(_log(s));
    },
    fold: function fold() {
      return s;
    }
  };
}

function _log(t) {
  console.log(t);
  return t;
}
exports.log = _log;