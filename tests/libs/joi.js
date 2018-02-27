// =====================================================================================================================
// Tests Entity Validation using JOI
// =====================================================================================================================
let Joi = require('joi');

// Export testing configuration for JOI
module.exports = {
  name: 'JOI',
  config: { joi: Joi },
  schema: Joi.string().uppercase()
};
