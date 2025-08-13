// import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {AxiosError} from 'axios';

export type AnyObject = {[key: string]: any};

export type AllOrNone<T> = T | {[K in keyof T]?: never};

export type ApiResponse = {
  code: number;
  message: string;
};

export type ResponseData<D> = ApiResponse & {
  data: D;
};

export type AppAxiosError = AxiosError<
  ApiResponse & {
    data?: AnyObject;
  }
>;

type Paging = {
  page?: number;
  limit?: number;
};

export type PagingParams<P = void> = P extends void ? Paging | void : Paging & P;

export type PagingResponseData<D> = ApiResponse & {
  code: number;
  message: string;
  data: {
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    data: D[];
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
    total_revenue: number;
    total_unview: number;
  };
};

export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;

// export type FcmMessage = Omit<FirebaseMessagingTypes.RemoteMessage, 'data'> & {
//   data: {
//     _id: string;
//     type: TypeNotifyStatus;
//     id: string;
//     full_name: string;
//     id_send: string;
//   };
// };

export type TypeNotifyStatus = TypeAppNotifyStatus;

export type TypeAppNotifyStatus =
  | 'pickupChild'
  | 'newJob'
  | 'infoUser'
  | 'notfication_defaut'
  | 'deductServiceFee'
  | 'count_message'
  | 'AccountLock'
  | 'newMessage';

export const enum TypeAddress {
  HOME = 'home',
  OTHER = 'other',
  OFFICE = 'office',
}

export const enum Gender {
  FEMALE,
  MALE,
}

export const enum Bool {
  NO,
  YES,
}

export type LinkInternalInfo = {
  _id: string;
  screen: string;
};

export type DeeplinkData = {
  referral_code?: string;
};
