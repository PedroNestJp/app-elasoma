import React, {Fragment, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';

import Brand from '../../components/Brand';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import Input from '../../components/Input';
import OutlinedButton from '../../components/Buttons/OutlinedButton';
import SocialNetworksLogin from '../../containers/forms/SocialNetworksLogin';
import Text from '../../components/Typography/Text';
import TextButton from '../../components/Buttons/TextButton';
import FormItem from '../../components/Form/FormItem';
import {createUserWithEmailAndPassword} from '../../services/auth/email_password_auth';
import {notifyError} from '../../helpers/notifications';
import {SignInSchema} from '../../contants/formSchemas';
import {Screens} from '../../contants/screens';

export default ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const submitForm = async values => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(values);
      navigation.replace(Screens.APP.navigator, {
        screen: Screens.APP.REGISTER_SCREEN,
      });
      setLoading(false);
    } catch (e) {
      notifyError({title: 'Houve um erro', key: e.code});
      setLoading(false);
    }
  };

  return (
    <ScrollContainer>
      <View style={styles.brandContainer}>
        <Brand height={34} />
      </View>
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
                  placeholder="Email"
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
                <OutlinedButton
                  onPress={handleSubmit}
                  loading={loading}
                  size="large"
                  disabled={loading}
                  text="Registre-se"
                />
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
      <View style={styles.socialNetworkLoginContainer}>
        <SocialNetworksLogin loading={loading} navigation={navigation} />
      </View>
      <View style={styles.footerTextContainer}>
        <Text>Já possui uma conta?</Text>
        <TextButton
          underline
          text="Entre aqui."
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    paddingTop: 60,
  },
  formInput: {
    paddingTop: 45,
  },
  socialNetworkLoginContainer: {
    marginTop: 100,
  },
  footerTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 40,
  },
});
