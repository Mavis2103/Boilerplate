import {FormControl, WarningOutlineIcon} from 'native-base';

const InputFieldError = ({msg}: {msg: string | undefined}) => {
  return (
    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
      {msg}
    </FormControl.ErrorMessage>
  );
};

export default InputFieldError;
