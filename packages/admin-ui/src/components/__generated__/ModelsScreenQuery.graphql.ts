/**
 * @generated SignedSource<<8bf34954a55560ebd298075ed59b9a8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ModelsScreenQuery$variables = {};
export type ModelsScreenQuery$data = {
  readonly models: ReadonlyArray<{
    readonly compositesCount: number;
    readonly description: string | null;
    readonly id: string;
    readonly indexingEnabled: boolean;
    readonly name: string;
    readonly streamID: string;
  }>;
};
export type ModelsScreenQuery = {
  response: ModelsScreenQuery$data;
  variables: ModelsScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Model",
    "kind": "LinkedField",
    "name": "models",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "streamID",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "indexingEnabled",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "compositesCount",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ModelsScreenQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ModelsScreenQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "795dc0b72c253f6a62c158826158e07e",
    "id": null,
    "metadata": {},
    "name": "ModelsScreenQuery",
    "operationKind": "query",
    "text": "query ModelsScreenQuery {\n  models {\n    id\n    streamID\n    name\n    description\n    indexingEnabled\n    compositesCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "ef9f50c9ac763c34a3cd8c69be3e6f3c";

export default node;
