export default class State {
  constructor({id, name, uf}) {
    this._id = id;
    this._name = name;
    this._uf = uf;
  }

  static fromJson(json) {
    return new State(json);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get uf() {
    return this._uf;
  }
}
