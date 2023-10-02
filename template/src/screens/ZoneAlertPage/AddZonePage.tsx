import {
  // RouteProp,
  useFocusEffect,
  useNavigation, // useRoute,
} from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SkypeIndicator } from 'react-native-indicators';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Checkbox, TextInput as DefaultTextInput } from 'react-native-paper';
import {
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useTopInset } from '~/hooks/useInset';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconSuccess from '~/resources/Icons/IconSuccess';
import { useAppTheme } from '~/resources/theme';

import { GOOGLE_MAP_KEY } from '@env';
import ButtonCustom from '~/base/ButtonCustom';
import HeaderComponent from '~/base/HeaderComponent';
import TextInput from '~/base/TextInput';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import { GoogleAdsIds } from '~/types/GoogleAds';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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

const AddZonePage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal, getParams } = useModalManager();
  const actionMethod = usePreferenceActionsContext();
  const [checkedSafe, setCheckedSafe] = useState(true);
  const [checkedDanger, setCheckedDanger] = useState(true);
  const [checkedOnEnter, setCheckedOnEnter] = useState(true);
  const [checkedOnLeave, setCheckedOnLeave] = useState(true);
  const topInsets = useTopInset();

  const [region, setRegion] = useState<Region | undefined>(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const mapViewRef = useRef(null);
  const placesAutocompleteRef = useRef(null);

  // const { isClosed, load } = useInterstitialAd(GoogleAdsIds.INTERSTITIAL, {
  //   requestNonPersonalizedAdsOnly: true,
  // });

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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  // useEffect(() => {
  //   load();
  // }, [isClosed, load]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const onGoBack = () => {
    navigation.goBack();
  };

  const handleClearInput = () => {
    if (placesAutocompleteRef.current) {
      placesAutocompleteRef.current.setAddressText('');
      setMarkerPosition(null);
    }
  };

  const handleMapPress = (e) => {
    const newMarkerPosition = e.nativeEvent.coordinate;
    setMarkerPosition(newMarkerPosition);

    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(
        {
          latitude: newMarkerPosition.latitude,
          longitude: newMarkerPosition.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  };

  const handlePlaceSelect = (details) => {
    const { location } = details?.geometry;
    const { lat, lng } = location;

    const newMarker = {
      latitude: lat,
      longitude: lng,
    };
    setMarkerPosition(newMarker);

    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: '#F2F4F5', paddingTop: topInsets }}>
      <HeaderComponent
        title={t('Add Zone')}
        onBackPress={onGoBack}
        withRightIcon={true}
        rightIcon={<IconSuccess width={24} height={24} />}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {region && (
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            zoomEnabled={true}
            ref={mapViewRef}
            followsUserLocation={true}
            zoomControlEnabled={true}
            // showsUserLocation={true}
            // showsMyLocationButton={true}
            showsPointsOfInterest={true}
            onPress={handleMapPress}
            mapType={'standard'}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}>
            {markerPosition && (
              <Marker
                coordinate={markerPosition}
                draggable={true}
                onDragEnd={(e) => {
                  console.log('dragEnd', e.nativeEvent.coordinate);
                }}>
                <Image
                  source={getImage('geoLocation')}
                  style={{ width: 40, height: 40 }}
                />
              </Marker>
            )}
            {/* {marker && (
              <Marker
                coordinate={marker.coordinate}
                draggable={true}
                onDragEnd={(e) => {
                  console.log('dragEnd', e.nativeEvent.coordinate);
                }}>
                <Image
                  source={getImage('geoLocation')}
                  style={{ width: 40, height: 40 }}
                />
              </Marker>
            )} */}
          </MapView>
        )}
        <View
          style={{
            position: 'absolute',
            top: 20,
            zIndex: 10,
            width: '90%',
            alignSelf: 'center',
          }}>
          <GooglePlacesAutocomplete
            ref={placesAutocompleteRef}
            placeholder={t('Search for location')}
            query={{ key: GOOGLE_MAP_KEY }}
            fetchDetails={true}
            onPress={(_, details) => handlePlaceSelect(details)}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log('no results')}
            textInputProps={{
              placeholderTextColor: '#5d5d5d30',
            }}
            styles={{
              textInputContainer: {},
              textInput: {
                borderColor: '#5d5d5d30',
                borderWidth: 0.5,
                color: '#000',
                paddingRight: 32,
              },

              // predefinedPlacesDescription: {
              //   color: '#000',
              // },
              separator: {
                height: 0.5,
                backgroundColor: '#c8c7cc50',
              },
              description: { color: '#5d5d5d' },
            }}
            renderRightButton={() => (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 14,
                }}
                onPress={handleClearInput}>
                <Icon
                  name='times-circle'
                  size={15}
                  style={{ color: '#5d5d5d' }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {/* checkbox */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'SFProDisplay-Medium',
              fontWeight: '700',
              marginRight: 20,
              color: '#000',
            }}>
            {t(`Status`)}:
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <Checkbox.Android
                status={checkedSafe ? 'checked' : 'unchecked'}
                color='#0057E7'
                uncheckedColor='#0057E7'
                onPress={() => {
                  setCheckedSafe(!checkedSafe);
                }}
              />
              <Text style={{ color: '#000' }}>{t('Safe')}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <Checkbox.Android
                status={checkedDanger ? 'checked' : 'unchecked'}
                color='#0057E7'
                uncheckedColor='#0057E7'
                onPress={() => {
                  setCheckedDanger(!checkedDanger);
                }}
              />
              <Text style={{ color: '#000' }}>{t('Danger')}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'SFProDisplay-Medium',
              fontWeight: '700',
              marginRight: 20,
              color: '#000',
            }}>
            {t(`Status`)}:
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <Checkbox.Android
                status={checkedOnEnter ? 'checked' : 'unchecked'}
                color='#0057E7'
                uncheckedColor='#0057E7'
                onPress={() => {
                  setCheckedOnEnter(!checkedOnEnter);
                }}
              />
              <Text style={{ color: '#000' }}>{t('On enter')}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <Checkbox.Android
                status={checkedOnLeave ? 'checked' : 'unchecked'}
                color='#0057E7'
                uncheckedColor='#0057E7'
                onPress={() => {
                  setCheckedOnLeave(!checkedOnLeave);
                }}
              />
              <Text style={{ color: '#000' }}>{t('On leave')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AddZonePage;

const styles = StyleSheet.create({});
