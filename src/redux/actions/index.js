// Coloque aqui suas actions

export const mudarEmail = (email) => ({
  type: 'MUDAR_EMAIL',
  email,
});

export const actionCurrencies = (objeto) => ({
  type: 'ADICONAR_MOEDA',
  objeto,
});

export const fetchCurrencies = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((json) => dispatch(actionCurrencies(json)))
  .catch((error) => console.log(error));
