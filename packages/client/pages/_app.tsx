import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'

import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr';
import '../styles/globals.css'

const keycloakCfg = {
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID
}

console.log(keycloakCfg);

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return <SSRKeycloakProvider
    keycloakConfig={keycloakCfg}
    persistor={SSRCookies(cookies)}
  >
    <Component {...pageProps} />
  </SSRKeycloakProvider>
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req)
  }
}

export default MyApp
