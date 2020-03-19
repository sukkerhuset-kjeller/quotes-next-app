import { ObjectID } from 'mongodb';
import { getDB } from './db';

export default class Quote {
    constructor({ _id, text, date, hearts, saidBy, tags }, hasHearted) {
        this.id = _id;
        this.text = text;
        this.date = date + '';
        this.hearts = hearts?.length || 0;
        this.saidBy = saidBy;
        this.tags = tags;
        this.hasHearted = hasHearted || false;
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
                            result[0].hearts?.filter(
                                (h) => h + '' === userId + ''
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
                                        qt.hearts?.filter(
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
        getDB()
            .then((db) => {
                const collection = db.collection('quotes');
                collection
                    .insertOne({
                        text,
                        date,
                        saidBy,
                        tags: tags || [],
                        hearts: [],
                        date: Number(date) || new Date().getTime(),
                        createdBy: userId == 'id' ? null : userId,
                    })
                    .then((result) => resolve(new Quote(result.ops[0])))
                    .catch(reject);
            })
            .catch(reject);
    });

export const heartQuote = (id, userId) =>
    new Promise((resolve, reject) => {
        getDB()
            .then((db) => {
                db.collection('quotes')
                    .findOne({
                        _id: ObjectID(id),
                    })
                    .then((quote) => {
                        if (
                            quote?.hearts?.filter(
                                (heartId) => heartId + '' == userId + ''
                            ).length > 0
                        ) {
                            return reject('Already hearted');
                        }
                        db.collection('quotes')
                            .update(
                                {
                                    _id: ObjectID(id),
                                },
                                {
                                    $push: {
                                        hearts: userId,
                                    },
                                }
                            )
                            .then(() => {
                                resolve(quote.hearts.length + 1);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
