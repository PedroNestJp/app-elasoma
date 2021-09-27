import State from './stateModel';

export default class User {
  constructor({
    id,
    name,
    role,
    state,
    aboutMe,
    billing_average,
    business,
    cellphone,
    interests,
    city,
    cnpj,
    cpf,
    employees,
    phone,
    photoURL,
    strongPoints,
    entrepreneurDoubts,
  }) {
    this._id = id;
    this._name = name;
    this._role = role;
    this._state = state;
    this._aboutMe = aboutMe;
    this._billing_average = billing_average;
    this._business = business;
    this._cellphone = cellphone;
    this._cnpj = cnpj;
    this._cpf = cpf;
    this._employees = employees;
    this._phone = phone;
    this._photoURL = photoURL;
    this._strongPoints = strongPoints;
    this._entrepreneurDoubts = entrepreneurDoubts;
    this._city = city;
    this._state = state;
    this._interests = interests;
  }

  get city() {
    return this._city;
  }

  static fromJson(json) {
    return new User(json);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get role() {
    return this._role;
  }

  get state() {
    return this._state;
  }

  get aboutMe() {
    return this._aboutMe;
  }

  get billing_average() {
    return this._billing_average;
  }

  get business() {
    return this._business;
  }

  get cellphone() {
    return this._cellphone;
  }

  get cnpj() {
    return this._cnpj;
  }

  get cpf() {
    return this._cpf;
  }

  get employees() {
    return this._employees;
  }

  get phone() {
    return this._phone;
  }

  get photoURL() {
    return this._photoURL;
  }

  get strongPoints() {
    return this._strongPoints;
  }

  get entrepreneurDoubts() {
    return this._entrepreneurDoubts;
  }

  set city(value) {
    this._city = value;
  }

  set id(value) {
    this._id = value;
  }

  set name(value) {
    this._name = value;
  }

  set role(value) {
    this._role = value;
  }

  set state(value) {
    this._state = value;
  }

  set aboutMe(value) {
    this._aboutMe = value;
  }

  set billing_average(value) {
    this._billing_average = value;
  }

  set business(value) {
    this._business = value;
  }

  set cellphone(value) {
    this._cellphone = value;
  }

  set cnpj(value) {
    this._cnpj = value;
  }

  set cpf(value) {
    this._cpf = value;
  }

  set employees(value) {
    this._employees = value;
  }

  set phone(value) {
    this._phone = value;
  }

  set photoURL(value) {
    this._photoURL = value;
  }

  set strongPoints(value) {
    this._strongPoints = value;
  }

  set entrepreneurDoubts(value) {
    this._entrepreneurDoubts = value;
  }

  get interests() {
    return this._interests;
  }
}
