# Sukkerhuset Quotes

This is an app created to collect quotes at Sukkerhuset Kjeller. It is built using Next.js and GraphQL.

## Getting Started

Install dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

The GraphQL API is available at `/api/graphql?query`

### Examples

1. [Authentication](#auth)
2. [Fetch all persons](#fetch-all-persons)
3. [Search for person](#search-for-person)
4. [Fetch quotes](#fetch-quotes)
5. [Add new quote](#add-new-quote)
6. [Add old quote](#add-old-quote)

<details>
  <summary>Overview</summary>

```gql
type Query {
  quote(id: ID!): Quote
  quotes(
    input: QuoteSearchInput
    sort: SortInput
    amount: Int!
    page: Int!
  ): [Quote]
  person(id: ID!): Person
  persons(name: String): [Person]
}

type Mutation {
  addQuote(input: QuoteInput!): Quote
  heartQuote(id: ID!): Int
  login(username: String!, password: String!): String
  register(username: String!, password: String!): Boolean
  logout: Boolean
}

type Quote {
  id: ID!
  text: String!
  date: String!
  heats: Int!
  saidBy: Person!
  tags: [Person]
  hasHearted: Boolean!
}

type Person {
  id: ID!
  name: String!
}

input QuoteInput {
  text: String!
  saidBy: ID!
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
</details>

<a name="auth"></a>

#### Authentication

Login:

```gql
mutation {
    login(username: "", password: "")
}
```

This returns session id as a string. All future API calls should include this in the `Authentication` header.

Registration:

```gql
mutation {
    register(username: "", password: "")
}
```

This returns a bool telling if the process were successful.

Logout:

```gql
mutation {
    logout
}
```

This invalidates the current session.

<a name="fetch-all-persons"></a>

#### Fetch all persons

```gql
{
    persons {
        name
    }
}
```

<a name="search-for-person"></a>

#### Search for person

```gql
{
    persons(name: "bob") {
        name
    }
}
```

<a name="fetch-quotes"></a>

#### Fetch quotes

```gql
{
    quotes(amount: 10, page: 0) {
        id
        text
        date
        hearts
        saidBy {
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

```gql
mutation {
    addQuote(input: {
        text: "<quote text>"
        saidBy: "<id of person>"
    }) {
        text
        date
        hearts
        saidBy {
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

```gql
mutation {
    addQuote(input: {
        text: "<quote text>"
        saidBy: "<id of person>"
        date: "<milliseconds since 1970 as string>"
    }) {
        text
        date
        hearts
        saidBy {
            name
        }
        tags {
            name
        }
    }
}
```

## Useful resources

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
