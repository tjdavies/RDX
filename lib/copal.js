"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createStore(rawActions) {
  var middleware = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (f) {
    return f;
  };

  var state = {};
  var actions = {};
  var currentListeners = [];
  var nextListeners = currentListeners;

  var dispatch = function dispatch(name) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var response = rawActions[name].apply(rawActions, [action.apply(undefined, [{ state: state, effects: [] }].concat(args))].concat(args)).fold();
    setState(response.state);
    response.effects.map(function (e) {
      return e(response.state, actions);
    });
    return state;
  };

  var makeAction = function makeAction(name) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return middleware(dispatch).apply(undefined, [name].concat(args));
    };
  };

  for (var key in rawActions) {
    actions[key] = makeAction(key);
  }

  var getState = function getState() {
    return state;
  };

  var setState = function setState(newState) {
    state = newState;
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
  };

  function subscribe(listener) {
    var isSubscribed = true;
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  return {
    actions: actions,
    getState: getState,
    subscribe: subscribe,
    dispatch: dispatch,
    setState: setState
  };
}

function action(s) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return {
    map: function map(f) {
      return action({ effects: s.effects, state: f.apply(undefined, [s.state].concat(args)) });
    },
    addEffect: function addEffect(e) {
      return action({ effects: [].concat(_toConsumableArray(s.effects), [e]), state: s.state });
    },
    chain: function chain(a) {
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