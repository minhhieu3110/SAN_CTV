import { Block, FormInput, Pressable, Text, TextInput } from 'components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { COLORS } from 'theme';
import { formConfig, FormField } from './formConfig';
import { useCheckPhone } from 'redux/auth/apiHook';
import Toast from 'react-native-toast-message';

export const InputPhone = ({
  setStack,
  phone,
  setPhone,
}: {
  setStack: (e: number) => void;
  phone: string;
  setPhone: (e: string) => void;
}) => {
  const {
    control,
    formState: { errors },
  } = useForm<FormField>(formConfig);
  const { request: requestCheckphone } = useCheckPhone();
  const onPress = () => {
    requestCheckphone({ phone })
      .then(() => {
        Toast.show({ type: 'error', text1: 'Số điện thoại đã được sử dụng!' });
      })
      .catch(error => {
        if (error?.code === 400) {
          setStack(2);
        } else {
          Toast.show({
            type: 'error',
            text1: error?.data?.message || 'Có lỗi xảy ra',
          });
        }
      });
  };
  return (
    <Block
      marginTop={-42}
      marginHorizontal={12}
      paddingHorizontal={12}
      backgroundColor={COLORS.white}
      radius={15}
      paddingBottom={12}
      paddingTop={12}
    >
      <Text fontSize={18} font="semiBold" color={COLORS.primary}>
        Xin chào!
      </Text>
      <Text marginTop={12} fontSize={15} color={COLORS.darkJungleGreen}>
        Vui lòng nhập số điện thoại để tiếp tục
      </Text>
      <Block marginTop={23} />
      <TextInput
        // control={control}
        // name="phone"
        paddingLeft={14}
        placeholder="Nhập số điện thoại"
        placeholderTextColor={COLORS.darkSilver}
        onChangeText={e => setPhone(e)}
        height={41}
        borderWidth={1}
        radius={8}
        borderColor={COLORS.brightGray}
        maxLength={10}
      />
      <Pressable
        onPress={() => onPress()}
        height={45}
        radius={8}
        justifyContent="center"
        alignItems="center"
        backgroundColor={COLORS.primary}
        marginTop={202}
      >
        <Text fontSize={15} color={COLORS.white}>
          Tiếp tục
        </Text>
      </Pressable>
    </Block>
  );
};
