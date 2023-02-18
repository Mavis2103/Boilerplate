import {Link} from '@react-navigation/native';
import {Box, Flex, Heading, Text} from 'native-base';

import HomeMenu from './Home.menu';
import HomeAnalysis from './Home.analysis';
import {Can} from '~configs/can';
import {Icon, Screen, Box as BoxCustom} from '~components';

const HomeScreen = () => {
  return (
    <Screen.ScrollView>
      <Flex
        direction="row"
        justifyContent="space-between"
        bgColor="tertiary.400"
        py={10}
        px={5}>
        <Box>
          <Text color="lightText">Xin chào</Text>
          <Heading color="lightText" size="sm">
            Trần Anh Quân
          </Heading>
        </Box>
        <Flex direction="row" alignItems="center">
          <Icon name="cog" type="FontAwesome5" />
          <Icon name="bell" type="FontAwesome5" style={{marginLeft: 20}} />
        </Flex>
      </Flex>
      <BoxCustom mb={0}>
        {/* Landlord */}
        <HomeAnalysis
          list={[
            {label: 'Số nhà', value: 0},
            {label: 'Số người thuê', value: 0},
            {label: 'Số phòng', value: 0},
            {label: 'Số phòng trống', value: 0},
          ]}
        />
      </BoxCustom>
      <BoxCustom>
        <HomeMenu
          list={[
            {
              icon: 'bulb',
              label: 'Dịch vụ',
              rules: ['a', 'I'],
              iconType: 'Ionicons',
            },
            {
              icon: 'bolt',
              label: 'Chốt điện',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'file-invoice-dollar',
              label: 'Hoá đơn',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'user-friends',
              label: 'Người thuê',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'exclamation-triangle',
              label: 'Sự cố',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'handshake',
              label: 'Hợp đồng',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'dollar-sign',
              label: 'Cọc giữ chỗ',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'file-invoice',
              label: 'Sổ nợ',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'suitcase-rolling',
              label: 'Đẩy phòng',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'question-circle',
              label: 'Hướng dẫn',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            },
            {
              icon: 'users',
              label: 'Tài khoản',
              rules: ['a', 'I'],
              iconType: 'FontAwesome5',
            }, //tenant
          ]}
        />
      </BoxCustom>
    </Screen.ScrollView>
  );
};

export default HomeScreen;
