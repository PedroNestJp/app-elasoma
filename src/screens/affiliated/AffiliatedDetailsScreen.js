import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import Text from '../../components/Typography/Text';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import UserPicture from '../../components/UserPicture';
import TextButton from '../../components/Buttons/TextButton';
import Button from '../../components/Buttons/Button';
import PlayIcon from '../../components/Icons/PlayIcon';

export default ({route}) => {
  const {person} = route.params;

  const openWhatsapp = () => {
    Linking.openURL(`https://api.whatsapp.com/send?phone=55${person.phone}`);
  };

  const openInstagram = () => {
    Linking.openURL(`https://www.instagram.com/${person.instagram}`);
  };

  return (
    <ScrollContainer canGoBack>
      <View style={styles.lockerContainer}>
        <UserPicture photoURL={person.photoURL} height={213} width={213} />
      </View>
      <View style={styles.textContainer}>
        <Text style={{textAlign: 'center'}} size={22} fontStyle="bold">
          {person.name}
        </Text>
        <Text style={{textAlign: 'center'}} fontStyle={300}>
          {person.business}
        </Text>
        <Text style={{textAlign: 'center'}} fontStyle={300}>
          {person.cityName} / {person.stateUf}
        </Text>
      </View>
      {person.public_phone && person.phone !== '' && (
        <View style={styles.socialLinksContainer}>
          <Text style={{textAlign: 'center'}} size={16}>
            Whatsapp
          </Text>
          <TextButton
            onPress={openWhatsapp}
            text={person.phone}
            underline
            style={{justifyContent: 'center'}}
            size={14}
          />
        </View>
      )}
      {person.public_instagram && person.instagram !== '' && (
        <View style={styles.socialLinksContainer}>
          <Text style={{textAlign: 'center'}} size={16}>
            Instagram
          </Text>
          <TextButton
            onPress={openInstagram}
            text={person.instagram}
            underline
            style={{justifyContent: 'center'}}
            size={14}
          />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={{textAlign: 'center'}} size={14}>
          {person.aboutMe}
        </Text>
      </View>

      <YoutubeVideoField user={person} />
    </ScrollContainer>
  );
};

const YoutubeVideoField = ({user}) => {
  if (!user.youtube_video) return null;

  const openYoutubeVideo = () => {
    Linking.openURL(user.youtube_video);
  };

  return (
    <View style={{alignItems: 'center', marginBottom: 40}}>
      <Button
        style={{paddingHorizontal: 20, paddingVertical: 10}}
        IconComp={PlayIcon}
        weight={'normal'}
        onPress={openYoutubeVideo}
        text="Assistir Apresentação"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    paddingTop: 40,
  },
  formInput: {
    paddingTop: 45,
  },
  socialNetworkLoginContainer: {
    marginTop: 100,
  },
  lockerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 25,
  },

  socialLinksContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
  },
  footerTextContainer: {
    marginVertical: 40,
  },
});
