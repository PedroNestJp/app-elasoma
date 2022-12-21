import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContentHeader = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;

  /* background-color: blue; */
`;

export const TitleContent = styled.View`
  margin-left: 23%;
`;

export const ContainerTitle = styled.View`
  width: 80%;
`;

export const AvatarContent = styled.View`
  /* background-color: red; */
  margin-top: 32px;
  margin-bottom: 16px;
`;

export const AlertTextContent = styled.View`
  /* background-color: green; */
  padding: 0px 24px;
  margin-top: 32px;

  flex-direction: row;
`;

export const ContainerAlertText = styled.View`
  width: 100%;

  /* background-color: yellow; */
  margin-left: 16px;
`;

export const ButtonContent = styled.View`
  width: 100%;

  padding: 0 16px;
  margin-bottom: 64px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 64px;
  background-color: #ec5656;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const ViewAlert = styled.View`
  margin-top: 8px;
`;
