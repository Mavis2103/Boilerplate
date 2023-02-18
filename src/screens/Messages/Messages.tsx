import {Link} from '@react-navigation/native';
import {Box, Button, Text} from 'native-base';
import {useAuth} from '~hooks';

const ManagementsScreen = () => {
  const {handleLogout} = useAuth();
  return (
    <Box flex={1} bg="orange.400" alignItems="center" justifyContent="center">
      Tin nhắn
    </Box>
  );
};

export default ManagementsScreen;
