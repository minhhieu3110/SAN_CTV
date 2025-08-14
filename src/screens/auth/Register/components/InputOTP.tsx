import { Block, OTPInput, Text } from 'components';
import { navigationRoot } from 'navigation/navigationRef';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useSendOTP, useVerifyOTP } from 'redux/auth/apiHook';
import { COLORS } from 'theme';
export const InputOTP = ({
  setStack,
  phone,
}: {
  setStack: (e: number) => void;
  phone: string;
}) => {
  const { data, refresh } = useSendOTP({ phone: phone, type: 'signup' });
  const { request: requestVerifyOTP } = useVerifyOTP();
  const onFillOTP = (otp: string) => {
    data !== undefined &&
      requestVerifyOTP({ phone: phone, otp_code: otp })
        .then(() => {
          setStack(3);
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'error',
          });
        });
  };
  const reSend = () => {
    refresh();
  };
  return (
    <Block
      marginTop={-42}
      marginHorizontal={12}
      paddingHorizontal={12}
      backgroundColor={COLORS.white}
      radius={15}
      paddingTop={12}
      paddingBottom={12}
    >
      <Text fontSize={18} font="semiBold" color={COLORS.primary}>
        Xác nhận mã OTP
      </Text>
      <Text fontSize={14} color={COLORS.darkJungleGreen} marginTop={12}>
        Một mã xác thực gồm 6 số đã được gửi đến số điện thoại: {phone}
      </Text>
      <Text fontSize={15} color={COLORS.crimsonRed} marginTop={10}>
        OTP: {data?.otp_code}
      </Text>
      <Text
        fontSize={16}
        font="light"
        color={COLORS.darkSilver}
        textAlign="center"
        marginTop={55}
      >
        Nhập mã để tiếp tục
      </Text>
      <Block paddingBottom={18} />
      <OTPInput
        autoFocusOnLoad
        clearCodeOnFullFilled
        onCodeFilled={onFillOTP}
      />
      <Text
        textAlign="center"
        fontSize={16}
        font="regular"
        color={COLORS.raisinBlack}
        marginTop={14.9}
      >
        Bạn không nhận được mã?{' '}
        <Text
          onPress={reSend}
          color={COLORS.primary}
          textDecorationLine="underline"
        >
          Gửi lại
        </Text>
      </Text>
    </Block>
  );
};
