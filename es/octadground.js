function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { Octadground as NativeOctadground } from 'octadground';

var Octadground = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Octadground, _React$Component);

  function Octadground() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Octadground.prototype;

  _proto.buildConfigFromProps = function buildConfigFromProps(props) {
    var config = {
      events: {}
    };
    Object.keys(Octadground.propTypes).forEach(function (k) {
      var v = props[k];

      if (typeof v !== 'undefined') {
        var match = k.match(/^on([A-Z]\S*)/);

        if (match) {
          config.events[match[1].toLowerCase()] = v;
        } else {
          config[k] = v;
        }
      }
    });
    return config;
  };

  _proto.componentDidMount = function componentDidMount() {
    this.cg = NativeOctadground(this.el, this.buildConfigFromProps(this.props));
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.cg.set(this.buildConfigFromProps(nextProps));
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cg.destroy();
  };

  _proto.render = function render() {
    var _this = this;

    var props = {
      style: _extends({}, this.props.style)
    };

    if (this.props.width) {
      props.style.width = this.props.width;
    }

    if (this.props.height) {
      props.style.height = this.props.height;
    }

    return /*#__PURE__*/React.createElement("div", _extends({
      ref: function ref(el) {
        return _this.el = el;
      }
    }, props));
  };

  return Octadground;
}(React.Component);

_defineProperty(Octadground, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fen: PropTypes.string,
  orientation: PropTypes.string,
  turnColor: PropTypes.string,
  check: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  lastMove: PropTypes.array,
  selected: PropTypes.string,
  coordinates: PropTypes.bool,
  autoCastle: PropTypes.bool,
  viewOnly: PropTypes.bool,
  disableContextMenu: PropTypes.bool,
  resizable: PropTypes.bool,
  addPieceZIndex: PropTypes.bool,
  highlight: PropTypes.object,
  animation: PropTypes.object,
  movable: PropTypes.object,
  premovable: PropTypes.object,
  predroppable: PropTypes.object,
  draggable: PropTypes.object,
  selectable: PropTypes.object,
  onChange: PropTypes.func,
  onMove: PropTypes.func,
  onDropNewPiece: PropTypes.func,
  onSelect: PropTypes.func,
  items: PropTypes.object,
  drawable: PropTypes.object
});

_defineProperty(Octadground, "defaultProps", {
  coordinates: true,
  resizable: true,
  highlight: {
    lastMove: true,
    check: true
  }
});

export { Octadground as default };