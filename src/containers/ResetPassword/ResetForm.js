import React from 'react';
import {
  Input,
  Button,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import { Validators, FormBuilder } from '../../components/Form';

const Form = props => {
  return (
    <form
      className="auth-form"
      onSubmit={event =>
        props.handleSubmit(event, props.resetPassword)
      }
    >
      <FormControl className="auth-form-field">
        <InputLabel htmlFor="email">Enter email</InputLabel>
        <Input name="email" label="Email" onChange={props.handleChange} />
        {props.formErrors.email &&
          props.formErrors.email.length > 0 && (
            <FormHelperText className="auth-form-error">
              {props.formErrors.email[0]}
            </FormHelperText>
          )}
      </FormControl>

      {props.resetError && (
        <FormHelperText className="auth-form-error">
          {props.resetError}
        </FormHelperText>
      )}

      <Button
        variant="contained"
        color="primary"
        label="Submit"
        type="submit"
        className="auth-submit-button"
      >
        Submit
      </Button>
    </form>
  );
};

const ResetPasswordForm = FormBuilder({
  email: {
    value: '',
    validators: [
      [Validators.isRequired, 'Email is required.'],
      [Validators.isEmail, 'Email is invalid.']
    ]
  }
})(Form);

export default ResetPasswordForm;
