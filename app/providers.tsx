'use client';
import React from 'react';

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import { polygonMumbai, sepolia, lineaTestnet } from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';

const projectId = '0x56872cc818e85dAB9278F6f55fD07C7eFfDdC60e';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, sepolia, lineaTestnet],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: 'Connect wallet demo',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Connect wallet demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function Providers({ children }: { children: any }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
