import * as configs from './configs';

const env = 'development';
const config = configs[env];

console.log(`[${config.appName}] Environment detected: ${env}`);

export default {
  env,
  ...config,
};
