import { Icons, Images } from 'assets';
import { Block, Image, Pressable, StatusBar } from 'components';
import { navigationRoot } from 'navigation/navigationRef';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const Header = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Block>
      <StatusBar />
      <Image
        source={Images.img_header_login}
        width={'100%'}
        height={331}
        paddingTop={top}
        paddingHorizontal={12}
      >
        <Pressable onPress={() => navigationRoot.goBack()}>
          <Image source={Icons.ic_back} square={30} />
        </Pressable>
      </Image>
    </Block>
  );
};
