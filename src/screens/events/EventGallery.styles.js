import {Dimensions, Image, View} from 'react-native';
import styled from 'styled-components';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const GalleryContainer = styled(View)`
  margin-top: 10%;
`;

export const HeaderContainer = styled(View)`
  padding: 0 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ImageSrc = styled(Image)`
  width: ${screenWidth / 1.2}px;
  height: ${screenHeight / 2};
  border-radius: 6px;
`;

export const ImageSrcContainer = styled(View)`
  margin-right: 10px;
  width: ${screenWidth / 1.2}px;
  height: ${screenHeight / 2};
`;

export const FooterContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: 24px;
`;
