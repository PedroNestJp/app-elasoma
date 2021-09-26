import React, {Fragment, useContext, useState, useRef} from 'react';
import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import {ForumPostSchema} from '../../contants/formSchemas';
import FormItem from '../../components/Form/FormItem';
import Input from '../../components/Input';
import Button from '../../components/Buttons/Button';
import {Formik} from 'formik';
import {Dimensions, Switch, View} from 'react-native';
import {ThemeContext} from 'styled-components';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import ForumCategoriesList from '../../containers/forum/ForumCategoriesList';
import {notifySuccess, showToastError} from '../../helpers/notifications';
import {createForumPostService} from '../../services/forum/forum';

export default ({navigation}) => {
  const [insertingPost, isInsertingPost] = useState(false);
  const themeContext = useContext(ThemeContext);
  const formRef = useRef();

  const createForumPost = async values => {
    try {
      isInsertingPost(true);
      await createForumPostService(values);

      notifySuccess({
        title: 'Sua idéia foi adicionada',
        message: 'Ela será revisada e em breve poderá ser exibida.',
      });
      navigation.pop();
      isInsertingPost(false);
    } catch (e) {
      showToastError(
        'Estamos enfrentando um erro ao inserir a idéia. Tente novamente mais tarde',
      );
      isInsertingPost(false);
    }
  };

  return (
    <>
      <Header />
      <ScrollContainer canGoBack noHeaderPadding>
        <Formik
          innerRef={formRef}
          validationSchema={ForumPostSchema}
          initialValues={{
            title: '',
            text: '',
            receiveNotification: false,
            category: {},
          }}
          onSubmit={createForumPost}>
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
                  multiline
                  numberOfLines={3}
                  validate={false}
                  placeholder="Título"
                  onChangeText={handleChange('title')}
                  onBlur={() => setFieldTouched('title')}
                  value={values.title}
                />
                <View style={{paddingTop: 5}}>
                  <Text hasError={errors.title} size={12}>
                    {values.title.length}/100
                  </Text>
                  {errors.title ? (
                    <Text style={{color: 'red'}}>{errors.title}</Text>
                  ) : null}
                </View>
              </FormItem>
              <FormItem>
                <Input
                  multiline
                  numberOfLines={5}
                  validate={false}
                  placeholder="Texto (opcional)"
                  onChangeText={handleChange('text')}
                  onBlur={() => setFieldTouched('text')}
                  value={values.text}
                />
                <View style={{paddingTop: 5}}>
                  <Text hasError={errors.text} size={12}>
                    {values.text.length}/250
                  </Text>
                  {errors.text ? (
                    <Text style={{color: 'red'}}>{errors.text}</Text>
                  ) : null}
                </View>
              </FormItem>
              <FormItem>
                <View style={{flexDirection: 'row'}}>
                  <ForumCategoriesList
                    selectedCategoryId={values.category.id}
                    onSelectCategory={value => setFieldValue('category', value)}
                    type="list"
                  />
                </View>
                {errors.category ? (
                  <Text style={{color: 'red'}}>{errors.category}</Text>
                ) : null}
              </FormItem>
              <FormItem
                style={{
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{width: Dimensions.get('window').width / 1.5}}>
                  <Text>Enviar notificações de resposta da postagem</Text>
                </View>
                <Switch
                  trackColor={{
                    false: themeContext.input.switch.darkMode,
                    true: themeContext.input.switch.lightMode,
                  }}
                  thumbColor={themeContext.input.switch.thumbColor}
                  onValueChange={value =>
                    setFieldValue('receiveNotification', value)
                  }
                  value={values.receiveNotification}
                />
              </FormItem>
              <FormItem>
                <Button
                  loading={insertingPost}
                  onPress={handleSubmit}
                  size="large"
                  disabled={insertingPost}
                  text="Enviar"
                />
              </FormItem>
            </Fragment>
          )}
        </Formik>
      </ScrollContainer>
    </>
  );
};
