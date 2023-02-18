import {lazy} from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import type {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

const HomeScreen = lazy(() => import('~screens/Home/Home'));
const MessagesScreen = lazy(() => import('~screens/Messages/Messages'));
const TransactionsScreen = lazy(
  () => import('~screens/Transactions/Transactions'),
);
const BuildingsScreen = lazy(() => import('~screens/Buildings/Buildings'));
const ManagementsScreen = lazy(
  () => import('~screens/Managements/Managements'),
);
import {RootStackParamList} from './route';
import {Icon} from '~components';

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Messages: undefined;
  Buildings: undefined;
  Transactions: undefined;
  Managements: undefined;
};

export type HomeScreenNavigationProp = CompositeNavigationProp<
  MaterialBottomTabNavigationProp<BottomTabNavigatorParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const BottomTab =
  createMaterialBottomTabNavigator<BottomTabNavigatorParamList>();

const tabs = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: 'home',
    label: 'Trang chủ',
  },
  {
    name: 'Buildings',
    component: BuildingsScreen,
    icon: 'business',
    label: 'Toà nhà',
  },
  {
    name: 'Messages',
    component: MessagesScreen,
    icon: 'chatbubbles',
    label: 'Tin nhắn',
  },
  {
    name: 'Transactions',
    component: TransactionsScreen,
    icon: 'wallet',
    label: 'Thu chi',
  },
  {
    name: 'Managements',
    component: ManagementsScreen,
    icon: 'people',
    label: 'Quản lý',
  },
];

const NavigationConfig = () => {
  return (
    <BottomTab.Navigator barStyle={{backgroundColor: '#fff'}} shifting={false}>
      {tabs.map(({name, component, icon, label}) => (
        <BottomTab.Screen
          name={name as keyof BottomTabNavigatorParamList}
          component={component}
          options={{
            tabBarLabel: label,
            tabBarIcon: ({color, focused}) => (
              <Icon
                name={`${icon}${focused ? '' : '-outline'}`}
                type="Ionicons"
              />
            ),
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
};

const NavigationWebConfig = {
  Home: '/',
  Messages: '/messages',
  Buildings: '/buildings',
  Transactions: '/transactions',
  Managements: '/managements',
};

export {NavigationConfig, NavigationWebConfig};
