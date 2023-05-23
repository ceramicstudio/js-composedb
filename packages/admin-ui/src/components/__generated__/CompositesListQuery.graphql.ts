/**
 * @generated SignedSource<<97e0deab35fca177f64dc7775358ccd6>>
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
    readonly id: string;
    readonly isEnabled: boolean;
    readonly modelsCount: number;
    readonly mutationsEnabled: boolean;
    readonly subscriptionsEnabled: boolean;
  }>;
};
export type CompositesListQuery = {
  response: CompositesListQuery$data;
  variables: CompositesListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Composite",
    "kind": "LinkedField",
    "name": "composites",
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
        "name": "compositeID",
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
        "name": "isEnabled",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mutationsEnabled",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "subscriptionsEnabled",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "modelsCount",
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
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CompositesListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6dbddb66753491d732e10636c163800e",
    "id": null,
    "metadata": {},
    "name": "CompositesListQuery",
    "operationKind": "query",
    "text": "query CompositesListQuery {\n  composites {\n    id\n    compositeID\n    description\n    isEnabled\n    mutationsEnabled\n    subscriptionsEnabled\n    modelsCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "92bbd4d1da0234fffd4cdd8e0f98db0a";

export default node;
