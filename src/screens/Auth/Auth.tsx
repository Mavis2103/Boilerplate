import {useNavigation} from '@react-navigation/native';
import {Heading, Link, Text} from 'native-base';

import {Screen} from '~components';
import {RootScreenNavigationProp} from '~configs/route';
import AuthForm from './Auth.form';

const Auth = () => {
  const navigation = useNavigation<RootScreenNavigationProp>();
  return (
    <Screen.BoxCenter>
      <Heading size="md" fontWeight="600" color="coolGray.800">
        Chào mừng bạn đến với LalaHome
      </Heading>
      <AuthForm my={5} />
      <Text fontWeight="600" fontSize="md" color="coolGray.600">
        Bạn chưa có tài khoản?{' '}
        <Link
          onPress={() => navigation.navigate('Register')}
          _text={{
            fontSize: 'xl',
            _light: {
              color: 'cyan.500',
            },
            color: 'cyan.300',
          }}
          isUnderlined
          _hover={{
            _text: {
              _light: {
                color: 'cyan.600',
              },
              color: 'cyan.400',
            },
          }}>
          Đăng ký ngay
        </Link>
      </Text>
    </Screen.BoxCenter>
  );
};

export default Auth;
