import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import useModalManager from '~/hooks/useModalManager';

import BottomSheetModal from '~/screens/components/BottomSheetModal';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ButtonCustom from '~/base/ButtonCustom';
import { HomePageNavProps } from '~/navigation/HomeNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ModalContent = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<HomePageNavProps>();

  const { getParams, openModal } = useModalManager();
  const dataFriend = getParams('FriendBottomModal')?.dataFriend;

  const currentTimestamp = Date.now();

  const updatedDataFriend =
    dataFriend &&
    dataFriend.map((item: any) => {
      if (item.latestLocation) {
        const latestTimestamp = Object.keys(item.latestLocation)[0];

        const timeDifference = currentTimestamp - parseInt(latestTimestamp, 10);

        // Set isActive based on the time difference (20 minutes = 20 * 60 * 1000 milliseconds)
        item.isActive = timeDifference <= 20 * 60 * 1000; // 20 minutes
      } else {
        item.isActive = false;
      }
      // console.log('item', JSON.stringify(item, undefined, 2));
      return item;
    });

  const handleAddFriend = () => {
    onCloseModal();
    openModal('ShareCodeBottomModal');
    // navigation.navigate('BottomTabNavigator', { screen: 'LocatedNavigator' });
  };

  const handleLocatedFriend = (item: any) => {
    onCloseModal();
    navigation.navigate('FriendTrackingPage', {
      friendData: item,
      listFriend: updatedDataFriend,
    });
  };

  return (
    <>
      <BottomSheetScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 16,
            borderRadius: 12,
          }}>
          {updatedDataFriend.map((item) => (
            <View
              key={item.friend_id}
              style={{
                borderColor: '#50505024',
                borderWidth: 1,
                borderRadius: 12,
                padding: 12,
                marginBottom: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ height: 40, width: 40, borderRadius: 50 }}>
                <Image
                  source={{ uri: item.avatar_friend }}
                  borderRadius={50}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderWidth: 2,
                    borderColor: '#235DB3',
                  }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: 8,
                  justifyContent: 'space-between',
                }}>
                <View style={{ maxWidth: '80%' }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{ fontWeight: 'bold', color: '#000' }}>
                    {item.friend_name}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  {/* Assuming you have an IconBattery component */}
                  {/* {item.isActive && <IconBattery value={40} size={100} />} */}
                  <View
                    style={{
                      maxWidth: 0.5 * SCREEN_WIDTH,
                    }}>
                    {item?.isFollow ? (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                          fontWeight: '300',
                          maxWidth: '100%',
                          color: '#777C7E',
                          // marginLeft: 2,
                        }}>
                        {item.latestLocation
                          ? item.latestLocation[
                              Object.keys(item.latestLocation)[0]
                            ].description
                          : ''}
                      </Text>
                    ) : (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                          fontWeight: '300',
                          maxWidth: '100%',
                          color: '#777C7E',
                          // marginLeft: 2,
                        }}>
                        {t('Disconnected')}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              <TouchableOpacity
                disabled={!item.isActive || !item.isFollow}
                onPress={() => handleLocatedFriend(item)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: item.isActive ? '#0057E7' : '#A0A0A0',
                  height: 40,
                  width: 80,
                  borderRadius: 4,
                }}>
                <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
                  {t('Track')}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </BottomSheetScrollView>
      <ButtonCustom
        onPress={handleAddFriend}
        title={t('Add Friend')}
        style={{
          width: '80%',
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
      />
    </>
  );
};

const expandedHeights = ['50%'];

const FriendBottomModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('FriendBottomModal');
  const visible = isOpen('FriendBottomModal');

  const onClose = (): void => {
    closeModal('FriendBottomModal');
  };

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onClose}
      expandedHeights={expandedHeights}>
      {visible ? <ModalContent onCloseModal={onClose} /> : null}
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-start',
    // flex: 1,
    // paddingBottom: 40,
  },
});

export default FriendBottomModal;
