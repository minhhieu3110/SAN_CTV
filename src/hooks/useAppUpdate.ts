import {useCallback} from 'react';

interface UpdateResponse {
  assets_url: string;
  bundle_url: string;
  version: string;
}

interface UseAppUpdateReturn {
  currentVersion: string;
  compareVersions: (current: string, remote: string) => boolean;
  hasUpdate: (serverData: UpdateResponse) => boolean;
}

export const useAppUpdate = (): UseAppUpdateReturn => {
  const currentVersion = '1.0.0';

  const compareVersions = useCallback((current: string, remote: string): boolean => {
    try {
      if (!current || !remote) {
        return false;
      }
      if (current === remote) {
        return false;
      }
      const currentParts = current.split('.').map(part => {
        const num = parseInt(part.replace(/[^\d]/g, ''), 10);
        return isNaN(num) ? 0 : num;
      });
      const remoteParts = remote.split('.').map(part => {
        const num = parseInt(part.replace(/[^\d]/g, ''), 10);
        return isNaN(num) ? 0 : num;
      });
      const maxLength = Math.max(currentParts.length, remoteParts.length);
      while (currentParts.length < maxLength) currentParts.push(0);
      while (remoteParts.length < maxLength) remoteParts.push(0);
      for (let i = 0; i < maxLength; i++) {
        const currentPart = currentParts[i];
        const remotePart = remoteParts[i];
        if (remotePart > currentPart) {
          return true;
        }
        if (remotePart < currentPart) {
          return false;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }, []);

  const hasUpdate = useCallback(
    (serverData: UpdateResponse | any): boolean => {
      try {
        if (!serverData?.version) {
          return false;
        }
        const hasUpdateResult = compareVersions(currentVersion, serverData.version);
        return hasUpdateResult;
      } catch (error) {
        return false;
      }
    },
    [currentVersion, compareVersions],
  );

  return {
    currentVersion,
    compareVersions,
    hasUpdate,
  };
};
