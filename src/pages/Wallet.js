import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import FormEditar from '../components/FormEditar';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <>
        <Header />
        <h1>TrybeWallet</h1>
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
