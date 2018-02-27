'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dist = require('../../enTT/dist');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // =====================================================================================================================
// ENTITY VALIDATION: EnTT Extension implementing popular validation libraries for use with EnTT
// =====================================================================================================================

// Load dependencies


// TODO: Change to NPM instance

/**
 * EnValidate base class, EnTT Extension implementing popular validation libraries for use with EnTT
 * @export
 * @class EnValidate
 */
var EnValidate = function (_ValidationExtension) {
  _inherits(EnValidate, _ValidationExtension);

  /**
   * Creates an instance of EnValidate.
   * @param {bool} reject If true, invalid values won't be assigned to the property
   * @param {any} joi A reference to the JOI library, to be used for validation by JOI schema
   * @param {any} yup A reference to the YUP library, to be used for validation by YUP schema
   * @memberof EnValidate
   */
  function EnValidate() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$reject = _ref.reject,
        reject = _ref$reject === undefined ? false : _ref$reject,
        joi = _ref.joi,
        yup = _ref.yup;

    _classCallCheck(this, EnValidate);

    // Store dependency references
    var _this = _possibleConstructorReturn(this, (EnValidate.__proto__ || Object.getPrototypeOf(EnValidate)).call(this, { reject: reject }));

    _this.validationLibs = { joi: joi, yup: yup };

    // Mark additional .processShorthandPropertyConfiguration(...) method as implemented
    _this.implemented.processShorthandPropertyConfiguration = true;
    // Mark additional .updatePropertyConfiguration(...) method as implemented
    _this.implemented.updatePropertyConfiguration = true;

    return _this;
  }

  /**
   * Processes property configuration and replaces it if detected as short-hand configuration syntax
   * @param {any} propertyConfiguration Single property configuration to be processed
   * @returns {any} Processed property configuration
   * @memberof EnTTExt
   */


  _createClass(EnValidate, [{
    key: 'processShorthandPropertyConfiguration',
    value: function processShorthandPropertyConfiguration(propertyConfiguration) {
      // Check if shorthand is a JOI schema (if JOI instance configured)
      if (isJoi.bind(this)(propertyConfiguration)) {
        // Replace with validation configuration
        return { validate: propertyConfiguration };
      }
      // Check if shorthand is a YUP schema (if YUP instance configured)
      if (isYup.bind(this)(propertyConfiguration)) {
        // Replace with validation configuration
        return { validate: propertyConfiguration };
      }
      // Return unchanged configuration
      return propertyConfiguration;
    }

    /**
     * Updates property's configuration
     * @param {any} propertyConfiguration Single property configuration to be updated
     * @memberof EnTTExt
     */

  }, {
    key: 'updatePropertyConfiguration',
    value: function updatePropertyConfiguration(propertyConfiguration) {
      var _this2 = this;

      // Check if shorthand is a JOI schema (if JOI instance configured)
      if (isJoi.bind(this)(propertyConfiguration.validate)) {
        // Wrap in a validation function
        var schema = propertyConfiguration.validate;
        propertyConfiguration.validate = function (value) {
          var validated = _this2.validationLibs.joi.validate(value, schema, { convert: false });
          if (validated.error) {
            return validated.error.message;
          }
        };
      }
      // Check if shorthand is a YUP schema (if YUP instance configured)
      if (isYup.bind(this)(propertyConfiguration.validate)) {
        // Wrap in a validation function
        var _schema = propertyConfiguration.validate;
        propertyConfiguration.validate = function (value) {
          try {
            _schema.validateSync(value, { strict: true });
          } catch (err) {
            return err.message;
          }
        };
      }
    }
  }]);

  return EnValidate;
}(_dist.ValidationExtension);

/**
 * Checks if passed schema is a JOI schema
 * @param {any} schema JOI schema candidate
 * @returns {bool} If passed schema is a JOI schema
 */


exports.default = EnValidate;
function isJoi(schema) {
  return this.validationLibs.joi && schema && _lodash2.default.isObject(schema) && schema.isJoi === true;
}

/**
 * Checks if passed schema is a YUP schema
 * @param {any} schema YUP schema candidate
 * @returns {bool} If passed schema is a YUP schema
 */
function isYup(schema) {
  return this.validationLibs.yup && schema && _lodash2.default.isObject(schema) && schema.__isYupSchema__ === true;
}
//# sourceMappingURL=envalidate.js.map
