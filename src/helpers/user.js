export const userToObject = user => ({
  id: user.id,
  name: user.name,
  business: user.business,
  city: user.city,
  cityName: user.cityName,
  cpf: user.cpf,
  phone: user.phone,
  photoURL: user.photoURL,
  state: user.state,
  stateData: user.stateData,
  stateUf: user.stateUf,
});

export const removeUserFromArrayOfUsersObjects = (user, array) =>
  array.filter(person => person.id !== user.id);

export const hasUserOnArrayOfObjects = (user, array) =>
  array.some(person => person.id === user.id);
