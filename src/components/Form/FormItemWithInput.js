import React from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../Input';
import Text from '../Typography/Text';
import FormItem from './FormItem';

export default ({
  value,
  multiline = true,
  numberOfLines = 3,
  onChange,
  onBlur,
  errors,
  field,
  placeholder,
  children,
  ...rest
}) => (
  <FormItem>
    <Input
      multiline={multiline}
      numberOfLines={numberOfLines}
      validate={false}
      placeholder={placeholder}
      onChangeText={onBlur}
      onBlur={onChange}
      value={value}
      {...rest}
    />
    <View style={{paddingTop: 5}}>
      {errors[field] ? (
        <Text style={{color: 'red'}}>{errors[field]}</Text>
      ) : null}
      {children}
    </View>
  </FormItem>
);
