/**
 * @generated SignedSource<<5876c1e0fba45d05812d90179be16ccf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type EditCompositeScreenQuery$variables = {
  id: string;
};
export type EditCompositeScreenQuery$data = {
  readonly node: {
    readonly commonEmbeds?: ReadonlyArray<string>;
    readonly compositeID?: string;
    readonly description?: string | null;
    readonly id?: string;
    readonly isEnabled?: boolean;
    readonly label?: string | null;
    readonly models?: ReadonlyArray<{
      readonly content: any;
      readonly controller: string;
      readonly description: string | null;
      readonly documentsCount: number;
      readonly id: string;
      readonly indexingEnabled: boolean;
      readonly name: string;
      readonly streamID: string;
    }>;
  } | null;
};
export type EditCompositeScreenQuery = {
  response: EditCompositeScreenQuery$data;
  variables: EditCompositeScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "compositeID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isEnabled",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "commonEmbeds",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Model",
  "kind": "LinkedField",
  "name": "models",
  "plural": true,
  "selections": [
    (v2/*: any*/),
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
      "name": "controller",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
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
      "name": "documentsCount",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditCompositeScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "type": "Composite",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditCompositeScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "type": "Composite",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "55b27cae9245d08e881bfc2217b8533f",
    "id": null,
    "metadata": {},
    "name": "EditCompositeScreenQuery",
    "operationKind": "query",
    "text": "query EditCompositeScreenQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Composite {\n      id\n      compositeID\n      isEnabled\n      label\n      description\n      commonEmbeds\n      models {\n        id\n        streamID\n        controller\n        name\n        description\n        content\n        indexingEnabled\n        documentsCount\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f21c9de381130d1246985d161c86f8eb";

export default node;
