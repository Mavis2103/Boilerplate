import {Heading} from 'native-base';

import {Screen} from '~components';
import AuthForm from './Auth.form';

const Auth = () => {
  return (
    <Screen.BoxCenter>
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>
      <AuthForm mt={5} />
    </Screen.BoxCenter>
  );
};

export default Auth;
