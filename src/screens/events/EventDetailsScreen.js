import React, { useEffect, useState } from 'react';
import Header from '../../containers/Header';
import {
  createEventListenerService,
  updateEventService,
} from '../../services/events';
import ViewContainer from '../../components/Containers/ViewContainer';
import { ScrollView, TouchableOpacity, View, Alert } from 'react-native';
import styled from 'styled-components';
import Text from '../../components/Typography/Text';
import EventHeader from '../../containers/events/EventHeader';
import Button from '../../components/Buttons/Button';
import { firestoreTimeToMoment, formattedDate } from '../../helpers/common';
import MapsStaticImage from '../../containers/events/MapsStaticImage';
import { Screens } from '../../contants/screens';
import { useNavigation } from '@react-navigation/native';
import { getUserFromStore } from '../../helpers/store';
import UserPicture from '../../components/UserPicture';
import TextButton from '../../components/Buttons/TextButton';
import {
  hasUserOnArrayOfObjects,
  removeUserFromArrayOfUsersObjects,
  userToObject,
} from '../../helpers/user';
import EventGallery from '../../containers/events/EventGallery';
import { catchError } from '../../helpers/errors';
import { Platform } from 'react-native';

const ConfirmedPeopleContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
`;

const DateText = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 43px;
`;

const AddressContainer = styled(View)`
  background-color: ${props => props.theme.colors.secondary};
  padding: 12px 24px;
  shadow-color: rgba(0, 0, 0, 0.08);
  margin-top: 10px;
  elevation: 3;
  shadow-opacity: 1;
  shadow-radius: 2;
  z-index: 1;
`;

const PlaceText = styled(Text)`
  font-weight: 700;
  font-size: 17px;
  line-height: 43px;
`;

const AddressText = styled(Text)`
  font-weight: 300;
  font-size: 15px;
  line-height: 17px;
`;

