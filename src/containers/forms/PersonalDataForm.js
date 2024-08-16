import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { Formik } from 'formik';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { RegistrationSchema } from '../../contants/formSchemas';
import FormItem from '../../components/Form/FormItem';
import Input from '../../components/Input';
import Text from '../../components/Typography/Text';
import Button from '../../components/Buttons/Button';
import SwitchForm from '../../components/Form/SwitchForm';
import MaskedInput from '../../components/MaskedInput';
import StateSelector from './StateSelector';
import SegmentSelector from './SegmentSelector';
import CitySelector from './CitySelector';

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

const PersonalDataForm = ({ onSubmit, loading }) => {
  const theme = useContext(ThemeContext);
  const { user } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const canEditCpf = !user.cpf;

  const renderError = (error) => error && <Text style={styles.errorText}>{error}</Text>;

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
        <>
          <FormItem>
            <Input
              style={{ color: theme.drawer.textProfileColor }}
              placeholder="Nome Completo"
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              value={values.name}
            />
            {renderError(errors.name)}
          </FormItem>

          <FormItem>
            <Input
              style={{ color: theme.drawer.textProfileColor }}
              editable={false}
              placeholder="Email"
              value={values.email}
              autoCapitalize="none"
            />
          </FormItem>

          <FormItem>
            <MaskedInput
              mask="[000].[000].[000]-[00]"
              editable={canEditCpf}
              keyboardType="decimal-pad"
              placeholder="Cpf"
              onChangeText={handleChange('cpf')}
              onBlur={handleBlur('cpf')}
              style={{ color: theme.drawer.textProfileColor }}
              value={values.cpf}
            />
            {renderError(errors.cpf)}
          </FormItem>

          <FormItem>
            <MaskedInput
              mask="([00]) [00000]-[0000]"
              keyboardType="decimal-pad"
              placeholder="Celular"
              onChangeText={handleChange('cellphone')}
              onBlur={handleBlur('cellphone')}
              style={{ color: theme.drawer.textProfileColor }}
              value={values.cellphone}
            />
            {renderError(errors.cellphone)}
          </FormItem>

          <FormItem>
            <SegmentSelector
              selected={values.segment}
              onValueChange={value => setFieldValue('segment', value)}
            />
            {renderError(errors.segment)}
          </FormItem>

          <FormItem>
            <StateSelector
              selected={values.state}
              onValueChange={value => setFieldValue('state', value)}
            />
            {renderError(errors.state)}
          </FormItem>

          <FormItem>
            <CitySelector
              selected={values.city}
              stateId={values.state}
              onValueChange={handleChange('city')}
            />
            {renderError(errors.city)}
          </FormItem>

          <FormItem>
            <MaskedInput
              mask="[00].[000].[000]/[0000]-[00]"
              keyboardType="decimal-pad"
              placeholder="CNPJ"
              onChangeText={handleChange('cnpj')}
              onBlur={handleBlur('cnpj')}
              style={{ color: theme.drawer.textProfileColor }}
              value={values.cnpj}
            />
            {renderError(errors.cnpj)}
          </FormItem>

          <FormItem>
            <Input
              placeholder="Empresa"
              onChangeText={handleChange('business')}
              onBlur={handleBlur('business')}
              style={{ color: theme.drawer.textProfileColor }}
              value={values.business}
            />
            {renderError(errors.business)}
          </FormItem>

          <FormItem>
            <MaskedInput
              mask="([00]) [00000]-[0000]"
              keyboardType="decimal-pad"
              placeholder="Whatsapp"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              style={{ color: theme.drawer.textProfileColor }}
              value={values.phone}
            />
            {renderError(errors.phone)}
            <SwitchForm
              label="Deixar whatsapp público"
              labelStyle={{ color: theme.drawer.textProfileColor }}
              value={values.public_phone}
              onValueChange={value => setFieldValue('public_phone', value)}
            />
          </FormItem>

          <FormItem>
            <Input
              placeholder="Instagram"
              onChangeText={handleChange('instagram')}
              onBlur={handleBlur('instagram')}
              style={{ color: theme.drawer.textProfileColor }}
              value={values.instagram}
            />
            <SwitchForm
              label="Deixar instagram público"
              labelStyle={{ color: theme.drawer.textProfileColor }}
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
              style={{ color: theme.drawer.textProfileColor }}
              value={values.employees}
            />
            {renderError(errors.employees)}
          </FormItem>

          <FormItem>
            <Input
              keyboardType="decimal-pad"
              placeholder="Média de faturamento anual do seu negócio"
              onChangeText={handleChange('billing_average')}
              onBlur={handleBlur('billing_average')}
              style={{ color: theme.drawer.textProfileColor }}
              value={formatReal(getMoney(values.billing_average))}
            />
            {renderError(errors.billing_average)}
          </FormItem>

          <FormItem>
            <Input
              numberOfLines={3}
              multiline
              style={{ color: theme.drawer.textProfileColor }}
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
              style={{ color: theme.drawer.textProfileColor }}
              placeholder="Você possui alguma dúvida quanto empreendedor?"
              onChangeText={handleChange('entrepreneurDoubts')}
              onBlur={handleBlur('entrepreneurDoubts')}
              value={values.entrepreneurDoubts}
            />
          </FormItem>

          <FormItem>
            <Input
              multiline
              style={{ color: theme.drawer.textProfileColor }}
              numberOfLines={3}
              placeholder="Sobre você"
              onChangeText={handleChange('aboutMe')}
              onBlur={handleBlur('aboutMe')}
              value={values.aboutMe}
            />
          </FormItem>

          {/* <FormItem>
            <View style={styles.row}>
              <CheckBox
                value={values.terms}
                onValueChange={value => setFieldValue('terms', value)}
              />
              <TouchableOpacity onPress={() => navigation.navigate('Termos de Uso')}>
                <Text style={{ marginLeft: 8, color: theme.colors.primary }}>
                  Li e aceito os termos e condições
                </Text>
              </TouchableOpacity>
            </View>
            {renderError(errors.terms)}
          </FormItem>

          <FormItem>
            <Button title="Enviar" onPress={handleSubmit} loading={loading} />
          </FormItem> */}

          <FormItem>
            <View style={styles.row}>
              <CheckBox
                disabled={false}
                value={values.terms}
                onValueChange={newValue => setFieldValue('terms', newValue)}
                tintColors={{
                  false: theme.input.switch.darkMode,
                  true: theme.input.switch.lightMode,
                }}
              />
              <TouchableOpacity onPress={() => navigation.navigate('Termos de Uso')}>
                <Text style={{ marginLeft: 8, color: theme.colors.primary }}>
                  Li e aceito os termos e condições
                </Text>
              </TouchableOpacity>
            </View>
            {errors.terms ? (
              <Text style={{ color: 'red' }}>{errors.terms}</Text>
            ) : null}
          </FormItem>

          <FormItem>
            <Button
              loading={loading}
              onPress={handleSubmit}
              size="large"
              disabled={loading}
              text="Enviar"
              style={{ marginBottom: 44 }}
            />
          </FormItem>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PersonalDataForm;
