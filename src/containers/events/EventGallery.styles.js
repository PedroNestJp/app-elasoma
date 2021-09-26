import {Image, View, Dimensions} from 'react-native';
import styled from 'styled-components';

const screenWidth = Dimensions.get('screen').width;

export const ImageThumbnail = styled(Image)`
  width: ${screenWidth * 0.5 - screenWidth / 3.5}px;
  height: 72px;
  border-radius: 6px;
`;

export const ImageThumbnailContainer = styled(View)`
  padding-right: 26px;
`;

export const ThumbnailsContainer = styled(View)`
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 24px;
`;

export const MoreImagesContainer = styled(View)`
  position: absolute;
  width: ${screenWidth * 0.5 - screenWidth / 3.5}px;
  height: 72px;
  justify-content: center;
  align-items: center;
  background-color: #0f4dff6a;
  border-radius: 6px;
`;
