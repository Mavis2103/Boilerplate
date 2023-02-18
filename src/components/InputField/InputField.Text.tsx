import {Controller} from 'react-hook-form';
import {FormControl, Input} from 'native-base';

import InputFieldError from './InputField.Error';

import type {UseControllerProps} from 'react-hook-form';
import type {IFormControlProps, IInputProps} from 'native-base';

type IInputFieldText = UseControllerProps<any, any> & {
  //1. TFieldValues, 2. any
  label: string;
  inputStyle?: IInputProps;
  containerStyle?: IFormControlProps;
};

const InputFieldText = ({
  label,
  containerStyle = {mb: 2},
  inputStyle,
  ...propsController
}: IInputFieldText) => {
  return (
    <Controller
      {...propsController}
      defaultValue=""
      render={({
        field: {onChange, onBlur, value},
        fieldState: {error, isDirty, isTouched},
      }) => {
        return (
          <FormControl isInvalid={!!error?.type} {...containerStyle}>
            <FormControl.Label>{label}</FormControl.Label>
            <Input
              type="text"
              size="lg"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              {...inputStyle}
            />
            <InputFieldError msg={error?.message} />
          </FormControl>
        );
      }}
    />
  );
};

export default InputFieldText;
