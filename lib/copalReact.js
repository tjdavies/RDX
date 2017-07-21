'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = copal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _copal = require('./copal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CopalComponent = function (_Component) {
  _inherits(CopalComponent, _Component);

  function CopalComponent(props) {
    _classCallCheck(this, CopalComponent);

    var _this = _possibleConstructorReturn(this, (CopalComponent.__proto__ || Object.getPrototypeOf(CopalComponent)).call(this, props));

    _this.state = {};

    var devTools = window.devToolsExtension && window.devToolsExtension.connect();
    var debuggerHook = function debuggerHook(dispatch) {
      return function (name) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var newState = dispatch.apply(undefined, [name].concat(args));
        devTools.send(_extends({ type: name }, args), newState);
      };
    };
    _this.store = (0, _copal.createStore)(props.actions, devTools ? debuggerHook : undefined);
    if (devTools) {
      _this.unsubscribe = devTools.subscribe(function (message) {
        if (message.type === 'DISPATCH') {
          _this.store.setState(JSON.parse(message.state));
        }
      });
      devTools.init(_this.store.getState());
    }
    _this.store.subscribe(function () {
      return _this.setState(_this.store.getState());
    });
    return _this;
  }

  _createClass(CopalComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.store.actions['initalise']) {
        this.store.actions['initalise']();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.render(this.state, this.store.actions);
    }
  }]);

  return CopalComponent;
}(_react.Component);

function copal(render, actions) {
  return _react2.default.createElement(CopalComponent, { actions: actions, render: render });
}