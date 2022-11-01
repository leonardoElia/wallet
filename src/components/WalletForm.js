import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  formDespesa = () => {

  };

  render() {
    const { moedas } = this.props;
    return (
      <>
        <h1>WalletForm</h1>
        <label htmlFor="despesa">
          Adicionar valor da despesa
          <input
            type="text"
            data-testid="value-input"
            id="despesa"
            name="despesa"
            onChange={ this.formDespesa }
          />
        </label>
        <label htmlFor="descricao">
          Descrição da despesa
          <textarea
            data-testid="description-input"
            id="descricao"
            name="descricao"
            onChange={ this.formDespesa }
          />
        </label>
        <label htmlFor="moeda">
          Moeda que será registrada na Despesa
          <select
            name="moeda"
            id="moeda"
            onChange={ this.formDespesa }
            data-testid="currency-input"
          >
            {moedas.map((e, i) => <option value={ e } key={ i }>{e}</option>)}

          </select>
        </label>
        <label htmlFor="pagamento">
          Forma de pagamento
          <select data-testid="method-input" id="pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="conta">
          Forma de pagamento
          <select data-testid="tag-input" id="conta">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>

          </select>
        </label>

      </>

    );
  }
}

WalletForm.propTypes = {
  moedas: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
