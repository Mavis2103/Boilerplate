import {useContext} from 'react';
import {AuthContext, ContextAuth} from '~providers/AuthProvider';

const useAuth = (): ContextAuth => {
  const context = useContext<ContextAuth>(AuthContext);
  return context;
};

export default useAuth;
