import React from 'react';
import styles from './index.module.css';
import { TEST_VIDEO } from '@constants/videos';
import VideoViewer from '@components/Video/VideoViewer';
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
}

export default function () {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed
  const loggedinState = keycloak?.authenticated ? (
    <span className="text-success">logged in</span>
  ) : (
    <span className="text-danger">NOT logged in</span>
  );
  const welcomeMessage =
    keycloak?.authenticated || (keycloak && parsedToken)
      ? `Welcome back ${parsedToken?.preferred_username ?? ''}!`
      : 'Welcome visitor. Please login to continue.'

  return (
    <div className={styles.normal}>
      <p>You are: {loggedinState}</p>
      <p>{welcomeMessage}</p>
      <button onClick={() => keycloak.login()}>Login</button>
      <VideoViewer urlVideo={TEST_VIDEO} />
    </div>
  );
}
