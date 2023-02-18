import {Box, ScrollView} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

import type {IBoxProps, IScrollViewProps} from 'native-base';
import {scale} from '~utils';

const Screen = {
  Box: ({children, ...props}: IBoxProps) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Box {...props}>{children}</Box>
      </SafeAreaView>
    );
  },
  BoxCenter: ({children, ...props}: IBoxProps) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Box flex={1} justifyContent="center" alignItems="center" {...props}>
          {children}
        </Box>
      </SafeAreaView>
    );
  },
  ScrollView: ({children, ...props}: IScrollViewProps) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView flex={1} {...props}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  },
  ScrollViewCenter: ({children, ...props}: IScrollViewProps) => {
    return (
      <ScrollView
        contentContainerStyle={{height: scale.heightWindow}}
        {...props}>
        <Box flex={1} justifyContent="center" alignItems="center">
          {children}
        </Box>
      </ScrollView>
    );
  },
};

export default Screen;
