import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18n from 'i18next';
import RadioButton from '~/base/RadioButton';

interface SelectLanguage {
  selectLanguage: (language: string) => void;
}

const SelectLanguage = ({ selectLanguage }: SelectLanguage): JSX.Element => {
  const languageCurrent = i18n.language;

  const [Language, setLanguage] = useState(languageCurrent);

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('languageApp');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const language = [
    {
      title: 'English',
      language: 'en_English',
      icon: (
        <Image
          source={require('../../resources/images/Language/english.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Hindi',
      language: 'hi_Hindi',
      icon: (
        <Image
          source={require('../../resources/images/Language/Hindi.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Portuguese',
      language: 'pt_Portuguese',
      icon: (
        <Image
          source={require('../../resources/images/Language/Por.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Spanish',
      language: 'es_Spanish',
      icon: (
        <Image
          source={require('../../resources/images/Language/Spanish.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Indonesian',
      language: 'id_Indonesian',
      icon: (
        <Image
          source={require('../../resources/images/Language/Indonesian.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: 'Korean',
      language: 'ko_Korean',
      icon: (
        <Image
          source={require('../../resources/images/Language/Korean.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
  ];

  const handSelect = (item: any) => {
    setLanguage(item.language);
    selectLanguage(item.language);
  };

  return (
    <>
      <View style={styles.listItem}>
        {language.map((item) => (
          <TouchableOpacity
            key={item.language}
            style={Language === item?.language ? styles.active : styles.item}
            onPress={() => handSelect(item)}>
            <View style={styles.contentItem}>
              <View style={styles.leftItem}>
                <View>{item.icon}</View>
                <Text
                  style={[
                    styles.textItem,
                    {
                      color:
                        Language === item?.language ? '#0057E7' : '#262626',
                    },
                  ]}>
                  {item.title}
                </Text>
              </View>
              <RadioButton
                state={Language === item?.language ? true : false}
                color={Language === item?.language ? '#0057E7' : '#ffffff'}
                onPress={() => handSelect(item)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
  item: {
    borderRadius: 7,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#50505024',
    // backgroundColor: 'rgba(31, 34, 42, 0.8)',
  },
  active: {
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 8,
    // backgroundColor: 'rgba(31, 34, 42, 0.8)',
    borderColor: '#0057E7',
  },
  contentItem: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    justifyContent: 'space-between',
  },
  textItem: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 8,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectLanguage;
