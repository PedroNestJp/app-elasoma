import * as Yup from 'yup';

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'O nome é muito pequeno')
    .max(50, 'O nome é muito longo')
    .required('Insira seu nome'),
  cpf: Yup.string().required('Insira o CPF'),
  cellphone: Yup.string()
    .min(9, 'Insira o telefone válido')
    .required('Insira o Telefone'),
  state: Yup.string().required('Insira o estado'),
  business: Yup.string().required('Insira o nome da empresa'),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Deve ser um email válido')
    .required('Insira um email'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .max(15, 'A senha está grande demais. ')
    .required('Insira senha'),
});

export const ForumPostSchema = Yup.object().shape({
  title: Yup.string()
    .required('Insira um título')
    .min(5, 'Mínimo de 5 caracteres')
    .max(100, 'Máximo de 100 caracteres'),
  text: Yup.string().max(250, 'Texto está grande demais'),
  receiveNotification: Yup.bool(),
  category: Yup.object().required('Escolha uma categoria'),
});

export const ForumReplySchema = Yup.object().shape({
  text: Yup.string()
    .required('Escreva sua resposta')
    .min(5, 'Mínimo de 5 caracteres')
    .max(250, 'Máximo de 250 caracteres'),
});

export const DiscountSchema = Yup.object().shape({
  discount: Yup.string()
    .required('Insira o desconto. Ex.: 10% de desconto')
    .min(5, 'Mínimo de 5 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  discount_description: Yup.string()
    .required('Insira uma descrição')
    .max(350, 'Texto está grande demais'),
  company: Yup.string()
    .required('Insira o nome da empresa. Ex.: Ela Soma')
    .min(5, 'Mínimo de 5 caracteres')
    .max(100, 'Máximo de 100 caracteres'),
  brand: Yup.string().required('Insira a marca da empresa. '),
  number: Yup.string().required('Insira o número. '),
  category: Yup.string().required('Escolha uma categoria. '),
  address: Yup.string().required('Insira o endereço do local'),
});
