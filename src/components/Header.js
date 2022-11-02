import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const valores = expenses.map((e) => (e.value));
    const moedas = expenses.map((e) => (e.currency));
    let somaConvercao = 0;
    valores.forEach((e, i) => {
      const cotacao = expenses[i].exchangeRates[moedas[i]].ask;
      const convercao = Number(e) * cotacao;
      somaConvercao += convercao;
    });

    return (
      <>
        <h1>Header</h1>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{somaConvercao.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
