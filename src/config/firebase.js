import nativeFirestore from '@react-native-firebase/firestore';
import nativeAuth from '@react-native-firebase/auth';
import nativeStorage from '@react-native-firebase/storage';
import nativeMessaging from '@react-native-firebase/messaging';

export const fireAuth = nativeAuth(); //firebaseApp.auth();
export const firestore = nativeFirestore(); // = firebaseApp.firestore();
export const storage = nativeStorage(); // = firebaseApp.nativeStorage();
export const messaging = nativeMessaging();

const apiDevKey = "AIzaSyCMVUbaPQNCF1FzDHimNKGXudchDw61CuY"
const apiProductionKey = "AIzaSyAwOzDMePmmwEcd48bCubNhqZ9EoNSa8pE"

export const firebaseConfig = {
  apiKey: apiProductionKey,
};
