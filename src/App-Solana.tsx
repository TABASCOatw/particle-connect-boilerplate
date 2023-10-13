import React, { useEffect } from 'react';
import { Button, notification } from 'antd';
import {
  ConnectButton,
  ModalProvider,
  useAccount,
  useParticleConnect,
  useConnectKit
} from '@particle-network/connect-react-ui';
import {
  Solana,
  SolanaDevnet
} from '@particle-network/chains';
import {
  solanaWallets
} from '@particle-network/connect';
import { Connection, PublicKey } from '@solana/web3.js';

import './App.css';
import '@particle-network/connect-react-ui/dist/index.css';
import bs58 from 'bs58';

const PageConnectKit = () => {
  const options = {
    projectId: process.env.REACT_APP_PROJECT_ID,
    clientKey: process.env.REACT_APP_CLIENT_KEY,
    appId: process.env.REACT_APP_APP_ID,
    chains: [Solana, SolanaDevnet],
    wallets: solanaWallets(),
  };

  return (
    <ModalProvider particleAuthSort={['email', 'phone', 'google']} options={options}>
      <ConnectContent />
    </ModalProvider>
  );
};

export default PageConnectKit;

const ConnectContent = () => {
  const { connect, disconnect } = useParticleConnect();
  const connectKit = useConnectKit();
  const account = useAccount();
  const isParticleActive = connectKit.particle.auth.isLogin();

  const getProvider = () => {
    if (!isParticleActive) {
      return window.phantom?.solana;
    }
    return null;
  };

  const connectPhantom = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        await provider.connect();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (account) connectPhantom();
  }, [account]);

  const getBalance = async () => {
    const connection = new Connection(process.env.REACT_APP_RPC_URL);
    const phantomProvider = getProvider();
    const address = phantomProvider?.isPhantom ? phantomProvider.publicKey.toString() : await connectKit.particle.solana.getAddress();
    const publicKey = new PublicKey(address);
    const balanceInLamports = await connection.getBalance(publicKey);

    notification.success({
      message: 'getBalance Successful',
      description: `Balance: ${balanceInLamports / 1e9} SOL`,
    });
  };

  const personalSign = async () => {
    const message = 'GM, Particle!';
    const encodedMessage = new TextEncoder().encode(message);
    const phantomProvider = getProvider();

    const signedMessage = phantomProvider?.isPhantom ? 
      await phantomProvider.signMessage(encodedMessage, 'utf8') : 
      await connectKit.particle.solana.signMessage(bs58.encode(encodedMessage));

    notification.success({
      message: `personalSign Successful (${phantomProvider ? 'Phantom' : 'Particle'})`,
      description: JSON.stringify(signedMessage),
    });
  };

  const onDisconnect = () => disconnect({ hideLoading: true });

  return (
      <div className="connectkit-box">
        <div className="connect-btn">
          <ConnectButton />
        </div>

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
              <>
                <Button type="primary" onClick={getBalance}>
                  Get Balance
                </Button>
                <Button type="primary" onClick={personalSign}>
                  Personal Sign
                </Button>
              </>
            <Button type="primary" onClick={onDisconnect}>
              Disconnect
            </Button>
          </div>
        )}
      </div>
    );
  };
