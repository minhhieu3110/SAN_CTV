// import {RootStackParamList} from 'navigation/type';

export type OTPInfo = {phone: string; otp: number};
export type Employee = {step: Step[]; address: string; hotline: string};
export type CodeOtp = {otp_code: number};
export type Step = {step_name: string; step_sub: StepSub[]; is_completed: number};
export type StepSub = {key: string; title: string; status: {value: number; title: string; color: string}};

export type InfoUser = {
  username: string;
  full_name: string;
  phone: string;
  total_rating: string;
  wcoin: string;
  star: string;
  rankinfo: {
    title: string;
    percent_cumulative: string;
    picture: string;
  };
  picture: string;
  list_service: string[];
  province_work: string;
  district_work: string;
  id: number;
  email: string;
  user_code: string;
  birthday: number;
  allow_notifications: number;
  allow_camera_access: number;
  identification: string;
  is_completed: number;
  maximum_withdrawal: number;
  minimum_recharge: number;
  maximum_recharge: number;
  minimum_withdrawal: number;
  bank_qrcode: string;
};

export type Province = {
  title: string;
  code: string;
};

export type Service = {
  item_id: number;
  title: string;
  title_small: string;
  picture: string;
};

export type UploadFile = {uri: string; type: string; name: string};

export type EntranceTest = {
  group_id: number;
  title: string;
  short: string;
  count_list: number;
  status: {
    title: string;
    status: string;
    color: string;
  };
  list: ListTest[];
};
export type ListTest = {
  item_id: number;
  title: string;
  group_id: number;
  arr_answer: arrAnswer[];
  exam: null | arrAnswer;
};

export type arrAnswer = {
  order: string;
  title: string;
  is_correct: string;
  is_correct_answer: 0 | 1;
  key_answer: string;
  entrance_test_id?: number;
};
export type Submit_answer = {entrance_test_id?: number; answer: string};
