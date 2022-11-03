import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    const expensesAdptacao = expenses.map((e) => {
      const moedaSelect = e.currency;
      const convercao = Number(e.value) * Number(e.exchangeRates[moedaSelect].ask);
      const cambioDoMomento = Number(e.exchangeRates[moedaSelect].ask);
      const valorDecimal = Number(e.value);
      return {
        description: e.description,
        tag: e.tag,
        method: e.method,
        value: valorDecimal.toFixed(2),
        currency: e.exchangeRates[moedaSelect].name,
        cambio: cambioDoMomento.toFixed(2),
        valorConvertido: convercao.toFixed(2),
        moedaConvercao: 'Real',
      };
    });
    return (
      <>
        <h1>Table</h1>
        <table border="1">

          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>

          <tbody>
            {expensesAdptacao.map((e, x) => {
              const valores = Object.values(e);
              return <tr key={ x }>{valores.map((el, i) => <td key={ i }>{el}</td>)}</tr>;
            })}
          </tbody>

        </table>
      </>

    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
