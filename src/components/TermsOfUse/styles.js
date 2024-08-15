import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  align-items: flex-start;
`;

export const Scroll = styled.ScrollView`
  background-color: ${props => props.theme.containerBackground};
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
  padding: 16px;
  background-color: ${props => props.theme.containerBackground};
`;

export const Footer = styled.Text`
  margin-bottom: 45px;
`;
