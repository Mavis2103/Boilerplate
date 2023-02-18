import * as Yup from 'yup';

export const loginValidation = {
  email: Yup.string()
    .required('Vui lòng nhập email')
    .email('Email này không đúng'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
};

export const registerValidation = {
  ...loginValidation,
  fullname: Yup.string().required('Vui lòng nhập họ và tên'),
  phone: Yup.string()
    .length(10, 'Số điện thoại gồm dãy 10 chữ số')
    .matches(/\d/g, 'Số điện thoại không phù hợp')
    .required('Vui lòng nhập số điện thoại'),
  type: Yup.string().required(),
  rooms_number: Yup.number().when('type', {
    is: 'landlord',
    then: Yup.number().required('Vui lòng nhập tổng số phòng cho thuê'),
    otherwise: Yup.number().optional(),
  }),
  region: Yup.string().when('type', {
    is: 'landlord',
    then: Yup.string()
      .equals(['north', 'central', 'south'], 'Vùng miền không hợp lệ')
      .required('Vui lòng chọn vùng miền'),
    otherwise: Yup.string().optional(),
  }),
  accept_policy: Yup.boolean().isTrue(
    'Vui lòng đồng ý chính sách và điều khoản',
  ),
};
