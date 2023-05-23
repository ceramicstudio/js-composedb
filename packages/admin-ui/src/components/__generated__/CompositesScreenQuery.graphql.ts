/**
 * @generated SignedSource<<c3c4d30cc75ab86f0bbcbe58008f8e42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CompositesScreenQuery$variables = {};
export type CompositesScreenQuery$data = {
  readonly composites: ReadonlyArray<{
    readonly description: string | null;
    readonly enable: boolean;
    readonly enableMutations: boolean;
    readonly enableSubscriptions: boolean;
    readonly id: string;
    readonly models: ReadonlyArray<{
      readonly description: string | null;
      readonly id: string;
      readonly name: string;
    }>;
  }>;
};
export type CompositesScreenQuery = {
  response: CompositesScreenQuery$data;
  variables: CompositesScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Composite",
    "kind": "LinkedField",
    "name": "composites",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "enable",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "enableMutations",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "enableSubscriptions",
        "storageKey": null
      },
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
            "name": "name",
            "storageKey": null
          },
          (v1/*: any*/)
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
    "name": "CompositesScreenQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CompositesScreenQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9e2401472232e7dfd0c24840584d7e61",
    "id": null,
    "metadata": {},
    "name": "CompositesScreenQuery",
    "operationKind": "query",
    "text": "query CompositesScreenQuery {\n  composites {\n    id\n    description\n    enable\n    enableMutations\n    enableSubscriptions\n    models {\n      id\n      name\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6c6412dea714d5cdef502a0f32f8779a";

export default node;
