import {DeeplinkData, LinkInternalInfo} from 'models/common';
import {navigationRoot} from 'navigation/navigationRef';
import queryString from 'query-string';
import {useEffect, useState} from 'react';
import branch from 'react-native-branch';
import storage from 'until/storage';

export const useLinkOpenApp = () => {
  useEffect(() => {
    const unsubscribe = branch.subscribe({
      onOpenStart: () => {},
      onOpenComplete: res => {
        if (res.error) {
          if (__DEV__) {
            console.error('Error from Branch opening uri ' + res.uri);
          }
          return;
        }
        if (res.uri) {
          if (__DEV__) {
            console.log('ON DEEPLINK', res);
          }
        }
        const linkData = res.params?.custom_data as DeeplinkData | undefined;
        if (linkData?.referral_code) {
          if (__DEV__) {
            console.log('DEEPLINK DATA', linkData);
          }
          storage.setValue('itemCode', linkData?.referral_code);
        }
      },
    });
    return unsubscribe;
  }, []);
};
