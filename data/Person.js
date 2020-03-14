import { ObjectID } from 'mongodb';
import { getDB } from './db';

const cleanName = (name) => {
    name = name.toLowerCase();
    if (!(/^[a-zæøå ]+$/.test(name))) {
        return null;
    }
    const words = name.split(' ');
    return words.map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
};

export default class Person {
    constructor({ _id, name }) {
        this.id = _id;
        this.name = name;
    }
}

export const getPerson = (id) => new Promise((resolve, reject) => {
    getDB().then(db => {
        const collection = db.collection('persons');
        const query = {
            _id: ObjectID(id)
        };
        const cursor = collection.find(query);
        cursor.toArray().then(result => {
            resolve(result.length > 0 ? new Person(result[0]) : null);
        }).catch(reject);
    }).catch(reject);
});

export const getPersons = () => new Promise((resolve, reject) => {
    getDB().then(db => {
        const collection = db.collection('persons');
        const cursor = collection.find({});
        cursor.toArray().then(result => {
            resolve(result.map(person => new Person(person)));
        }).catch(reject);
    }).catch(reject);
});

export const addPerson = (name) => new Promise((resolve, reject) => {
    getDB().then(db => {
        const collection = db.collection('persons');
        name = cleanName(name);
        if (!name)
            return reject('Name not valid');
        collection.countDocuments({ name }).then(count => {
            if (count > 0) {
                return reject('Name already exists');
            }
            collection.insertOne({ name }).then(result => {
                resolve(new Person(result.ops[0]));
            }).catch(reject);
        });
    });
});