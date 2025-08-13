import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
const schema =yup.object({
    name:yup.string().transform(value =>value.trim()).required('Số điện thoại không được để trống'),
    password: yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
}).required()
export type FormField =yup.InferType<typeof schema>

export const formConfig: UseFormProps<FormField>={
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
        name: '', password: ''
    }
}