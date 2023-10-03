import React, { useEffect } from 'react';
import Web3 from 'web3';
import { Button, notification } from 'antd';
import {
  ConnectButton,
  ModalProvider,
  useAccount,
  useNetwork,
  useParticleConnect,
  useParticleProvider
} from '@particle-network/connect-react-ui';
import {
  Ethereum,
  EthereumGoerli,
  EthereumSepolia,
  Solana,
  SolanaDevnet
} from '@particle-network/chains';
import {
  evmWallets,
  isEVMProvider,
  solanaWallets
} from '@particle-network/connect';

import './App.css';
import '@particle-network/connect-react-ui/dist/index.css';

const PageConnectKit = () => {
  const options = {
    projectId: process.env.REACT_APP_PROJECT_ID as string,
    clientKey: process.env.REACT_APP_CLIENT_KEY as string,
    appId: process.env.REACT_APP_APP_ID as string,
    chains: [Ethereum, EthereumGoerli, EthereumSepolia, Solana, SolanaDevnet],
    wallets: [
      ...evmWallets({
        projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
        showQrModal: true
      }),
      ...solanaWallets()
    ],
  };

  const particleAuthSort = ['email', 'phone', 'google'];

  return (
    <ModalProvider particleAuthSort={particleAuthSort} options={options}>
      <ConnectContent />
    </ModalProvider>
  );
};

export default PageConnectKit;

const ConnectContent = () => {
  const provider = useParticleProvider();
  const account = useAccount();
  const chain = useNetwork();
  const { connect, disconnect } = useParticleConnect();

  useEffect(() => {
    if (provider && isEVMProvider(provider)) {
      window.web3 = new Web3(provider as any);
    }
  }, [provider]);

  const connectParticleWithGoogle = () => connect({ id: 'particle', preferredAuthType: 'google' });
  const onDisconnect = () => disconnect({ hideLoading: true });

  const getBalance = async () => {
    const accounts = await window.web3.eth.getAccounts();
    const result = await window.web3.eth.getBalance(accounts[0]);
    notification.success({
      message: 'getBalance Successful',
      description: Web3.utils.fromWei(result, 'ether')
    });
  };

  const personalSign = async () => {
    const accounts = await window.web3.eth.getAccounts();
    const result = await window.web3.eth.personal.sign('GM Particle!', accounts[0], '');
    notification.success({
      message: 'personalSign Successful',
      description: result
    });
  };

  return (
    <div className="connectkit-box">
      <div className="connect-btn">
        <ConnectButton />
      </div>
      
      <br>
      </br>
      
      {!account && (
        <img
          src="https://i.imgur.com/mmDmdwY.png"
          onClick={connectParticleWithGoogle}
          alt="Google Auth"
        />
      )}
      
      <br>
      </br>
      
      <ConnectButton.Custom>
        {({ account, openAccountModal, openConnectModal, openChainModal }) => (
          <div className="modal-action">
            <Button onClick={openConnectModal} disabled={!!account}>
              Open Connect Modal
            </Button>
            <Button onClick={openAccountModal} disabled={!account}>
              Open Account Modal
            </Button>
            <Button onClick={openChainModal} disabled={!account}>
              Open Switch Network
            </Button>
          </div>
        )}
      </ConnectButton.Custom>
      {account && (
        <div className="connected-actions">
          {provider && isEVMProvider(provider) && chain?.name?.toLowerCase() !== 'solana' && (
            <>
              <Button type="primary" onClick={getBalance}>
                Get Balance
              </Button>
              <Button type="primary" onClick={personalSign}>
                Personal Sign
              </Button>
            </>
          )}
          <Button type="primary" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};