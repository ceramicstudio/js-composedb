import React from "react";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.min.css";
import { ComposeClient } from "@composedb/client";
import { definition } from "./definition.js";

const composeClient = new ComposeClient({
  ceramic: "https://ceramic-temp.hirenodes.io",
  definition,
});


const fetcher = async (graphQLParams) => {
  const data = await composeClient.executeQuery(`${graphQLParams.query}`);
  console.log(data)
  return data.data;
};

const App = () => <GraphiQL fetcher={fetcher} />;

export default App;
