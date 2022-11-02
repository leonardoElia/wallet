import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAdiconarDespesa, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      descricao: '',
      moeda: 'USD',
      formaPagamento: 'Cartão de crédito',
      categoriaDespesa: '',
      disabled: true,
      id: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  fetchDaAPi = async () => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  validarBotao = () => {
    const { valor, descricao, moeda, formaPagamento, categoriaDespesa } = this.state;
    const estados = [valor, descricao, moeda, formaPagamento, categoriaDespesa];
    const validacao = estados.every((e) => e !== '');
    if (validacao === true) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  formDespesa = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.validarBotao);
  };

  adicionar = async () => {
    const objetoAPI = await this.fetchDaAPi();
    delete objetoAPI.USDT;
    const { valor, descricao, moeda, formaPagamento, categoriaDespesa, id } = this.state;
    const { dispatch } = this.props;
    const validacaoValor = valor.replace(',', '.');
    if (Number(validacaoValor)) {
      const despesa = {
        id,
        value: valor,
        description: descricao,
        currency: moeda,
        method: formaPagamento,
        tag: categoriaDespesa,
        exchangeRates: objetoAPI,
      };
      dispatch(actionAdiconarDespesa(despesa));
      this.setState({
        id: id + 1,
        valor: '',
        descricao: '',
        disabled: true,
      });
    }
  };

  render() {
    const { moedas } = this.props;
    const { valor, descricao, moeda, formaPagamento, categoriaDespesa,
      disabled } = this.state;
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
          onClick={ this.adicionar }
          disabled={ disabled }
        >
          Adicionar despesa

        </button>

      </>

    );
  }
}

WalletForm.propTypes = {
  moedas: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
