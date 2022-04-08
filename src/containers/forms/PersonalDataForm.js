import React, {useState, Fragment, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import {Formik} from 'formik';
import {ThemeContext} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../contants/screens';

import {RegistrationSchema} from '../../contants/formSchemas';

import FormItem from '../../components/Form/FormItem';
import Input from '../../components/Input';
import Text from '../../components/Typography/Text';
import Button from '../../components/Buttons/Button';
import SwitchForm from '../../components/Form/SwitchForm';
import MaskedInput from '../../components/MaskedInput';

import StateSelector from './StateSelector';
import SegmentSelector from './SegmentSelector';
import CitySelector from './CitySelector';

export default ({onSubmit, loading}) => {
  const themeContext = useContext(ThemeContext);
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const canEditCpf = !user.cpf;

  return (
    <Formik
      validationSchema={RegistrationSchema}
      initialValues={user}
      onSubmit={onSubmit}>
      {({
        handleChange,
        handleBlur,
        setFieldTouched,
        handleSubmit,
        values,
        setFieldValue,
        errors,
        touched,
      }) => (
        <Fragment>
          <FormItem>
            <Input
              style={{color: themeContext.drawer.textProfileColor}}
              validate={false}
              placeholder="Nome Completo"
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              value={values.name}
            />
            {errors.name ? (
              <Text style={{color: 'red'}}>{errors.name}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <Input
              style={{color: themeContext.drawer.textProfileColor}}
              editable={false}
              placeholder="Email"
              value={values.email}
            />
          </FormItem>

          <FormItem>
            <MaskedInput
              mask={'[000].[000].[000]-[00]'}
              editable={canEditCpf}
              keyboardType="decimal-pad"
              placeholder="Cpf"
              onChangeText={handleChange('cpf')}
              style={{color: themeContext.drawer.textProfileColor}}
              onBlur={handleBlur('cpf')}
              value={values.cpf}
            />
            {errors.cpf ? (
              <Text style={{color: 'red'}}>{errors.cpf}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <MaskedInput
              mask={'([00]) [00000]-[0000]'}
              keyboardType="decimal-pad"
              placeholder="Celular"
              onChangeText={handleChange('cellphone')}
              onBlur={handleBlur('cellphone')}
              style={{color: themeContext.drawer.textProfileColor}}
              value={values.cellphone}
            />
            {errors.cellphone ? (
              <Text style={{color: 'red'}}>{errors.cellphone}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <SegmentSelector
              selected={values.segment}
              onValueChange={e => {
                setFieldValue('segment', e);
              }}
            />
            {errors.state ? (
              <Text style={{color: 'red'}}>{errors.state}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <StateSelector
              selected={values.state}
              onValueChange={e => {
                setFieldValue('state', e);
              }}
            />
            {errors.state ? (
              <Text style={{color: 'red'}}>{errors.state}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <CitySelector
              selected={values.city}
              stateId={values.state}
              onValueChange={handleChange('city')}
            />
            {errors.state ? (
              <Text style={{color: 'red'}}>{errors.state}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <MaskedInput
              mask={'[00].[000].[000]/[0000]-[00]'}
              keyboardType="decimal-pad"
              placeholder="CNPJ"
              onChangeText={handleChange('cnpj')}
              onBlur={handleBlur('cnpj')}
              style={{color: themeContext.drawer.textProfileColor}}
              value={values.cnpj}
            />
            {errors.cnpj ? (
              <Text style={{color: 'red'}}>{errors.cnpj}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <Input
              placeholder="Empresa"
              onChangeText={handleChange('business')}
              onBlur={handleBlur('business')}
              style={{color: themeContext.drawer.textProfileColor}}
              value={values.business}
            />
            {errors.business ? (
              <Text style={{color: 'red'}}>{errors.business}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <MaskedInput
              mask={'([00]) [00000]-[0000]'}
              keyboardType="decimal-pad"
              placeholder="Whatsapp"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              style={{color: themeContext.drawer.textProfileColor}}
              value={values.phone}
            />
            {errors.phone ? (
              <Text style={{color: 'red'}}>{errors.phone}</Text>
            ) : null}

            <SwitchForm
              label="Deixar whatsapp público"
              labelStyle={{color: themeContext.drawer.textProfileColor}}
              value={values.public_phone}
              onValueChange={value => setFieldValue('public_phone', value)}
            />
          </FormItem>

          <FormItem>
            <Input
              placeholder="Instagram"
              onChangeText={handleChange('instagram')}
              onBlur={handleBlur('instagram')}
              style={{color: themeContext.drawer.textProfileColor}}
              value={values.instagram}
            />
            <SwitchForm
              label="Deixar instagram público"
              labelStyle={{color: themeContext.drawer.textProfileColor}}
              value={values.public_instagram}
              onValueChange={value => setFieldValue('public_instagram', value)}
            />
          </FormItem>

          <FormItem>
            <Input
              keyboardType="decimal-pad"
              placeholder="Quantidade de Funcionários"
              onChangeText={handleChange('employees')}
              onBlur={handleBlur('employees')}
              style={{color: themeContext.drawer.textProfileColor}}
              value={values.employees}
            />
            {errors.employees ? (
              <Text style={{color: 'red'}}>{errors.employees}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <Input
              keyboardType="decimal-pad"
              placeholder="Média de faturamento anual do seu negócio"
              onChangeText={handleChange('billing_average')}
              onBlur={handleBlur('billing_average')}
              style={{color: themeContext.drawer.textProfileColor}}
              value={formatReal(getMoney(values.billing_average))}
            />
            {errors.billing_average ? (
              <Text style={{color: 'red'}}>{errors.billing_average}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <Input
              numberOfLines={3}
              multiline
              style={{color: themeContext.drawer.textProfileColor}}
              placeholder="O que você considera ponto forte na sua personalidade empreendedora?"
              onChangeText={handleChange('strongPoints')}
              onBlur={handleBlur('strongPoints')}
              value={values.strongPoints}
            />
          </FormItem>

          <FormItem>
            <Input
              numberOfLines={3}
              multiline
              style={{color: themeContext.drawer.textProfileColor}}
              placeholder="Você possui alguma dúvida quanto empreendedor? "
              onChangeText={handleChange('entrepreneurDoubts')}
              onBlur={handleBlur('entrepreneurDoubts')}
              value={values.entrepreneurDoubts}
            />
          </FormItem>

          <FormItem>
            <Input
              multiline
              style={{color: themeContext.drawer.textProfileColor}}
              numberOfLines={3}
              placeholder="Sobre você "
              onChangeText={handleChange('aboutMe')}
              onBlur={handleBlur('aboutMe')}
              value={values.aboutMe}
            />
          </FormItem>

          <FormItem>
            <View style={styles.row}>
              <CheckBox
                disabled={false}
                value={values.terms}
                onValueChange={newValue => setFieldValue('terms', newValue)}
                tintColors={{
                  false: themeContext.input.switch.darkMode,
                  true: themeContext.input.switch.lightMode,
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsAndConditionsScreen')}>
                <Text style={styles.text}>
                  Eu li e concordo com os termos de uso
                </Text>
              </TouchableOpacity>
            </View>
            {errors.terms ? (
              <Text style={{color: 'red'}}>{errors.terms}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <Button
              loading={loading}
              onPress={handleSubmit}
              size="large"
              disabled={loading}
              text="Enviar"
            />
          </FormItem>
        </Fragment>
      )}
    </Formik>
  );
};

function getMoney(str) {
  if (str) {
    return parseInt(str.replace(/[\D]+/g, '')) || 0;
  }
  return 0;
}
function formatReal(int) {
  if (!int) {
    return null;
  }

  let tmp = int + '';
  tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
  if (tmp.length > 6) {
    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  }

  return `R$ ${tmp}`;
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
});
