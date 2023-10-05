import React, { ReactNode, useMemo } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import IconBack from '~/resources/Icons/IconBack';
import { useAppTheme } from '~/resources/theme';

type HeaderContainerProps = {
  title?: string;
  withBackButton?: boolean;
  withRightIcon?: boolean;
  onBackPress?: () => void;
  onRightIconPress?: () => void;
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const HeaderCustom = ({
  title,
  withBackButton = true,
  withRightIcon = false,
  style,
  rightIcon,
  onBackPress,
  onRightIconPress,
}: HeaderContainerProps): JSX.Element => {
  const theme = useAppTheme();

  const headerStyle = useMemo(() => [styles.containerHeader, style], [style]);

  return (
    <View style={headerStyle}>
      {withBackButton && (
        <Pressable onPress={onBackPress}>
          {/* <Icon name='arrow-left' size={20} color={theme.colors.black} /> */}
          <IconBack height={24} width={24} color={theme.colors.black} />
        </Pressable>
      )}
      {title && (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {title}
          </Text>
        </View>
      )}
      {withRightIcon && (
        <Pressable onPress={onRightIconPress}>{rightIcon}</Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexGrow: 1,
  },
  title: {
    marginLeft: 20,
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 20,
  },
});
export default HeaderCustom;
