import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, Image, Loading, Modal, Pressable, showToast, Text} from 'components';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {COLORS, GRADIENT, height, width} from 'theme';
import storage from 'until/storage';
import {clearUser, expiredToken} from 'redux/auth/slice';
import {useComfirmJob, useGetDetail} from 'redux/home/apiHooks';
import {SKIP_TOKEN} from 'redux/constant';
import {ICONS, LOTTIE} from 'assets';
import {ActivityIndicator, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import {navigationRoot} from 'navigation/navigationRef';
import {useDispatch} from 'react-redux';
import {saveNewJobMessage} from 'redux/home/slice';
import {convertCurrency, formatTimestamp} from 'until/helper';

export const NewJobNotificationModal = () => {
  const [modal, setModal] = useState(false);
  const fcmes = useAppSelector(state => state.home.newJobMessage);
  const {data, request, isLoading} = useGetDetail(SKIP_TOKEN);
  const {isLoading: loadingComfirm, request: requestComfirm} = useComfirmJob();
  const user = useAppSelector(state => state.auth.userInfo.data);
  const id = fcmes?.data?.id ? +fcmes?.data?.id : 0;
  const dispatch = useDispatch();

  useEffect(() => {
    if (fcmes?.data?.id) {
      setModal(true);
      request(+fcmes?.data?.id);
    } else {
      setModal(false);
    }
  }, [fcmes?.data?.id]);

  const handleJobAction = useCallback(
    (is_approve: 1 | 2) => {
      if (user?.is_online === 1) {
        requestComfirm({id, is_approve})
          .then(async res => {
            dispatch(saveNewJobMessage(undefined));
            if (res?.data?.mess) {
              Toast.show({
                type: 'ToastMessage',
                autoHide: false,
                text1: 'Thông báo',
                text2: res?.data?.mess,
                props: {
                  status: 'warning',
                },
              });
            } else {
              Toast.show({
                type: 'success',
                text1: 'Thao tác thành công!',
              });
            }
          })
          .catch(err => {
            dispatch(saveNewJobMessage(undefined));
            Toast.show({
              type: 'error',
              text1: err?.message,
            });
          });
      } else {
        Toast.show({
          type: 'ToastMessage',
          autoHide: false,
          text1: 'Bạn đang Offline',
          text2: 'Bạn cần chuyển trạng thái Online để thực hiện thao tác này. Đi đến cài đặt?',
          topOffset: height / 3,
          props: {
            status: 'warning',
            action: {
              title: 'Cài đặt',
              onPress: () => {
                navigationRoot.navigate('SettingScreen');
                dispatch(saveNewJobMessage(undefined));
              },
            },
          },
        });
      }
    },
    [id, user?.is_online, requestComfirm, height, navigationRoot],
  );

  return (
    <Modal isVisible={modal} position="center">
      <Block height={height / 1.6} radius={18} margin={12} padding={12} backgroundColor={COLORS.white}>
        <Block position="absolute" right={12} top={12} zIndex={10}></Block>
        <Loading visible={isLoading} />

        <Block alignItems="center" paddingVertical={10}>
          <LottieView autoPlay source={LOTTIE.animation} style={{width: 80, height: 80}} />
        </Block>

        <Block flex={1}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <Block rowCenter>
              <Image marginRight={15} width={59} radius={5} height={66} source={{uri: data?.order?.service?.picture}} />
              <Block width={'80%'}>
                <Text numberOfLines={1} marginBottom={7} fontSize={15} font="semiBold" color={COLORS.darkJungleGreen}>
                  {data?.order?.service?.title}
                </Text>
                <Block rowCenter>
                  <Text marginRight={10} fontSize={15} color={COLORS.primary}>
                    {data?.order?.ward_relation?.title}
                  </Text>
                  <Block
                    backgroundColor={data?.status.background}
                    paddingVertical={3}
                    paddingHorizontal={10}
                    radius={20}>
                    <Text fontSize={13} color={data?.status.color}>
                      {data?.status?.title}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block height={1} backgroundColor={COLORS.platinum} marginVertical={12} />
            <Block rowCenter marginBottom={12}>
              <Image marginRight={10} source={ICONS.ic_calendar} square={24} />
              <Text fontSize={16} font="medium">
                {formatTimestamp(data?.start_time ? data?.start_time : 0)}
              </Text>
            </Block>
            <Block rowCenter>
              <Image marginRight={10} source={ICONS.ic_time} square={24} />
              <Text fontSize={16} font="medium">
                {data?.order?.hour} giờ, {data?.order?.start_time} đến {data?.order?.end_time}
              </Text>
            </Block>
            <Block height={1} backgroundColor={COLORS.platinum} marginVertical={12} />
            <Block rowCenter justifyContent="space-between">
              <Block rowCenter>
                <Image marginRight={10} source={ICONS.ic_price} square={24} />
                <Text fontSize={16} font="medium" color={COLORS.primary}>
                  {convertCurrency(data?.amount_final)}
                </Text>
              </Block>
              {data && data?.order?.extra_services?.length > 0 && (
                <Block rowCenter>
                  {data?.order?.extra_services?.map((value, idx) => {
                    return <Image key={idx} marginRight={10} source={{uri: value?.icon_color}} square={24} />;
                  })}
                </Block>
              )}
            </Block>
          </ScrollView>
        </Block>

        <Block rowCenter marginTop={15} justifyContent="space-between">
          <Pressable
            onPress={() => [
              Toast.show({
                type: 'ToastMessage',
                autoHide: false,
                text1: 'Từ chối',
                text2: 'Xác nhận từ chối công việc',
                topOffset: height / 3,
                props: {
                  status: 'warning',
                  action: {
                    title: 'Xác nhận',
                    onPress: () => {
                      handleJobAction(2);
                    },
                  },
                },
              }),
            ]}
            radius={8}
            borderWidth={1}
            borderColor={COLORS.primary}
            justifyContent="center"
            width={'47%'}
            marginRight={10}
            alignItems="center"
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}>
            <LinearGradient
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={{
                height: 44,
                width: '100%',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={GRADIENT.white}>
              {loadingComfirm ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : (
                <Text color={COLORS.primary} fontSize={15} font="medium">
                  Từ chối
                </Text>
              )}
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() =>
              Toast.show({
                type: 'ToastMessage',
                autoHide: false,
                text1: 'Nhận ngay',
                text2: 'Bạn có muốn nhận ngay công việc này?',
                topOffset: height / 3,
                props: {status: 'warning', action: {title: 'Xác nhận', onPress: () => handleJobAction(1)}},
              })
            }
            radius={8}
            justifyContent="center"
            width={'47%'}
            alignItems="center"
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 4,
            }}>
            <LinearGradient
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={{
                height: 44,
                paddingHorizontal: 23,
                borderRadius: 8,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={GRADIENT.primary}>
              {loadingComfirm ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text color={COLORS.white} fontSize={15} font="medium">
                  Chấp nhận
                </Text>
              )}
            </LinearGradient>
          </Pressable>
        </Block>
      </Block>
    </Modal>
  );
};