const DescriptionText = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
`;

export default ({ route }) => {
  const navigation = useNavigation();
  const [loading, isLoading] = useState(true);
  const [loadingConfirmButton, isLoadingConfirmButton] = useState(false);
  const [event, setEvent] = useState(null);
  const user = getUserFromStore();
  const userPresenceConfirmed =
    event &&
    event.confirmed &&
    event.confirmed.some(person => person.id === user.id);
  const userDeniedConfirmed =
    event && event.denied && event.denied.some(person => person.id === user.id);

  const { id } = route.params;

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    try {
      isLoading(true);
      createEventListenerService(id, event => {
        setEvent(event);
        isLoading(false);
      });
    } catch (e) {
      catchError(e);
      isLoading(false);
    }
  };

  const goToEventMapDetail = () => {
    navigation.push(Screens.EVENTS.navigator, {
      screen: Screens.EVENTS.EVENT_MAP_DETAILS_SCREEN,
      params: { event },
    });
  };

  const confirmPresence = async () => {
    try {
      isLoadingConfirmButton(true);
      const confirmed =
        event.confirmed && event.confirmed.length > 0 ? event.confirmed : [];

      const newConfirmed = hasUserOnArrayOfObjects(user, confirmed)
        ? removeUserFromArrayOfUsersObjects(user, confirmed)
        : confirmed.concat([userToObject(user)]);

      const newDenied = removeUserFromArrayOfUsersObjects(
        user,
        event.denied || [],
      );

      const confirmedIds = newConfirmed.map(confirmed => confirmed.id);

      await updateEventService(event.id, {
        confirmed: newConfirmed,
        denied: newDenied,
        deniedIds: newDenied.map(user => user.id),
        confirmedIds,
      });
      isLoadingConfirmButton(false);
    } catch (e) {
      catchError(e, 'EventDetailsScreen->confirmPresence');
      isLoadingConfirmButton(false);
    }
  };

  const denyPresence = async () => {
    Alert.alert(
      'Você tem certeza que não irá participar desse evento? ',
      '',
      [
        {
          text: 'Não',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: confirmDeny,
        },
      ],
      { cancelable: false },
    );
  };

  const confirmDeny = async () => {
    try {
      const denied =
        event.denied && event.denied.length > 0 ? event.denied : [];

      const newDenied = hasUserOnArrayOfObjects(user, denied)
        ? removeUserFromArrayOfUsersObjects(user, denied)
        : denied.concat([userToObject(user)]);

      const deniedIds = newDenied.map(user => user.id);

      await updateEventService(event.id, {
        denied: newDenied,
        deniedIds,
      });
    } catch (e) {
      catchError(e, 'EventDetailsScreen->confirmDeny');
    }
  };

  const ConfirmedPeople = () => {
    const { dateTime } = event;
    const date = formattedDate(
      firestoreTimeToMoment(dateTime),
      'DD MMM - HH:mm',
    );

    return (
      <ConfirmedPeopleContainer
        style={
          Platform.OS === 'ios' ? { marginTop: 60, alignItems: 'center' } : { marginTop: 30, alignItems: 'center' }
        }
      >
        <DateText>{date.toUpperCase()}</DateText>
        <EventConfirmedPeople people={event.confirmed} />
      </ConfirmedPeopleContainer>
    );
  };

  const getMainButtonText = () => {
    return event.happened
      ? 'Evento Encerrado'
      : userPresenceConfirmed
        ? 'Remover Presença'
        : userDeniedConfirmed
          ? 'Não vou participar'
          : 'Confirmar Presença';
  };

  return (
    <>
      <Header />
      <ViewContainer noPaddingHorizontal loading={loading}>
        {event && (
          <ScrollView
            scrollIndicatorInsets={{ right: Number.MIN_VALUE }}
          >
            <View style={{ alignItems: 'center' }}>
              <View>
                <EventHeader event={event} />
              </View>
            </View>

            <ViewContainer style={{ paddingTop: 32, zIndex: 19 }}>
              <View
                style={{
                  zIndex: 20,
                  top: -20,
                  alignItems: 'center',
                  alignSelf: 'center',
                  position: 'absolute',
                }}>
                <Button
                  disabled={event.happened}
                  loading={loadingConfirmButton}
                  onPress={userDeniedConfirmed ? confirmDeny : confirmPresence}
                  inactiveButton={
                    event.happened ||
                    userPresenceConfirmed ||
                    userDeniedConfirmed
                  }
                  size="medium"
                  text={getMainButtonText()}
                  style={{ width: 200 }}
                />
                {!event.happened &&
                  !userDeniedConfirmed &&
                  !userPresenceConfirmed && (
                    <View style={{ marginTop: 15 }}>
                      <TextButton
                        onPress={denyPresence}
                        underline
                        text="Não vou participar"
                      />
                    </View>
                  )}
              </View>
              <ConfirmedPeople style={{ marginTop: 15 }} />
            </ViewContainer>
            <EventGallery event={event} />
            <AddressContainer paddingVertical={12}>
              <PlaceText>{event.place}</PlaceText>
              <AddressText>{event.address}</AddressText>
            </AddressContainer>
            <View style={{ zIndex: 10 }}>
              <TouchableOpacity onPress={goToEventMapDetail}>
                <MapsStaticImage
                  height={160}
                  mapCoordinates={event.mapCoordinates}
                  address={event.address}
                />
              </TouchableOpacity>
            </View>
            <ViewContainer paddingVertical={24}>
              <DescriptionText>{event.description}</DescriptionText>
            </ViewContainer>
          </ScrollView>
        )}
      </ViewContainer>
    </>
  );
};

const EventConfirmedPeople = ({ people }) => {
  const navigation = useNavigation();

  const goToEventsConfirmedPeopleScreen = () => {
    navigation.push(Screens.EVENTS.navigator, {
      screen: Screens.EVENTS.EVENT_CONFIRMED_PEOPLE_SCREEN,
      params: { people },
    });
  };

  if (people) {
    const shown = people.slice(0, 3);
    return (
      <TouchableOpacity onPress={goToEventsConfirmedPeopleScreen}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {shown.map(show => (
            <UserPicture
              key={show.id}
              style={{ marginLeft: 4 }}
              photoURL={show.photoURL}
              height={24}
              width={24}
            />
          ))}
          {people.length > 3 ? (
            <Text style={{ marginLeft: 4 }}>
              {people.length > 0 && `+${people.length - 3}`}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
  return null;
};
