import React, {useEffect, useState} from 'react';
import HomeScreen from '../screens/app/HomeScreen';
import AboutScreen from '../screens/app/AboutScreen';
import EditProfileScreen from '../screens/app/EditProfileScreen';
import UserProfileScreen from '../screens/app/UserProfileScreen';
import TermsAndConditionsScreen from '../screens/app/TermsAndConditionsScreen';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Screens} from '../contants/screens';
import RegisterScreen from '../screens/app/RegisterScreen';
import {useSelector} from 'react-redux';
import {RegistrationSchema} from '../contants/formSchemas';
import {userHasInterests} from '../helpers/store';
import InterestsScreen from '../screens/news/InterestsScreen';
import Loading from '../components/Loading';
import TermsOfUse from '../components/TermsOfUse';

const Stack = createStackNavigator();

export default ({navigation}) => {
  const {authenticated} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.auth);
  const [registrationValid, isRegistrationValid] = useState(false);
  const [loadingRegistration, isLoadingRegistration] = useState(true);

  useEffect(() => {
    checkUserValidity();
  }, [authenticated, user]);

  const checkUserValidity = async () => {
    isLoadingRegistration(true);
    isRegistrationValid(await RegistrationSchema.isValid(user));
    isLoadingRegistration(false);
  };

  if (loadingRegistration) {
    return <Loading />;
  }

  if (!registrationValid) {
    return (
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          cardOverlayEnabled: true,
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name={Screens.APP.REGISTER_SCREEN}
          component={RegisterScreen}
        />
      </Stack.Navigator>
    );
  }

  if (!userHasInterests()) {
    return (
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          cardOverlayEnabled: true,
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name={Screens.NEWS.INTERESTS_SCREEN}
          component={InterestsScreen}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AboutScreen"
        component={AboutScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.APP.REGISTER_SCREEN}
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TermsAndConditionsScreen"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TermsOfUse"
        component={TermsOfUse}
      />
    </Stack.Navigator>
  );
};
