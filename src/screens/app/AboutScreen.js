import React from 'react';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import Text from '../../components/Typography/Text';
import {StyleSheet, View} from 'react-native';
import Brand from '../../components/Brand';
import TextButton from '../../components/Buttons/TextButton';

export default ({navigation}) => (
  <ScrollContainer canGoBack>
    <View style={styles.container}>
      <View style={styles.textCenter}>
        <Brand width={269.82} height={42.33} />
      </View>
      <Text style={styles.textCenter}>Versão 0.0.1</Text>
      <View style={styles.textCenter}>
        <Text>{new Date().getFullYear()}</Text>
        <Text>Todos os direitos reservados</Text>
      </View>
      <Text style={styles.textCenter}>
        O ELASOMA nasceu com o propósito de criar uma comunidade próspera para a vida profissional e pessoal da mulher empreendedora. O grupo chega ao mercado para criar ambientes de oportunidades e união empresarial. O ELASOMA é a vertente feminina do SOMA - uma plataforma facilitadora de negócios com atuação na Paraíba, Rio Grande do Norte e Alagoas.
      </Text>
      <Text style={styles.textCenter}>
      As atividades do ElaSOMA seguem o formato do SOMA - eventos mensais, que vão desde palestras a dinâmicas de relacionamento. Nosso objetivo é criar ambientes de oportunidades e união, com diálogos diretos e assertivos, gerando um mercado de prospecção ativo.{' '}
      </Text>
    </View>
    <View style={styles.footerTextContainer}>
      <TextButton
        underline
        onPress={() => navigation.navigate('TermsAndConditionsScreen')}
        text="Termos e Condições de Uso"
      />
    </View>
  </ScrollContainer>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textCenter: {textAlign: 'center', alignItems: 'center', paddingVertical: 10},
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
