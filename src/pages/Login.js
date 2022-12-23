import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mudarEmail } from '../redux/actions';
import '../style/login.css';
import logo from '../imagens/logo.jpg';

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

  componentDidMount() {
    document.body.style.backgroundColor = '#65727c';
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

      <div className="boxLogin">
        <img src={ logo } alt="logo" className="logo" />
        <input
          className="inputLogin"
          type="email"
          id="email"
          name="email"
          value={ email }
          data-testid="email-input"
          placeholder=" Email"
          onChange={ this.alterarCampo }
        />

        <input
          className="inputLogin"
          type="password"
          id="password"
          name="password"
          value={ senha }
          data-testid="password-input"
          placeholder=" Senha"
          onChange={ this.alterarCampo }
        />

        <button
          className="buttonEntrar"
          disabled={ disabled }
          onClick={ this.entrar }
          type="button"
        >
          ENTRAR

        </button>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
