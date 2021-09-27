import * as React from 'react';
import {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Color from 'color';
import TouchableItem from './TouchableItem';
import {ThemeContext} from 'styled-components';

/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 */
function DrawerItem(props) {
  const {colors} = useTheme();
  const themeContext = useContext(ThemeContext);

  const {
    icon,
    label,
    focused = false,
    activeTintColor = colors.primary,
    inactiveTintColor = Color(colors.text)
      .alpha(0.68)
      .rgb()
      .string(),
    activeBackgroundColor = Color(activeTintColor)
      .alpha(0.12)
      .rgb()
      .string(),
    inactiveBackgroundColor = 'transparent',
    onPress,
    ...rest
  } = props;

  const style = [
    styles.drawerItem,
    props.hasTopDivider && styles.hasTopDivider,
    props.hasBottomDivider && styles.hasBottomDivider,
    {borderColor: themeContext.drawer.borderColor},
  ];

  const labelStyle = [
    styles.listItemText,
    props.alignRight && styles.alignRight,

    props.exitColor
      ? {color: themeContext.drawer.exitTextColor}
      : {color: themeContext.drawer.textColor},
  ];

  const {borderRadius = 4} = StyleSheet.flatten(style || {});
  const color = focused ? activeTintColor : inactiveTintColor;
  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const iconNode = icon ? icon({size: 24, focused, color}) : null;

  return (
    <View
      collapsable={false}
      {...rest}
      style={[styles.container, {borderRadius, backgroundColor}, style]}>
      <TouchableItem
        delayPressIn={0}
        onPress={onPress}
        style={[styles.wrapper, {borderRadius}]}
        accessibilityTraits={focused ? ['button', 'selected'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityStates={focused ? ['selected'] : []}>
        <React.Fragment>
          {iconNode}
          <View
            style={[
              !props.alignRight && styles.marginRight,
              {marginLeft: iconNode ? 32 : 0, marginVertical: 5},
            ]}>
            {typeof label === 'string' ? (
              <Text
                numberOfLines={1}
                style={[
                  {
                    color,
                    fontWeight: '500',
                  },
                  labelStyle,
                ]}>
                {label}
              </Text>
            ) : (
              label({color, focused})
            )}
          </View>
        </React.Fragment>
      </TouchableItem>
    </View>
  );
}

export default DrawerItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
    overflow: 'hidden',
  },
  wrapper: {
    padding: 8,
  },
  marginRight: {
    marginRight: 32,
  },
  listItemText: {
    fontFamily: 'Poppins-Regular',
  },
  hasTopDivider: {
    borderTopWidth: 0.5,
  },
  hasBottomDivider: {
    borderBottomWidth: 0.5,
  },
  drawerItem: {
    borderRadius: 0,
  },
  alignRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
});
