import { Images } from 'assets';
import { Block, Image, Pressable, StatusBar, Text } from 'components';
import { navigationRoot } from 'navigation/navigationRef';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'theme';

const Onboarding = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Block flex backgroundColor={COLORS.aliceBlue}>
      <StatusBar />
      <Image resizeMode="cover" flex source={Images.img_onboarding}>
        <Block
          flex
          paddingBottom={bottom + 30}
          justifyContent="flex-end"
          gap={20}
        >
          <Pressable
            onPress={() => navigationRoot.navigate('Login')}
            justifyContent="center"
            alignItems="center"
            height={48}
            backgroundColor={COLORS.goldenPoppy}
            radius={8}
            marginHorizontal={39}
          >
            <Text fontSize={15} color={COLORS.darkJungleGreen}>
              Đăng nhập
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigationRoot.navigate('Register')}
            justifyContent="center"
            alignItems="center"
            radius={8}
            borderColor={COLORS.goldenPoppy}
            height={48}
            marginHorizontal={39}
            borderWidth={1}
          >
            <Text fontSize={15} color={COLORS.goldenPoppy}>
              Đăng ký
            </Text>
          </Pressable>
        </Block>
      </Image>
    </Block>
  );
};
export default Onboarding;
