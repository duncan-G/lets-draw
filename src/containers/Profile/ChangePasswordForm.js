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
      onSubmit={event => props.handleSubmit(event, props.changePassword)}
    >
      <input type="hidden" value={props.email} onChange={props.handleChange} />
      <div style={{ marginBottom: '25px' }}>
        <FormControl className="auth-form-field">
          <InputLabel htmlFor="password">Enter current password</InputLabel>
          <Input
            name="oldPassword"
            label="oldPassword"
            type="password"
            onChange={props.handleChange}
          />
          {props.formErrors.oldPassword &&
            props.formErrors.oldPassword.length > 0 && (
              <FormHelperText className="auth-form-error">
                {props.formErrors.oldPassword[0]}
              </FormHelperText>
            )}
        </FormControl>
      </div>
      <FormControl className="auth-form-field">
        <InputLabel htmlFor="password">Enter new password</InputLabel>
        <Input
          name="password"
          label="password"
          type="password"
          onChange={props.handleChange}
        />
        {props.formErrors.password && props.formErrors.password.length > 0 && (
          <FormHelperText className="auth-form-error">
            {props.formErrors.password[0]}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl className="auth-form-field">
        <InputLabel htmlFor="passwordConfirm">Confirm new password</InputLabel>
        <Input
          name="passwordConfirm"
          label="passwordConfirm"
          type="password"
          onChange={props.handleChange}
        />
        {props.formErrors.password && props.formErrors.password.length > 0 && (
          <FormHelperText className="auth-form-error">
            {props.formErrors.passwordConfirm[0]}
          </FormHelperText>
        )}
      </FormControl>

      {props.changePasswordError && (
        <FormHelperText className="auth-form-error">
          {props.changePasswordError}
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

const ChangePasswordForm = FormBuilder({
  email: {
    value: ''
  },
  oldPassword: {
    value: '',
    validators: [
      [Validators.isRequired, 'Password is required.'],
      [Validators.isMinLength(6), 'Password must be atleast 6 character'],
      [
        Validators.isMaxLength(20),
        'Password cannot be longer than 20 characters.'
      ]
    ]
  },
  password: {
    value: '',
    validators: [
      [Validators.isRequired, 'Password is required.'],
      [Validators.isMinLength(6), 'Password must be atleast 6 character'],
      [
        Validators.isMaxLength(20),
        'Password cannot be longer than 20 characters.'
      ]
    ]
  },
  passwordConfirm: {
    value: '',
    validators: [[Validators.isRequired, 'Password confirmation is required.']]
  }
})(Form);

export default ChangePasswordForm;
