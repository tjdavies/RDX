'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = RDXReact;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RDX = require('./RDX');

var _RDX2 = _interopRequireDefault(_RDX);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RDXClass = function (_Component) {
  _inherits(RDXClass, _Component);

  function RDXClass(props) {
    _classCallCheck(this, RDXClass);

    var _this = _possibleConstructorReturn(this, (RDXClass.__proto__ || Object.getPrototypeOf(RDXClass)).call(this, props));

    _this.state = {};
    _this.actions = (0, _RDX2.default)(props.actions, function (s) {
      return _this.setState(s);
    });
    return _this;
  }

  _createClass(RDXClass, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.actions['initalise']) {
        this.actions['initalise']();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.render(this.state, this.actions);
    }
  }]);

  return RDXClass;
}(_react.Component);

function RDXReact(render, actions) {
  return _react2.default.createElement(RDXClass, { actions: actions, render: render });
}