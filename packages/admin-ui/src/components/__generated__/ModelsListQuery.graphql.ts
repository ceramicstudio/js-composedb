/**
 * @generated SignedSource<<b68a497b98e81f448f6acc1bcd6a517e>>
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
    readonly composites: ReadonlyArray<{
      readonly compositeID: string;
      readonly id: string;
    }>;
    readonly description: string | null;
    readonly id: string;
    readonly indexDocuments: boolean;
    readonly name: string;
    readonly streamID: string;
  }>;
};
export type ModelsListQuery = {
  response: ModelsListQuery$data;
  variables: ModelsListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Model",
    "kind": "LinkedField",
    "name": "models",
    "plural": true,
    "selections": [
      (v0/*: any*/),
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
        "name": "indexDocuments",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Composite",
        "kind": "LinkedField",
        "name": "composites",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "compositeID",
            "storageKey": null
          }
        ],
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
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ModelsListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9c97442642ebe45387ca96699da83f72",
    "id": null,
    "metadata": {},
    "name": "ModelsListQuery",
    "operationKind": "query",
    "text": "query ModelsListQuery {\n  models {\n    id\n    streamID\n    name\n    description\n    indexDocuments\n    composites {\n      id\n      compositeID\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "17e5c35d241bb3dcba4e53da0be90879";

export default node;
