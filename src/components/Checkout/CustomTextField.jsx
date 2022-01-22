import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  const isError = false;

  return (
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        error={isError}
        render={() => (
          <input className='form-input'
            placeholder={label}
            type="text"
          />
        )}
      />
  );
};

export default FormInput;
