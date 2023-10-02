import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { TextInput as DefaultTextInput, Menu } from 'react-native-paper';

import IconFormCollapsed from '~/resources/Icons/IconFormCollapsed';
import IconFormExpand from '~/resources/Icons/IconFormExpand';

import TextInput from '~/base/TextInput';
import { XSParagraph } from '~/base/Typography';

export type RenderItemProps<T> = {
  item: T;
  setValue: (value: T) => void;
  onDismiss: () => void;
};

type DefaultDropdownInputProps = {
  value: string;
  error?: string;
  visible: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
};

export type DropdownProps<T> = {
  style?: StyleProp<ViewStyle>;
  initialValue?: T;
  error?: string;
  label?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  dropDownStyle?: StyleProp<ViewStyle>;
  options: Array<T>;
  keyExtractor?: (item: T, index: number) => string;
  onChange?: (value: T) => void;
  renderItem: (props: RenderItemProps<T>) => JSX.Element;
  renderValue?: (value: T) => string;
  DropdownInput?: React.FC<DefaultDropdownInputProps>;
};

const defaultRenderValue = (v: unknown) => {
  return (v as { title: string }).title;
};

const DefaultDropdownInput = ({
  value,
  error,
  visible,
  label,
  style,
}: DefaultDropdownInputProps) => {
  const outlineColor = visible ? '#1C0056' : value ? '#959595' : '#D6D6D6';

  return (
    <>
      <TextInput
        style={style}
        label={label}
        mode='outlined'
        outlineColor={outlineColor}
        error={!!error}
        value={value}
        right={
          <DefaultTextInput.Icon
            name={() =>
              !visible ? (
                <IconFormExpand width={32} height={32} />
              ) : (
                <IconFormCollapsed width={32} height={32} />
              )
            }
          />
        }
      />
      {error && <XSParagraph style={styles.errorText}>{error}</XSParagraph>}
    </>
  );
};

const Dropdown = <T,>({
  style,
  initialValue,
  contentContainerStyle,
  options,
  label,
  error,
  keyExtractor,
  renderItem,
  onChange,
  renderValue = defaultRenderValue,
  DropdownInput = DefaultDropdownInput,
  dropDownStyle,
}: DropdownProps<T>): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(50);
  const [value, setValue] = useState<T>(initialValue || options[0]);
  const onChangeRef = useRef(onChange);

  const onDismiss = () => setVisible(false);
  const onDisplay = () => setVisible(true);
  const onLayout = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      style,
      {
        marginTop: height - 5,
      },
    ],
    [style, height],
  );

  useEffect(() => {
    onChangeRef.current?.(value);
  }, [value]);

  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      style={customStyle}
      anchor={
        <Pressable onPress={onDisplay} onLayout={onLayout}>
          <View pointerEvents='none'>
            <DropdownInput
              style={dropDownStyle}
              value={renderValue(value)}
              error={error}
              visible={visible}
              label={label ? label : ''}
            />
          </View>
        </Pressable>
      }>
      <FlatList<T>
        contentContainerStyle={contentContainerStyle}
        data={options}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => renderItem({ item, setValue, onDismiss })}
      />
    </Menu>
  );
};

Dropdown.Item = Menu.Item;

const styles = StyleSheet.create({
  errorText: {
    color: '#D62105',
    marginHorizontal: 16,
    marginTop: 5,
  },
});

export default Dropdown;
