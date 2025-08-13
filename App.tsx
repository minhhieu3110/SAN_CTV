import { PortalProvider } from '@gorhom/portal';
import { RootStack } from 'navigation/RootStack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'redux/store';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PortalProvider>
          <RootStack />
        </PortalProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
export default App;
