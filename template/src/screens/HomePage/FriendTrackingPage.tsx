import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';

import { useTopInset } from '~/hooks/useInset';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconDelete from '~/resources/Icons/IconDelete';
import IconEdit from '~/resources/Icons/IconEdit';
import IconEditLocated from '~/resources/Icons/IconEditLocated';

import HeaderComponent from '~/base/HeaderComponent';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const FriendTrackingPage = ({ route }: any): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const topInsets = useTopInset();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const mapRef = useRef<MapView | null>(null);
  const animationRef = useRef<LottieView>(null);

  const UUID = resultContext?.result?.deviceUUID;
  const dataFriend = route.params?.friendData;
  const listFriend = route.params?.listFriend;

  const latitude = dataFriend?.latestLocation
    ? dataFriend.latestLocation[Object.keys(dataFriend.latestLocation)[0]]
        .latitude
    : 0;

  const longitude = dataFriend?.latestLocation
    ? dataFriend.latestLocation[Object.keys(dataFriend.latestLocation)[0]]
        .longitude
    : 0;
  const address = dataFriend?.latestLocation
    ? dataFriend.latestLocation[Object.keys(dataFriend.latestLocation)[0]]
        .description
    : '';

  const time = Object.keys(dataFriend?.latestLocation || {})[0];

  const [friendName, setFriendName] = useState(dataFriend?.friend_name);
  const [isLoading, setIsLoading] = useState(false);
  const [lastedLatitude, setLastedLatitude] = useState(latitude);
  const [lastedLongitude, setLastedLongitude] = useState(longitude);
  const [lastedAddress, setLastedAddress] = useState(address);
  const [lastedTime, setLastedTime] = useState(time);

  useEffect(() => {
    if (dataFriend?.friend_id) {
      const friendDocRef = firestore().collection('Users').doc(UUID);

      const unsubscribe = friendDocRef.onSnapshot((documentSnapshot) => {
        const userData = documentSnapshot.data();

        const matchingFriend = userData?.friend.find(
          (friendData: Friend) =>
            friendData.friend_id === dataFriend?.friend_id,
        );

        if (matchingFriend) {
          setFriendName(matchingFriend.friend_name);
        } else {
          console.log('Friend document does not exist.');
        }
      });

      return () => unsubscribe();
    }
  }, [dataFriend]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: lastedLatitude,
        longitude: lastedLongitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
    }
  }, [lastedLatitude, lastedLongitude]);

  // useEffect(() => {
  //   if (lastedTime) {
  //     const currentTimestamp = Date.now();
  //     const onlineDurationMs = currentTimestamp - parseInt(lastedTime, 10);
  //     setOnlineDuration(onlineDurationMs);
  //   }
  // }, [lastedTime]);

  const date = new Date(
    dataFriend?.connect_time.seconds * 1000 +
      dataFriend?.connect_time.nanoseconds / 1000000,
  );

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const onlineDate = new Date(parseInt(lastedTime));

  const lastedYear = onlineDate.getFullYear();
  const lastedMonth = monthNames[onlineDate.getMonth()];
  const lastedDay = onlineDate.getDate().toString().padStart(2, '0');
  const lastedHours = onlineDate.getHours().toString().padStart(2, '0');
  const lastedMinutes = onlineDate.getMinutes().toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${hours}:${minutes}, ${month} ${day}, ${year}`;

  const lastedConnect = `${lastedHours}:${lastedMinutes}, ${lastedMonth} ${lastedDay}, ${lastedYear}`;

  const onGoBack = () => {
    navigation.goBack();
  };

  const handleDeleteFriend = () => {
    openModal('ConfirmDeleteFriendModal', true, {
      nameFriend: friendName,
      UUIDFriend: dataFriend?.friend_id,
    });
  };

  const handleEditName = () => {
    openModal('EditNameModal', true, {
      avatarFriend: dataFriend?.avatar_friend,
      nameFriend: friendName,
      UUIDFriend: dataFriend?.friend_id,
      listFriend: listFriend,
    });
  };

  const handleRefreshData = async () => {
    try {
      setIsLoading(true);

      const userDocRef = firestore()
        .collection('Users')
        .doc(dataFriend?.friend_id);
      const userDocumentSnapshot = await userDocRef.get();

      if (userDocumentSnapshot.exists) {
        const locations = userDocumentSnapshot.data()?.locations || [];

        // Get the latest location for this friend
        const latestLocation =
          locations.length > 0 ? locations[locations.length - 1] : null;

        if (latestLocation) {
          const timestampUpdate = Object.keys(latestLocation)[0];
          const locationData = latestLocation[timestampUpdate];

          // Set state with the new data
          setLastedLatitude(locationData.latitude);
          setLastedLongitude(locationData.longitude);
          setLastedAddress(locationData.description);
          setLastedTime(timestampUpdate);
        } else {
          console.log('No location data found for this friend.');
        }
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching friend location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={getImage('imageBackgroundApp')}
      resizeMode='cover'
      style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingTop: topInsets }}>
        <HeaderComponent
          title={t('Friend Tracking')}
          onBackPress={onGoBack}
          withRightIcon={true}
          rightIcon={
            <TouchableOpacity onPress={handleDeleteFriend}>
              <IconDelete width={24} height={24} />
            </TouchableOpacity>
          }
        />
        {isLoading && (
          <LottieView
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              backgroundColor: '#00000050',
            }}
            loop
            autoPlay
            ref={animationRef}
            source={require('~/resources/animation/animation_2.json')}
          />
        )}
        <View
          style={{
            flex: 1,
          }}>
          <View style={{ flex: 0.5 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: dataFriend?.avatar_friend }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
            </View>
            <View style={{ paddingHorizontal: 16 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    maxWidth: '90%',
                    fontSize: 20,
                    fontFamily: 'SFProDisplay-Medium',
                    fontWeight: '500',
                    marginRight: 12,
                    color: '#000',
                  }}>
                  {friendName}
                </Text>
                <TouchableOpacity onPress={handleEditName}>
                  <IconEditLocated height={20} width={20} color='#000' />
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#00000080' }}>
                {t('Connected on ')}
                <Text>{formattedDate}</Text>
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <View style={{ marginHorizontal: 16 }}>
              <Text
                numberOfLines={2}
                style={{
                  color: '#00000090',
                  fontFamily: 'SFProDisplay-Medium',
                  fontSize: 16,
                }}>
                {lastedAddress}
              </Text>
            </View>
            <View style={{ flex: 1, marginVertical: 16 }}>
              <MapView
                ref={mapRef}
                zoomEnabled={true}
                // followsUserLocation={true}
                // zoomControlEnabled={true}
                // showsUserLocation={true}
                // showsPointsOfInterest={true}
                initialRegion={{
                  latitude: lastedLatitude,
                  longitude: lastedLongitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
                mapType={'standard'}
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }}>
                <Marker
                  coordinate={{
                    latitude: lastedLatitude,
                    longitude: lastedLongitude,
                  }}>
                  <LinearGradient
                    colors={['#75E00A', '#0AE0A0']}
                    style={{
                      borderRadius: 50,
                      height: 54,
                      width: 54,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{ uri: dataFriend?.avatar_friend }}
                      style={{ width: 48, height: 48, borderRadius: 50 }}
                    />
                  </LinearGradient>
                </Marker>
              </MapView>
            </View>
            <Text style={{ color: '#000', marginLeft: 16 }}>
              {t('Update on ')}
              <Text>{lastedConnect}</Text>
            </Text>
            <TouchableOpacity
              onPress={handleRefreshData}
              style={{
                height: 50,
                width: '80%',
                alignSelf: 'center',
                backgroundColor: 'rgba(0, 87, 231, 1)',
                borderRadius: 4,
                marginVertical: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: 18,
                  lineHeight: 32,
                  fontFamily: 'SFProDisplay-Medium',
                }}>
                {t('REFRESH')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default FriendTrackingPage;
