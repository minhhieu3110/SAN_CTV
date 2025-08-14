import { ApiResponse, ResponseData } from 'models/common';
import { CodeOtp, Province } from 'models/user';
import { createAppAsyncThunk, handleThunkError } from 'redux/helper';
import api from 'utils/api';
export const checkPhone = createAppAsyncThunk(
    'check-phone',
    async (body: { phone: string }, thunkApi) => {
        try {
            const result = await api.postRaw<ApiResponse>(
                'employee/check-phone',
                body,
            );
            return result;
        } catch (error) {
            return handleThunkError(thunkApi, error);
        }
    },
);
export const sendOTP = createAppAsyncThunk(
    'send-otp',
    async (body: { phone: string; type: 'signup' }, thunkApi) => {
        try {
            const result = await api.postRaw<ResponseData<CodeOtp>>(
                'employee/send-otp',
                body,
            );
            return result;
        } catch (error) {
            handleThunkError(thunkApi, error);
        }
    },
);
export const verifyOTP = createAppAsyncThunk(
    'verifyOTP',
    async (body: { phone: string; otp_code: string }, thunkApi) => {
        try {
            const result = api.postRaw<ApiResponse>('employee/verify-otp', body);
            return result;
        } catch (error) {
            handleThunkError(thunkApi, error);
        }
    },
);
export const getProvince = createAppAsyncThunk(
    'get-province',
    async (_, thunkApi) => {
        try {
            const result = api.get<ResponseData<Province[]>>('get-province');
            return result;
        } catch (error) {
            handleThunkError(thunkApi, error);
        }
    },
);
export const getWard = createAppAsyncThunk(
    'get-ward',
    async (params: { province_code: string }, thunkApi) => {
        try {
            const result = api.get<ResponseData<Province[]>>('get-ward', params);
            return result;
        } catch (error) {
            handleThunkError(thunkApi, error);
        }
    },
);
export const signup = createAppAsyncThunk(
    'signup',
    async (
        body: {
            full_name: string;
            username: string;
            identification: string;
            password: string;
            email: string;
            refferal_code: string;
            device_name: string;
            device_token: string;
            birthday: string;
            province: string;
            ward: string;
            address: string;
        },
        thunkApi,
    ) => {
        try {
            const result = api.postRaw<ResponseData<{ access_token: string }>>('employee/signup', body)
            console.log(result);

            return result
        } catch (error) {
            handleThunkError(thunkApi, error)
        }
    },
);
