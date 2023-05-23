/**
 * @generated SignedSource<<bafb025cef761995d1272c4c65c78018>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ModelsListQuery$variables = {};
export type ModelsListQuery$data = {
  readonly models: ReadonlyArray<{
    readonly compositesCount: number;
    readonly description: string | null;
    readonly id: string;
    readonly indexingEnabled: boolean;
    readonly name: string;
    readonly streamID: string;
  }>;
};
export type ModelsListQuery = {
  response: ModelsListQuery$data;
  variables: ModelsListQuery$variables;
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
    "name": "ModelsListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ModelsListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f6191f943e29fcaa586b4c07b6c13d51",
    "id": null,
    "metadata": {},
    "name": "ModelsListQuery",
    "operationKind": "query",
    "text": "query ModelsListQuery {\n  models {\n    id\n    streamID\n    name\n    description\n    indexingEnabled\n    compositesCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "bbdf2bcc1a1bef306621a076c8ab8f8e";

export default node;
