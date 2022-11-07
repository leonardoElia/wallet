import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEditandoDespesa } from '../redux/actions';

class FormEditar extends React.Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      descricao: '',
      moeda: 'USD',
      formaPagamento: 'Cartão de crédito',
      categoriaDespesa: '',
      // disabled: true,
      // id: 0,
    };
  }

  componentDidMount() {
    const { value, description, currency, method, tag } = this.props;
    this.setState({
      valor: value,
      descricao: description,
      moeda: currency,
      formaPagamento: method,
      categoriaDespesa: tag,
    });
  }

  // validarBotao = () => {
  // const { valor, descricao, moeda, formaPagamento, categoriaDespesa } = this.state;
  // const estados = [valor, descricao, moeda, formaPagamento, categoriaDespesa];
  // const validacao = estados.every((e) => e !== '');
  // if (validacao === true) {
  //   this.setState({ disabled: false });
  // } else {
  //    this.setState({ disabled: true });
  // }
  // };

  formDespesa = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // colar a validação no segundo parametro
  };

  editar = () => {
    const { dispatch } = this.props;
    const { valor, descricao, moeda, formaPagamento, categoriaDespesa } = this.state;
    const editDespesa = {
      value: valor,
      description: descricao,
      currency: moeda,
      method: formaPagamento,
      tag: categoriaDespesa,
    };
    dispatch(actionEditandoDespesa(editDespesa));
  };

  render() {
    const { moedas } = this.props;
    const { valor, descricao, moeda, formaPagamento, categoriaDespesa } = this.state;
    // pegar o estado disabled
    return (
      <>
        <h1>WalletForm</h1>
        <label htmlFor="despesa">
          Adicionar valor da despesa
          <input
            type="text"
            data-testid="value-input"
            id="despesa"
            name="valor"
            onChange={ this.formDespesa }
            value={ valor }
          />
        </label>
        <label htmlFor="descricao">
          Descrição da despesa
          <textarea
            data-testid="description-input"
            id="descricao"
            name="descricao"
            onChange={ this.formDespesa }
            value={ descricao }
          />
        </label>
        <label htmlFor="moeda">
          Moeda que será registrada na Despesa
          <select
            name="moeda"
            id="moeda"
            onChange={ this.formDespesa }
            data-testid="currency-input"
            value={ moeda }
          >
            {moedas.map((e, i) => <option value={ e } key={ i }>{e}</option>)}

          </select>
        </label>
        <label htmlFor="pagamento">
          Forma de pagamento
          <select
            data-testid="method-input"
            id="pagamento"
            value={ formaPagamento }
            name="formaPagamento"
            onChange={ this.formDespesa }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="conta">
          Categoria de despesa
          <select
            data-testid="tag-input"
            id="conta"
            name="categoriaDespesa"
            value={ categoriaDespesa }
            onChange={ this.formDespesa }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>

          </select>
        </label>

        <button
          type="button"
          onClick={ this.editar }
          // disabled={ disabled }
        >
          Editar Despesa

        </button>

      </>

    );
  }
}

FormEditar.propTypes = {
  moedas: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const id = state.wallet.idToEdit;
  const objeto = state.wallet.expenses.find((e) => e.id === Number(id));
  const { value, description, currency, method, tag } = objeto;
  return {
    moedas: state.wallet.currencies,
    value,
    description,
    currency,
    method,
    tag,
  };
};

export default connect(mapStateToProps)(FormEditar);
