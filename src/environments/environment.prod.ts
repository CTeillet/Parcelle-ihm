import { default as auth } from '../../auth_config.json';

export const environment = {
  production: true,
  auth: {
    domain: auth.domain,
    clientId: auth.clientId,
    redirectUri: window.location.origin,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: auth.audience,
    },
  },
  dev: {
    serverUrl: auth.serverUrl,
  },
};
