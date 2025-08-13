import { useKeyboard } from '@react-native-community/hooks';
import { Block, Pressable, Text } from 'components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { COLORS } from 'theme';

export type OTPInputProps = Partial<{
  codeLength: number;
  show: boolean;
  autoFocusOnLoad: boolean;
  onCodeFilled: (code: string) => void;
  clearCodeOnFullFilled: boolean;
  errorMessage: string;
  validateCode: string;
  onCodeDelete: (code: string) => void;
  /**
   * @default
   * = clearCodeOnFullFilled
   */
  dismissKeyboardOnFullFilled: boolean;
  placeholder: string;
}>;

export const OTPInput = ({
  codeLength = 6,
  errorMessage = '',
  validateCode,
  onCodeFilled,
  autoFocusOnLoad = true,
  show = true,
  clearCodeOnFullFilled,
  dismissKeyboardOnFullFilled = clearCodeOnFullFilled,
  onCodeDelete,
}: OTPInputProps) => {
  const [value, setValue] = useState('');
  const activeIndex = value.length;
  const __input = useRef<TextInput>(null);
  const { keyboardShown } = useKeyboard();
  const [isFocused, setIsFocused] = useState(autoFocusOnLoad);
  const [_errorMessage, setErrorMessage] = useState('');
  const arr = useMemo(() => {
    return Array(codeLength).fill('');
  }, [codeLength]);

  const onChangeText = (text: string) => {
    const validText = text.slice(0, codeLength).replace(/\D/g, '');
    setValue(validText);
    if (validText.length === codeLength) {
      if (validateCode && validateCode !== validText) {
        setErrorMessage(errorMessage);
      } else {
        onCodeFilled?.(validText);
      }
      clearCodeOnFullFilled && setValue('');
      dismissKeyboardOnFullFilled && Keyboard.dismiss();
    } else {
      setErrorMessage('');
      onCodeDelete?.(validText);
    }
  };

  const inputOnPress = () => {
    if (!keyboardShown) {
      if (isFocused) {
        __input.current?.blur();
        setTimeout(() => {
          __input.current?.focus();
        }, 100);
      } else {
        __input.current?.focus();
      }
    }
  };

  useEffect(() => {
    if (autoFocusOnLoad) {
      setTimeout(() => {
        __input.current?.focus();
      }, 100);
    }
  }, [autoFocusOnLoad]);

  return (
    <Block>
      <Pressable onPress={inputOnPress} height={45} activeOpacity={1}>
        <TextInput
          value={value}
          autoComplete="one-time-code"
          onChangeText={onChangeText}
          keyboardType="numeric"
          autoFocus={autoFocusOnLoad}
          ref={__input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Block absoluteFillObject>
          <Block
            rowCenter
            flex
            backgroundColor={COLORS.white}
            justifyContent="center"
          >
            {arr.map((_, i) => {
              const isActive = i === activeIndex && isFocused && keyboardShown;
              return (
                <Block
                  key={i}
                  contentCenter
                  borderWidth={1}
                  borderColor={
                    !isActive ? COLORS.antiFlashWhite : COLORS.primary
                  }
                  backgroundColor={COLORS.ghostWhite}
                  radius={5}
                  square={45}
                  marginRight={15}
                >
                  <Text
                    font="bold"
                    marginTop={value[i] ? 0 : 7.5}
                    fontSize={value[i] ? 16 : 30}
                    color={value[i] ? COLORS.darkCharcoal : COLORS.brightGray}
                  >
                    {value[i]}
                  </Text>
                </Block>
              );
            })}
          </Block>
        </Block>
      </Pressable>
      {validateCode
        ? _errorMessage.length > 0 && (
            <Text
              marginTop={10}
              color={COLORS.primary}
              font={'regular'}
              fontSize={13}
            >
              {_errorMessage}
            </Text>
          )
        : errorMessage?.length > 0 && (
            <Text
              marginTop={10}
              color={COLORS.primary}
              font={'regular'}
              fontSize={13}
            >
              {errorMessage}
            </Text>
          )}
    </Block>
  );
};
