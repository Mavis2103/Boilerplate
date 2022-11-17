import {Controller} from 'react-hook-form';
import {FormControl, Input, WarningOutlineIcon} from 'native-base';

import type {UseControllerProps} from 'react-hook-form';
import type {IFormControlProps, IInputProps} from 'native-base';

type IInputFieldText = UseControllerProps<any, any> & {
  //1. TFieldValues, 2. any
  label: string;
  inputStyle?: IInputProps;
  containerStyle?: IFormControlProps;
};
const InputField = {
  Text: ({
    label,
    containerStyle,
    inputStyle,
    ...propsControllder
  }: IInputFieldText) => {
    return (
      <Controller
        {...propsControllder}
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
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {error?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          );
        }}
      />
    );
  },
};

export default InputField;
