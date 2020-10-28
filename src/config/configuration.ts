/* eslint @typescript-eslint/no-var-requires: "off" */

import env from './IConfig';

const enVars = require('dotenv').config();

const config: env = enVars.parsed;
Object.freeze(config);

export default config;
