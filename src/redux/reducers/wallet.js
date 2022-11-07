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
let idEdit = 0;
let objetoEdit = {};
let index = 0;
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
    case 'INICIAR_EDICAO':
      return {
        ...state,
        editor: true,
        idToEdit: action.id,
      };
case 'EDITANDO_DESPESA':
  idEdit = state.idToEdit
  objetoEdit = state.expenses.find((e) => e.id === Number(idEdit))
  index =state.expenses.indexOf(objetoEdit)
  state.expenses[index].value = action.despesaEdit.value
  state.expenses[index].description = action.despesaEdit.description
  state.expenses[index].currency = action.despesaEdit.currency
  state.expenses[index].method = action.despesaEdit.method
  state.expenses[index].tag = action.despesaEdit.tag;
  return {
    ...state,
    editor: false,
    idToEdit:0,
    expenses: state.expenses
  }
  default:
    return state;
  }
};

export default Wallet;
