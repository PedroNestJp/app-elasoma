import React from 'react';
import BackIcon from '../Icons/BackIcon';
import Button from '../../components/Buttons/Button';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  Scroll,
  Touchable,
  Title,
  TextBody,
  ContentButton,
} from './styles';

const TermsOfUse = ({closeModal, dataUser}) => {
  const handleUpdateTermsUser = async () => {
    const {id} = dataUser;

    await firestore()
      .collection('users')
      .doc(id)
      .update({
        terms: true,
      });

    closeModal();
  };

  return (
    <Container>
      <Scroll>
        <Touchable onPress={closeModal}>
          <BackIcon />
        </Touchable>

        <Title>A adesão ao ELASOMA será concretizada da seguinte forma:</Title>

        <TextBody>
          <Title>1.</Title> Cada adesão dá direito a uma filiação integrada ao
          SOMA Network; não sendo permitida, em nenhuma hipótese, a substituição
          do filiado por eventual representante nos eventos;
        </TextBody>

        <TextBody>
          <Title>2.</Title> Concordância com o pagamento da anuidade no valor de
          R$ 3.960,00 (três mil novecentos e sessenta reais), relativa ao
          período de 12 meses. A quitação só será feita através de cartão de
          crédito ou débito, assim o filiado participando ou não dos eventos com
          a obrigação do pagamento total;
        </TextBody>

        <TextBody>
          <Title>3.</Title> Em caso de desistência durante a vigência do
          contrato, não haverá reembolso e, faz-se-á o filiado obrigado a arcar
          com a integralidade dos valores acertados com o SOMA, tendo em vista a
          programação anual de eventos que é organizada previamente, a qual
          depende de todo um planejamento baseada no número de filiados;{' '}
        </TextBody>

        <TextBody>
          <Title>4.0</Title> O filiado ao SOMA deve ter um faturamento anual
          superior a 1.000.000,00 (um milhão) de reais, podendo este ser
          justificado por mais de uma empresa, negócio, ou investimento;{' '}
        </TextBody>

        <TextBody style={{marginTop: -16}}>
          <Title>5.0</Title> Em caso de sucessor familiar, o faturamento poderá
          ser justificado com empresa escrita neste contrato, o mesmo deverá ter
          voz e poder de decisão em âmbitos comerciais.
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
          <Title>3.</Title> 12 eventos anuais no estado de filiação e 4 eventos
          em cada uma das franquias do SOMA;
        </TextBody>

        <TextBody>
          <Title>4.</Title> Gerar o acesso no aplicativo.
        </TextBody>

        <ContentButton>
          <Button
            onPress={() => handleUpdateTermsUser()}
            size="large"
            fontBold
            //  disabled={loading}
            text="Li e aceito os Termos de uso"
          />
        </ContentButton>
      </Scroll>
    </Container>
  );
};

export default TermsOfUse;
