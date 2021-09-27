import React, {Fragment, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../../components/Input';
import Text from '../../components/Typography/Text';
import TextButton from '../../components/Buttons/TextButton';
import FormItem from '../../components/Form/FormItem';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {loginWithEmailAndPassword} from '../../services/auth/email_password_auth';
import {notifyError} from '../../helpers/notifications';
import Button from '../../components/Buttons/Button';
import ViewContainer from '../../components/Containers/ViewContainer';
import ScrollContainer from '../../components/Containers/ScrollContainer';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Deve ser um email válido')
    .required('Insira um email'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .max(15, 'A senha está grande demais. ')
    .required('Insira senha'),
});

export default ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const submitForm = async values => {
    try {
      setLoading(true);
      await loginWithEmailAndPassword(values);
      navigation.replace('RegisterScreen');
      setLoading(false);
    } catch (e) {
      notifyError({title: 'Houve um erro', key: e.code});
      setLoading(false);
    }
  };

  return (
    <ScrollContainer canGoBack style={styles.container}>
      <View>
        <Formik
          validationSchema={SignInSchema}
          initialValues={{}}
          onSubmit={submitForm}>
          {({
            handleChange,
            handleBlur,
            setFieldTouched,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Fragment>
              <FormItem>
                <Input
                  validate={false}
                  placeholder="Login"
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  value={values.email}
                />
                {errors.email ? (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                ) : null}
              </FormItem>
              <FormItem>
                <Input
                  validate={false}
                  placeholder="Senha"
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  value={values.password}
                  secureTextEntry={true}
                />
                {errors.password ? (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                ) : null}
              </FormItem>
              <View style={styles.formInput}>
                <Button
                  disabled={loading}
                  onPress={handleSubmit}
                  loading={loading}
                  size="large"
                  text="Entrar"
                />
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
      <View style={styles.footerTextContainer}>
        <TextButton
          underline
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
          text="Esqueceu sua senha?"
        />
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    paddingTop: 40,
  },
  formInput: {
    paddingTop: 45,
  },
  socialNetworkLoginContainer: {
    marginTop: 100,
  },
  footerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    // flexGrow: 2,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 50,
  },
});
