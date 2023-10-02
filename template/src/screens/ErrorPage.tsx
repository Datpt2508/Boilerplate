// import crashlytics from '@react-native-firebase/crashlytics';
import React, { memo, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

// import codePush from 'react-native-code-push';

// import useTranslation from '~/hooks/useTranslation';

export type ErrorPageProps = {
  error: Error;
};

const ErrorPage = memo((props: ErrorPageProps): JSX.Element => {
  // const { t } = useTranslation();

  // const restartApp = async () => {
  //   codePush.allowRestart();
  //   codePush.restartApp();
  // };

  // useEffect(() => {
  //   crashlytics().recordError(props?.error, props?.error?.name);
  //   Alert.alert(
  //     '',
  //     t(
  //       `Oops, it looks like something went wrong. Please try opening the app again.`,
  //     ),
  //     [
  //       {
  //         text: t('Open again'),
  //         onPress: restartApp,
  //         style: 'cancel',
  //       },
  //     ],
  //   );
  // }, [props?.error, t]);

  return <View style={styles.container} />;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ErrorPage;
