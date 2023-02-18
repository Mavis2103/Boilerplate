import {useNavigation} from '@react-navigation/native';
import {createContext, useContext, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import reactotron from 'reactotron-react-native';
import {TBodyLogin, userApi} from '~apis/userApi';
import {AbilityContext} from '~configs/can';
import {HomeScreenNavigationProp} from '~configs/navigation';

export interface ContextAuth {
  handleLogin?: (data: TBodyLogin) => void;
  handleLogout?: () => void;
  getToken?: (key: 'refresh-token' | 'access-token') => Promise<string>;
  isAuthenticated?: boolean;
}

export const AuthContext = createContext<ContextAuth>({});

export const AuthProvider = ({children}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const abilityContext = useContext(AbilityContext);
  const getToken = async (
    key: 'refresh-token' | 'access-token',
  ): Promise<string> => {
    let token: any = '';
    if (Platform.OS === 'web') {
      token = localStorage.getItem(key);
    } else {
      const {MMKV} = await import('~configs/mmkv.native');
      token = await MMKV.getStringAsync(key);
    }
    return token;
  };

  const setToken = (access_token: string, refresh_token: string): void => {
    if (Platform.OS === 'web') {
      localStorage.setItem('refresh-token', refresh_token);
      localStorage.setItem('access-token', access_token);
    } else {
      import('~configs/mmkv.native').then(async ({MMKV}) => {
        await MMKV.setStringAsync('refresh-token', refresh_token);
        await MMKV.setStringAsync('access-token', access_token);
      });
    }
  };

  const setUser = (data: any) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(
        'user',
        JSON.stringify({
          roles: data.roles?.M,
        }),
      );
    } else {
      import('~configs/mmkv.native').then(async ({MMKV}) => {
        await MMKV.setMapAsync('user', {
          roles: data.roles?.M,
        });
      });
    }
  };

  const getUser = async () => {
    if (Platform.OS === 'web') {
      return JSON.parse(localStorage.getItem('user') as string);
    } else {
      const {MMKV} = await import('~configs/mmkv.native');
      return await MMKV.getMapAsync('user');
    }
  };

  const handleLogin = async (bodyLogin: TBodyLogin) => {
    try {
      reactotron.log!(bodyLogin);
      const {data} = await userApi.login(bodyLogin);
      reactotron.log!(data);
      setToken(data.access_token, data.refresh_token);
      setUser(data);
      abilityContext?.update(data.roles?.M);
      setIsAuthenticated(true);
      navigation.navigate('Main');
    } catch (error) {
      reactotron.warn!(error);
    }
  };

  const handleLogout = async () => {
    try {
      let refreshToken: string = await getToken('refresh-token');
      reactotron.log!(refreshToken);
      setToken('', '');
      setIsAuthenticated(false);
      await userApi.logout!(refreshToken);
      navigation.navigate('Auth');
    } catch (error) {
      reactotron.warn!(error);
    }
  };

  useEffect(() => {
    (async () => {
      // Run when open app
      const rft = await getToken('refresh-token');
      const act = await getToken('access-token');
      const user = await getUser();
      if (!!rft && !!act) {
        setIsAuthenticated(true);
        abilityContext?.update(user?.roles);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{handleLogin, handleLogout, getToken, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};
