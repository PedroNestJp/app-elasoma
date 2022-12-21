import {View} from 'react-native';
import styled from 'styled-components';
import Text, {HighContrastText} from '../../components/Typography/Text';

export const Container = styled(View)`
  margin: 20px 24px 10px 24px;
`;

export const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export const HeaderContainerText = styled(Text)`
  margin-left: 10px;
`;

export const FilterContainer = styled(View)`
  margin-top: 20px;
`;

export const FilterOption = styled(HighContrastText)`
  margin-left: 10px;
  margin-bottom: 10px;
  font-family: Poppins-Bold;
`;
