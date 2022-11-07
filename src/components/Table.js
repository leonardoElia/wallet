import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEditarDespesa, actionRemoverDespesa } from '../redux/actions';

class Table extends Component {
  exluirDespesa = (event) => {
    const { name } = event.target;
    const { dispatch } = this.props;
    dispatch(actionRemoverDespesa(name));
  };

  editarDespesa = (event) => {
const {name} = event.target;
const { dispatch } = this.props;
dispatch(actionEditarDespesa(name))
  }

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
        botaos:
        <>
        <button
    type="button"
    name={ e.id }
    onClick={ this.editarDespesa }
    data-testid="edit-btn"
  >
    Editar

  </button>
        <button
    type="button"
    name={ e.id }
    onClick={ this.exluirDespesa }
    data-testid="delete-btn"
  >
    Excluir

  </button>
        </>,
  
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
            {expensesAdptacao.map((e) => {
              const valores = Object.values(e);
              const aleatorio = Number(Math.random() * 100);

              return (
                <tr key={ aleatorio }>
                  {valores.map((el, i) => (
                    <td key={ i }>{el}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>

        </table>
      </>

    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
