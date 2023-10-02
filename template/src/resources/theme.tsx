import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  useTheme,
} from 'react-native-paper';

/**
https://callstack.github.io/react-native-paper/docs/guides/theming-with-react-navigation/
**/

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    myOwnProperty: true,
    text: '#000000',
    //Define new color
    backgroundColor: '#FAFAFA',
    backgroundInput: '#FAFAFA',
    backgroundModal: '#FFFFFF',
    backgroundIndicator: '#E0E0E0',
    borderColor: '#0057E7',
    title: '#777C7E',
    titleActive: '#0057E7',
    titleArtStyle: '#000',
    iconActive: '#0057E7',
    info: '#0C62CA',
    error: '#F75555',
    error_20: '#F7555520',
    success: '#067E30',
    disable: '#959595',
    white: '#FFFFFF',
    black: '#000000',
    buttonApp: '#0057E7',
    backgroundUpload: '#0057E7',
    lineBoder: 'rgba(53, 56, 63, 1)',
    blue: '#0057E7',
  },
};

export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    myOwnProperty: true,
    text: '#FFFFFF',
    //Define new color
    backgroundColor: '#181A20',
    backgroundInput: '#1F222A',
    backgroundModal: '#1F222A',
    backgroundIndicator: '#35383F',
    borderColor: '#0057E7',
    title: '#777C7E',
    titleActive: '#0057E7',
    titleArtStyle: '#FFF',
    iconActive: '#0057E7',
    info: '#0C62CA',
    error: '#F75555',
    error_20: '#F7555520',
    success: '#067E30',
    disable: '#959595',
    white: '#FFFFFF',
    black: '#000000',
    buttonApp: '#0057E7',
    backgroundUpload: 'rgba(105, 73, 255, 0.08)',
    lineBoder: 'rgba(53, 56, 63, 1)',
    blue: '#0057E7',
  },
};

export type AppTheme = typeof CombinedDefaultTheme;

export const useAppTheme = () => useTheme<AppTheme>();
