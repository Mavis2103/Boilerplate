import {Link} from '@react-navigation/native';
import {Box, Button, Text} from 'native-base';
import {useAuth} from '~hooks';

const TransactionsScreen = () => {
  const {handleLogout} = useAuth();
  return (
    <Box flex={1} bg="orange.400" alignItems="center" justifyContent="center">
      Thu chi
    </Box>
  );
};

export default TransactionsScreen;
