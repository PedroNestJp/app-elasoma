import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import IconF from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

import FormItem from '../../components/Form/FormItem';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import BackButtonContainer from '../../components/Containers/BackButtonArea';
import Button from '../../components/Buttons/Button';

// Validação com restrição de 6 a 15 caracteres para a nova senha
const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Senha atual é requerida')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(15, 'A senha deve ter no máximo 15 caracteres'),
  password: Yup.string()
    .required('Nova senha é requerida')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(15, 'A senha deve ter no máximo 15 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
    .required('Confirmação de senha é requerida'),
});

const ChangePasswordScreen = () => {
  const { user } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleEdit = useCallback(async (values) => {
    try {
      const { oldPassword, password, confirmPassword } = values;

      if (oldPassword === password) {
        Alert.alert('ERRO', 'A nova senha não pode ser igual à senha atual!');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('ERRO', 'As senhas não são iguais!');
        return;
      }

      setLoading(true);

      const emailCred = auth.EmailAuthProvider.credential(
        user.email,
        oldPassword,
      );

      auth()
        .currentUser.reauthenticateWithCredential(emailCred)
        .then(() => {
          auth().currentUser.updatePassword(password)
            .then(() => {
              Alert.alert('SUCESSO', 'Sua senha foi alterada com sucesso!');
              navigation.goBack();
            })
            .catch(() => {
              Alert.alert('ERRO', 'Houve um erro ao atualizar a senha.');
              setLoading(false);
            });
        })
        .catch(() => {
          Alert.alert('ERRO', 'Senha incorreta.');
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [user, navigation]);

  return loading ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollContainer>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, marginBottom: 20 }}>
              <View>
                <BackButtonContainer onPress={() => navigation.goBack()}>
                  <IconF name="x" size={30} />
                </BackButtonContainer>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: '#9096B4', fontSize: 18 }}>Alterar senha</Text>
              </View>
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <IconF name="check" size={30} color="transparent" />
              </View>
            </View>
            <Formik
              initialValues={{ oldPassword: '', password: '', confirmPassword: '' }}
              validationSchema={passwordSchema}
              onSubmit={handleEdit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <FormItem>
                    <Input
                      name="oldPassword"
                      placeholder="Digite sua senha atual"
                      autoCorrect={false}
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={handleChange('oldPassword')}
                      onBlur={handleBlur('oldPassword')}
                      value={values.oldPassword}
                      error={touched.oldPassword && errors.oldPassword}
                    />
                    {touched.oldPassword && errors.oldPassword && (
                      <Text style={{ color: 'red' }}>{errors.oldPassword}</Text>
                    )}
                  </FormItem>
                  <FormItem>
                    <Input
                      name="password"
                      placeholder="Digite sua nova senha"
                      autoCorrect={false}
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      error={touched.password && errors.password}
                    />
                    {touched.password && errors.password && (
                      <Text style={{ color: 'red' }}>{errors.password}</Text>
                    )}
                  </FormItem>
                  <FormItem>
                    <Input
                      name="confirmPassword"
                      placeholder="Confirme sua nova senha"
                      autoCorrect={false}
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      error={touched.confirmPassword && errors.confirmPassword}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                    )}
                  </FormItem>
                  <TouchableOpacity>
                    <Button
                      onPress={handleSubmit}
                      style={{ marginTop: 35 }}
                      size="large"
                      fontStyle="bold"
                      text="Alterar senha"
                      textStyle={{ fontSize: 40 }}
                    />
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;
