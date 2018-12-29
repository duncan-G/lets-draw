import React from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
  Checkbox,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';
import { Validators, FormBuilder } from '../../components/Form';

const Form = props => {
  return (
    <form
      className="auth-form"
      onSubmit={event => props.handleSubmit(event, props.login)}
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

      <FormControl className="auth-form-field">
        <InputLabel htmlFor="password">Enter password</InputLabel>
        <Input
          name="password"
          label="password"
          type="password"
          onChange={props.handleChange}
        />
        {props.formErrors.password &&
          props.formErrors.password.length > 0 && (
            <FormHelperText className="auth-form-error">
              {props.formErrors.password[0]}
            </FormHelperText>
          )}
      </FormControl>

      {props.loginError && (
        <FormHelperText className="auth-form-error">
          {props.loginError}
        </FormHelperText>
      )}

      <div className="remember-forgot-password">
        <FormControlLabel
          id="remember-me"
          control={<Checkbox />}
          label="Remember Me"
        />
        <Link to="/reset-password" id="forgot-password">
          Forgot Password?
        </Link>
      </div>

      <Button
        variant="contained"
        color="primary"
        label="Submit"
        type="submit"
        className="auth-submit-button"
      >
        Submit
      </Button>

      <div className="social-logins">
        <Button
          variant="contained"
          color="secondary"
          label="Submit"
          type="submit"
          className="auth-submit-button"
        >
          Login with Google
        </Button>
      </div>
    </form>
  );
};

const LoginForm = FormBuilder({
  email: {
    value: '',
    validators: [
      [Validators.isRequired, 'Email is required.'],
      [Validators.isEmail, 'Email is invalid.']
    ]
  },
  password: {
    value: '',
    validators: [[Validators.isRequired, 'Password is required.']]
  }
})(Form);

export default LoginForm;
