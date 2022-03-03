import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {MenuProvider} from 'react-native-popup-menu';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import ThemeProvider from './config/ThemeProvider';
import {persistor, store} from './redux/configureStore';
import Routes from './routes/auth';
import StatusBar from './components/StatusBar';
import SplashScreen from './screens/auth/SplashScreen';
import {
  requestTrackingPermission,
  getTrackingStatus,
} from 'react-native-tracking-transparency';

enableScreens();

const App = () => {
  useEffect(() => {
    getTrackingStatus().then(status => {
      if (status === 'not-determined') {
        requestTrackingPermission();
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <MenuProvider
          customStyles={{
            backdrop: {
              backgroundColor: 'black',
              opacity: 0.5,
            },
          }}>
          <ThemeProvider>
            <StatusBar />
            <Routes />
          </ThemeProvider>
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
