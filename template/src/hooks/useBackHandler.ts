import { useEffect } from 'react';
import { BackHandler } from 'react-native';

type Handler = () => boolean;

export default (handler: Handler): void => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
};
