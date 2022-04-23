import React, { useEffect } from 'react';
import './App.css';
import { Header } from './components/header/header';
import { useRecoilState } from 'recoil';
import { userCurrentAccount, UserToken, userTokens } from './state/atoms';
import { UploadForm } from './components/uploadForm';
import { getUserTokens } from './utils/web3';
import { UserTokens } from './components/userTokens';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [_, setCurrentAddress] = useRecoilState(userCurrentAccount);
  const [__, setUserTokens] = useRecoilState(userTokens);

  const IsWalletConnected = async () => {
    const { ethereum } = window as any;

    if (!ethereum) {
      console.log('Metamask not found!!');
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        setCurrentAddress(accounts[0]);
        const userTokens = await getUserTokens(accounts[0]);
        setUserTokens(userTokens as UserToken[]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    IsWalletConnected();
  },[]);

  return (
    <div className="App">
      <Header />
      <hr />
      <UserTokens/>
      <UploadForm/>
    </div>
  );
}

export default App;