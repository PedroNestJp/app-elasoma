import moment from 'moment';
import 'moment/locale/pt';
import {AllHtmlEntities} from 'html-entities';

const entities = new AllHtmlEntities();
moment.locale('pt');

export const firestoreTimeToMoment = firestoreTime => {
  let firestoreDate = firestoreTime;

  if (!firestoreDate._seconds || !firestoreDate._nanoseconds) {
    firestoreDate = new moment(firestoreDate.seconds * 1000);
  }

  const date = firestoreDate?.toDate();
  return new moment(date);
};

export const formattedDate = (moment, format = 'DD/MM/YYYY') => {
  return moment.format(format);
};

export const lastStringChar = string => {
  const charsArray = string.split('');
  return charsArray[charsArray.length - 1];
};

export const clearString = string => {
  let finalString = entities.decode(string);
  finalString = finalString.replace(/<.*?>/g, '');
  return finalString;
};

export const toSnakeCase = string => {
  return string.replace(/[^A-Z0-9]/gi, '_').toLowerCase();
};

export const nameAndSurname = string => {
  const name = string.split(' ');
  return `${name[0]}  ${name[1]}`;
};
