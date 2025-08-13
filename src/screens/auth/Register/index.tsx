import { Block, Text } from 'components';
import React, { useState } from 'react';
import { COLORS } from 'theme';
import { Header } from './components/Header';
import { InputPhone } from './components/InputPhone';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InputOTP } from './components/InputOTP';
import { Information } from './components/Information';
export const Register = () => {
  const { bottom } = useSafeAreaInsets();
  const [stack, setStack] = useState(1);
  const [phone, setPhone] = useState('');
  const render = () => {
    switch (stack) {
      case 1:
        return (
          <InputPhone setStack={setStack} phone={phone} setPhone={setPhone} />
        );
      case 2:
        return <InputOTP setStack={setStack} phone={phone} />;
      case 3:
        return (
          <Information setStack={setStack} phone={phone} setPhone={setPhone} />
        );
    }
  };
  return (
    <Block flex backgroundColor={COLORS.aliceBlue}>
      <Header stack={stack} />
      <Block flex justifyContent="space-between">
        {render()}
        {stack === 1 && (
          <Block
            flex
            justifyContent="flex-end"
            paddingBottom={bottom + 20}
            paddingHorizontal={48}
          >
            <Text fontSize={14} color={COLORS.darkSilver} textAlign="center">
              Bằng việc nhấn vào nút <Text font="semiBold">Tiếp tục</Text>, bạn
              đã đồng ý với <Text color={COLORS.primary}>Quy chế</Text> và{' '}
              <Text color={COLORS.primary}>Điều khoản</Text> của chúng tôi
            </Text>
          </Block>
        )}
      </Block>
    </Block>
  );
};
