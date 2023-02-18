import instance from '~configs/request/request';

export type TBodyLogin = {
  email: string;
  password: string;
};

export type TBodyRegister = {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  type: 'landlord' | 'tenant';
  rooms_number?: string; //landlord
  region?: 'north' | 'central' | 'south'; //landlord
  accept_policy: boolean;
};

export const userApi = {
  login: (bodyLogin: TBodyLogin) => instance.post('/login', bodyLogin),
  logout: (refreshToken: string) => instance.post('/logout', {refreshToken}),
  register: (bodyRegister: TBodyRegister) =>
    instance.post('/register', bodyRegister),
};
