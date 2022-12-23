import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/header.css';

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
      <header>
        <p data-testid="email-field">{email}</p>
        <p>{`Total de depesas: ${somaConvercao.toFixed(2)} BRL`}</p>
      </header>
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
