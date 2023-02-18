import {Provider} from 'react-redux';
import {Center, NativeBaseProvider, Spinner} from 'native-base';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import store from './stores';
import {theme} from '~configs/theme';
import {AuthProvider} from '~providers/AuthProvider';
import {RouteConfig, RouteWebConfig} from './configs/route';
import {AbilityContext, caslAbility} from '~configs/can';
import {Suspense} from 'react';

if (process.env.NODE_ENV !== 'production' || __DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  const linking: any = {
    prefixes: [
      /* your linking prefixes */
      // 'mychat://',
      // 'https://mychat.com',
      // 'https://*.mychat.com'
    ],
    config: {
      screens: {
        ...RouteWebConfig,
      },
      /* configuration for matching screens with paths */
    },
  };
  const ability = caslAbility();
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer linking={linking}>
            <AbilityContext.Provider value={ability}>
              <AuthProvider>
                <Suspense
                  fallback={
                    <Center flex={1}>
                      <Spinner />
                    </Center>
                  }>
                  <RouteConfig />
                </Suspense>
              </AuthProvider>
            </AbilityContext.Provider>
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
