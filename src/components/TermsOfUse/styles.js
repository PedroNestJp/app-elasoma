import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Scroll = styled.ScrollView`
  background-color: ${props => props.theme.containerBackground};
  padding: 0 16px;
`;

export const Touchable = styled.TouchableOpacity`
  margin-top: 47px;
`;

export const Title = styled.Text`
  font-family: Poppins-Bold;
  color: ${props => props.theme.textColor};
  text-align: center;
  padding-top: 28px;
  padding-bottom: 16px;
`;

export const TextBody = styled.Text`
  font-family: Poppins-Regular;
  color: ${props => props.theme.textColor};
  text-align: justify;
`;

export const ContentButton = styled.View`
  margin-top: 73px;
  margin-bottom: 44px;
`;
