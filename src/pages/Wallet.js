import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { connect } from 'react-redux'
import FormEditar from '../components/FormEditar';

class Wallet extends React.Component {
  render() {
    const {editor} = this.props;
    return (
      <>
        <Header />
        <h1>TrybeWallet</h1>
        {(editor === false) ?  <WalletForm />  :  <FormEditar />  }
        <Table />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});
export default connect(mapStateToProps)(Wallet);
