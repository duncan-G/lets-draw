import React from 'react';
import { isFunction, isString, isArray, isObject, debounce } from 'lodash';

/**
 *
 * @param {object} controllers
 * controller = {'fieldName': ['fieldValue', [validators]] }
 * Each fieldName must be a string.
 * The first item in the array must be the field value
 * The rest of the items in the array must be valid validators.
 */
const validateFieldControllers = controllers => {
  Object.keys(controllers).forEach(field => {
    if (!isString(field)) {
      throw new Error(`Field name ${field} must be a string.`);
    }

    const value = controllers[field].value;
    if (isFunction(value) || isArray(value) || isObject(value)) {
      throw new Error(`Value (${value}) cannot be function, array or object.`);
    }

    if (!controllers[field].validators) {
      controllers[field].validators = [];
    }
    controllers[field].validators.forEach(validator => {
      /* TODO: check that each validator is a valid validator.*/
    });
  });
};

/**
 * @param {field} fieldControllers
 */
export default function FormBuilder(fieldControllers) {
  validateFieldControllers(fieldControllers);
  return WrappedComponent => {
    return class extends React.Component {
      constructor() {
        super();
        this.state = {
          fieldControllers: {},
          formErrors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.debounceChange = this.debounceChange.bind(this);
        this.validateAll = this.validateAll.bind(this);
      }

      componentDidMount() {
        fieldControllers = fieldControllers || {};
        this.setState({
          fieldControllers: fieldControllers,
          formErrors: Object.keys(fieldControllers).reduce((acum, curr) => {
            acum[curr] = [];
            return acum;
          }, {})
        });
      }

      handleChange = event => {
        event.persist();
        this.debounceChange(event);
      };

      debounceChange = event => {
        const debouncedChange = debounce(event => {
          this.makeChange(event);
        }, 800);
        debouncedChange(event);
      };

      makeChange = event => {
        const fieldName = event.target.name;
        const value = event.target.value;

        const errors = this.validateController(
          this.state.fieldControllers[fieldName],
          value
        );

        this.setState(prevState => ({
          fieldControllers: {
            ...prevState.fieldControllers,
            [fieldName]: {
              ...prevState.fieldControllers[fieldName],
              value: value
            }
          },
          formErrors: {
            ...prevState.formErrors,
            [fieldName]: errors
          }
        }));
      };

      handleSubmit = (event, callback) => {
        event.preventDefault();
        const [errorsExist, validationErrors] = this.validateAll();
        if (!errorsExist) {
          const formValues = Object.keys(this.state.fieldControllers).reduce(
            (acum, curr) => {
              acum[curr] = this.state.fieldControllers[curr].value;
              return acum;
            },
            {}
          );
          callback(formValues);
        } else {
          this.setState({ formErrors: validationErrors });
        }
      };

      getValidator(validator) {
        if (validator.length === 1) {
          return [validator[0], 'field is invalid'];
        } else {
          return validator;
        }
      }
      /*
       * Validate a controller
       * currValue parameter is passed when controller.value is behind
       * one value since setState is asynchronous
       */
      validateController = (controller, currValue = null) => {
        const errors = [];

        controller.validators.forEach(fieldValidator => {
          const [validate, errorMessage] = this.getValidator(fieldValidator);

          if (!validate(currValue || controller.value)) {
            errors.push(errorMessage);
          }
        });
        return errors;
      };

      validateAll = () => {
        let formErrors = {};
        let errorsExist = false;

        Object.keys(this.state.fieldControllers).forEach(field => {
          formErrors[field] = [];
          const errors = this.validateController(
            this.state.fieldControllers[field]
          );

          if (errors.length > 0) {
            formErrors[field] = errors;
            errorsExist = true;
          }
        });
        return [errorsExist, formErrors];
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            formErrors={this.state.formErrors}
            children={this.renderFields(fieldControllers)}
          />
        );
      }
    };
  };
}
