// =====================================================================================================================
// ENTITY VALIDATION: EnTT Extension implementing popular validation libraries for use with EnTT
// =====================================================================================================================

// Load dependencies
import _ from 'lodash';
import { ValidationExtension } from '../../enTT/dist';   // TODO: Change to NPM instance

/**
 * EnValidate base class, EnTT Extension implementing popular validation libraries for use with EnTT
 * @export
 * @class EnValidate
 */
export default class EnValidate extends ValidationExtension {

  /**
   * Creates an instance of EnValidate.
   * @param {bool} reject If true, invalid values won't be assigned to the property
   * @param {any} joi A reference to the JOI library, to be used for validation by JOI schema
   * @param {any} yup A reference to the YUP library, to be used for validation by YUP schema
   * @memberof EnValidate
   */
  constructor ({ reject = false, joi, yup } = {}) {
    super({ reject });

    // Store dependency references
    this.validationLibs = { joi, yup };

    // Mark additional .processShorthandPropertyConfiguration(...) method as implemented
    this.implemented.processShorthandPropertyConfiguration = true;
    // Mark additional .updatePropertyConfiguration(...) method as implemented
    this.implemented.updatePropertyConfiguration = true;

  }

  /**
   * Processes property configuration and replaces it if detected as short-hand configuration syntax
   * @param {any} propertyConfiguration Single property configuration to be processed
   * @returns {any} Processed property configuration
   * @memberof EnTTExt
   */
  processShorthandPropertyConfiguration (propertyConfiguration) {
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
  updatePropertyConfiguration (propertyConfiguration) {
    // Check if shorthand is a JOI schema (if JOI instance configured)
    if (isJoi.bind(this)(propertyConfiguration.validate)) {
      // Wrap in a validation function
      const schema = propertyConfiguration.validate;
      propertyConfiguration.validate = (value) => {
        const validated = this.validationLibs.joi.validate(value, schema, { convert: false });
        if (validated.error) { return validated.error.message; }
      };
    }
    // Check if shorthand is a YUP schema (if YUP instance configured)
    if (isYup.bind(this)(propertyConfiguration.validate)) {
      // Wrap in a validation function
      const schema = propertyConfiguration.validate;
      propertyConfiguration.validate = (value) => {
        try {
          schema.validateSync(value, { strict: true });
        } catch (err) {
          return err.message;
        }
      };
    }
  }

}

/**
 * Checks if passed schema is a JOI schema
 * @param {any} schema JOI schema candidate
 * @returns {bool} If passed schema is a JOI schema
 */
function isJoi (schema) {
  return this.validationLibs.joi
      && schema
      && _.isObject(schema)
      && (schema.isJoi === true);
}

/**
 * Checks if passed schema is a YUP schema
 * @param {any} schema YUP schema candidate
 * @returns {bool} If passed schema is a YUP schema
 */
function isYup (schema) {
  return this.validationLibs.yup
      && schema
      && _.isObject(schema)
      && (schema.__isYupSchema__ === true);
}
