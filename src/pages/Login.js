import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mudarEmail } from '../redux/actions';

const minimoSenha = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      disabled: true,
    };
  }

  entrar = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(mudarEmail(email));
    history.push('/carteira');
  };

  validarBotao = () => {
    const { password, email } = this.state;
    const regex = /\S+@\S+\.\S+/;

    if (regex.test(email) === false || password.length < minimoSenha) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  alterarCampo = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value }, this.validarBotao);
  };

  render() {
    const { senha, email, disabled } = this.state;
    return (
      <>
        <h1>Login</h1>
        <label htmlFor="email">
          email
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.alterarCampo }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            name="password"
            value={ senha }
            data-testid="password-input"
            onChange={ this.alterarCampo }
          />

        </label>
        <button
          disabled={ disabled }
          onClick={ this.entrar }
          type="button"
        >
          ENTRAR

        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
