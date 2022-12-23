import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEditandoDespesa } from '../redux/actions';
import '../style/form.css';

class FormEditar extends React.Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      descricao: '',
      moeda: '',
      formaPagamento: '',
      categoriaDespesa: '',
      disabled: false,
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

  validarBotao = () => {
    const { valor, descricao } = this.state;
    const estados = [valor, descricao];
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

  editar = () => {
    const { dispatch } = this.props;
    const { valor, descricao, moeda, formaPagamento, categoriaDespesa } = this.state;
    const validacaoValor = valor.replace(',', '.');
    if (Number(validacaoValor)) {
      const editDespesa = {
        value: valor,
        description: descricao,
        currency: moeda,
        method: formaPagamento,
        tag: categoriaDespesa,
      };
      dispatch(actionEditandoDespesa(editDespesa));
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
          onClick={ this.editar }
          disabled={ disabled }
        >
          Editar Despesa

        </button>

      </div>

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
