import {IconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export type IconType = 'FontAwesome5' | 'Ionicons';
interface IIconProps extends IconProps {
  type: IconType;
}

const Icon = ({type, ...props}: IIconProps) => {
  return {
    FontAwesome5: <FontAwesome5 size={24} {...props} />,
    Ionicons: <Ionicons size={24} {...props} />,
  }[type];
};

export default Icon;
