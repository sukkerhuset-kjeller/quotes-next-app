import { getDB } from './db';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const saltRounds = 10;
const sessionValidTime = 86400000;

export const login = (username, password) =>
    new Promise((resolve, reject) => {
        getDB()
            .then((db) => {
                db.collection('users')
                    .findOne({
                        username,
                    })
                    .then((user) => {
                        if (!user) {
                            return reject('Wrong username or password');
                        }
                        bcrypt
                            .compare(password, user.password)
                            .then((res) => {
                                if (!res) {
                                    return reject('Wrong username or password');
                                }
                                const session = crypto
                                    .randomBytes(32)
                                    .toString('hex');
                                db.collection('sessions')
                                    .insertOne({
                                        id: user._id,
                                        session,
                                        createdAt: new Date(),
                                    })
                                    .then(() => {
                                        resolve(session);
                                    })
                                    .catch(reject);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });

export const register = (username, password) =>
    new Promise((resolve, reject) => {
        if (password.length < 10) {
            return reject('Password not long enough (minimum 10 characters)');
        }
        getDB()
            .then((db) => {
                db.collection('users')
                    .find({ username })
                    .toArray()
                    .then((exisitingUsers) => {
                        if (exisitingUsers.length !== 0) {
                            return reject('Username taken');
                        }
                        bcrypt
                            .hash(password, saltRounds)
                            .then((hash) => {
                                db.collection('users')
                                    .insertOne({
                                        username,
                                        password: hash,
                                    })
                                    .then(() => {
                                        resolve(true);
                                    })
                                    .catch(reject);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });

export const getUserSession = (session) =>
    new Promise((resolve, reject) => {
        if (!serverRuntimeConfig.AUTH_REQUIRED) {
            resolve('id');
        } else {
            getDB()
                .then((db) => {
                    db.collection('sessions')
                        .findOne({ session })
                        .then((session) => {
                            if (!session) {
                                resolve();
                            } else if (
                                new Date(session.createdAt).getTime() +
                                    sessionValidTime <
                                new Date().getTime()
                            ) {
                                db.collection('sessions')
                                    .deleteOne({ _id: session._id })
                                    .then(() => {
                                        resolve();
                                    })
                                    .catch(reject);
                            } else {
                                resolve(session.id);
                            }
                        })
                        .catch(reject);
                })
                .catch(reject);
        }
    });

export const logout = (userId) =>
    new Promise((resolve, reject) => {
        getDB()
            .then((db) => {
                db.collection('sessions')
                    .deleteOne({ id: userId })
                    .then(() => {
                        resolve(true);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
