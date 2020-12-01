
import * as dotenv from 'dotenv';
import IConfig from './IConfig';

const enVars = dotenv.config().parsed;
const config = enVars;
Object.freeze(config);

export default config;
