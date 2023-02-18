import {Controller} from 'react-hook-form';
import {Button, FormControl, Radio} from 'native-base';

import InputFieldError from './InputField.Error';

import type {UseControllerProps} from 'react-hook-form';
import type {IFormControlProps, IRadioProps} from 'native-base';
import {Component} from 'react';

type Option = {
  label: string;
  value: string;
};

type IInputFieldRadio = UseControllerProps<any, any> & {
  //1. TFieldValues, 2. any
  label: string;
  isHorizontal?: boolean;
  options: Option[];
  defaultValue?: unknown;
  inputStyle?: IRadioProps;
  containerStyle?: IFormControlProps;
};

const InputFieldRadio = ({
  label,
  defaultValue,
  isHorizontal,
  options,
  containerStyle = {mb: 3},
  inputStyle,
  ...propsController
}: IInputFieldRadio) => {
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
            <Radio.Group
              name={propsController.name}
              accessibilityLabel={label.toLocaleLowerCase()}
              value={value}
              {...inputStyle}
              flexDirection={isHorizontal ? 'row' : 'column'}
              justifyContent={isHorizontal ? 'space-between' : undefined}
              onChange={onChange}>
              {options.map(option => (
                <Radio key={option.value} value={option.value} my="1" size="sm">
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            <InputFieldError msg={error?.message} />
          </FormControl>
        );
      }}
    />
  );
};

const InputFieldRadioCustom = ({
  label,
  defaultValue,
  isHorizontal,
  options,
  containerStyle = {mb: 3},
  inputStyle,
  ...propsController
}: IInputFieldRadio) => {
  return (
    <Controller
      {...propsController}
      render={({
        field: {onChange, onBlur, value},
        fieldState: {error, isDirty, isTouched},
      }) => {
        return (
          <FormControl isInvalid={!!error?.type} {...containerStyle}>
            <Button.Group isAttached width="full">
              {options.map(option => (
                <Button
                  key={option.value}
                  bgColor={
                    value === option.value ? 'tertiary.400' : 'tertiary.300'
                  }
                  onPress={() => onChange(option.value)}
                  flex={1}>
                  {option.label}
                </Button>
              ))}
            </Button.Group>
          </FormControl>
        );
      }}
    />
  );
};

export {InputFieldRadio, InputFieldRadioCustom};
