import {Box} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {useAuth} from '~hooks';
import {schema} from './Auth.form.schema';
import {InputField, Button} from '~components';

import type {IBoxProps} from 'native-base';
import type {TBodyLogin} from '~apis/userApi';

const AuthForm = ({...props}: IBoxProps) => {
  const {handleLogin} = useAuth();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<TBodyLogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Box w={['3/4', '1/2', '2/5']} {...props}>
      <InputField.Text control={control} name="email" label="Email" />
      <InputField.Text
        control={control}
        name="password"
        label="Mật khẩu"
        containerStyle={{mb: 5}}
      />
      <Button
        alignSelf="stretch"
        onPress={handleSubmit(handleLogin!)}
        loading={isSubmitting}>
        Đăng nhập
      </Button>
    </Box>
  );
};

export default AuthForm;
