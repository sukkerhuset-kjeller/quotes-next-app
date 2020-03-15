# Sukkerhuset Quotes

This is an app created to collect quotes at Sukkerhuset Kjeller. It is built using Next.js and GraphQL.

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

The GraphQL API is available at `/api/graphql?query`

### Examples

1. [Fetch all persons](#fetch-all-persons)
2. [Search for person](#search-for-person)
3. [Fetch quotes](#fetch-quotes)
4. [Add new quote](#add-new-quote)
5. [Add old quote](#add-old-quote)

#### Overview

```
type Query {
    quote(id: ID!): Quote
    quotes(input: QuoteSearchInput, sort: SortInput, amount: Int!, page: Int!): [Quote]
    person(id: ID!): Person
    persons(name: String): [Person]
}

type Mutation {
    addQuote(input: QuoteInput!): Quote
}

type Quote {
    id: ID!
    text: String!
    date: String!
    votes: Int!
    said_by: Person
    tags: [Person]
}

type Person {
    id: ID!
    name: String!
}

input QuoteInput {
    text: String!
    said_by: ID!
    date: String
    tags: [ID]
}

input QuoteSearchInput {
    quote: String
    person: String
}

input SortInput {
    field: String!
    ascending: Boolean!
}
```

<a name="fetch-all-persons"></a>

#### Fetch all persons

```
{
    persons {
        name
    }
}
```

<a name="search-for-person"></a>

#### Search for person

```
{
    persons(name: "bob") {
        name
    }
}
```

<a name="fetch-quotes"></a>

#### Fetch quotes

```
{
    quotes(amount: 10, page: 0) {
        id
        text
        date
        votes
        said_by {
            id
            name
        }
        tags {
            id
            name
        }
    }
}
```

<a name="add-new-quote"></a>

#### Add new quote

```
mutation {
    addQuote(input: {
        text: "<quote text>"
        said_by: "<id of person>"
    }) {
        text
        date
        votes
        said_by {
            name
        }
        tags {
            name
        }
    }
}
```

<a name="add-old-quote"></a>

#### Add old quote

```
mutation {
    addQuote(input: {
        text: "<quote text>"
        said_by: "<id of person>"
        date: "<milliseconds since 1970 as string>"
    }) {
        text
        date
        votes
        said_by {
            name
        }
        tags {
            name
        }
    }
}
```

## Useful resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
