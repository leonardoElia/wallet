import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEditarDespesa, actionRemoverDespesa } from '../redux/actions';

import '../style/table.css';

class Table extends Component {
  exluirDespesa = (event) => {
    const { name } = event.target;
    const { dispatch } = this.props;
    dispatch(actionRemoverDespesa(name));
  };

  editarDespesa = (event) => {
    const { name } = event.target;
    console.log(name);
    const { dispatch } = this.props;
    dispatch(actionEditarDespesa(name));
  };

  render() {
    const { expenses, editor } = this.props;
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
      className="buttonEditar"
      type="button"
      name={ e.id }
      onClick={ this.editarDespesa }
      data-testid="edit-btn"
      disabled={ editor }
    >

      Editar

    </button>
    <button
      className="buttonExcluir"
      type="button"
      name={ e.id }
      onClick={ this.exluirDespesa }
      data-testid="delete-btn"
      disabled={ editor }
    >
      Excluir

    </button>
  </>,

      };
    });
    return (
      <center>

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
                <tr key={ aleatorio } className="despesa">
                  {valores.map((el, i) => (
                    <td key={ i }>{el}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>

        </table>
      </center>

    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Table);
