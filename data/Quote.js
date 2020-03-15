import { ObjectID } from "mongodb";
import { getDB } from "./db";
import { getPerson } from "./Person";

// TODO: search by person for quote (said_by), search for quotes containing string, heartQuote, getQuotesWithSort

export default class Quote {
  constructor({ _id, text, date, votes, said_by, tags }) {
    this.id = _id;
    this.text = text;
    this.date = date;
    this.votes = votes || 0;
    this.said_by = said_by;
    this.tags = tags;
  }
}

export const getQuote = id =>
  new Promise((resolve, reject) => {
    getDB()
      .then(db => {
        const collection = db.collection("quotes");
        const query = {
          _id: ObjectID(id)
        };
        const cursor = collection.find(query);
        cursor
          .toArray()
          .then(result => {
            if (result.length == 0) {
              return resolve(null);
            }
            const quote = new Quote(result[0]);
            resolve(quote);
          })
          .catch(reject);
      })
      .catch(console.error);
  });

export const getQuotes = (amount, page) =>
  new Promise((resolve, reject) => {
    getDB()
      .then(db => {
        const collection = db.collection("quotes");
        collection
          .find({})
          .skip(amount * page)
          .limit(amount)
          .toArray()
          .then(result => {
            resolve(result.map(qt => new Quote(qt)));
          })
          .catch(reject);
      })
      .catch(reject);
  });

export const addQuote = (text, date, said_by, tags) =>
  new Promise((resolve, reject) => {
    getDB()
      .then(db => {
        const persons = [said_by];
        if (tags) {
          tags.forEach(p => persons.push(p));
        }
        Promise.all(persons.map(p => getPerson(p)))
          .then(res => {
            if (res.filter(p => p == null).length != 0) {
              reject("Invalid person in input");
            } else {
              const collection = db.collection("quotes");
              collection
                .insertOne({
                  text,
                  date,
                  said_by,
                  tags: tags || [],
                  votes: 0,
                  date: date || new Date().toUTCString()
                })
                .then(result => resolve(new Quote(result.ops[0])))
                .catch(reject);
            }
          })
          .catch(reject);
      })
      .catch(reject);
  });

export const upVote = id =>
  new Promise((resolve, reject) => {
    getDB()
      .then(db => {
        const collection = db.collection("quotes");
        collection;
        resolve();
      })
      .catch(reject);
  });
