/* eslint-disable @typescript-eslint/no-unused-vars */
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import usePreferenceContext from '~/hooks/usePreferenceContext';

const TestPage = (): JSX.Element => {
  const resultContext = usePreferenceContext();

  const UUID = resultContext?.result?.deviceUUID;

  // Step 1: Retrieve friend_ID values from Firestore
  const [friends_ID, setFriends_ID] = useState<string[]>([]);
  const [friendLocations, setFriendLocations] = useState([]);
  console.log('🚀 ~ file: TestPage.tsx:14 ~ TestPage ~ friendIDs:', friends_ID);

  useEffect(() => {
    const fetchFriendIDs = async () => {
      try {
        const userDocumentRef = firestore().collection('Users').doc(UUID);
        const documentSnapshot = await userDocumentRef.get();

        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          const friendIDs =
            userData?.friend.map((friend) => friend.friend_id) || [];
          const flattenedFriendIDs = friendIDs.flat();

          setFriends_ID(flattenedFriendIDs);
        } else {
          console.log('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching friend IDs:', error);
      }
    };

    fetchFriendIDs();
  }, [UUID]);

  // Step 2: Set up onSnapshot listeners for each friend and update friendLocations
  useEffect(() => {
    const unsubscribeListeners: (() => void)[] = [];

    friends_ID.forEach((friend_id) => {
      const subscriber = firestore()
        .collection('Users')
        .doc(friend_id)
        .onSnapshot((documentSnapshot) => {
          console.log(
            'User data for friend ID',
            friend_id,
            ':',
            documentSnapshot.data(),
          );

          // Assuming your friend location data is stored in a 'location' field
          const locations = documentSnapshot.data()?.locations || [];

          if (locations.length > 0) {
            // Extract location data and update friendLocations
            const friendLocation = locations.map((locationData) => ({
              friend_id,
              location: locationData.coordinates, // Assuming coordinates is an array
            }));

            setFriendLocations((prevLocations) => [
              ...prevLocations,
              ...friendLocation,
            ]);
          }
        });

      unsubscribeListeners.push(subscriber);
    });

    // Clean up listeners when component unmounts or when friend IDs change
    return () => {
      unsubscribeListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, [friends_ID]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View>
          {/* <Text style={{ color: 'black' }}>Friend IDs:</Text>
          <Text style={{ color: 'black' }}>{friends_ID.join(', ')}</Text>

          <Text style={{ color: 'black' }}>Friend Locations:</Text>
          <Text style={{ color: 'black' }}>
            {JSON.stringify(friendLocations, null, 2)}
          </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default TestPage;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
