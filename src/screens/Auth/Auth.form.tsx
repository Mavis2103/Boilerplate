import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {Box, Button} from 'native-base';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';

import type {IBoxProps} from 'native-base';

import {validation} from '~utils';
import {InputField} from '~components';

import type {HomeScreenNavigationProp} from '~configs/navigationConfig';

interface FormData {
  email: string;
  password: string;
}

const schema = Yup.object({
  ...validation,
}).required();

const AuthForm = ({...props}: IBoxProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {control, handleSubmit} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
    navigation.navigate('Main');
  };
  return (
    <Box w={['3/4', '1/2', '2/5', '1/5']} {...props}>
      <InputField.Text control={control} name="email" label="Email" />
      <InputField.Text
        control={control}
        name="password"
        label="Mật khẩu"
        containerStyle={{
          mb: 5,
        }}
      />
      <Button
        alignSelf="stretch"
        onPress={handleSubmit(onSubmit)}
        bgColor="tertiary.500">
        Đăng nhập
      </Button>
    </Box>
  );
};

export default AuthForm;
