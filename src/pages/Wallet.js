import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1>TrybeWallet</h1>
        <WalletForm />
      </>
    );
  }
}

export default Wallet;
