import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAdiconarDespesa, fetchCurrencies } from '../redux/actions';
import '../style/form.css';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      descricao: '',
      moeda: 'USD',
      formaPagamento: 'Cartão de crédito',
      categoriaDespesa: 'Alimentação',
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
    } else {
      alert('O valor  da despesa precisa ser númerico');
    }
  };

  render() {
    const { moedas } = this.props;
    const { valor, descricao, moeda, formaPagamento, categoriaDespesa,
      disabled } = this.state;
    return (
      <div className="formularioBox">
        <div className="formText">
          <label htmlFor="despesa">
            Adicionar valor da despesa
            <input
              className="inputValor"
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
              className="inputDescricao"
              data-testid="description-input"
              id="descricao"
              name="descricao"
              onChange={ this.formDespesa }
              value={ descricao }
            />
          </label>
        </div>
        <div className="boxSelect">
          <label htmlFor="moeda">
            <span className="moedaText">Moeda</span>
            <select
              className="inputMoeda"
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
              className="inputPagamento"
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
            <span className="textCategoria">Categoria da despesa</span>
            <select
              className="inputConta"
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
        </div>

        <button
          className="buttonAdicionar"
          type="button"
          onClick={ this.adicionar }
          disabled={ disabled }
        >
          Adicionar despesa

        </button>

      </div>

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
