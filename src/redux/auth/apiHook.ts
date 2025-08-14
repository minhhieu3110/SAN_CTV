import { createMutationHook, createQueryHook } from "redux/helper";
import { checkPhone, getProvince, getWard, sendOTP, signup, verifyOTP } from "./asyncThunk";

export const useCheckPhone = createMutationHook(checkPhone)
export const useSendOTP = createQueryHook(sendOTP)
export const useVerifyOTP = createMutationHook(verifyOTP)
export const useGetProvince = createQueryHook(getProvince)
export const useGetWard = createQueryHook(getWard)
export const useSignUp = createMutationHook(signup)