import {Box as BoxNB, IBoxProps, Card} from 'native-base';
import {Shadow} from 'react-native-shadow-2';
const Box = ({children, ...props}: IBoxProps) => {
  return (
    <BoxNB m={5} {...props}>
      <Shadow
        distance={5}
        style={{borderRadius: 10, paddingVertical: 10, width: '100%'}}>
        {children}
      </Shadow>
    </BoxNB>
  );
};

export default Box;
