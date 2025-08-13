import {isEqual} from 'lodash';
import {DependencyList, EffectCallback, useCallback, useEffect, useRef, useState} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import {getDeviceName} from 'react-native-device-info';
import {AuthorizationStatus, getMessaging} from '@react-native-firebase/messaging';
import {getApp} from '@react-native-firebase/app';
// import branch from 'react-native-branch';

const useDeepCompareMemoize = <T>(value: T): T => {
  const ref = useRef<T>(value);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

export const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
};

export const useFCMToken = () => {
  const [tokenApp, setTokenApp] = useState<string | undefined>();

  useEffect(() => {
    const setupFCM = async () => {
      try {
        const app = getApp();
        const messaging = getMessaging(app);

        const authStatus = await messaging.requestPermission();
        const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.warn('⚠️ Người dùng chưa cấp quyền nhận thông báo');
          return;
        }

        if (!messaging.isDeviceRegisteredForRemoteMessages) {
          await messaging.registerDeviceForRemoteMessages();
          console.log('✅ Đã đăng ký thiết bị cho Remote Messages');
        }

        const token = await messaging.getToken();
        console.log('📲 FCM Token:', token);
        setTokenApp(token);
      } catch (error) {
        console.error('❌ Lỗi khi lấy FCM Token:', error);
      }
    };

    setupFCM();
  }, []);

  return tokenApp;
};

export const useNameDevice = () => {
  const [nameDevice, setNameDevice] = useState<string | undefined>();
  useEffect(() => {
    getDeviceName().then(setNameDevice);
  }, []);

  return nameDevice;
};

export const useSetAppColorScheme = (scheme: ColorSchemeName = 'light') => {
  useEffect(() => {
    Appearance.setColorScheme(scheme);
  }, [scheme]);
};

type LinkParams = {
  screen: string;
  _id: string;
};

// export function useCreateBranchLink() {
//   const createLink = useCallback(async ({screen, _id}: LinkParams): Promise<string | null> => {
//     try {
//       const buo = await branch.createBranchUniversalObject(`item/${_id}`, {
//         title: 'Chia sẻ nội dung',
//         contentDescription: `Mở ứng dụng CTV SAN để nhận ngay thu nhập hấp dẫn`,
//         contentMetadata: {
//           customMetadata: {
//             screen,
//             _id: _id,
//           },
//         },
//       });
//       const {url} = await buo.generateShortUrl();
//       return url;
//     } catch (err) {
//       return null;
//     }
//   }, []);

//   return {createLink};
// }
