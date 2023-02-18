import {Box, Flex, Text} from 'native-base';

import {Icon} from '~components';
import {IconType} from '~components/Icon/Icon';

interface IMenuProps {
  list: TItem[];
}

type TItem = {
  icon: string;
  iconType: IconType;
  label: string;
  rules: [string, string];
};

const HomeMenu = ({list}: IMenuProps) => {
  return (
    <Flex direction="row" flexWrap="wrap">
      {list.map((item, item_index) => (
        <HomeMenuItem key={item_index} {...item} />
      ))}
    </Flex>
  );
};

const HomeMenuItem = ({icon, iconType, label, rules}: TItem) => {
  return (
    <Box alignItems="center" width="1/3" my={4}>
      <Icon name={icon} color="black" size={42} type={iconType} />
      <Text>{label}</Text>
    </Box>
  );
};

export default HomeMenu;
