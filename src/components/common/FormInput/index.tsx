import {
  Block,
  BlockProps,
  Icon,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
} from 'components';
import React, { ReactElement, useState } from 'react';
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import { COLORS } from 'theme';
import { NUMBER_FORMAT } from 'utils/helper';

export type FormInputProps<F extends FieldValues> = {
  control: Control<F>;
  name: FieldPath<F>;
  label?: string;
  messageError?: string;
  editable?: boolean;
  required?: boolean;
  errProps?: TextProps;
  labelProps?: TextProps;
  containerProps?: BlockProps;
  inputContainerProps?: BlockProps;
  toggleHiddenPassword?: boolean;
  renderInput?: (
    props: Pick<TextInputProps, 'value' | 'onChangeText' | 'onBlur'>,
  ) => ReactElement;
  renderLabel?: (label?: string, required?: boolean) => ReactElement;
  renderError?: (error?: FieldError) => ReactElement;
  renderRight?: () => ReactElement;
  transformInputValue?:
    | 'card'
    | 'price'
    | 'number'
    | ((value: string) => string);
} & TextInputProps;

const toNumberString = (value: string) => {
  return value.replace(/\D/g, '');
};

const toPriceNumberString = (value: string) => {
  const rawNumber = +toNumberString(value);
  return rawNumber ? NUMBER_FORMAT.format(rawNumber) : '';
};

const toCardNumberString = (value: string) => {
  let trimmed = value.replace(/[^\d]/g, '');
  if (trimmed) {
    trimmed = trimmed.match(/.{1,4}/g)?.join(' ') || '';
    if (trimmed.length > 19) {
      trimmed = trimmed.substring(0, 19);
    }
  }
  return trimmed;
};

export const FormInput = <F extends FieldValues>({
  name,
  label = '',
  control,
  messageError,
  errProps,
  editable = true,
  required,
  labelProps,
  containerProps,
  inputContainerProps,
  toggleHiddenPassword,
  transformInputValue,
  renderInput,
  renderLabel,
  renderError,
  renderRight,
  ...inputProps
}: FormInputProps<F>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });
  const [showText, setShowText] = useState(false);

  const onChangeText = (text: string) => {
    if (transformInputValue) {
      let transformed = '';
      switch (transformInputValue) {
        case 'card':
          transformed = toCardNumberString(text);
          break;
        case 'number':
          transformed = toNumberString(text);
          break;
        case 'price':
          transformed = toPriceNumberString(text);
          break;
        default:
          transformed = transformInputValue(text);
          break;
      }
      onChange(transformed);
    } else {
      onChange(text);
    }
  };

  const _renderLabel = () => {
    return renderLabel ? (
      renderLabel(label, required)
    ) : label.length > 0 ? (
      <Text
        font="semiBold"
        fontSize={15}
        color={COLORS.raisinBlack}
        marginBottom={12}
        {...labelProps}
      >
        {label}
        {required && <Text color={COLORS.primary}> *</Text>}
      </Text>
    ) : null;
  };

  const _renderError = () => {
    return renderError ? (
      renderError(error)
    ) : messageError || error?.message ? (
      <Text marginTop={5} fontSize={14} color={COLORS.primary} {...errProps}>
        {messageError || error?.message}
      </Text>
    ) : null;
  };

  const _renderRight = () => {
    if (renderRight) {
      return renderRight();
    }
    if (toggleHiddenPassword) {
      return (
        <Icon
          type="Ionicons"
          name={showText ? 'eye' : 'eye-off'}
          alignSelf="center"
          onPress={() => setShowText(!showText)}
          marginRight={10}
          color={COLORS.darkSilver}
        />
      );
    }
  };

  const _renderInput = () => {
    return renderInput ? (
      renderInput({ value, onChangeText, onBlur })
    ) : (
      <Block
        row
        radius={5}
        borderWidth={1}
        backgroundColor={editable ? undefined : COLORS.platinum}
        borderColor={COLORS.platinum}
        {...inputContainerProps}
      >
        <TextInput
          flex
          value={value}
          onBlur={onBlur}
          editable={editable}
          paddingHorizontal={12}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.darkSilver}
          clearButtonMode="always"
          secureTextEntry={toggleHiddenPassword ? showText : undefined}
          {...inputProps}
        />
        {_renderRight()}
      </Block>
    );
  };

  return (
    <Block {...containerProps}>
      {_renderLabel()}
      {_renderInput()}
      {_renderError()}
    </Block>
  );
};
