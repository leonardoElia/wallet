// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};
let chaves = [];
let filterChave = [];
let id = 0;
let novoExpenses = [];
const Wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'ADICONAR_MOEDA':
    chaves = Object.keys(action.objeto);
    filterChave = chaves.filter((e) => e !== 'USDT');
    return {
      ...state,
      currencies: filterChave,
    };
  case 'ADICONAR_DESPESA':
    return {
      ...state,
      expenses: [...state.expenses, action.despesa],
    };
  case 'REMOVER_DESPESA':
    id = action.id;
    novoExpenses = state.expenses.filter((e) => e.id !== Number(id));
    return {
      ...state,
      expenses: novoExpenses,
    };
  default:
    return state;
  }
};

export default Wallet;
