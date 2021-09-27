import React, {Fragment} from 'react';
import {View} from 'react-native';
import {ForumReplySchema} from '../../contants/formSchemas';
import Input from '../../components/Input';
import Text from '../../components/Typography/Text';
import Button from '../../components/Buttons/Button';
import {Formik} from 'formik';

export default ({onReply, placeholder, loading}) => (
  <View>
    <Formik
      validationSchema={ForumReplySchema}
      initialValues={{
        text: '',
      }}
      onSubmit={onReply}>
      {({handleChange, setFieldTouched, handleSubmit, values, errors}) => (
        <Fragment>
          <View>
            <Input
              multiline
              numberOfLines={3}
              validate={false}
              placeholder={placeholder}
              onChangeText={handleChange('text')}
              onBlur={() => setFieldTouched('text')}
              value={values.text}
            />
            <Text hasError={errors.text} size={12}>
              {values.text.length}/250
            </Text>
            {errors.text ? (
              <Text style={{color: 'red'}}>{errors.text}</Text>
            ) : null}
          </View>

          {!errors.text && values.text.length > 0 && (
            <View style={{paddingVertical: 12}}>
              <Button
                loading={loading}
                onPress={handleSubmit}
                disabled={loading}
                text="Enviar"
              />
            </View>
          )}
        </Fragment>
      )}
    </Formik>
  </View>
);
