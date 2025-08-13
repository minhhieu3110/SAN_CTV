import {PayloadAction, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {InfoUser} from 'models/user';
import {persistReducer} from 'redux-persist';
import persistStorage from 'redux/persistStorage';
import {defaultState, DefaultState} from 'redux/type';
// import {infoUser, SignIn, SignUp} from './asyncThunk';

type State = {
  accessToken?: string;
  isExpiredToken: boolean;
  userInfo: DefaultState<InfoUser>;
};

const initialState: State = {
  accessToken: undefined,
  isExpiredToken: false,
  userInfo: defaultState,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    expiredToken: (state, action: PayloadAction<boolean>) => {
      state.isExpiredToken = action.payload;
    },
    clearUser: state => {
      state.userInfo = defaultState;
    },
  },
//   extraReducers: builder => {
//     builder
//       .addCase(infoUser.pending, state => {
//         state.userInfo.isLoading = true;
//         state.userInfo.error = undefined;
//       })
//       .addCase(infoUser.fulfilled, (state, action) => {
//         state.userInfo.isLoading = false;
//         state.userInfo.data = action.payload.data;
//       })
//       .addCase(infoUser.rejected, (state, action) => {
//         state.userInfo.isLoading = false;
//         state.userInfo.error = action.payload || action.error;
//       });
//     builder.addMatcher(isAnyOf(SignUp.fulfilled, SignIn.fulfilled), (state, action) => {
//       state.accessToken = action.payload.data?.access_token;
//     });
//   },
});

export const {expiredToken, clearUser} = slice.actions;

const persistConfig = {
  key: 'auth',
  storage: persistStorage,
  whitelist: ['accessToken', 'refreshToken', 'userInfo'],
};

export default persistReducer(persistConfig, slice.reducer);
