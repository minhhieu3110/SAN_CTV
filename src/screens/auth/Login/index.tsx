import { Block, FormInput, Text } from 'components';
import React from 'react';
import { COLORS } from 'theme';
import { Header } from './component/Header';
import { useForm } from 'react-hook-form';
import { formConfig, FormField } from './component/formConfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigationRoot } from 'navigation/navigationRef';
export const Login = () => {
  const {
    control,
    formState: { errors },
  } = useForm<FormField>(formConfig);
  const { bottom } = useSafeAreaInsets();
  return (
    <Block flex backgroundColor={COLORS.aliceBlue}>
      <Header />
      <Block flex justifyContent="space-between">
        <Block marginTop={-42} paddingHorizontal={12}>
          <Block
            backgroundColor={COLORS.white}
            radius={15}
            paddingHorizontal={12}
            padding={12}
            paddingBottom={bottom || 20}
          >
            <Text
              fontSize={18}
              font="semiBold"
              color={COLORS.primary}
              paddingBottom={12}
            >
              Xin Chào!
            </Text>
            <Text
              fontSize={15}
              font="regular"
              color={COLORS.darkJungleGreen}
              paddingBottom={20}
            >
              Vui lòng nhập tài khoản để đăng nhập
            </Text>
            <FormInput
              placeholderTextColor={COLORS.darkSilver}
              placeholder="Nhập số điện thoại"
              control={control}
              name="name"
              maxLength={10}
              height={45}
              keyboardType="phone-pad"
            />
            <Block paddingBottom={15} />
            <FormInput
              placeholderTextColor={COLORS.darkSilver}
              placeholder="Mật khẩu đăng nhập"
              control={control}
              name="password"
              secureTextEntry={true}
            />
            <Block paddingBottom={40} />
            <Block
              justifyContent="center"
              alignItems="center"
              backgroundColor={COLORS.primary}
              radius={8}
              height={48}
            >
              <Text fontSize={18} color={COLORS.white}>
                Tiếp tục
              </Text>
            </Block>
            <Block marginTop={18} rowCenter justifyContent="space-between">
              <Text fontSize={14} color={COLORS.primary}>
                Quên mật khẩu ?
              </Text>
              <Text
                fontSize={14}
                color={COLORS.primary}
                onPress={() => navigationRoot.navigate('Register')}
              >
                Đăng ký
              </Text>
            </Block>
          </Block>
        </Block>
        <Block
          flex
          justifyContent="flex-end"
          paddingBottom={bottom + 20}
          paddingHorizontal={48}
        >
          <Text fontSize={14} color={COLORS.darkSilver} textAlign="center">
            Bằng việc nhấn vào nút <Text font="semiBold">Tiếp tục</Text>, bạn đã
            đồng ý với <Text color={COLORS.primary}>Quy chế</Text> và{' '}
            <Text color={COLORS.primary}>Điều khoản</Text> của chúng tôi
          </Text>
        </Block>
      </Block>
    </Block>
  );
};
