import React, { ComponentProps, ReactNode, useMemo } from 'react';
import { Platform, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { useAppTheme } from '~/resources/theme';

type FontWeight = 'Bold' | 'Semi';

type TextProps = {
  defaultStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  color?: string;
  bold?: boolean;
  underline?: boolean;
  italicize?: boolean;
  fontType?: FontWeight;
  nunitoFont?: boolean;
} & Omit<ComponentProps<typeof Text>, 'style'>;

const getColor = (color?: string): StyleProp<TextStyle> => {
  return {
    color: color ? color : '#000000',
  };
};

const getStyleNunitoFont = (
  bold?: boolean,
  italicize?: boolean,
): StyleProp<TextStyle> => {
  if (Platform.OS === 'ios') {
    return {
      // fontFamily: 'Nunito',
      fontWeight: bold ? 'bold' : 'normal',
      fontStyle: italicize ? 'italic' : 'normal',
    };
  } else if (Platform.OS === 'android') {
    if (bold && italicize) {
      return {
        // fontFamily: 'Nunito-BoldItalic',
      };
    } else if (bold) {
      return {
        // fontFamily: bold ? 'Nunito-Bold' : 'Nunito-Regular',
      };
    } else if (italicize) {
      return {
        // fontFamily: 'Nunito-Italic',
      };
    } else {
      return {
        // fontFamily: 'Nunito-Regular',
      };
    }
  }
};

const getFontWeight = (fontWeight?: FontWeight) => {
  switch (fontWeight) {
    case 'Bold':
      return '700';
    case 'Semi':
      return '600';
    default:
      return 'normal';
  }
};

const getUnderline = (underline?: boolean): StyleProp<TextStyle> => {
  return {
    textDecorationLine: underline ? 'underline' : 'none',
  };
};

const BaseText = ({
  defaultStyle,
  style,
  color,
  bold,
  underline,
  italicize,
  fontType,
  nunitoFont,
  ...props
}: TextProps): JSX.Element => {
  const customStyle = useMemo<StyleProp<TextStyle>>(() => {
    return [
      defaultStyle,
      getColor(color),
      getUnderline(underline),
      getStyleNunitoFont(bold, italicize),
      style,
    ];
  }, [
    defaultStyle,
    color,
    bold,
    italicize,
    fontType,
    underline,
    nunitoFont,
    style,
  ]);

  return <Text style={customStyle} {...props} />;
};

export const H1 = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.H1} nunitoFont {...props} />;
};

export const H3 = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.H3} nunitoFont {...props} />;
};

export const H4 = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.H4} nunitoFont {...props} />;
};

export const H5 = (props: TextProps): JSX.Element => {
  return <BaseText fontType={'Semi'} defaultStyle={styles.H5} {...props} />;
};

export const H6 = (props: TextProps): JSX.Element => {
  return <BaseText fontType={'Bold'} defaultStyle={styles.H6} {...props} />;
};

export const Xsmall = (props: TextProps): JSX.Element => {
  return <BaseText fontType={'Semi'} defaultStyle={styles.Xsmall} {...props} />;
};

export const Large = (props: TextProps): JSX.Element => {
  return <BaseText fontType={'Bold'} defaultStyle={styles.Large} {...props} />;
};

export const Medium = (props: TextProps): JSX.Element => {
  return <BaseText fontType={'Bold'} defaultStyle={styles.Medium} {...props} />;
};

export const Xlarge = (props: TextProps): JSX.Element => {
  return <BaseText fontType={'Bold'} defaultStyle={styles.Xlarge} {...props} />;
};
export const Small = (props: TextProps): JSX.Element => {
  return <BaseText fontType={'Bold'} defaultStyle={styles.Small} {...props} />;
};

const styles = StyleSheet.create({
  H1: {
    fontSize: 48,
    lineHeight: 76,
  },
  H3: {
    fontSize: 32,
    lineHeight: 52,
  },
  H4: {
    fontSize: 24,
    lineHeight: 38,
  },
  H5: {
    fontSize: 20,
    lineHeight: 32,
  },
  H6: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
  },
  Xsmall: {
    fontSize: 10,
    lineHeight: 14,
  },
  Large: {
    fontSize: 16,
    lineHeight: 22,
  },
  Medium: {
    fontSize: 14,
    lineHeight: 20,
  },
  Xlarge: {
    fontSize: 18,
    lineHeight: 25,
  },
  Small: {
    fontSize: 12,
    lineHeight: 16,
  },
});
