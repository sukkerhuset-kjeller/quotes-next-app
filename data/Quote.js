import { ObjectID } from 'mongodb';
import sanitize from 'sanitize-html';
import { getDB } from './db';

export default class Quote {
    constructor({ _id, text, date, likes, saidBy, tags }, hasLiked) {
        this.id = _id;
        this.text = text;
        this.date = date + '';
        this.likes = likes?.length || 0;
        this.saidBy = saidBy;
        this.tags = tags;
        this.hasLiked = hasLiked || false;
    }
}

export const getQuote = (id, userId) =>
    new Promise((resolve, reject) => {
        getDB()
            .then((db) => {
                const collection = db.collection('quotes');
                const query = {
                    _id: ObjectID(id),
                };
                const cursor = collection.find(query);
                cursor
                    .toArray()
                    .then((result) => {
                        if (result.length == 0) {
                            return resolve(null);
                        }
                        const quote = new Quote(
                            result[0],
                            result[0].likes?.filter(
                                (like) => like + '' === userId + ''
                            ).length > 0
                        );
                        resolve(quote);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });

export const getQuotes = (input, sort, amount, page, userId) =>
    new Promise((resolve, reject) => {
        getDB()
            .then((db) => {
                const collection = db.collection('quotes');
                const query = {};
                if (input?.quote?.length > 0) {
                    query.$or = input.quote.split(' ').map((w) => ({
                        text: {
                            $regex: '.*' + w + '.*',
                            $options: 'i',
                        },
                    }));
                }
                if (input?.person?.length > 0) {
                    if (!query.$or) query.$or = [];
                    input.person.split(' ').forEach((w) => {
                        query.$or.push({
                            saidBy: {
                                $regex: '.*' + w + '.*',
                                $options: 'i',
                            },
                        });
                        query.$or.push({
                            tags: {
                                $elemMatch: {
                                    $regex: '.*' + w + '.*',
                                    $options: 'i',
                                },
                            },
                        });
                    });
                }
                if (!query.$or) {
                    delete query.$or;
                }
                const sortQuery = {};
                if (sort?.field) {
                    sortQuery[sort.field] = sort.ascending ? 1 : -1;
                }
                collection
                    .find(query)
                    .sort(sortQuery)
                    .skip(amount * page)
                    .limit(amount)
                    .toArray()
                    .then((result) => {
                        resolve(
                            result.map(
                                (qt) =>
                                    new Quote(
                                        qt,
                                        qt.likes?.filter(
                                            (h) => h + '' === userId + ''
                                        ).length > 0
                                    )
                            )
                        );
                    })
                    .catch(reject);
            })
            .catch(reject);
    });

export const addQuote = (text, date, saidBy, tags, userId) =>
    new Promise((resolve, reject) => {
        if (date && isNaN(Number(date))) {
            return reject(
                'Date invalid, string with number of milliseconds since 1970'
            );
        }
        if (tags) {
            tags = tags?.map((p) => sanitize(p));
        }
        getDB()
            .then((db) => {
                const collection = db.collection('quotes');
                collection
                    .insertOne({
                        text: sanitize(text),
                        date,
                        saidBy: sanitize(saidBy),
                        tags: tags || [],
                        likes: [],
                        date: Number(date) || new Date().getTime(),
                        createdBy: userId == 'id' ? null : userId,
                    })
                    .then((result) => resolve(new Quote(result.ops[0])))
                    .catch(reject);
            })
            .catch(reject);
    });

export const likeQuote = (id, revert, userId) =>
    new Promise((resolve, reject) => {
        getDB()
            .then((db) => {
                db.collection('quotes')
                    .findOne({
                        _id: ObjectID(id),
                    })
                    .then((quote) => {
                        const liked =
                            quote?.likes?.filter(
                                (likeId) => likeId + '' == userId + ''
                            ).length > 0;
                        if (liked && !revert) {
                            return reject('Already liked');
                        } else if (!liked && revert) {
                            return reject('Already disliked');
                        }
                        const updateQuery = revert
                            ? {
                                  $pull: {
                                      likes: userId,
                                  },
                              }
                            : {
                                  $push: {
                                      likes: userId,
                                  },
                              };
                        db.collection('quotes')
                            .update(
                                {
                                    _id: ObjectID(id),
                                },
                                updateQuery
                            )
                            .then(() => {
                                resolve(quote.likes.length + (revert ? -1 : 1));
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
