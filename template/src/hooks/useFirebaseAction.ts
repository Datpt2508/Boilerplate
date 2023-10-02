import firestore from '@react-native-firebase/firestore';

import { GOOGLE_MAP_KEY } from '@env';
import axios from 'axios';

export const getUserInfoByDeviceUUID = async (UUID: string) => {
  try {
    const userDocumentRef = firestore().collection('Users').doc(UUID);

    // Get the user document once (not in real-time)
    const documentSnapshot = await userDocumentRef.get();

    if (documentSnapshot.exists) {
      const userData = documentSnapshot.data();
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
};

export const getFormattedAddress = async (
  latitude: number,
  longitude: number,
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_KEY}`,
    );

    if (response.data.results.length > 0) {
      const formattedAddress = response.data.results[0].formatted_address;
      console.log(
        '🚀 ~ file: HomePage.tsx:165 ~ getFormattedAddress ~ formattedAddress:',
        response.data.results[0],
      );
      return formattedAddress;
    } else {
      return 'Address not found';
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Error fetching address';
  }
};
