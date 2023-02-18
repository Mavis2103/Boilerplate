import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import reactotron from 'reactotron-react-native';
import {useAuth} from '~hooks';

import Auth from '~screens/Auth/Auth';
import RegisterScreen from '~screens/Register/Register';
import {NavigationConfig, NavigationWebConfig} from './navigation';

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  Register: undefined;
};

export type RootScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Main = createNativeStackNavigator<RootStackParamList>();

const RouteConfig = () => {
  const {isAuthenticated} = useAuth();
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <Main.Screen name="Main" component={NavigationConfig} />
      ) : (
        <>
          <Main.Screen name="Auth" component={Auth} />
          <Main.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Main.Navigator>
  );
};

const RouteWebConfig = {
  Main: {
    screens: {
      ...NavigationWebConfig,
    },
  },
  Auth: '/login',
  Register: '/register',
};

export {RouteConfig, RouteWebConfig};
