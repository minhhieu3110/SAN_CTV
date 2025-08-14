import React, { useState } from 'react';
import {
  Block,
  FormInput,
  Icon,
  Image,
  Pressable,
  Text,
  TextInput,
  Modal,
} from 'components';
import { COLORS, height } from 'theme';
import { Platform, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { formConfig, FormField } from './formConfig';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icons } from 'assets';
import { useGetProvince, useGetWard, useSignUp } from 'redux/auth/apiHook';
import { Province } from 'models/user';
import { SKIP_TOKEN } from 'redux/constant';
import Toast from 'react-native-toast-message';

export const Information = ({
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
    handleSubmit,
  } = useForm<FormField>(formConfig);
  const [date, setDate] = useState(new Date());
  const [seletedDate, setSelectedDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(
    seletedDate.toLocaleDateString('VN-vi', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  );
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const onConfirm = (event: any, selectedDate: Date) => {
    selectedDate &&
      (setDate(selectedDate),
      setDateOfBirth(
        selectedDate.toLocaleDateString('VN-vi', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      ),
      setShowDateTimePicker(false));
  };
  const { data: dataProvince } = useGetProvince();
  const { request: requestWard, data: dataWard } = useGetWard(SKIP_TOKEN);
  const [province, setProvince] = useState<Province | undefined>();
  const [ward, setWard] = useState<Province | undefined>();
  const [dataAddress, setDataAddress] = useState<Province[] | undefined>();
  const [showChooseAddress, setShowChooseAddress] = useState(false);
  const [type, setType] = useState<number>();
  const { request: requestSignUp, result } = useSignUp();
  const handleSignUp = (value: FormField) => {
    requestSignUp({
      full_name: value.fullname,
      username: phone,
      identification: value.cccd,
      password: value.password,
      email: value.email,
      refferal_code: value.referral_code ? value.referral_code : '',
      device_name: 'device_name',
      device_token: 'device_token',
      birthday: dateOfBirth,
      province: province.code,
      ward: ward.code,
      address: value.address,
    })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: result?.message,
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: err?.message,
        });
      });
  };
  console.log('result', result);

  return (
    <Block
      marginTop={-134}
      marginHorizontal={12}
      paddingHorizontal={12}
      paddingTop={18}
      paddingBottom={10}
      radius={15}
      backgroundColor={COLORS.white}
    >
      <Text fontSize={18} font="semiBold" color={COLORS.primary}>
        Thông tin cá nhân
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={{ paddingBottom: 100 }}
      >
        <Block marginTop={21} gap={17}>
          <FormInput
            control={control}
            name="fullname"
            placeholder="Nhập họ tên"
            placeholderTextColor={COLORS.darkSilver}
            height={41}
            label="Họ tên"
          />
          <Block gap={15}>
            <Text fontSize={15} font="semiBold" color={COLORS.raisinBlack}>
              Số điện thoại
            </Text>
            <TextInput
              height={41}
              editable={false}
              value={phone}
              radius={5}
              backgroundColor={COLORS.aliceBlue}
              paddingLeft={12}
            />
          </Block>
          <FormInput
            control={control}
            name="cccd"
            placeholder="Nhập số CCCD"
            label="CCCD"
            height={41}
            placeholderTextColor={COLORS.darkSilver}
            maxLength={12}
          />
          <FormInput
            control={control}
            name="email"
            placeholder="Nhập email"
            placeholderTextColor={COLORS.darkSilver}
            label="Email"
            height={41}
          />
          <FormInput
            control={control}
            name="password"
            placeholder="*** *** ***"
            height={41}
            placeholderTextColor={COLORS.darkSilver}
            label="Mật khẩu"
            toggleHiddenPassword
          />
          <FormInput
            control={control}
            name="confirmPassword"
            placeholder="*** *** ***"
            height={41}
            placeholderTextColor={COLORS.darkSilver}
            label="Xác nhận mật khẩu"
            toggleHiddenPassword
          />
          <Block gap={15}>
            <Text fontSize={15} font="semiBold" color={COLORS.raisinBlack}>
              Ngày sinh
            </Text>
            <Pressable
              onPress={() => setShowDateTimePicker(true)}
              rowCenter
              justifyContent="space-between"
              height={41}
              borderWidth={0.5}
              borderColor={COLORS.platinum}
              paddingHorizontal={12}
              radius={5}
            >
              <Text>{dateOfBirth}</Text>
              <Image
                source={Icons.ic_calendar_dateOfBirth}
                square={18}
                resizeMode="cover"
              />
            </Pressable>
          </Block>
          <FormInput
            control={control}
            name="referral_code"
            label="Mã giới thiệu"
            placeholderTextColor={COLORS.darkSilver}
            height={41}
            placeholder="Nhập mã giới thiệu"
          />
        </Block>
        <Block marginTop={10} gap={17}>
          <Text fontSize={18} font="semiBold" color={COLORS.primary}>
            Thông tin cư trú
          </Text>
          <Block gap={15}>
            <Text fontSize={15} font="semiBold" color={COLORS.raisinBlack}>
              Chọn Tỉnh/ Thành phố
            </Text>
            <Pressable
              onPress={() => {
                setType(0);

                setDataAddress(dataProvince);
                setShowChooseAddress(true);
              }}
              height={41}
              borderWidth={0.5}
              borderColor={COLORS.platinum}
              paddingHorizontal={12}
              rowCenter
              justifyContent="space-between"
              radius={8}
            >
              <Text color={province ? COLORS.raisinBlack : COLORS.darkSilver}>
                {province ? province?.title : 'Tỉnh/Thành Phố'}
              </Text>
              <Image
                source={Icons.ic_arrow_down}
                square={20}
                resizeMode="cover"
              />
            </Pressable>
          </Block>
          <Block gap={15}>
            <Text fontSize={15} font="semiBold" color={COLORS.raisinBlack}>
              Chọn Xã/ Phường
            </Text>
            <Pressable
              onPress={() => {
                setType(1);
                setDataAddress(dataWard);
                setShowChooseAddress(true);
              }}
              height={41}
              borderWidth={0.5}
              borderColor={COLORS.platinum}
              paddingHorizontal={12}
              rowCenter
              justifyContent="space-between"
              radius={8}
            >
              <Text color={ward ? COLORS.raisinBlack : COLORS.darkSilver}>
                {ward ? ward?.title : 'Xã/Phường'}
              </Text>
              <Image
                source={Icons.ic_arrow_down}
                square={20}
                resizeMode="cover"
              />
            </Pressable>
          </Block>
          <FormInput
            control={control}
            name="address"
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            placeholderTextColor={COLORS.darkSilver}
            height={41}
          />
          <Pressable
            onPress={handleSubmit(handleSignUp)}
            marginTop={20}
            marginBottom={100}
            backgroundColor={COLORS.primary}
            justifyContent="center"
            alignItems="center"
            height={48}
            radius={5}
          >
            <Text fontSize={15} color={COLORS.white}>
              Tiếp tục
            </Text>
          </Pressable>
        </Block>
      </ScrollView>
      {showDateTimePicker && (
        <DateTimePicker
          isVisible={showDateTimePicker}
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          mode="date"
          date={date}
          locale="vi-VN"
          onConfirm={selectedDate => {
            if (selectedDate) {
              setDate(selectedDate);
              setDateOfBirth(
                selectedDate.toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }),
              );
            }
            setShowDateTimePicker(false);
          }}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
          onCancel={() => setShowDateTimePicker(false)}
          confirmTextIOS="Xác nhận"
          cancelTextIOS="Hủy"
        />
      )}
      <Modal
        isVisible={showChooseAddress}
        position="bottom"
        setIsVisible={() => setShowChooseAddress(false)}
      >
        <Block
          backgroundColor={COLORS.white}
          height={height / 2}
          paddingHorizontal={12}
          paddingTop={12}
        >
          <Text fontSize={15} color={COLORS.primary} textAlign="center">
            {type === 0 ? 'Tỉnh/Thành phố' : 'Xã/Phường'}
          </Text>
          <ScrollView style={{ marginBottom: 50 }}>
            {dataAddress &&
              dataAddress.map(item => {
                return (
                  <Pressable
                    onPress={() => {
                      setShowChooseAddress(false);
                      type === 0
                        ? (setProvince(item),
                          setWard(undefined),
                          requestWard({ province_code: item?.code }))
                        : setWard(item);
                    }}
                    key={item?.code}
                    rowCenter
                    justifyContent="space-between"
                    paddingHorizontal={12}
                    marginTop={10}
                    borderWidth={0.5}
                    borderColor={COLORS.platinum}
                    radius={5}
                  >
                    <Text fontSize={14} color={COLORS.raisinBlack}>
                      {item?.title}
                    </Text>
                    <Icon
                      type="MaterialIcons"
                      name={
                        item?.code === province?.code
                          ? 'radio-button-checked'
                          : item?.code === ward?.code
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={15}
                      color={
                        item?.code === province?.code
                          ? COLORS.greenCheck
                          : item?.code === ward?.code
                          ? COLORS.greenCheck
                          : COLORS.raisinBlack
                      }
                    />
                  </Pressable>
                );
              })}
          </ScrollView>
        </Block>
      </Modal>
    </Block>
  );
};
