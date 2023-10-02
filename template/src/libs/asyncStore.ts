import AsyncStorage from '@react-native-async-storage/async-storage';

import pMemo from 'p-memoize';

type Key = 'ACCESS_TOKEN';

export const getItemAsync = pMemo((key: Key) => AsyncStorage.getItem(key));

export const setItemAsync = (key: Key, value: string) =>
  AsyncStorage.setItem(key, value);

export const deleteItemAsync = (key: Key) => AsyncStorage.removeItem(key);
