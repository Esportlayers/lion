import 'inter-ui/inter.css'

import { CssBaseline, GeistProvider } from '@geist-ui/react'

import { AppProps } from 'next/app'
import Menu from '@/components/menu/Menu';
import { ReactElement } from 'react';
import { ScopeContextProvider } from 'context/ScopeContext';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <GeistProvider>
      <ScopeContextProvider>
        <CssBaseline />
        <Menu />
        <Component {...pageProps} />
      </ScopeContextProvider>
    </GeistProvider>
  );
}

export default MyApp