import React, { useEffect } from 'react';
import './App.css';
import { Header } from './components/header/header';
import { useRecoilState } from 'recoil';
import { userCurrentAccount } from './state/atoms';

function App() {
  const [_, setCurrentAddress] = useRecoilState(userCurrentAccount);

  const IsWalletConnected = async () => {
    const { ethereum } = window as any;

    if (!ethereum) {
      console.log('Metamask not found!!');
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      if (accounts.length !== 0) {
        setCurrentAddress(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    IsWalletConnected();
  });

  return (
    <div className="App">
      <Header />
      <hr />
    </div>
  );
}

export default App;