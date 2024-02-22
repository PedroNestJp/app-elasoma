import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import BackButtonArea from '../Containers/BackButtonArea';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../Icons/BackIcon';
import Button from '../../components/Buttons/Button';

import {
  Container,
  Scroll,
  Touchable,
  Title,
  TextBody,
  ContentButton,
  Footer,
} from './styles';

const TermsOfUse = () => {
// const TermsOfUse = ({ closeModal }) => {
  const navigation = useNavigation();

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Scroll>
        <Touchable onPress={closeModal}>
          <BackIcon />
        </Touchable>

        <Title>A adesão ao ELASOMA será concretizada da seguinte forma:</Title>

        <TextBody>
          <Title>1.</Title> Cada adesão dá direito a uma filiada integrada ao
          Ela SOMA; não sendo permitida, em nenhuma hipótese, sua substituição
          por eventual representante no grupo ou nos eventos;
        </TextBody>
        {/* <TextBody>
          <Title>1.</Title> Cada adesão dá direito a uma filiação integrada ao
          SOMA Network; não sendo permitida, em nenhuma hipótese, a substituição
          do filiado por eventual representante nos eventos;
        </TextBody> */}

        <TextBody>
          <Title>2.</Title> A filiada deve concordar com o pagamento da anuidade
          no valor de R$3.960,00 (três mil novecentos e sessenta reais), relativa
          ao período de filiação, que inicia a partir da data do primeiro débito.
          A quitação só será feita através de cartão de crédito ou débito. Assim,
          participando ou não dos eventos, a filiada tem a obrigação do pagamento total.
        </TextBody>
        {/* <TextBody>
          <Title>2.</Title> Concordância com o pagamento da anuidade no valor de
          R$ 3.960,00 (três mil novecentos e sessenta reais), relativa ao
          período de 12 meses. A quitação só será feita através de cartão de
          crédito ou débito, assim o filiado participando ou não dos eventos com
          a obrigação do pagamento total;
        </TextBody> */}

        <TextBody>
          <Title>3.</Title> Em caso de desistência durante a vigência do contrato,
          não haverá reembolso e a filiada deverá arcar com  a integralidade dos
          valores acertados neste contrato, tendo em vista a prévia organização da
          programação anual de eventos, de acordo com o número de filiadas no momento.
        </TextBody>
        {/* <TextBody>
          <Title>3.</Title> Em caso de desistência durante a vigência do
          contrato, não haverá reembolso e, faz-se-á o filiado obrigado a arcar
          com a integralidade dos valores acertados com o SOMA, tendo em vista a
          programação anual de eventos que é organizada previamente, a qual
          depende de todo um planejamento baseada no número de filiados;{' '}
        </TextBody> */}

        <TextBody>
          <Title>4.</Title> A filiada do Ela SOMA deve ter um faturamento anual
          superior a R$300.000,00 (trezentos mil reais), podendo este ser justificado
          por meio de mais de uma empresa, negócio ou investimento.
        </TextBody>
        {/* <TextBody>
          <Title>4.0</Title> O filiado ao SOMA deve ter um faturamento anual
          superior a 1.000.000,00 (um milhão) de reais, podendo este ser
          justificado por mais de uma empresa, negócio, ou investimento;{' '}
        </TextBody> */}

        <TextBody>
          <Title>5.</Title> Caso seja empresária sucessora ou familiar, a
          filiada deve ter voz e poder de decisão em âmbitos comerciais e o
          seu faturamento poderá ser justificado pela empresa descrita neste
          contrato.
        </TextBody>
        {/* <TextBody style={{marginTop: -16}}>
          <Title>5.0</Title> Em caso de sucessor familiar, o faturamento poderá
          ser justificado com empresa escrita neste contrato, o mesmo deverá ter
          voz e poder de decisão em âmbitos comerciais.
        </TextBody> */}

        <TextBody style={{ marginTop: 16 }}>
          <Title>6.</Title> Para qualquer alteração de cadastro, a filiada deve 
          entrar em contato com o nosso setor de relacionamento, disponível no 
          número (83) 98773-6333.
        </TextBody>

        <Title>Das obrigações do ELASOMA:</Title>

        <TextBody>
          <Title>1.</Title> Reunir protagonistas multissetoriais, profissionais
          que têm voz e poder de decisão na empresa;
        </TextBody>

        <TextBody>
          <Title>2.</Title> Produção de conteúdo com qualidade e relevância;
        </TextBody>

        <TextBody>
          <Title>3.</Title> 10 eventos anuais.
        </TextBody>

        <TextBody>
          <Title>4.</Title> Gerar o acesso no aplicativo Ela SOMA.
        </TextBody>

        {/* <ContentButton>
          <Button
            onPress={() => { }}
            size="large"
            fontBold
            //  disabled={loading}
            text="Li e aceito os Termos de uso"
          />
        </ContentButton> */}
        <Footer>  </Footer>
      </Scroll>
    </Container>
  );
};

export default TermsOfUse;
