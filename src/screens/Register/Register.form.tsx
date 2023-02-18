import * as Yup from 'yup';
import {Box, KeyboardAvoidingView, ScrollView} from 'native-base';
import {useForm, useWatch} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';

import type {IBoxProps} from 'native-base';

import {InputField, Button} from '~components';
import {registerValidation} from '~utils';

import type {HomeScreenNavigationProp} from '~configs/navigation';
import {TBodyRegister, userApi} from '~apis/userApi';
import reactotron from 'reactotron-react-native';
import {useEffect} from 'react';

const schema = Yup.object({
  ...registerValidation,
}).required();

const RegisterForm = ({...props}: IBoxProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    resetField,
    getFieldState,
    formState: {isSubmitting, errors},
  } = useForm<TBodyRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      password: '',
      type: 'landlord',
      accept_policy: false,
    },
  });
  const type = useWatch({
    control,
    name: 'type',
  });
  useEffect(() => {
    if (type === 'tenant') {
      resetField('region');
      resetField('rooms_number');
    }
  }, [type]);

  const onSubmit = async (bodyRegister: TBodyRegister) => {
    try {
      await userApi.register(bodyRegister);
      navigation.navigate('Auth');
    } catch (error) {
      reactotron.error!(error, []);
    }
  };
  return (
    <Box w={['5/6', '1/2', '2/5']} {...props}>
      <InputField.RadioCustom
        isHorizontal
        control={control}
        options={[
          {label: 'Người thuê', value: 'tenant'},
          {label: 'Người cho thuê', value: 'landlord'},
        ]}
        name="type"
        label="Kiểu người dùng"
      />
      <InputField.Text control={control} name="fullname" label="Họ và tên" />
      <InputField.Text control={control} name="email" label="Email" />
      <InputField.Text control={control} name="phone" label="Số điện thoại" />
      <InputField.Text control={control} name="password" label="Mật khẩu" />
      {type === 'landlord' && (
        <>
          <InputField.Text
            control={control}
            name="rooms_number"
            label="Tổng số phòng cho thuê"
          />
          <InputField.Radio
            isHorizontal
            control={control}
            options={[
              {label: 'Miền Bắc', value: 'north'},
              {label: 'Miền Trung', value: 'central'},
              {label: 'Miền Nam', value: 'south'},
            ]}
            name="region"
            label="Vùng miền"
          />
        </>
      )}
      <InputField.Checkbox
        control={control}
        name="accept_policy"
        label="Tôi đồng ý với chính sách & điều khoản của Lalahome"
        containerStyle={{
          mb: 5,
          mt: 3,
        }}
      />
      <Button
        alignSelf="stretch"
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}>
        Đăng ký
      </Button>
    </Box>
  );
};

export default RegisterForm;
