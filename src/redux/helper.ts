import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunk, GetThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {AnyObject, ApiResponse, AppAxiosError, PagingParams, PagingResponseData, ResponseData} from 'models/common';
import {AppDispatch, RootState} from 'redux/store';
import {AsyncThunkConfig} from './type';
import {useDeepCompareEffect} from 'hooks';
import {useCallback, useEffect, useState} from 'react';
import {useAppDispatch} from './hooks';
import Toast from 'react-native-toast-message';
import { SKIP_TOKEN } from './constant';
// import {expiredToken} from './auth/slice';
// import {SKIP_TOKEN} from './constant';

export const createAppAsyncThunk = createAsyncThunk.withTypes<AsyncThunkConfig>();

export const handleThunkError = (
  thunkApi: GetThunkAPI<{state: RootState; dispatch: AppDispatch}>,
  err: unknown,
  isShowToast?: boolean,
) => {
  let error = err as AppAxiosError;
  if (error.response) {
    switch (error.response.status) {
      case 500:
        Toast.show({
          type: 'ToastMessage',
          text1: 'Lỗi server',
          text2: error.response.data.message,
          props: {status: 'error'},
        });
        break;
      // case 401:
      //   thunkApi.dispatch(expiredToken(true));
      //   // thunkApi.dispatch(clearUser());
      //   break;
      case 200:
        const {code, message, data} = error.response.data;
        if (code === 403) {
          // thunkApi.dispatch(expiredToken(true));
        }
        if (code === 400 && isShowToast) {
          Toast.show({
            type: 'ToastMessage',
            text1: code.toString(),
            text2: data ? Object.values(data || {})[0][0] : message,
            props: {status: 'error'},
          });
        }
        break;
      default:
        if (isShowToast) {
          Toast.show({
            type: 'ToastMessage',
            text1: 'Lỗi không xác định',
            props: {status: 'error'},
          });
        }
        break;
    }
    return thunkApi.rejectWithValue(error.response.data);
  } else {
    throw err;
  }
};

export const createQueryPagingHook =
  <D, R extends PagingResponseData<D>, A extends PagingParams>(asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>) =>
  (params: A, {skip = false} = {}) => {
    const dispatch = useAppDispatch();
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [numShow, setNumShow] = useState(0);
    const [total, setTotal] = useState(0);
    // const [isLoading, setIsLoading] = useState(!(skip || params === SKIP_TOKEN));
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [data, setData] = useState<R['data']>();
    const [error, setError] = useState<unknown>();
    const [countRefresh, setCountRefresh] = useState(0);
    const [pageRequest, setPageRequest] = useState(1);
    const [result, setResult] = useState<R>();

    const request = useCallback(
      async (params: A) => {
        try {
          const page = params?.page;
          if (page && page > 1) {
            setIsLoadMore(true);
          } else {
            // setIsLoading(true);
          }
          setError(undefined);
          const res = await dispatch(asyncThunk(params)).unwrap();
          if (!res || !res.data || !Array.isArray(res.data.data)) {
            throw new Error('Invalid response structure');
          }

          setData(prevData => {
            return prevData && res.data.current_page > 1
              ? {
                  ...res.data,
                  data: [...prevData.data, ...res.data.data],
                }
              : res.data;
          });
          // setIsLoading(false);
          setIsLoadMore(false);
          setNumShow(res.data.per_page);
          setPage(res.data.current_page);
          setTotal(res.data.total);
          setTotalPage(res.data.last_page);
          setResult(res);

          return res;
        } catch (e) {
          console.error('Error in request:', e);
          setError(e);
          // setIsLoading(false);
          setIsLoadMore(false);
          return null;
        }
      },
      [dispatch],
    );

    const refresh = useCallback(() => {
      setCountRefresh(c => c + 1);
    }, []);

    // const loadMore = useCallback(() => {
    //   if (page < totalPage && !isLoading && !isLoadMore && data?.data?.length) {
    //     setPageRequest(page + 1);
    //   }
    // }, [data?.data?.length, isLoading, isLoadMore, page, totalPage]);

    // useDeepCompareEffect(() => {
    //   if (skip || params === SKIP_TOKEN) {
    //     return;
    //   }
    //   setPageRequest(params?.page || 1);
    //   request(params);
    // }, [skip, params, countRefresh]);

    // useEffect(() => {
    //   if (pageRequest > 1) {
    //     const _params = params ? {...params, page: pageRequest, limit: numShow} : {page: pageRequest, limit: numShow};
    //     request(_params as A);
    //   }
    // }, [pageRequest]);

    return {
      total,
      totalPage,
      page,
      numShow,
      // isLoading,
      isLoadMore,
      error,
      setData,
      request,
      refresh,
      // loadMore,
      data,
      result,
    };
  };

export const createQueryHook =
  <D, R extends ResponseData<D> | ApiResponse | AnyObject | undefined, A>(
    asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>,
  ) =>
  (params: A, {skip = false} = {}) => {
    const dispatch = useAppDispatch();
    // const [isLoading, setIsLoading] = useState(!(skip || params === SKIP_TOKEN));
    const [data, setData] = useState<R extends ResponseData<D> ? R['data'] : undefined>();
    const [error, setError] = useState<unknown>();
    const [result, setResult] = useState<R>();
    const [countRefresh, setCountRefresh] = useState(0);
    

    const request = useCallback(
      async (params: A) => {
        try {          
          // setIsLoading(true);
          setError(undefined);
          const res = await dispatch(asyncThunk(params)).unwrap();
          if (res && 'data' in res) {
            setData(res.data);
          }
          // setIsLoading(false);
          setResult(res);
          return res;
        } catch (e) {
          setError(e);
          // setIsLoading(false);
          throw e;
        }
      },
      [dispatch],
    );

    const refresh = useCallback(() => {
      setCountRefresh(c => c + 1);
    }, []);

    useDeepCompareEffect(() => {
      if (skip || params === SKIP_TOKEN) {
        return;
      }
      request(params).catch(() => {});
    }, [skip, params, countRefresh]);

    return {
      // isLoading,
      error,
      request,
      data,
      result,
      refresh,
      setData,
    };
  };

export const createMutationHook =
  <R, A>(asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>) =>
  () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<R>();
    const [error, setError] = useState<unknown>();

    const request = useCallback(
      async (arg: A) => {
        try {
          setIsLoading(true);
          setError(undefined);
          const res = await dispatch(asyncThunk(arg)).unwrap();
          setIsLoading(false);
          setResult(res);
          return res;
        } catch (e) {
          setError(e);
          setIsLoading(false);
          throw e;
        }
      },
      [dispatch],
    );

    return {
      isLoading,
      error,
      request,
      result,
    };
  };
