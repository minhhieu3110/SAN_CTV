import RC from '@react-native-firebase/remote-config';

type AppDeeplinkConfig = {
  /**
   * key_live_xxxx
   * @see https://dashboard.branch.io/account-settings/profile
   */
  key: string;
  /**
   * 123456xxxx
   * @see https://dashboard.branch.io/account-settings/profile
   */
  app_id: string;
  /**
   * api_app_xxxx
   * @see https://dashboard.branch.io/account-settings/user
   */
  access_token: string;
  /**
   * secret_live_xxxx
   * @see https://dashboard.branch.io/account-settings/profile
   */
  secret: string;
};

type App = 'main' | 'driver' | 'merchant';

const remoteConfig = {
  getTimeFindDriver: () => {
    return RC().getNumber('time_find_driver') || 300; // 5 minutes;
  },
  getShowOtp: () => {
    return RC().getBoolean('show_otp') || false;
  },
  getCurrentStoreVersion: () => {
    const current_version_store = RC().getString('current_version_store');
    if (current_version_store) {
      return JSON.parse(current_version_store) as {version: string; mandatory: boolean};
    }
    return null;
  },
  getGoongManyApiKey: () => {
    return RC().getString('goong_many_api_key');
  },
  getGoongApiKey: () => {
    return RC().getString('goong_api_key');
  },
  getInternalIps: () => {
    return RC().getString('internal_ips');
  },
  getHideUnwanted: () => {
    return RC().getBoolean('hide_unwanted');
  },
  getHideUi: () => {
    return RC().getBoolean('hide_ui');
  },
  getAccountEkyc: () => {
    const account = RC().getString('account_ekyc');
    if (account) {
      return JSON.parse(account) as {
        username: string;
        password: string;
        tokenId: string;
        tokenKey: string;
      };
    }
    return null;
  },
  getAFConfig: () => {
    const af_config = RC().getString('apps_flyer');
    if (af_config) {
      return JSON.parse(af_config) as {
        dev_key: string;
        app_id: string;
        link_template_id: string;
      };
    }
    return null;
  },
  getDeeplinkConfig: (app?: App) => {
    const deeplink_config = RC().getString('deeplink');
    if (deeplink_config) {
      const config = JSON.parse(deeplink_config) as {
        [key in App]: AppDeeplinkConfig;
      };
      return config[app || 'main'];
    }
    return null;
  },
  setup: async () => {
    // const DEFAULT_VALUE = {
    // };
    // await RC().setDefaults(DEFAULT_VALUE);
    await RC().setConfigSettings({
      minimumFetchIntervalMillis: 5 * 60 * 1000,
    });
    await RC().fetchAndActivate();
  },
};

export default remoteConfig;
