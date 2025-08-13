import { yupResolver } from '@hookform/resolvers/yup'
import { UseFormProps } from 'react-hook-form'
import * as yup from 'yup'
const schema = yup.object({
    fullname: yup
      .string()
      .transform(value => value.trim())
      .required('Tên không được để trống'),
    cccd: yup
      .string()
      .required('CCCD không được để trống')
      .matches(/^\d{9,12}$/, 'CCCD phải có 9 hoặc 12 số'),
    email: yup.string().required('Email không được để trống').email('Email không hợp lệ'),
    password: yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: yup
      .string()
      .transform(value => value.trim())
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp'),
    referral_code: yup.string(),
    address: yup.string().required('Địa chỉ tạm trú không được để trống'),
}).required()
export type FormField = yup.InferType<typeof schema>
export const formConfig :UseFormProps<FormField>={
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
        fullname: '',
        cccd: '',
        email:'',
        password:'',
        confirmPassword:'',
        referral_code:'',
        address:''
    },
}