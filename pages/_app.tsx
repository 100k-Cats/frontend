import React from 'react';
import './global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import {
  RainbowKitProvider,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
import type {
  Theme
} from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { isMobile } from 'react-device-detect';

let sysFont = '';
if (isMobile) {
  sysFont = 'Bioliquid';
} else {
  sysFont = 'Bioliquid';
}

const customTheme: Theme = {
  blurs: {
    modalOverlay: '',
  },
  colors: {
    accentColor: 'linear-gradient(60deg, rgba(231,126,93,1) 0%, rgba(120,55,101,1) 100%);',
    accentColorForeground: 'white',
    actionButtonBorder: 'none',
    actionButtonBorderMobile: 'none',
    actionButtonSecondaryBackground: 'white',
    closeButton: 'black',
    closeButtonBackground: 'white',
    connectButtonBackground: 'linear-gradient(60deg, rgba(231,126,93,1) 0%, rgba(120,55,101,1) 100%);',
    connectButtonBackgroundError: 'red',
    connectButtonInnerBackground: 'linear-gradient(60deg, rgba(231,126,93,1) 0%, rgba(120,55,101,1) 100%);',
    connectButtonText: 'white',
    connectButtonTextError: 'white',
    connectionIndicator: 'red',
    error: 'white',
    generalBorder: 'rgb(255, 255, 255, 0.90);',
    generalBorderDim: 'rgb(255, 255, 255, 0.90);',
    menuItemBackground: 'black',
    modalBackdrop: 'none',
    modalBackground: 'linear-gradient(90deg, rgba(36,28,57,0.985) 0%, rgba(114,137,149,0.985) 100%);',
    modalBorder: 'white',
    modalText: 'white',
    modalTextDim: 'rgb(255, 255, 255, 0.75);',
    modalTextSecondary: 'rgb(255, 255, 255, 0.75);',
    profileAction: 'rgb(0, 0, 0, 0.5);',
    profileActionHover: 'linear-gradient(90deg, rgba(146,151,255,0.80) 0%, rgba(96,62,255,0.80) 100%);',
    profileForeground: 'rgb(0, 0, 0, 0.5);',
    selectedOptionBorder: 'white',
    standby: 'white',
  },
  fonts: {
    body: `${sysFont}`,
  },
  radii: {
    actionButton: '6px',
    connectButton: '6px',
    menuButton: '6px',
    modal: '6px',
    modalMobile: '6px',
  },
  shadows: {
    connectButton: '',
    dialog: '',
    profileDetailsAction: '',
    selectedOption: '',
    selectedWallet: '',
    walletLogo: '',
  }
};

const { chains, provider } = configureChains(
  [
    chain.goerli
  ],
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: '100k ENS Cats',
  chains,
});

const appInfo = {
  appName: '100k ENS Cats (100kCat.eth)',
};

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={appInfo}
          chains={chains}
          theme={customTheme}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
