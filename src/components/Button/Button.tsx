import {Button as ButtonNB, Spinner} from 'native-base';
import type {IButtonProps} from 'native-base';

type IButtonPropsCustom = IButtonProps & {
  loading: boolean;
};

const Button = ({loading, children, ...props}: IButtonPropsCustom) => {
  return (
    <ButtonNB bgColor="blue.500" {...props}>
      {loading ? <Spinner color="emerald.500" /> : children}
    </ButtonNB>
  );
};

export default Button;
