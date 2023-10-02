import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import useModalManager from '~/hooks/useModalManager';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconConfirm from '~/resources/Icons/IconConfirm';
import IconDelete from '~/resources/Icons/IconDelete';
import IconEditLocated from '~/resources/Icons/IconEditLocated';

const LocatedItem = ({
  data,
  onPressDeleteCallback,
  listFriend,
}: any): JSX.Element => {
  const { t } = useTranslation();

  const { openModal } = useModalManager();
  const [avatarFriend, setAvatarFriend] = useState('');
  const [timeLasted, setTimeLasted] = useState('');

  const [userName, setUserName] = useState('');

  const resultContext = usePreferenceContext();

  const UUID = resultContext?.result?.deviceUUID;

  useMemo(async () => {
    const a = await firestore().collection('Users').doc(data.friend_id).get();
    // setDateUser(a._data.locations);

    return a;
  }, [data]);

  useEffect(() => {
    const userRef = firestore().collection('Users').doc(UUID);

    const unsubscribe = userRef.onSnapshot((documentSnapshot) => {
      const userData = documentSnapshot.data();

      if (userData && userData.friend) {
        // Find the friend with matching friend_id

        const matchingFriend = userData.friend.find(
          (friendData: Friend) => friendData.friend_id === data?.friend_id,
        );

        if (matchingFriend) {
          // Assuming connect_time is a property in the friend object
          const connectTime = matchingFriend.connect_time;
          const date = new Date(
            connectTime.seconds * 1000 + connectTime.nanoseconds / 1000000,
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

          const year = date.getFullYear();
          const month = monthNames[date.getMonth()];
          const day = date.getDate().toString().padStart(2, '0');
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');

          // Create the formatted date string
          const formattedDate = `${hours}:${minutes}, ${month} ${day}, ${year}`;

          setTimeLasted(formattedDate);
        } else {
          // Handle the case where there's no matching friend
          setTimeLasted('');
        }
      } else {
        setTimeLasted(''); // Set a default value or handle it as needed
      }
    });

    return () => {
      unsubscribe();
    };
  }, [data?.friend_id, UUID]);

  const handleEditName = () => {
    openModal('EditNameModal', true, {
      avatarFriend: avatarFriend,
      nameFriend: userName,
      UUIDFriend: data.friend_id,
      listFriend: listFriend,
    });
  };

  useEffect(() => {
    const userDocumentRef = firestore()
      .collection('Users')
      .doc(data?.friend_id);

    const fetchUserInfo = async () => {
      try {
        const userDocumentSnapshot = await userDocumentRef.get();

        if (userDocumentSnapshot.exists) {
          const userData = userDocumentSnapshot.data();
          // const locations = userData?.locations || [];

          // if (locations.length > 0) {
          //   const lastLocation = locations[locations.length - 1];

          //   const lastLocationDescription =
          //     Object.values(lastLocation)[0]?.description;

          //   if (lastLocationDescription) {
          //     const regex = /, (\d+), (.+?), (.+)$/;
          //     const match = lastLocationDescription.match(regex);

          //     if (match && match.length >= 3) {
          //       const extractedInfo = `${match[1]}, ${match[2]}, ${match[3]}`;
          //       setLocationLasted(extractedInfo);
          //     } else {
          //       console.log('No match found');
          //     }
          //   } else {
          //     console.log('No description found in the last location');
          //   }
          // } else {
          //   console.log('No locations available for this user');
          // }

          setAvatarFriend(userData?.image_avatar);
        } else {
          console.log('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    // Call the fetchUserInfo function to retrieve user information
    fetchUserInfo();

    // Subscribe to real-time updates for the friend's document
    const unsubscribe = userDocumentRef.onSnapshot((snapshot) => {
      const userData = snapshot.data();
      setAvatarFriend(userData?.image_avatar);
    });

    // Unsubscribe from the real-time updates when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [UUID, data]);

  useEffect(() => {
    setUserName(data.friend_name);
  }, [data]);

  return (
    <View
      style={{
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(80, 80, 80, 0.24)',
        backgroundColor: 'white',
      }}>
      <View style={{ padding: 12 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              width: '80%',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderColor: '#0057E7',
                borderWidth: 2,
              }}>
              {avatarFriend ? (
                <Image
                  source={{ uri: avatarFriend }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 100,
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png',
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 100,
                  }}
                />
              )}
            </View>

            <View
              style={{
                paddingLeft: 8,
                maxWidth: '75%',
              }}>
              <Text
                ellipsizeMode='tail'
                numberOfLines={2}
                style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>
                {userName}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingRight: 8 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: -24,
              }}>
              <TouchableOpacity onPress={onPressDeleteCallback}>
                <IconDelete width={24} height={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditName}
                style={{ paddingLeft: 8 }}>
                <IconEditLocated width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {timeLasted && (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(80, 80, 80, 0.24)',
                width: '60%',
                height: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}
            />
            <View
              style={{
                width: '100%',
                paddingLeft: 68,
              }}>
              <Text style={{ color: 'rgba(119, 124, 126, 1)' }}>
                {t('Connected ')} {timeLasted}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export default LocatedItem;
