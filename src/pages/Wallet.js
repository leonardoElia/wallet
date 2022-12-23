import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import FormEditar from '../components/FormEditar';

class Wallet extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  render() {
    const { editor } = this.props;
    return (
      <>
        <Header />
        {(editor === false) ? <WalletForm /> : <FormEditar /> }
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});
export default connect(mapStateToProps)(Wallet);
