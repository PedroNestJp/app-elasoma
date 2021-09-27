import React, {useContext} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import Text from '../Typography/Text';
import PencilIcon from '../Icons/PencilIcon';
import MoonIcon from '../Icons/MoonIcon';
import SunIcon from '../Icons/SunIcon';
import PlayIcon from '../Icons/PlayIcon';
import DownloadIcon from '../Icons/DownloadIcon';
import Loading from '../Loading';

const CustomText = styled(Text)`
  text-decoration-line: ${({underline}) => (underline ? 'underline' : 'none')};
`;

export default ({
  disabled,
  style,
  textStyle,
  onPress,
  text,
  underline,
  icon,
  loading = false,
  ...props
}) => {
  const IconComp = icon ? buttonIcons[icon] : () => null;
  const themeContext = useContext(ThemeContext);

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={{
          ...styles.container,
          ...style,
          borderColor: themeContext.textColor,
        }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomText {...props} style={textStyle} underline={underline}>
              {text}
            </CustomText>
            <View style={styles.icon}>
              <IconComp />
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const buttonIcons = {
  pencil: PencilIcon,
  moon: MoonIcon,
  sun: SunIcon,
  play: PlayIcon,
  download: DownloadIcon,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 5,
  },
});
