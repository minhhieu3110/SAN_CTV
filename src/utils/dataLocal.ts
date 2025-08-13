import {ICONS} from 'assets';
import {navigationRoot} from 'navigation/navigationRef';

export const dataOption = [
  {
    id: '1',
    title: 'Ví của bạn',
    icon: ICONS.ic_wallet,
    value: '23.000.000đ',
    onPress: () => navigationRoot.navigate('WalletScreen'),
  },
  {
    id: '2',
    title: 'Đánh giá',
    icon: ICONS.ic_startColor,
    value: '4.8',
    onPress: () => navigationRoot.navigate('ReviewScreen'),
  },
  {
    id: '3',
    title: 'Hạng thành viên',
    icon: ICONS.ic_heartColor,
    value: 'Hạng vàng',
    onPress: () => navigationRoot.navigate('RankScreen'),
  },
];

export const dataAccount = [
  {
    id: '1',
    title: 'Thiết lập tài khoản',
    icon: ICONS.ic_accountProfile,
    onPress: () => navigationRoot.navigate('EditProfileScreen'),
  },
  {
    id: '2',
    title: 'Dịch vụ',
    icon: ICONS.ic_service,
    onPress: () => navigationRoot.navigate('ServiceScreen'),
  },
  {
    id: '3',
    title: 'Thu nhập',
    icon: ICONS.ic_income,
    onPress: () => navigationRoot.navigate('BottomTabMain', {screen: 'Income'}),
  },
  {
    id: '4',
    title: 'Giới thiệu bạn bè',
    icon: ICONS.ic_link,
    onPress: () => navigationRoot.navigate('ReferFriendsScreen'),
  },
];

export const dataUtilities = [
  {
    id: '1',
    title: 'Hỗ trợ',
    icon: ICONS.ic_support,
    onPress: () => navigationRoot.navigate('SupportScreen'),
  },
  {
    id: '2',
    title: 'Cài đặt',
    icon: ICONS.ic_setting,
    onPress: () => navigationRoot.navigate('SettingScreen'),
  },
];

export const dataWork = [
  {
    id: '1',
    title: 'Việc làm mới',
    icon: ICONS.ic_bag,
    onPress: () =>
      navigationRoot.navigate('BottomTabMain', {screen: 'History', params: {id: 10, title: 'Việc mới', type: 'new'}}),
  },
  {
    id: '2',
    title: 'Việc làm đã nhận',
    icon: ICONS.ic_calenderProfile,
    onPress: () =>
      navigationRoot.navigate('BottomTabMain', {screen: 'History', params: {id: 1, title: 'Đã nhận', type: 'access'}}),
  },
  {
    id: '3',
    title: 'Việc làm đang thực hiện',
    icon: ICONS.ic_todo,
    onPress: () =>
      navigationRoot.navigate('BottomTabMain', {screen: 'History', params: {id: 2, title: 'Đang làm', type: 'doing'}}),
  },
  {
    id: '4',
    title: 'Việc làm đã hoàn thành',
    icon: ICONS.ic_taskdone,
    onPress: () =>
      navigationRoot.navigate('BottomTabMain', {screen: 'History', params: {id: 3, title: 'Hoàn tất', type: 'done'}}),
  },
];
