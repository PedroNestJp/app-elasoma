import React from 'react';
import {Alert, View} from 'react-native';

import ScrollContainer from '../../../components/Containers/ScrollContainer';
import BackButtonArea from '../../../components/Containers/BackButtonArea';
import Text from '../../../components/Typography/Text';
import UserPicture from '../../../components/LoggedUserPicture';

import AlertIcon from '../../../assets/imgs/alert_triangle_outline.svg';
import {fireAuth} from '../../../config/firebase';
import {useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import {
  Container,
  ContentHeader,
  TitleContent,
  AvatarContent,
  AlertTextContent,
  ContainerAlertText,
  ContainerTitle,
  ButtonContent,
  Button,
  ViewAlert,
} from './styles';

const DeleteAccountScreen = () => {
  const navigation = useNavigation();

  const deleteUser = async () => {
    var user = await fireAuth.currentUser;

    console.log(user, 'USER');

    user
      .delete()
      .then(async () => {
        await firestore()
          .collection('contracts')
          .doc(user.uid)
          .delete();

        navigation.navigate('SignIn');
      })
      .catch(function(error) {
        Alert.alert('Erro', 'Ocorreu um erro ao chamar o serviço', [
          {text: 'OK', onPress: () => console.log('Ok Pressed')},
          ,
        ]);
      });
  };

  const deleteAccountConfirmation = async () => {
    Alert.alert(
      'Excluir conta',
      'Tem certeza que deseja excluir seus dados permanentemente ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteUser()},
        ,
      ],
    );
  };

  return (
    <>
      <Container>
        <ContentHeader>
          <BackButtonArea />
          <TitleContent>
            <Text size={16} fontStyle="bold">
              Excluir Conta
            </Text>
          </TitleContent>
        </ContentHeader>

        <AvatarContent>
          <UserPicture width={80} height={80} />
        </AvatarContent>

        <View style={{alignItems: 'center'}}>
          <ContainerTitle>
            <Text style={{textAlign: 'center'}} size={18} fontStyle="bold">
              Deseja realmente excluir sua conta ?
            </Text>
          </ContainerTitle>
        </View>

        <AlertTextContent>
          <ViewAlert>
            <AlertIcon />
          </ViewAlert>

          <ContainerAlertText>
            <Text size={14} fontStyle="600">
              A exclusão da sua conta é permanente
            </Text>
            <Text style={{marginTop: 8}} size={12} fontStyle="400">
              Seu perfil, interesses e conta serão excluídos permanentemente
            </Text>
          </ContainerAlertText>
        </AlertTextContent>
      </Container>

      <ButtonContent>
        <Button onPress={deleteAccountConfirmation} activeOpacity={0.6}>
          <Text style={{color: 'white'}} size={16} fontStyle="600">
            Excluir conta
          </Text>
        </Button>
      </ButtonContent>
    </>
  );
};

export default DeleteAccountScreen;
