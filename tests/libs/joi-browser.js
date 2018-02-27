// =====================================================================================================================
// Tests Entity Validation using JOI (browser)
// =====================================================================================================================
let Joi = require('joi-browser');

module.exports = {
  name: 'JOI (browser)',
  config: { joi: Joi },
  schema: Joi.string().uppercase()
};
