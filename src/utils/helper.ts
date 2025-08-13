// import Toast from 'react-native-toast-message';
// import {getVersion} from 'react-native-device-info';
// import {Linking} from 'react-native';
import remoteConfig from './remoteConfig';

export const DEFAULT_LOCALES = 'vi-VN';
export const NUMBER_FORMAT = new Intl.NumberFormat(DEFAULT_LOCALES);

export const convertCurrency = (currency?: number, suffix = '₫', locales = DEFAULT_LOCALES) => {
  const _formatter = locales === DEFAULT_LOCALES ? NUMBER_FORMAT : new Intl.NumberFormat(locales);
  return currency ? `${_formatter.format(currency)}${suffix}` : `0${suffix}`;
};

export const checkIpInternal = (ip: string) => {
  if (__DEV__) {
    return true;
  }
  const internalIps = remoteConfig.getInternalIps();
  if (internalIps && ip) {
    return internalIps.includes(ip);
  }
  return null;
};

export const isValidVietnamPhoneNumber = (phone: string): boolean => {
  const vietnamPhoneRegex = /^(?:\+84|0)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  return vietnamPhoneRegex.test(phone);
};

export const convertTimestampToVNDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
export const URL_FIREBASE = 'https://ims-group-fab81-default-rtdb.asia-southeast1.firebasedatabase.app/';

export const convertTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const utcHours = date.getUTCHours() + 7;
  const hours = (utcHours % 24).toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}h : ${minutes}p`;
};

export const getFormattedTime = (unixTime: number) => {
  return new Date(unixTime * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const getConvertTime = (unixTime: number) => {
  const date = new Date(unixTime * 1000);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
  const isSameYear = date.getFullYear() === now.getFullYear();
  if (isSameYear) {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const removeAccents = (str = '') => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const searchIgnoreCase = (sourceString = '', searchString = '') => {
  if (!sourceString || !searchString) {
    return false;
  }
  return sourceString.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
};

export const searchIgnoreCaseAccent = (sourceString = '', searchString = '') => {
  if (!sourceString || !searchString) {
    return false;
  }
  return searchIgnoreCase(removeAccents(sourceString), removeAccents(searchString));
};

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Chuyển từ giây sang mili-giây
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên +1
  const year = date.getFullYear();

  return `${dayOfWeek}, ${day}/${month}/${year}`;
};

export const months = Array.from({length: 12}, (_, i) => ({
  label: `Tháng ${i + 1}`,
  value: i + 1,
}));

const currentYear = new Date().getFullYear();

export const years = Array.from({length: currentYear - 2015 + 1}, (_, i) => ({
  label: `Năm ${currentYear - i}`,
  value: currentYear - i,
}));
