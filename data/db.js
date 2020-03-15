import { MongoClient } from "mongodb";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const dbs = {};
let _client;

export const connect = (url, db, username, password) =>
  new Promise((resolve, reject) => {
    MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      auth: {
        user: username,
        password
      }
    })
      .then(client => {
        _client = client;
        dbs[db] = client.db(db);
        resolve();
      })
      .catch(reject);
  });

export const getDB = () =>
  new Promise((resolve, reject) => {
    if (dbs[serverRuntimeConfig.DB_NAME])
      resolve(dbs[serverRuntimeConfig.DB_NAME]);
    else {
      connect(
        serverRuntimeConfig.DB_URL,
        serverRuntimeConfig.DB_NAME,
        serverRuntimeConfig.DB_USER,
        serverRuntimeConfig.DB_PASSWORD
      )
        .then(() => {
          resolve(dbs[serverRuntimeConfig.DB_NAME]);
        })
        .catch(reject);
    }
  });

export const close = () => _client.close();
