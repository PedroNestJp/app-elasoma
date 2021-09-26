import React, {useContext} from 'react';
import {Picker, View} from 'react-native';
import styled, {ThemeContext} from 'styled-components';

const CustomPicker = styled(Picker)`
  border-width: 1px;
  border-color: ${props => props.theme.input.borderColor};
  color: ${props => props.theme.textColor};
  font-family: Poppins-Regular;
`;

const CustomView = styled(View)`
  border-bottom-width: 1px;
  border-color: ${props => props.theme.input.borderColor};
  color: ${props => props.theme.textColor};
  font-family: Poppins-Regular;
`;

export default props => {
  const themeContext = useContext(ThemeContext);

  return (
    <CustomView>
      <CustomPicker itemStyle={{color: themeContext.textColor}} {...props} />
    </CustomView>
  );
};

export const PickerItem = props => <Picker.Item {...props} />;
