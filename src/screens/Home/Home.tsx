import {Link} from '@react-navigation/native';
import {Box} from 'native-base';

const Home = () => {
  return (
    <Box flex={1} bg="red.400" alignItems="center" justifyContent="center">
      <Link to={{screen: 'Setting'}}>Setting</Link>
    </Box>
  );
};

export default Home;
