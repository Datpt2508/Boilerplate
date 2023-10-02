import { Alert, Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

// import { recordHandledException } from '@bibabovn/react-native-newrelic';

export const openInAppBrowser = async (
  url: string,
  headers?: { [key: string]: string },
): Promise<void> => {
  try {
    const isAvailable = await InAppBrowser.isAvailable();
    if (!isAvailable) {
      await Linking.openURL(url);
    }

    await InAppBrowser.open(url, {
      // iOS Properties
      dismissButtonStyle: 'cancel',
      preferredBarTintColor: '#FFFFFF',
      preferredControlTintColor: '#0057E7',
      readerMode: false,
      animated: true,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: false,

      // Android Properties
      showTitle: true,
      toolbarColor: '#FFFFFF',
      secondaryToolbarColor: '#0057E7',
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: false,

      // Specify full animation resource identifier(package:anim/name)
      // or only resource name(in case of animation bundled with app).
      animations: {
        startEnter: 'slide_in_right',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right',
      },

      headers: headers,
    });
  } catch (err) {
    // recordHandledException(err);
    Alert.alert(err.message);
  }
};

// Function to close the in-app browser
export const closeInAppBrowser = async (): Promise<void> => {
  try {
    await InAppBrowser.close();
  } catch (err) {
    // Handle any errors that occur while trying to close the in-app browser
    Alert.alert(err.message);
  }
};
