import {Link} from '@react-navigation/native';
import {Box, Button, Text} from 'native-base';

const Setting = () => {
  return (
    <Box flex={1} bg="orange.400" alignItems="center" justifyContent="center">
      <Link to={{screen: 'Home'}}>Home</Link>
    </Box>
  );
};

export default Setting;
