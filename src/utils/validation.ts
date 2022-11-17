import * as Yup from 'yup';

export const validation = {
  email: Yup.string()
    .required('Vui lòng nhập email')
    .email('Email này không đúng'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
};
