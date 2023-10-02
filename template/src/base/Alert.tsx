import { Dimensions, StyleSheet, View } from 'react-native';

import IconAlertBase from '~/resources/Icons/IconAlertBase';
import { useAppTheme } from '~/resources/theme';

import { Xsmall } from '~/base/Typography';

interface Props {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const Alert: React.FC<Props> = ({ type, message }: Props) => {
  const theme = useAppTheme();
  const themeColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.green;
      case 'info':
        return theme.colors.primary;
      case 'warning':
        return theme.colors.orange;
      case 'error':
        return theme.colors.error;
      default:
        return '';
    }
  };

  const themeBackground = () => {
    switch (type) {
      case 'success':
        return theme.colors.green_20;
      case 'info':
        return theme.colors.infor_20;
      case 'warning':
        return theme.colors.orange_20;
      case 'error':
        return theme.colors.error_20;
      default:
        return '';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeBackground() }]}>
      <IconAlertBase
        width={16}
        height={16}
        color={themeColor()}
        style={styles.icon}
      />
      <Xsmall color={themeColor()} style={styles.messageStyle}>
        {message}
      </Xsmall>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 8,
  },
  icon: {
    marginLeft: 8,
  },
  messageStyle: {
    marginLeft: 7.5,
  },
});

export default Alert;
