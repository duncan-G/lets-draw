import validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * Insert Custom Validators here
 * Note: validators from validator.js that require an extra argument
 * such as a validator.length(str, options), will not work as intended
 * and must customized in this implementation.
 */

function ValidatorFactory() {
  validator.isRequired = value => {
    return !isEmpty(value);
  };

  validator.isMinLength = function(length) {
    return value => {
      return value.length >= length && value.trim().length !== 0; // All white spaces
    };
  };

  validator.isMaxLength = function(length) {
    return value => {
      return value.length <= length && value.trim().length !== 0;
    };
  };

  validator.isLength = length => {
    return value => value.length === length;
  };

  return Object.create(validator);
}

export default new ValidatorFactory();
