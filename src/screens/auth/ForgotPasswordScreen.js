import React, {Fragment, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../../components/Input';
import Text from '../../components/Typography/Text';
import TextButton from '../../components/Buttons/TextButton';
import FormItem from '../../components/Form/FormItem';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  loginWithEmailAndPassword,
  sendPasswordResetEmail,
} from '../../services/auth/email_password_auth';
import {notifyError, notifySuccess} from '../../helpers/notifications';
import Button from '../../components/Buttons/Button';
import ViewContainer from '../../components/Containers/ViewContainer';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import LockerIcon from '../../components/Icons/LockerIcon';
import {AppConfigActions} from '../../redux/actions';
import {store} from '../../redux/configureStore';
import KeyboardAvoidingView from '../../components/Containers/KeyboardAvoidingView';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Deve ser um email válido')
    .required('Insira um email'),
});

export default ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const submitForm = async values => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(values);
      notifySuccess({
        title: 'Enviado',
        message: 'Enviamos um email de redefinição de senha para você',
      });
      setLoading(false);
    } catch (e) {
      notifyError({title: 'Houve um erro', key: e.code});
      setLoading(false);
    }
  };

  return (
    <ScrollContainer canGoBack navigation={navigation} style={styles.container}>
      <View style={styles.lockerContainer}>
        <LockerIcon />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{textAlign: 'center', marginVertical: 16}}
          size={18}
          fontStyle="600">
          Esqueceu sua senha?
        </Text>
        <Text style={{textAlign: 'center'}}>
          Não tem problema, digite seu e-mail e enviaremos um código para você
          criar sua nova senha.
        </Text>
      </View>
      <View style={styles.footerTextContainer}>
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
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  value={values.email}
                />
                {errors.email ? (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                ) : null}
              </FormItem>
              <View style={styles.formInput}>
                <Button
                  onPress={handleSubmit}
                  loading={loading}
                  size="large"
                  text="Enviar"
                />
              </View>
            </Fragment>
          )}
        </Formik>
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
  lockerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 25,
  },
  footerTextContainer: {
    marginVertical: 40,
  },
});
