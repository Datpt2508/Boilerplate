import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';

import useScale from '~/hooks/useScale';

import { useAppTheme } from '~/resources/theme';

type ToastOptions = {
  position?: ToastPosition;
  action?: ToastAction;
  duration?: number;
  iconToast?: ReactNode;
};

export type ToastContextProps = {
  show?: (message: string, state?: ToastState, options?: ToastOptions) => void;
};

type ToastAction =
  | {
      label: string;
      onPress: () => void;
    }
  | undefined;

type ToastState = 'info' | 'error' | 'success' | undefined;
type ToastPosition = 'top' | 'bottom' | 'center' | undefined;

export const ToastContext = createContext<ToastContextProps>({});

const toastColors = {
  info: '#0C62CA',
  error: '#D62105',
  success: '#067E30',
};

const ToastContextProvider = memo<PropsWithChildren>(
  ({ children }): JSX.Element => {
    const [toastID, setToastID] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [duration, setDuration] = useState<number>();
    const [state, setState] = useState<ToastState>('info');
    const [position, setPosition] = useState<ToastPosition>('top');
    const [visible, setVisible] = useState<boolean>(false);
    const [action, setAction] = useState<ToastAction>(undefined);
    const [iconToast, setIcon] = useState<ReactNode>(null);
    const insets = useSafeAreaInsets();
    const { hScale } = useScale();
    const theme = useAppTheme();

    const toastStyles = useMemo<StyleProp<ViewStyle>>(() => {
      return [
        styles.snackbar,
        {
          backgroundColor: toastColors[state || 'info'],
        },
      ];
    }, [state]);

    const onDismiss = (): void => {
      setVisible(false);
    };

    const show = useCallback(
      (
        _message: string,
        _state?: ToastState,
        _options?: ToastOptions,
      ): void => {
        const _action = _options?.action;
        const _icon = _options?.iconToast || null;
        const _duration = _options?.duration || 500;
        const _position = _options?.position || 'top';
        setAction(_action);
        setIcon(_icon);
        setDuration(_duration);
        setPosition(_position);
        setVisible(false);
        setMessage(_message);
        setState(_state);
        setToastID(uuid.v4().toString());
      },
      [],
    );

    const computedStyle: StyleProp<ViewStyle> = useMemo(() => {
      switch (position) {
        case 'top':
          return {
            position: 'absolute',
            left: insets.left,
            right: insets.right,
            top: insets.top,
            alignItems: 'center',
          };
        case 'center':
          return {
            position: 'absolute',
            left: insets.left,
            right: insets.right,
            top: insets.top,
            bottom: insets.bottom,
            alignItems: 'center',
            justifyContent: 'center',
          };
        case 'bottom':
          return {
            position: 'absolute',
            left: insets.left,
            right: insets.right,
            bottom: insets.bottom,
            alignItems: 'center',
          };
        default:
          return {
            position: 'absolute',
            left: insets.left,
            right: insets.right,
            bottom: insets.bottom,
            alignItems: 'center',
          };
      }
    }, [insets, position]);

    const value = useMemo(
      () => ({
        show,
      }),
      [show],
    );

    useEffect(() => {
      if (toastID) {
        setTimeout(() => {
          setVisible(true);
        }, 100);
      }
    }, [toastID]);

    const componentToastStyle = useMemo(
      () => [styles.componentToast, { width: screenWidth - hScale * 80 }],
      [hScale],
    );

    return (
      <ToastContext.Provider value={value}>
        {children}
        <Snackbar
          visible={visible}
          onDismiss={onDismiss}
          action={action}
          wrapperStyle={computedStyle}
          duration={duration}
          style={toastStyles}>
          <View style={componentToastStyle}>
            {iconToast ? iconToast : null}
            <Text style={[styles.styleMessage, { color: theme.colors.white }]}>
              {message}
            </Text>
          </View>
        </Snackbar>
      </ToastContext.Provider>
    );
  },
);

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  snackbar: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentToast: {
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleMessage: {
    fontWeight: 'bold',
    flexShrink: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
});

export default ToastContextProvider;
