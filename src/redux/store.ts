import {configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';
import rootReducer from './rootReducer';

let reactotronEnhancer;
// if (__DEV__) {
//   reactotronEnhancer = require('../../ReactotronConfig').enhancer;
// }

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  enhancers: reactotronEnhancer ? [reactotronEnhancer] : undefined,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
