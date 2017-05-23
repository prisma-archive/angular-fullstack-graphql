# Subscriptions Example (with Angular & Apollo)

* [Angular](https://github.com/angular/angular): Frontend framework for building mobile and desktop web applications
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

## Getting Started

Subscriptions allow you to bring realtime functionality into your app. You can learn more about subscriptions in our [docs](https://www.graph.cool/docs/reference/simple-api/subscriptions-aip7oojeiv/).

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/angular-graphql.git
cd react/subscriptions-with-apollo
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Instagram schema
graphcool init --schema https://graphqlbin.com/instagram.graphql 
```

This creates a GraphQL API for the following schema:

```graphql
type Post {
  description: String!
  imageUrl: String!
}
```


### 2. Configure app data endpoint

#### 3.1. Simple API

Copy the `Simple API` endpoint to `./src/app/client.ts` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

#### 3.1. Susbcriptions API

Copy the `Susbcriptions API` endpoint to `src/app/feed.component.ts` in `ngOnInit` as the argument for the constructor of the `SubscriptionClient`:

```js
const wsClient = new Client('__SUBSCRIPTIONS_API_ENDPOINT__')
```


### 4. Install dedendencies & run locally

You're done configuring the example application. Please run the following command and open [localhost:3000](http://localhost:3000) in your browser. 

```sh
yarn install
yarn start
```

Make sure to open two or more tabs with the page to see subscriptions in action. Have fun exploring! 🎉

### 5. Subscriptions Debugger

You can use the Graphcool Playground to test subscriptions.

![](http://graphcool-random.s3.amazonaws.com/images/subscriptions.gif)

Simply run a subscription query to subscribe in one tab:

```graphql
subscription {
  Post(filter: {
    mutation_in: [CREATED]
  }) {
    node {
      id
      imageUrl
      description
    }
  }
}
```

Then, in a different tab you can send a mutation to trigger the mutation:

```graphql
mutation {
  createPost(
    description: "Giraffe",
    imageUrl: "http://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/g/giraffe_thumb.JPG",
  ) {
    id
  }
}
```


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
