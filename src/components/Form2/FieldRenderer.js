import React from 'react';
import { InputLabel, FormControl } from '@material-ui/core';

const FieldRenderer = fields => {
  return Object.keys(fields).map(fieldName => {
    const fieldController = fields[fieldName];
    return (
      <FormControl>
        <InputLabel htmlFor={fieldController.name}>
          {fieldController.placeholder}
        </InputLabel>
        {fieldController.renderField()}
        {fieldController.renderFormError()}
      </FormControl>
    );
  });
};

export default FieldRenderer;
