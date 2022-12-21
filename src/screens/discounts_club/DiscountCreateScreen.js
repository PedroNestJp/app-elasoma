import React, {Fragment, useRef, useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';

import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import {DiscountSchema} from '../../contants/formSchemas';
import FormItem from '../../components/Form/FormItem';
import Button from '../../components/Buttons/Button';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import {notifySuccess, showToastError} from '../../helpers/notifications';
import DiscountCategoriesList from '../../containers/discountsClub/DiscountCategoriesList';
import FormItemWithInput from '../../components/Form/FormItemWithInput';
import ViewContainer from '../../components/Containers/ViewContainer';
import PictureSelector from '../../components/PictureSelector';
import {getUserFromStore} from '../../helpers/store';
import {
  createDiscountService,
  getAddressByCepService,
  getAddressByObject,
} from '../../services/discountClub';
import Loading from '../../components/Loading';
import {catchError} from '../../helpers/errors';

export default () => {
  const [insertingSuggestion, isInsertingSuggestion] = useState(false);
  const [loadingAddress, isLoadingAddress] = useState(false);
  const formRef = useRef();
  const user = getUserFromStore();

  const createDiscountSuggestion = async values => {
    try {
      isInsertingSuggestion(true);
      values.state = user.state;
      await createDiscountService(values);

      notifySuccess({
        title: 'Seu desconto foi adicionado',
        message:
          'Ele será revisado e em breve poderá ser exibido na sessão de benefícios.',
      });
      formRef.current?.resetForm();
      isInsertingSuggestion(false);
    } catch (e) {
      catchError(e);
      showToastError(
        'Estamos enfrentando um erro ao inserir o desconto. Tente novamente mais tarde',
      );
      isInsertingSuggestion(false);
    }
  };

  const searchAddressByCep = async cep => {
    try {
      isLoadingAddress(true);
      const {setFieldValue} = formRef?.current;
      const address = await getAddressByCepService(cep);
      setFieldValue('address', address);
      isLoadingAddress(false);
    } catch (e) {
      catchError(e);
      isLoadingAddress(false);
    }
  };

  return (
    <>
      <Header />
      <ScrollContainer
        canGoBackStyle={{padding: 24}}
        noPadding
        canGoBack
        noHeaderPadding>
        <ViewContainer noPaddingHorizontal style={{marginBottom: 24}}>
          <Formik
            innerRef={formRef}
            validationSchema={DiscountSchema}
            initialValues={{
              discount: '',
              discount_description: '',
              company: '',
              brand: '',
              subcategory: '',
              address: '',
              category: {},
            }}
            onSubmit={createDiscountSuggestion}>
            {({
              handleChange,
              setFieldTouched,
              handleSubmit,
              values,
              setFieldValue,
              errors,
            }) => (
              <Fragment>
                <ViewContainer>
                  <PictureSelector
                    label={'Marca da empresa'}
                    onSave={imageUrl => setFieldValue('brand', imageUrl)}
                    width={100}
                    height={100}
                    savePath={'discount_club/users_submissions'}
                  />
                  <View style={{alignItems: 'center'}}>
                    {errors.brand ? (
                      <Text style={{color: 'red'}}>{errors.brand}</Text>
                    ) : null}
                  </View>
                  <FormItemWithInput
                    field="discount"
                    placeholder="Desconto"
                    onChangeText={handleChange('discount')}
                    onBlur={() => setFieldTouched('discount')}
                    value={values.discount}
                    errors={errors}>
                    <Text hasError={errors.discount} size={12}>
                      {values.discount.length}/50
                    </Text>
                  </FormItemWithInput>
                  <FormItemWithInput
                    numberOfLines={4}
                    field="discount_description"
                    placeholder="Descrever aqui como o cliente deve requerir o seu desconto e quais os produtos que estão disponíveis."
                    onChangeText={handleChange('discount_description')}
                    onBlur={() => setFieldTouched('discount_description')}
                    value={values.discount_description}
                    errors={errors}
                  />

                  <FormItemWithInput
                    field="company"
                    placeholder="Nome da Empresa"
                    onChangeText={handleChange('company')}
                    onBlur={() => setFieldTouched('company')}
                    value={values.company}
                    errors={errors}
                  />
                </ViewContainer>

                <FormItem>
                  <Text style={{paddingHorizontal: 24}}>Categoria</Text>
                  <View style={{flexDirection: 'row'}}>
                    <DiscountCategoriesList
                      selectedCategoryId={values.category.id}
                      onSelectCategory={value =>
                        setFieldValue('category', value)
                      }
                    />
                  </View>
                  {errors.category ? (
                    <Text style={{color: 'red'}}>{errors.category}</Text>
                  ) : null}
                </FormItem>

                <ViewContainer>
                  {/*<FormItemWithInput*/}
                  {/*  field="subcategory"*/}
                  {/*  placeholder="Subcategoria"*/}
                  {/*  onChangeText={handleChange('subcategory')}*/}
                  {/*  onBlur={() => setFieldTouched('subcategory')}*/}
                  {/*  value={values.subcategory}*/}
                  {/*  errors={errors}*/}
                  {/*/>*/}
                  <FormItemWithInput
                    field="cep"
                    placeholder="CEP"
                    onChangeText={cep => {
                      if (cep.length >= 8) {
                        searchAddressByCep(cep);
                      }
                      setFieldValue('cep', cep);
                    }}
                    onBlur={() => setFieldTouched('cep')}
                    value={values.cep}
                    errors={errors}
                  />
                  {loadingAddress ? (
                    <Loading />
                  ) : (
                    <FormItemWithInput
                      field="address"
                      placeholder="Endereço"
                      onChangeText={handleChange('address')}
                      onBlur={() => setFieldTouched('address')}
                      value={getAddressByObject(values.address)}
                      errors={errors}
                    />
                  )}
                  <FormItemWithInput
                    field="number"
                    placeholder="Número"
                    onChangeText={handleChange('number')}
                    onBlur={() => setFieldTouched('number')}
                    value={values.number}
                    errors={errors}
                  />
                  <FormItem>
                    <Text>
                      Seu desconto será aprovado pelo administrador. Quando for
                      aprovado aparecerá na seção de Clube de Benefícios
                    </Text>
                  </FormItem>
                  <FormItem>
                    <Button
                      loading={insertingSuggestion}
                      onPress={handleSubmit}
                      weight={'normal'}
                      size="large"
                      disabled={insertingSuggestion}
                      text="Enviar"
                    />
                  </FormItem>
                </ViewContainer>
              </Fragment>
            )}
          </Formik>
        </ViewContainer>
      </ScrollContainer>
    </>
  );
};
