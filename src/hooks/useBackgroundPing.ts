import {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useAppSelector} from 'redux/hooks';

export const useBackgroundPing = (requestFunction: () => void): void => {
  const backgroundIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const foregroundIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const user = useAppSelector(state => state.auth.userInfo.data);

  useEffect(() => {
    if (!user?.id || user?.is_online !== 1) {
      return;
    }

    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      console.log('App state changed from', appStateRef.current, 'to', nextAppState);

      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App came to foreground');
        stopBackgroundPing();
        startForegroundPing();
      } else if (appStateRef.current === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('App went to background');
        stopForegroundPing();
        startBackgroundPing();
      }

      appStateRef.current = nextAppState;
    };

    const startBackgroundPing = (): void => {
      console.log('Starting background ping...');

      const scheduleNextPing = (): void => {
        if (user?.is_online === 1) {
          console.log('Executing background ping');
          requestFunction();
          backgroundIntervalRef.current = setTimeout(scheduleNextPing, 60000);
        }
      };

      scheduleNextPing();
    };

    const stopBackgroundPing = (): void => {
      if (backgroundIntervalRef.current) {
        console.log('Stopping background ping...');
        clearTimeout(backgroundIntervalRef.current);
        backgroundIntervalRef.current = null;
      }
    };

    const startForegroundPing = (): void => {
      console.log('Starting foreground ping...');
      foregroundIntervalRef.current = setInterval(() => {
        console.log('Executing foreground ping');
        requestFunction();
      }, 60000);
    };

    const stopForegroundPing = (): void => {
      if (foregroundIntervalRef.current) {
        console.log('Stopping foreground ping...');
        clearInterval(foregroundIntervalRef.current);
        foregroundIntervalRef.current = null;
      }
    };

    startForegroundPing();

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return (): void => {
      subscription?.remove();
      stopBackgroundPing();
      stopForegroundPing();
    };
  }, [user?.id, user?.is_online, requestFunction]);

  useEffect(() => {
    return (): void => {
      if (backgroundIntervalRef.current) {
        clearTimeout(backgroundIntervalRef.current);
      }
      if (foregroundIntervalRef.current) {
        clearInterval(foregroundIntervalRef.current);
      }
    };
  }, []);
};
