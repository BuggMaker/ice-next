import type { AppConfig } from './types';

const defaultAppConfig: AppConfig = {
  app: {
    rootId: 'ice-container',
    strict: true,
  },
  router: {
    type: 'browser',
  },
};

export default function defineAppConfig(appConfig: AppConfig) {
  return {
    app: {
      ...defaultAppConfig.app,
      ...(appConfig.app || {}),
    },
    router: {
      ...defaultAppConfig.router,
      ...(appConfig.router || {}),
    },
  };
}
