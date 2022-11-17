import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import type {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Home from '~screens/Home/Home';
import Setting from '~screens/Setting/Setting';
import {RootStackParamList} from './routeConfig';

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Setting: undefined;
};

export type HomeScreenNavigationProp = CompositeNavigationProp<
  MaterialBottomTabNavigationProp<BottomTabNavigatorParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const BottomTab =
  createMaterialBottomTabNavigator<BottomTabNavigatorParamList>();

const NavigationConfig = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Setting" component={Setting} />
    </BottomTab.Navigator>
  );
};

const NavigationWebConfig = {
  Home: '/',
  Setting: '/setting',
};

export {NavigationConfig, NavigationWebConfig};
