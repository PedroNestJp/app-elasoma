import React, {useEffect, useState} from 'react';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import Text from '../../components/Typography/Text';
import {notifyError, showToastError} from '../../helpers/notifications';
import {getAreasOfInterestsService} from '../../services/interests';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Button from '../../components/Buttons/Button';
import {Screens} from '../../contants/screens';
import {updateUserService} from '../../services/users';
import {useSelector} from 'react-redux';
import Loading from '../../components/Loading';

export default ({navigation}) => {
  const [areas, setAreas] = useState([]);
  const [loading, isLoading] = useState(false);
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    getAreas();
  }, []);

  const saveInterests = async () => {
    try {
      isLoading(true);
      const interests = areas.filter(area => area.selected);
      if (interests.length > 0) {
        await updateUserService(user.id, {interests});
        navigation.navigate(Screens.APP.navigator, {
          screen: Screens.APP.HOME_SCREEN,
        });
      } else {
        notifyError({
          title: 'Atenção',
          message: 'Selecione no mínimo uma área de interesse',
        });
      }
      isLoading(false);
    } catch (e) {
      isLoading(false);

      showToastError(
        'Estamos com problemas para salvar as áreas de interesse. Tente novamente mais tarde',
      );
    }
  };

  const getAreas = async () => {
    try {
      let areas = await getAreasOfInterestsService();
      if (user.interests) {
        user.interests.forEach(s => {
          areas = areas.map(area => {
            if (area.id === s.id) return {...area, selected: s.selected};
            return area;
          });
        });
      }
      setAreas(areas);
    } catch (e) {
      showToastError(
        'Estamos com problemas para coletar as áreas de interesse. Tente novamente mais tarde',
      );
    }
  };

  const selectImage = s => {
    setAreas(
      areas.map(area => {
        if (area.id === s.id) return {...area, selected: !s.selected};
        return area;
      }),
    );
  };

  return (
    <ScrollContainer canGoBack={user.interests && user.interests.length > 0}>
      <Text size={18} fontStyle={600} style={styles.headerContainer}>
        Escolha sua área de interesse
      </Text>
      <View>
        {areas.length <= 0 && <Loading />}
        {areas.map(area => (
          <InterestArea onPress={selectImage} key={area.id} area={area} />
        ))}
      </View>
      <View style={styles.submitContainer}>
        <Button
          loading={loading}
          onPress={saveInterests}
          size="large"
          disabled={loading}
          text="Enviar"
        />
      </View>
    </ScrollContainer>
  );
};

const InterestArea = ({area, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(area)}>
      <View
        style={[
          styles.interestAreaContainer,
          area.selected && styles.interestAreaContainerSelected,
        ]}>
        <Image
          style={styles.image}
          opacity={area.selected ? 0.4 : 1}
          source={{uri: area.image, cache: 'force-cache'}}
        />

        <View style={[styles.textContainer]}>
          <Text size={18} fontStyle={600} style={styles.text}>
            {area.name.charAt(0).toUpperCase()}
            {area.name.slice(1).toLowerCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    textAlign: 'center',
    marginBottom: 15,
  },
  interestAreaContainerSelected: {
    backgroundColor: '#D6BBDB',
  },
  interestAreaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    marginVertical: 5,
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    resizeMode: 'cover',
    height: 70,
    width: '100%',
    position: 'absolute',
  },
  imageSelected: {},
  textContainer: {
    position: 'relative',
  },
  text: {
    color: '#fff',
  },
  submitContainer: {
    marginTop: 30,
  },
});
