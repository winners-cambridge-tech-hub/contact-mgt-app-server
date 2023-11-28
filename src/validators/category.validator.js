// validators/category.validator.js
const Validator = require('fastest-validator');

class CategoryValidator {
  validate(categoryDto) {
    const schema = {
      name: { type: 'string', optional: false, max: 255 },
    };

    const v = new Validator();
    const validationFailed = v.validate(categoryDto, schema);

    return validationFailed === true ? true : { validationFailed };
  }
}

module.exports = CategoryValidator;
