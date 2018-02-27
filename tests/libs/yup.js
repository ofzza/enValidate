// =====================================================================================================================
// Tests Entity Validation using YUP
// =====================================================================================================================
let Yup = require('yup');

// Export testing configuration for JOI
module.exports = {
  name: 'YUP',
  config: { yup: Yup },
  schema: Yup.string().uppercase()
};
