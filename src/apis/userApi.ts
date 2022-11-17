import {Platform} from 'react-native';

import {MMKV} from '~configs/mmkvConfig.native';
import instance from '~configs/requestConfig';

type TypeBodyLogin = {
  email: string;
  passwrod: string;
};
export const login = async (bodyLogin: TypeBodyLogin) => {
  /* Calling the login function in the userApi.js file. */
  const loginResult = await instance.post('/login', bodyLogin);
  /* Saving the user data in the MMKV store. */
  if (Platform.OS !== 'web') {
    MMKV.setMap('user', loginResult.data);
  }
  /* Returning the data to the reducer. */
  return loginResult.data;
};

export const logout = async () => {
  /* Calling the logout function in the userApi.js file. */
  const logoutResult = await instance.post('/logout');
  /* Clearing the store. */
  if (Platform.OS !== 'web') {
    MMKV.clearStore();
  }
  /* Returning the data to the reducer. */
  return logoutResult.data;
};
