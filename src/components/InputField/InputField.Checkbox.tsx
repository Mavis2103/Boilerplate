import {Controller} from 'react-hook-form';
import {Checkbox, FormControl} from 'native-base';

import InputFieldError from './InputField.Error';

import type {UseControllerProps} from 'react-hook-form';
import type {IFormControlProps, ICheckboxProps} from 'native-base';

type IInputFieldCheckbox = UseControllerProps<any, any> & {
  //1. TFieldValues, 2. any
  label: string;
  inputStyle?: ICheckboxProps;
  containerStyle?: IFormControlProps;
};

const InputFieldCheckbox = ({
  label,
  containerStyle = {mb: 2},
  inputStyle,
  ...propsController
}: IInputFieldCheckbox) => {
  return (
    <Controller
      {...propsController}
      render={({
        field: {onChange, onBlur, value},
        fieldState: {error, isDirty, isTouched},
      }) => {
        return (
          <FormControl isInvalid={!!error?.type} {...containerStyle}>
            <Checkbox
              value={value}
              isChecked={value}
              {...inputStyle}
              onChange={onChange}
              colorScheme="green"
              size="sm"
              _text={{
                fontSize: 'sm',
              }}>
              {label}
            </Checkbox>
            <InputFieldError msg={error?.message} />
          </FormControl>
        );
      }}
    />
  );
};

export default InputFieldCheckbox;
