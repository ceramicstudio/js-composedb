/**
 * @generated SignedSource<<9f42d7d7c100d627e2bd3e45be4dfa95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CompositesListQuery$variables = {};
export type CompositesListQuery$data = {
  readonly composites: ReadonlyArray<{
    readonly compositeID: string;
    readonly description: string | null;
    readonly enable: boolean;
    readonly enableMutations: boolean;
    readonly enableSubscriptions: boolean;
    readonly id: string;
    readonly models: ReadonlyArray<{
      readonly description: string | null;
      readonly id: string;
      readonly name: string;
      readonly streamID: string;
    }>;
  }>;
};
export type CompositesListQuery = {
  response: CompositesListQuery$data;
  variables: CompositesListQuery$variables;
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "compositeID",
        "storageKey": null
      },
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
    "name": "CompositesListQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CompositesListQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "1bfd25a32cf02fbebdbf3d3a4262e2da",
    "id": null,
    "metadata": {},
    "name": "CompositesListQuery",
    "operationKind": "query",
    "text": "query CompositesListQuery {\n  composites {\n    id\n    compositeID\n    description\n    enable\n    enableMutations\n    enableSubscriptions\n    models {\n      id\n      streamID\n      name\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0f98b46768283da6f5c7653d21088159";

export default node;
