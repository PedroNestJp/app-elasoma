import React from 'react';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import Text from '../../components/Typography/Text';
import {StyleSheet, View, Linking, TouchableOpacity} from 'react-native';

export default (props, {navigation}) => {
  return (
    <ScrollContainer canGoBack navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.text} fontStyle={600}>
          TERMOS DE USO DO SITE E CONDIÇÕES GERAIS PARA A PRESTAÇÃO DE SERVIÇOS
          DE INTERMEDIAÇÃO COMERCIAL
        </Text>
        <Text style={styles.title}>Informações gerais</Text>
        <Text style={styles.text}>
          A presente Política de Privacidade contém informações a respeito do
          modo como tratamos, total ou parcialmente, de forma automatizada ou
          não, os dados pessoais dos usuários que acessam nosso aplicativo. Seu
          objetivo é esclarecer os interessados acerca dos tipos de dados que
          são coletados, dos motivos da coleta e da forma como o usuário poderá
          atualizar, gerenciar ou excluir estas informações. Esta Política de
          Privacidade foi elaborada em conformidade com a Lei Federal n. 12.965
          de 23 de abril de 2014 (Marco Civil da Internet), com a Lei Federal n.
          13.709, de 14 de agosto de 2018 (Lei de Proteção de Dados Pessoais -
          RGDP). Esta Política de Privacidade poderá ser utilizada em
          decorrência de eventual atualização normativa, razão pela qual se
          convida o usuário a consultar periodicamente esta seção.
        </Text>
        <Text style={styles.title}>Direitos do usuário</Text>
        <Text style={styles.text}>
          O aplicativo se compromete a cumprir as normas previstas no RGPD, em
          respeito aos seguintes princípios:
        </Text>
        <Text style={styles.text}>
          - Os dados pessoais do usuário serão processados de forma lícita, leal
          e transparente (licitude, lealdade e transparência);
        </Text>
        <Text style={styles.text}>
          - Os dados pessoais do usuário serão coletados apenas para finalidades
          determinadas, explícitas e legítimas, não podendo ser tratados
          posteriormente de uma forma incompatível com essas finalidades
          (limitação das finalidades);
        </Text>
        <Text style={styles.text}>
          - Os dados pessoais do usuário são coletados de forma adequada,
          pertinente e limitada às necessidades do objetivo para os quais eles
          são processados (minimização dos dados);
        </Text>
        <Text style={styles.text}>
          - Os dados pessoais do usuário serão exatos e atualizados sempre que
          necessário, de maneira que os dados inexatos sejam apagados ou
          retificados quando possível (exatidão);
        </Text>
        <Text style={styles.text}>
          - Os dados pessoais do usuário serão consrvados de uma forma que
          permita a identificação dos titulares dos dados apenas durante o
          período necessário para as finalidades para as quais são tratados
          (limitação da conservação);
        </Text>
        <Text style={styles.text}>
          - Os dados pessoais do usuário serão tratados de forma segura,
          protegidos do tratamento não autorizado ou ilícito e contra a sua
          perda, destruição ou danificação acidental, adotando as medidas
          técnicas ou organizativas adequadas (integridade e confidencialidade).
        </Text>
        <Text style={styles.text}>
          O usuário do aplicativo possui os seguintes direitos, conferidos pela
          Lei de Proteção de Dados Pessoais e pelo RGPD:
        </Text>
        <Text style={styles.text}>
          - Direito de confirmação e acesso: é o direito do usuário de obter do
          aplicativo a confirmação de que os dados pessoais que lhe digam
          respeito são ou não objeto de tratamento e, se for esse o caso, o
          direito de acessar os seus dados pessoais;
        </Text>
        <Text style={styles.text}>
          - Direito de retificação: é o direito do usuário de obter o
          aplicativo, sem demora injustificada, a retificação dos dados pessoais
          inexatos que lhe digam respeito;
        </Text>
        <Text style={styles.text}>
          - Direito à eliminação dos dados (direito ao esquecimento): é o
          direito do usuário de ter seus dados apagados do aplicativo;
        </Text>
        <Text style={styles.text}>
          - Direito à limitação do tratamento dos dados: é o direito do usuário
          de limitar o tratamento de seus dados pessoais, podendo obtê-la quando
          contesta a exatidão dos dados, quando o tratamento for ilícito, quando
          o aplicativo não precisar mais dos dados para as finalidades propostas
          e quanto tiver se oposto ao tratamento dos dados e em caso de
          tratamento de dados desnecessários;
        </Text>
        <Text style={styles.text}>
          - Direito de oposição: é o direito do usuário de, a qualquer momento,
          se opor por motivos relacionados com a sua situação particular, ao
          tratamento dos dados pessoais que lhe digam respeito, podendo se opor
          ainda ao uso de seus dados pessoais para definição de perfil de
          marketing (profiling);
        </Text>
        <Text style={styles.text}>
          - Direito de portabilidade dos dados: é o direito do usuário de
          receber os dados pessoais que lhe digam respeito e que tenham
          fornecido ao aplicativo, num formato estruturado, de uso corrente e de
          leitura automática, e o direito de transmitir esses dados a outro
          aplicativo;
        </Text>
        <Text style={styles.text}>
          - Direito de não ser submetido a decisões automatizadas: é o direito
          do usuário de não ficar sujeito a nenhuma decisão tomada
          exclusivamente com base no tratamento automatizado, incluindo a
          definição de perfis (profiling), que produza efeitos na sua esfera
          jurídica ou que o afete significativamente de forma similar.
        </Text>
        <Text style={styles.text}>
          O usuário poderá exercer os seus direitos por meio de comunicação
          escrita enviada ao aplicativo com o assunto “RGDP-”, especificando:
        </Text>
        <Text style={styles.text}>
          - Nome completou ou razão social, número do CPF (Cadastro de Pessoas
          Físicas, da Receita Federal do Brasil) ou CNPJ (Cadastro Nacional de
          Pessoa Jurídica, da Receita Federal do Brasil) e endereço de e-mail do
          usuário e, se for o caso, do seu representante;
        </Text>
        <Text style={styles.text}>
          - Direito que deseja exercer junto ao aplicativo;
        </Text>
        <Text style={styles.text}>
          - Data do pedido e assinatura do usuário;
        </Text>
        <Text style={styles.text}>
          - Direito que deseja exercer junto ao aplicativo;
        </Text>
        <Text style={styles.text}>
          - Data do pedido e assinatura do usuário;
        </Text>
        <Text style={styles.text}>
          - Todo documento que possa demonstrar ou justificar o exercício de seu
          direito.
        </Text>
        <Text style={styles.text}>
          - O pedido deverá ser enviado ao e-mail:
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:suporte@qualitare.com.br')}>
            <Text style={{textDecorationLine: 'underline'}}>
              suporte@qualitare.com.br
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>, ou por correio, ao seguinte endereço:</Text>
        <Text style={styles.text}>Qualitare Agência de Internet LTDA</Text>
        <Text style={styles.text}>
          Rua Vandik Pinto Filgueiras, 613, Tambauzinho
        </Text>
        <Text style={styles.text}>
          CEP: 58042-110 - João Pessoa, Paraíba, Brasil.
        </Text>
        <Text style={styles.title}></Text>
        <Text style={styles.text}>
          O usuário será informado em caso de retificação ou eliminação dos seus
          dados.
        </Text>
        <Text style={styles.title}>
          Dever de não fornecer dados de terceiros
        </Text>
        <Text style={styles.text}>
          Durante a utilização do site, a fim de resguardar e de proteger os
          direitos de terceiros, o usuário do aplicativo deverá fornecer somente
          seus dados pessoais, e não os de terceiros.
        </Text>
        <Text style={styles.title}>4.1 Tipos de dados coletados</Text>
        <Text style={styles.title}>
          4.1.1 Dados de identificação do usuário para realização de cadastro
        </Text>
        <Text style={styles.text}>
          A utilização, pelo usuário, de determinadas funcionalidades do
          aplicativo dependerá de cadastro, sendo que, nestes casos, os
          seguintes dados do usuário serão coletados e armazenados:
        </Text>
        <Text style={styles.text}>• Nome</Text>
        <Text style={styles.text}>• Data de Nascimento</Text>
        <Text style={styles.text}>• Endereço de E-mail</Text>
        <Text style={styles.text}>• Endereço postal</Text>
        <Text style={styles.text}>• Detalhes de Redes sociais</Text>
        <Text style={styles.text}>• Número de telefone</Text>
        <Text style={styles.text}>• Número de CPF</Text>
        <Text style={styles.text}>• Número de CNPJ</Text>
        <Text style={styles.text}>
          • Número de funcionários: faturamento; foto do usuário; descrição do
          negócio.
        </Text>
        <Text style={styles.title}>
          4.1.2 Dados informados no formulário de contato
        </Text>
        <Text style={styles.text}>
          Os dados eventualmente informados pelo usuário que utilizar o
          formulário de contato disponibilizado no aplicativo, incluindo o teor
          da mensagem enviada, serão coletados e armazenados.
        </Text>
        <Text style={styles.title}>4.1.3. Registros de acesso</Text>
        <Text style={styles.text}>
          Em atendimento às disposições do art. 15, caput e parágrafos, da Lei
          Federal n. 12.965-2014 (Marco Civil da Internet), os registros de
          acesso do usuário serão coletados e armazenados por, pelo menos, seis
          meses.
        </Text>
        <Text style={styles.title}>4.1.4. Newsletter</Text>
        <Text style={styles.text}>
          O endereço de e-mail cadastrado pelo usuário que optar por me
          inscrever em nossa Newsletter será coletado e armazenado até que o
          usuário solicite o seu descadastro.
        </Text>
        <Text style={styles.title}>4.1.5. Dados sensíveis</Text>
        <Text style={styles.text}>
          Não serão coletados dados sensíveis dos usuários, assim entendidos
          aqueles definidos nos arts. 9 e 10 do RGPD e nos arts. 11 e seguintes
          da Lei de Proteção de Dados Pessoais. Assim, dentre outros, não haverá
          coleta dos seguintes dados:
        </Text>
        <Text style={styles.text}>
          • dados que revelem a origem racial ou étnica, as opiniões políticas,
          as convicções religiosas ou filosóficas, ou a filiação sindical do
          usuário;
        </Text>
        <Text style={styles.text}>• dados genéticos;</Text>
        <Text style={styles.text}>
          • dados biométricos para identificar uma pessoa de forma inequívoca;
        </Text>
        <Text style={styles.text}>• dados relativos à saúde do usuário;</Text>
        <Text style={styles.text}>
          • dados relativos à vida sexual ou à orientação sexual do usuário;
        </Text>
        <Text style={styles.text}>
          • dados relacionados a condenações penais ou a infrações ou com
          medidas de segurança conexas;
        </Text>
        <Text style={styles.title}>
          4.2. Fundamento jurídico para o tratamento dos dados pessoais
        </Text>
        <Text style={styles.text}>
          Ao utilizar os serviços do aplicativo, o usuário está consentindo com
          a presente Política de Privacidade. O usuário tem o direito de retirar
          seu consentimento a qualquer momento, não comprometendo a licitude do
          tratamento de seus dados pessoais antes da retirada. A retirada do
          consentimento poderá ser feita pelo e-mail: suporte@qualitare, ou por
          correio enviado ao seguinte endereço:
        </Text>
        <Text style={styles.text}>
          Rua Vandik Pinto Filgueiras, 613, Tambauzinho
        </Text>
        <Text style={styles.text}>
          CEP: 58042-110 - João Pessoa, Paraíba, Brasil.
        </Text>
        <Text style={styles.title}></Text>
        <Text style={styles.text}>
          O consentimento dos relativamente ou absolutamente incapazes,
          especialmente de crianças menores de 16 (dezesseis) anos, apenas
          poderá ser feito, respectivamente, se devidamente assistidos ou
          representados.
        </Text>
        <Text style={styles.text}>
          O tratamento de dados pessoais sem o consentimento do usuário apenas
          será realizado em razão de interesse legítimo ou para as hipóteses
          previstas em lei, ou seja, dentre outras, as seguintes:
        </Text>
        <Text style={styles.text}>
          • para o cumprimento de obrigação legal ou regulatória pelo
          controlador;
        </Text>
        <Text style={styles.text}>
          • para a realização de estudos por órgão de pesquisa, garantida,
          sempre que possível, a anonimização dos dados pessoais;
        </Text>
        <Text style={styles.text}>
          • quando necessário para a execução de contrato ou de procedimentos
          preliminares relacionados a contrato do qual seja parte o usuário, a
          pedido do titular dos dados;
        </Text>
        <Text style={styles.text}>
          • para o exercício regular de direitos em processo judicial,
          administrativo ou arbitral, esse último nos termos da Lei m. 9.307, de
          23 de setembro de 1996 (Lei de Arbitragem);
        </Text>
        <Text style={styles.text}>
          • para a proteção da vida ou incolumidade física do titular dos dados
          ou de terceiro;
        </Text>
        <Text style={styles.text}>
          • para a tutela da saúde, em procedimento realizado por profissionais
          da área da saúde ou por entendidades sanitárias;
        </Text>
        <Text style={styles.text}>
          • quando necessário para atender aos interesses legítimos do
          controlador ou de terceiro, exceto no caso de prevalecerem direitos e
          liberdades fundamentais do titular dos dados que exijam a proteção dos
          dados pessoais;
        </Text>
        <Text style={styles.text}>
          • para a proteção do crédito, inclusive quanto ao disposto na
          legislação pertinente.
        </Text>
        <Text style={styles.title}>
          4.3. Finalidades do tratamento dos dados pessoais
        </Text>
        <Text style={styles.text}>
          Os dados pessoais do usuário coletados pelo aplicativo tem por
          finalidade facilitar, agilizar e cumprir os compromissos estabelecidos
          com o usuário e a fazer cumprir as solicitações realizadas por meio do
          preenchimento de formulários.
        </Text>
        <Text style={styles.text}>
          Os dados pessoais poderão ser utilizados também com uma finalidade
          comercial, para personalizar o conteúdo oferecido ao usuário, bem como
          para dar subsídio ao aplicativo para a melhora de qualidade e
          funcionamento de seus serviços.
        </Text>
        <Text style={styles.text}>
          Os dados de cadastro serão utilizados para permitir o acesso do
          usuário a determinados conteúdos do aplicativo, exclusivos para
          usuários cadastrados.
        </Text>
        <Text style={styles.text}>
          O tratamento de dados pessoais para finalidades não previstas nesta
          Política de Privacidade somente ocorrerá mediante comunicação prévia
          ao usuário, sendo que, em qualquer caso, os direitos e obrigações aqui
          previstos permanecerão aplicáveis.
        </Text>
        <Text style={styles.title}>
          4.4 Prazo de conservação dos dados pessoais
        </Text>
        <Text style={styles.text}>
          Os dados pessoais do usuário serão conservados por um período não
          superior ao exigido para cumprir os objetivos em razão dos quais eles
          são processados.
        </Text>
        <Text style={styles.text}>
          O período de conservação dos dados são definidos de acordo com os
          seguintes critérios:
        </Text>
        <Text style={styles.text}>
          Enquanto vigorar o contrato de filiação ao SOMA Negócios e Networking.
        </Text>
        <Text style={styles.text}>
          Os dados pessoais dos usuários apenas poderão ser conservados após o
          término de seu tratamento nas seguintes hipóteses:
        </Text>
        <Text style={styles.text}>
          • para uso exclusivo do controlador, vedado seu acesso por terceiro, e
          desde que anonimizados os dados.
        </Text>
        <Text style={styles.title}>
          4.5. Destinatários e transferências dos dados pessoais
        </Text>
        <Text style={styles.text}>
          Os dados pessoais do usuário não serão compartilhadas com terceiros.
          Serão, portante, tratados apenas por este aplicativo.
        </Text>
        <Text style={styles.title}>5. Do tratamento dos dados pessoais</Text>
        <Text style={styles.title}>
          5.1 Do responsável pelo tratamento dos dados (data controller)
        </Text>
        <Text style={styles.text}>
          O controlador responsável pelo tratamento dos dados pessoais do
          usuário, é a pessoa física ou jurídica, a autoridade pública, a
          agência ou outro organismo que, individualmente ou em conjunto com
          outras, determina as finalidades e os meios de tratamento de dados
          pessoais.
        </Text>
        <Text style={styles.text}>
          Neste aplicativo, o responsável pelo tratamento dos dados pessoais
          coletados é Qualitare Agência de Internet LTDA, representada por
          Juarez Batista, que poderá ser contactado pelo e-mail
          juarez@qualitare.com.br ou no endereço:
        </Text>
        <Text style={styles.text}>
          Rua Vandik Pinto Filgueiras, 613, Tambauzinho.
        </Text>
        <Text style={styles.text}>
          CEP: 58042-110 - João Pessoa, Paraíba, Brasil
        </Text>
        <Text style={styles.text}>CNPJ: 08.512.470.0001-46.</Text>
        <Text style={styles.title}>
          5. 2. Do operador de dados subcontratado (data processor)
        </Text>
        <Text style={styles.text}>
          O operador de dados subcontratado é a pessoa física ou jurídica, a
          autoridade pública, a agência ou outro organismo que trata os dados
          pessoais sob a supervisão do responsável pelo tratamento dos dados do
          usuário.
        </Text>
        <Text style={styles.text}>
          Os dados pessoais do usuário serão tratados por Gerardo Lins Rabello
          Filho, e-mail: gerardorfilho@gmail.com, com endereço à Rua Orlando
          Soares de Oliveira, 55, Miramar, João Pessoa. CEP: 58032-083.
        </Text>
        <Text style={styles.title}>
          5.3. Do encarregado de proteção de dados (data protection officer)
        </Text>
        <Text style={styles.text}>
          O encarregado de proteção de dados (data protection officer) é o
          profissional encarregado de informar, aconselhar e controlar o
          responsável pelo tratamento dos dados e o processador de dados
          subcontratado, bem como os trabalhadores que tratem os dados, a
          respeito das obrigações do aplicativo nos termos do RGDP, da Lei de
          Proteção de Dados pessoais e de outras disposições de proteção de
          dados presentes na legislação nacional e internacional, em cooperação
          com a autoridade de controle competente.
        </Text>
        <Text style={styles.text}>
          Neste aplicativo, o encarregado de proteção de dados (data protection
          officer) é Juarez Batista, que poderá ser contactado pelo e-mail
          juarez@qualitare.com.br
        </Text>
        <Text style={styles.title}>
          6. Segurança no tratamento dos dados pessoais do usuário
        </Text>
        <Text style={styles.text}>
          O aplicativo se compromete a aplicar as medidas técnicas e
          organizativas aptas a proteger os dados pessoais de acesso não
          autorizados e de situações de destruição, perda, alteração,
          comunicação ou difusão de tais dados.
        </Text>
        <Text style={styles.text}>
          Para a garantia de segurança, serão adotadas soluções que levem em
          consideração: as técnicas adequadas; os custos de aplicação; a
          natureza, o âmbito, o contexto e as finalidades do tratamento; e os
          riscos para os direitos e liberdades do usuário.
        </Text>
        <Text style={styles.text}>
          No entanto, o aplicativo se exime de responsabilidade por culpa
          exclusiva de terceiro, como em caso de ataque de hackers ou crackers,
          ou culpa exclusiva do usuário, como no caso em que ele mesmo transfere
          seus dados a terceiro. O aplicativo se compromete, ainda, a comunicar
          o usuário em prazo adequado caso ocorra algum tipo de violação da
          segurança de seus dados pessoais que possa lhe causar um alto risco
          para seus direitos e liberdades pessoais.
        </Text>
        <Text style={styles.text}>
          A violação de dados pessoais é uma violação de segurança que provoque,
          de modo acidental ou ilícito, a destruição, a perda, a alteração a
          divulgação ou acesso não autorizados a dados pessoais transmitidos,
          conservados ou sujeitos a qualquer outro tipo de tratamento.
        </Text>
        <Text style={styles.text}>
          Por fim, o aplicativo se compromete a tratar os dados pessoais do
          usuário com confidencialidade, dentro dos limites legais.
        </Text>
        <Text style={styles.title}>7. Das alterações</Text>
        <Text style={styles.text}>
          A presente versão desta Política de Privacidade foi atualizada pela
          última vez dia 3 de março de 2020.
        </Text>
        <Text style={styles.text}>
          O editor se reserva o direito de modificar, a qualquer momento o
          aplicativo as presentes normas, especialmente para adaptá-las às
          evoluções do aplicativo SOMA Negócios e Networking, seja pela
          disponibilização de novas funcionalidades, seja pela supressão ou
          modificação daquelas já existentes.
        </Text>
        <Text style={styles.text}>
          O usuário será explicitamente notificado em caso de alteração desta
          política.
        </Text>
        <Text style={styles.text}>
          Ao utilizar o serviço após eventuais modificações, o usuário demonstra
          sua concordância com as novas normas. Caso discorde de alguma das
          modificações, deverá pedir, imediatamente, o cancelamento de sua conta
          e apresentar a sua ressalva ao serviço de atendimento, se assim o
          desejar.
        </Text>

        <Text style={styles.title}>9. Do direito aplicável e do foro</Text>
        <Text style={styles.text}>
          Para a solução das controvérsias decorrentes do presente instrumento,
          será aplicado integralmente o Direito brasileiro.
        </Text>

        <Text style={styles.text}>
          Os eventuais litígios deverão ser apresentados no foro da comarca em
          que se encontra a sede do editor do aplicativo.
        </Text>
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {fontWeight: 'bold', paddingTop: 16, paddingBottom: 5},
  text: {textAlign: 'center', alignItems: 'center'},
});
