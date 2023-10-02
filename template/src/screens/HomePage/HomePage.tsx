import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ExitApp from 'react-native-exit-app';
import Geolocation from 'react-native-geolocation-service';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Camera, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RNPermissions, {
  PERMISSIONS,
  request,
  requestMultiple,
} from 'react-native-permissions';

import { useTopInset } from '~/hooks/useInset';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import IconAdd from '~/resources/Icons/IconAdd';
import IconHome from '~/resources/Icons/IconBottomBar/IconHome';
import IconLayer from '~/resources/Icons/IconLayer';
import IconPermission from '~/resources/Icons/IconPermission';
import IconPosition from '~/resources/Icons/IconPosition';
import { useAppTheme } from '~/resources/theme';

import { dataUserMap } from '~/dummyData/dataUserMap';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';

interface UserLocation {
  latitude: number;
  longitude: number;
}
interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type MapType = 'standard' | 'satellite' | 'hybrid' | 'terrain';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const UUID = resultContext?.result?.deviceUUID;
  const topInsets = useTopInset();
  const [markers, setMarkers] = useState(dataUserMap);
  const [isPermission, setIsPermission] = useState(false);

  const [region, setRegion] = useState<Region | null>(null);
  const [mapType, setMapType] = useState<MapType | undefined>('standard');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const [friends_ID, setFriends_ID] = useState<string[]>([]);

  const [friendLocations, setFriendLocations] = useState<unknown[]>([]);

  const mapViewRef = useRef(null);

  // const { isLoaded, isClosed, load, show } = useInterstitialAd(
  //   GoogleAdsIds.INTERSTITIAL,
  //   {
  //     requestNonPersonalizedAdsOnly: true,
  //   },
  // );

  // useEffect(() => {
  //   load();
  // }, [isClosed, load]);

  useFocusEffect(
    React.useCallback(() => {
      let backButtonPressCount = 0;
      let backButtonPressTimer = null;

      const onBackPress = () => {
        if (backButtonPressCount === 1) {
          // User has pressed the back button twice, so close the app
          // BackHandler.exitApp();
          ExitApp.exitApp();
          return true;
        } else {
          // First back button press, set a timer to reset the count
          backButtonPressCount++;
          backButtonPressTimer = setTimeout(() => {
            backButtonPressCount = 0;
            clearTimeout(backButtonPressTimer);
          }, 2000); // Adjust the timeout as needed (e.g., 2 seconds)
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        backHandler.remove();
      };
    }, []),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...markers];

      const randomIndex = Math.floor(Math.random() * newData.length);
      newData[randomIndex].isActive = !newData[randomIndex].isActive;

      setMarkers(newData);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [markers]);

  // useEffect(() => {
  //   const fetchUserLocation = () => {
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log('Current Position-----', Platform.OS, position);
  //         setUserLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         console.error(error, '111111');
  //       },
  //       { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
  //     );
  //   };

  //   fetchUserLocation();

  //   // Set up an interval to fetch location every 30 seconds
  //   const intervalId = setInterval(fetchUserLocation, 30000);
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const permissionStatus = await RNPermissions.check(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_ALWAYS
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (permissionStatus === 'granted') {
          // Location permission is granted
          setIsPermission(true);
        } else {
          // Location permission is not granted
          setIsPermission(false);
        }
      } catch (error) {
        console.error('Error checking location permission:', error);
      }
    };

    // Call the function to check location permission
    checkLocationPermission();
  }, []);

  const sendLocationToFirebase = async (location) => {
    const timestamp = Date.now();

    const addressFromLatLong = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log('Geocoding failed:', data.error);
        } else {
          const regex = /(.+?),\s(.+?),\s(.+?),\s(.+?),/;
          const match = data.display_name.match(regex);
          const extractedInfo = `${match[1]}, ${match[2]}, ${match[3]}, ${match[4]}`;
          return extractedInfo;
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    try {
      // const response = await axios.get(
      // );

      const formattedAddress = addressFromLatLong || '';

      const locationData = {
        [timestamp]: {
          latitude: location.latitude,
          longitude: location.longitude,
          description: formattedAddress,
        },
      };

      const userDocumentRef = firestore().collection('Users').doc(UUID);

      // Fetch the current locations array from the document
      userDocumentRef.get().then((doc) => {
        if (doc.exists) {
          const { locations } = doc.data();

          // Ensure locations array doesn't exceed 20 items
          // if (locations.length >= 20) {
          //   locations.shift(); // Remove the oldest item (item 0)
          // }

          // console.log('Will Update Data To Firebase Success');
          locations.push(locationData);

          // Update the user document with the updated locations array
          userDocumentRef.update({
            locations,
          });
        }
      });
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  useEffect(() => {
    const fetchUserLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          // console.log('Current Position-----', Platform.OS, position);
          const userNewLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(userNewLocation);

          // Call the function to send location data to Firebase
          sendLocationToFirebase(userNewLocation);
        },
        (error) => {
          console.error(error, '111111');
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
      );
    };

    fetchUserLocation();

    // Set up an interval to fetch location every 30 seconds
    const intervalId = setInterval(fetchUserLocation, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // const isLocationChanged = (newLocation, oldLocation) => {
  //   // Implement your logic here to determine if the location has changed significantly
  //   return (
  //     Math.abs(newLocation.latitude - oldLocation.latitude) > 0.001 ||
  //     Math.abs(newLocation.longitude - oldLocation.longitude) > 0.001
  //   );
  // };

  // Step 1: Retrieve friend_ID values from Firestore
  useEffect(() => {
    const userDocumentRef = firestore().collection('Users').doc(UUID);

    const unsubscribe = userDocumentRef.onSnapshot((documentSnapshot) => {
      if (documentSnapshot.exists) {
        const userData = documentSnapshot.data();

        if (userData?.friend) {
          const friendsWithIsLocatorFalse = userData.friend.filter(
            (friend: Friend) => friend.isLocator === false,
          );

          const friendIDsWithIsLocatorFalse = friendsWithIsLocatorFalse.map(
            (friend: Friend) => friend.friend_id,
          );

          setFriends_ID(friendIDsWithIsLocatorFalse);
        } else {
          setFriends_ID([]);
          // setFriendsData([]);
        }
      } else {
        console.log('User document does not exist.');
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [UUID]);

  const fetchFriendFullName = async (friend_id: string | undefined) => {
    try {
      const friendDocumentRef = firestore().collection('Users').doc(UUID);
      const friendDocumentSnapshot = await friendDocumentRef.get();

      if (friendDocumentSnapshot.exists) {
        const friendData = friendDocumentSnapshot.data();

        if (friendData) {
          const dataFriend = friendData.friend.find(
            (friend: Friend) => friend.friend_id === friend_id,
          );

          const { friend_name } = dataFriend;
          return friend_name;
        }
      }
    } catch (error) {
      console.error('Error fetching friend full name:', error);
    }
    return '';
  };

  const fetchFriendAvatar = async (friend_id: string | undefined) => {
    try {
      const friendDocumentRef = firestore().collection('Users').doc(friend_id);
      const friendDocumentSnapshot = await friendDocumentRef.get();
      if (friendDocumentSnapshot.exists) {
        const { image_avatar } = friendDocumentSnapshot.data();
        return image_avatar;
      }
    } catch (error) {
      console.error('Error fetching friend avatar:', error);
    }
    return '';
  };

  const fetchFriendBattery = async (friend_id: string | undefined) => {
    try {
      const friendDocumentRef = firestore().collection('Users').doc(friend_id);
      const friendDocumentSnapshot = await friendDocumentRef.get();
      if (friendDocumentSnapshot.exists) {
        const friend_battery =
          Math.abs(
            parseInt(friendDocumentSnapshot.data()?.battery_percent, 10),
          ) * 100;

        return friend_battery;
      }
    } catch (error) {
      console.error('Error fetching friend battery:', error);
    }
    return '';
  };

  const fetchFriendIsFollow = async (friend_id: string | undefined) => {
    try {
      const userDocumentRef = firestore().collection('Users').doc(UUID);
      const userDocumentSnapshot = await userDocumentRef.get();

      if (userDocumentSnapshot.exists) {
        const userData = userDocumentSnapshot.data();
        if (userData?.friend) {
          const friendData = userData.friend.find(
            (friend: Friend) => friend.friend_id === friend_id,
          );
          if (friendData) {
            const { isFollow } = friendData;
            return isFollow;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching friend isFollow status:', error);
    }
    return false; // Return a default value if the status is not found or there's an error.
  };

  const fetchFriendConnectTime = async (friend_id: string | undefined) => {
    try {
      const userDocumentRef = firestore().collection('Users').doc(UUID);
      const userDocumentSnapshot = await userDocumentRef.get();

      if (userDocumentSnapshot.exists) {
        const userData = userDocumentSnapshot.data();
        if (userData?.friend) {
          const friendData = userData.friend.find(
            (friend: Friend) => friend.friend_id === friend_id,
          );
          if (friendData) {
            const { connect_time } = friendData;
            return connect_time;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching friend isFollow status:', error);
    }
    return false;
  };

  // Step 2: Set up onSnapshot listeners for each friend and update friendLocations
  useEffect(() => {
    const friendLocationsMap = new Map();

    const unsubscribeListeners: (() => void)[] = [];

    // Set up listeners for each friend in the updated friends_ID array
    friends_ID.forEach((friend_id) => {
      const subscriber = firestore()
        .collection('Users')
        .doc(friend_id)
        .onSnapshot(async (documentSnapshot) => {
          const locations = documentSnapshot.data()?.locations || [];

          // Get the latest location for this friend
          const latestLocation =
            locations.length > 0
              ? locations[locations.length - 1] // The last location in the array is the latest
              : null;

          let isActive = false;
          if (latestLocation && Object.keys(latestLocation).length > 0) {
            const locationId = Object.keys(latestLocation)[0];
            const timestamp = parseInt(locationId, 10);

            const currentTime = new Date();
            const timeDiffMilliseconds = currentTime - timestamp;
            const minutes = Math.floor(timeDiffMilliseconds / (1000 * 60));

            isActive = minutes < 20;
          }

          const friend_name = await fetchFriendFullName(friend_id);
          const avatar_friend = await fetchFriendAvatar(friend_id);
          const battery_percent = await fetchFriendBattery(friend_id);
          const isFollow = await fetchFriendIsFollow(friend_id);
          const connect_time = await fetchFriendConnectTime(friend_id);

          friendLocationsMap.set(friend_id, {
            friend_id,
            friend_name,
            latestLocation,
            avatar_friend,
            battery_percent,
            isActive,
            isFollow,
            connect_time,
          });

          // Create an array of all friend locations from the map
          const allFriendLocations: unknown[] = Array.from(
            friendLocationsMap.values(),
          );

          setFriendLocations(allFriendLocations);
        });

      unsubscribeListeners.push(subscriber);
    });

    return () => {
      unsubscribeListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, [friends_ID]);

  // useEffect(() => {
  //   const removedFriends = previousFriendsID.filter(
  //     (friend_id) => !friends_ID.includes(friend_id),
  //   );

  //   setPreviousFriendsID(friends_ID);

  //   if (removedFriends.length > 0) {
  //     console.log('Listen user Removed friends:', removedFriends);
  //     setFriendLocations((prevFriendLocations) =>
  //       prevFriendLocations.filter(
  //         (location) => !removedFriends.includes(location.friend_id),
  //       ),
  //     );
  //   }
  // }, [friends_ID]);

  const handleMyLocationPress = () => {
    if (mapViewRef.current && userLocation) {
      const camera: Camera = {
        center: userLocation,
        zoom: mapViewRef.current.getCamera().zoom,
      };

      mapViewRef.current.animateCamera(camera, { duration: 1000 });
    }
  };

  // const handleCheckPermission = async () => {
  //   try {
  //     const status = await checkLocationPermission();
  //     if (status === RESULTS.GRANTED) {
  //       // Permission already granted, you can proceed with location-related tasks
  //     } else {
  //       requestLocationPermission();
  //     }
  //   } catch (error) {
  //     console.error('Error checking location permission:', error);
  //   }
  // };

  // const checkLocationPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     const results = await checkMultiple([
  //       PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //       PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  //     ]);
  //     return results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
  //   } else if (Platform.OS === 'ios') {
  //     return await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
  //   }
  // };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        await requestMultiple([
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ]);
      } else {
        await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  // useEffect(() => {
  //   // Request location permission when the component mounts
  //   handleCheckPermission();
  // }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const initialRegion: Region = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(initialRegion);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 },
    );
  }, []);

  const randomColor = [
    { id: 1, startColor: '#75E00A', endColor: '#0AE0A0' },
    { id: 2, startColor: '#A9A9A9', endColor: '#A9A9A9' },
  ];

  const handelChangeMapStyle = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  const handlePhoneTrack = () => {
    navigation.navigate('HomeScreen');
  };

  const handleAddFriend = () => {
    friendLocations.length === 0
      ? openModal('ShareCodeBottomModal', true)
      : openModal('FriendBottomModal', true, {
          dataFriend: friendLocations,
        });
  };

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    ],
    [theme],
  );
  return (
    <View style={styleContainer}>
      {region && (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          zoomEnabled={true}
          ref={mapViewRef}
          followsUserLocation={true}
          zoomControlEnabled={true}
          showsUserLocation={true}
          showsPointsOfInterest={true}
          mapType={mapType}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}>
          {friendLocations.map((friendLocation: any) => {
            // Use friendLocation data to render markers for friends
            const selectedColor = friendLocation?.isActive
              ? randomColor[0]
              : randomColor[1];

            if ((friendLocation as any).latestLocation) {
              const latestTimestamp = Object.keys(
                (friendLocation as any).latestLocation,
              )[0];

              // Get the latitude and longitude using the latest timestamp
              const { latitude, longitude, description } =
                friendLocation.latestLocation[latestTimestamp];

              // console.log(
              //   '🚀 ~ file: HomePage.tsx:452 ~ latestLocation:',
              //   friendLocation,
              // );

              return (
                <Marker
                  key={friendLocation.friend_id}
                  title={friendLocation.friend_name}
                  description={description}
                  coordinate={{
                    latitude,
                    longitude,
                  }}>
                  <LinearGradient
                    colors={[selectedColor.startColor, selectedColor.endColor]}
                    style={{
                      borderRadius: 50,
                      height: 54,
                      width: 54,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      // source={marker?.image}
                      source={{ uri: friendLocation?.avatar_friend }}
                      style={{ width: 48, height: 48, borderRadius: 50 }}
                    />
                  </LinearGradient>
                </Marker>
              );
            } else {
              // Handle the case where the friend has no location data
              return null; // Or render something else, like a marker with a different color or icon
            }
          })}
        </MapView>
      )}
      <TouchableOpacity
        onPress={handlePhoneTrack}
        style={{
          position: 'absolute',
          top: 40,
          left: 24,
          zIndex: 2,
          backgroundColor: '#0057E7',
          padding: 8,
          borderRadius: 50,
        }}>
        <IconHome height={20} width={20} />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          zIndex: 2,
          alignSelf: 'center',
          width: SCREEN_WIDTH - 120,
        }}>
        <TouchableOpacity
          onPress={handleAddFriend}
          style={{
            backgroundColor: '#0057E7',
            height: 58,
            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          {friendLocations.length === 0 && (
            <IconAdd height={20} width={20} color='#FFFFFF' />
          )}

          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: 18,
              fontFamily: 'SFProDisplay-Medium',
              marginLeft: 8,
            }}>
            {friendLocations.length === 0
              ? t('Add friend')
              : t('Track friends')}
          </Text>
        </TouchableOpacity>

        {friendLocations.length === 0 && (
          <Text
            style={{
              color: '#000000',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'SFProDisplay-Medium',
            }}>
            {t('Add friends to check their locations')}
          </Text>
        )}
      </View>

      {!isPermission && (
        <TouchableOpacity
          onPress={requestLocationPermission}
          style={{
            position: 'absolute',
            top: 220,
            right: 16,
            zIndex: 2,
            backgroundColor: '#0057E7',
            padding: 8,
            borderRadius: 50,
          }}>
          <IconPermission height={20} width={20} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={handelChangeMapStyle}
        style={{
          position: 'absolute',
          bottom: 220,
          right: 16,
          zIndex: 2,
          backgroundColor: '#0057E7',
          padding: 8,
          borderRadius: 50,
        }}>
        <IconLayer height={20} width={20} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleMyLocationPress}
        style={{
          position: 'absolute',
          bottom: 160,
          right: 16,
          zIndex: 2,
          backgroundColor: '#0057E7',
          padding: 8,
          borderRadius: 50,
        }}>
        <IconPosition height={20} width={20} />
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
