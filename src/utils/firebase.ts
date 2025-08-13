import {firebase} from '@react-native-firebase/database';

const url = 'https://skyproject-8204c-default-rtdb.firebaseio.com/';

const RTDababase = firebase.app().database(url);
export const deviceInfo = firebase.app().database(url).ref('deviceInfo');

export default RTDababase;
