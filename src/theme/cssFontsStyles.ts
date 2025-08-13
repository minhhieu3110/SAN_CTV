import {FontSVNPoppins} from 'assets/index'

export const CSS_FONTS = `
 @font-face {
    font-family: 'CustomFontLight';
    src: url(${FontSVNPoppins.light}) format('truetype');
  }
  @font-face {
    font-family: 'CustomFontRegular';
    src: url(${FontSVNPoppins.regular}) format('truetype');
  }
  @font-face {
    font-family: 'CustomFontMedium';
    src: url(${FontSVNPoppins.medium}) format('truetype');
  }
  @font-face {
    font-family: 'CustomFontSemiBold';
    src: url(${FontSVNPoppins.semiBold}) format('truetype');
  }
  @font-face {
    font-family: 'CustomFontBold';
    src: url(${FontSVNPoppins.bold}) format('truetype');
  }
  body {
    font-family: 'CustomFontRegular', sans-serif;
  }
  .light {
    font-family: 'CustomFontLight', sans-serif;
  }
  .medium {
    font-family: 'CustomFontMedium', sans-serif;
  }
  .semi-bold {
    font-family: 'CustomFontSemiBold', sans-serif;
  }
  .bold {
    font-family: 'CustomFontBold', sans-serif;
  }
`;
