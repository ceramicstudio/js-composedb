import React from 'react'
import { GraphiQL } from 'graphiql'
import 'graphiql/graphiql.min.css'
import { ComposeClient } from '@composedb/client'
import { definition } from './definition.js'
import ReactGA from 'react-ga4'

const composeClient = new ComposeClient({
  ceramic: 'https://ceramic-temp.hirenodes.io',
  definition,
})

ReactGA.initialize('G-V2Y8T342EX')

const fetcher = async (graphQLParams) => {

  ReactGA.event({
    category: "sandbox-query",
    action: "general-submit"
  });

  const data = await composeClient.executeQuery(`${graphQLParams.query}`)
  console.log(data)
  
  if (data.errors) {
    ReactGA.event({
    category: "sandbox-query",
    action: "query-error"
  });
  } else {
    ReactGA.event({
      category: "sandbox-query",
      action: "query-success"
    });
  }
  return data.data
}

const App = () => <GraphiQL fetcher={fetcher} />

export default App
