import { createMutationHook, createQueryHook } from "redux/helper";
import { checkPhone, getProvince, getWard, sendOTP, verifyOTP } from "./asyncThunk";

export const useCheckPhone = createMutationHook(checkPhone)
export const useSendOTP = createQueryHook(sendOTP)
export const useVerifyOTP = createMutationHook(verifyOTP)
export const useGetProvince = createQueryHook(getProvince)
export const useGetWard = createQueryHook(getWard)