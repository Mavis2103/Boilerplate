import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Auth from '~screens/Auth/Auth';
import {NavigationConfig, NavigationWebConfig} from './navigationConfig';

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

const Main = createNativeStackNavigator<RootStackParamList>();

const RouteConfig = () => {
  return (
    <Main.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="Main" component={NavigationConfig} />
      <Main.Screen name="Auth" component={Auth} />
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
};

export {RouteConfig, RouteWebConfig};
