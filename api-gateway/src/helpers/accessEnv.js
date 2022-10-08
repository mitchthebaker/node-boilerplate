const dotenv = require("dotenv");
dotenv.config();
/**
 * access a variable inside of process.env, throwing an error of it's not found
 * always run this method in advance (i.e. upon initialisation) so that the error is thrown 
 * caching the values improves performance - accessing process.env many times is bad 
 */

const cache = {};

const accessEnv = (key, defaultValue) => {
  if(!(key in process.env) || typeof process.env[key] === undefined) {
    if(defaultValue) return defaultValue;

    throw new Error(`${key} not found in process.env`);
  }

  if(!(key in cache)) cache[key] = process.env[key];

  return cache[key];
};

module.exports = accessEnv;