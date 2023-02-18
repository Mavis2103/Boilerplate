import {loginValidation} from '~utils';
import * as Yup from 'yup';

export const schema = Yup.object({
  ...loginValidation,
}).required();
