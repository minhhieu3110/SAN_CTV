import {Dimensions} from 'react-native';

export const DESIGN_WIDTH = 428;
export const DESIGN_HEIGHT = 926;

export const {width, height} = Dimensions.get('screen');

export const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

export const HEADER_HEIGHT = 53;
export const IMG_HEADER_HEIGHT = 300;

export const HEADER_TOP_OFFSET = 20;

export const URL_PICTURE = 'http://192.168.1.49/sky/gateway/v1/media/api/uploads/';
