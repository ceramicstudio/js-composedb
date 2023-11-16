---
id: 'devtools'
title: 'Module: devtools'
custom_edit_url: null
---

<head>
  <meta name="robots" content="noindex" />
  <meta name="googlebot" content="noindex" />
</head>

Development tools library.

## Installation

```sh
npm install --dev @composedb/devtools
```

## Classes

- [Composite](../classes/devtools.Composite.md)

## Type Aliases

### AbstractCompositeDefinition

Ƭ **AbstractCompositeDefinition**: `Object`

#### Type declaration

| Name           | Type                                                                                   |
| :------------- | :------------------------------------------------------------------------------------- |
| `commonEmbeds` | `string`[]                                                                             |
| `models`       | `Record`\<`string`, [`AbstractModelDefinition`](devtools.md#abstractmodeldefinition)\> |

---

### AbstractCreateModelDefinition

Ƭ **AbstractCreateModelDefinition**: `Object`

#### Type declaration

| Name     | Type              |
| :------- | :---------------- |
| `action` | `"create"`        |
| `model`  | `ModelDefinition` |

---

### AbstractLoadModelDefinition

Ƭ **AbstractLoadModelDefinition**: [`ParsedLoadModelDefinition`](devtools.md#parsedloadmodeldefinition) & \{ `views`: `ModelViewsDefinition` \}

---

### AbstractModelDefinition

Ƭ **AbstractModelDefinition**: [`AbstractCreateModelDefinition`](devtools.md#abstractcreatemodeldefinition) \| [`AbstractLoadModelDefinition`](devtools.md#abstractloadmodeldefinition)

---

### AnySchema

Ƭ **AnySchema**: [`ScalarSchema`](devtools.md#scalarschema) \| `JSONSchema.Array` \| `JSONSchema.Object`

---

### CompositeInput

Ƭ **CompositeInput**: [`Composite`](../classes/devtools.Composite.md) \| [`CompositeParams`](devtools.md#compositeparams)

Supported composite input when comparing or merging composites.

---

### CompositeOptions

Ƭ **CompositeOptions**: `Object`

Supported options for merging composites.

#### Type declaration

| Name            | Type                                          | Description                                                                                                                                                                                                 |
| :-------------- | :-------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aliases?`      | `Record`\<`string`, `string`\>                | Additional Models aliases merged in the composite in addition to the ones present in the source composites.                                                                                                 |
| `commonEmbeds?` | `"all"` \| `"none"` \| `Iterable`\<`string`\> | Behavior to apply for merging common embeds: - `none` (default) will not set an common embed - `all` will merge all the common embeds found in any composite - explicit embed names to set as common embeds |
| `views?`        | `CompositeViewsDefinition`                    | Additional views merged in the composite in addition to the ones present in the source composites.                                                                                                          |

---

### CompositeParams

Ƭ **CompositeParams**: `Object`

Composite instance creation parameters.

#### Type declaration

| Name         | Type                                  | Description                                                                                                                  |
| :----------- | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `commits`    | `Record`\<`string`, `StreamCommits`\> | Model streams commits, that can be pushed to any Ceramic node to ensure the Model streams used by a composite are available. |
| `definition` | `InternalCompositeDefinition`         | Internal metadata describing the composite.                                                                                  |

---

### CreateParams

Ƭ **CreateParams**: `Object`

Composite creation parameters from a schema.

#### Type declaration

| Name      | Type         | Description                                                                                                                                                                                                    |
| :-------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ceramic` | `CeramicApi` | Ceramic instance connected to the node the new Model streams must be created on. The Ceramic instance **must have an authenticated DID attached to it** in order to create Models, using the `did:key` method. |
| `index?`  | `boolean`    | Whether to add the Models to the index or not. If `true` (default), the Ceramic instance must be authenticated with an admin DID.                                                                              |
| `schema`  | `string`     | Composite schema string.                                                                                                                                                                                       |

---

### EnumFieldDefinition

Ƭ **EnumFieldDefinition**: [`FieldCommonDefinition`](devtools.md#fieldcommondefinition) & \{ `name`: `string` ; `type`: `"enum"` \}

---

### FieldCommonDefinition

Ƭ **FieldCommonDefinition**: `Object`

#### Type declaration

| Name       | Type      |
| :--------- | :-------- |
| `required` | `boolean` |

---

### FromJSONParams

Ƭ **FromJSONParams**: `Object`

Composite creation parameters from a JSON-encoded definition.

#### Type declaration

| Name         | Type                         | Description                                                                                                                                  |
| :----------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `ceramic`    | `CeramicApi`                 | Ceramic instance connected to the node where the Model stream will be pushed.                                                                |
| `definition` | `EncodedCompositeDefinition` | JSON-encoded composite definition.                                                                                                           |
| `index?`     | `boolean`                    | Whether to add the Models to the index or not. If `true`, the Ceramic instance must be authenticated with an admin DID. Defaults to `false`. |

---

### FromModelsParams

Ƭ **FromModelsParams**: [`CompositeOptions`](devtools.md#compositeoptions) & \{ `ceramic`: `CeramicApi` ; `index?`: `boolean` ; `models`: `string`[] \}

Composite creation parameters from existing models.

---

### ItemDefinition

Ƭ **ItemDefinition**: [`ReferenceFieldDefinition`](devtools.md#referencefielddefinition) \| [`ScalarFieldDefinition`](devtools.md#scalarfielddefinition)

---

### ListFieldDefinition

Ƭ **ListFieldDefinition**: [`FieldCommonDefinition`](devtools.md#fieldcommondefinition) & \{ `item`: [`ItemDefinition`](devtools.md#itemdefinition) ; `maxLength`: `number` ; `minLength?`: `number` ; `type`: `"list"` \}

---

### ObjectDefinition

Ƭ **ObjectDefinition**: `Object`

#### Type declaration

| Name         | Type                                                           |
| :----------- | :------------------------------------------------------------- |
| `properties` | [`ObjectFieldsDefinition`](devtools.md#objectfieldsdefinition) |
| `references` | `string`[]                                                     |
| `relations`  | `ModelRelationsDefinition`                                     |

---

### ObjectFieldDefinition

Ƭ **ObjectFieldDefinition**: [`ItemDefinition`](devtools.md#itemdefinition) \| [`ListFieldDefinition`](devtools.md#listfielddefinition) \| [`ViewFieldDefinition`](devtools.md#viewfielddefinition)

---

### ObjectFieldsDefinition

Ƭ **ObjectFieldsDefinition**: `Record`\<`string`, [`ObjectFieldDefinition`](devtools.md#objectfielddefinition)\>

---

### ObjectReferenceFieldDefinition

Ƭ **ObjectReferenceFieldDefinition**: [`FieldCommonDefinition`](devtools.md#fieldcommondefinition) & \{ `name`: `string` ; `type`: `"object"` \}

---

### ParsedCreateModelDefinition

Ƭ **ParsedCreateModelDefinition**: `Object`

#### Type declaration

| Name              | Type                       |
| :---------------- | :------------------------- |
| `accountRelation` | `ModelAccountRelation`     |
| `action`          | `"create"`                 |
| `description`     | `string`                   |
| `relations`       | `ModelRelationsDefinition` |

---

### ParsedLoadModelDefinition

Ƭ **ParsedLoadModelDefinition**: `Object`

#### Type declaration

| Name     | Type     |
| :------- | :------- |
| `action` | `"load"` |
| `id`     | `string` |

---

### ParsedModelDefinition

Ƭ **ParsedModelDefinition**: [`ParsedCreateModelDefinition`](devtools.md#parsedcreatemodeldefinition) \| [`ParsedLoadModelDefinition`](devtools.md#parsedloadmodeldefinition)

---

### ReferenceFieldDefinition

Ƭ **ReferenceFieldDefinition**: [`EnumFieldDefinition`](devtools.md#enumfielddefinition) \| [`ObjectReferenceFieldDefinition`](devtools.md#objectreferencefielddefinition)

---

### ReferenceFieldType

Ƭ **ReferenceFieldType**: [`ReferenceFieldDefinition`](devtools.md#referencefielddefinition)[``"type"``]

---

### ScalarFieldDefinition

Ƭ **ScalarFieldDefinition**: [`FieldCommonDefinition`](devtools.md#fieldcommondefinition) & \{ `schema`: [`ScalarSchema`](devtools.md#scalarschema) ; `type`: `"scalar"` \}

---

### ScalarSchema

Ƭ **ScalarSchema**: `JSONSchema.Boolean` \| `JSONSchema.Integer` \| `JSONSchema.Number` \| `JSONSchema.String`

---

### SchemaDefinition

Ƭ **SchemaDefinition**: `Object`

#### Type declaration

| Name         | Type                                                                               |
| :----------- | :--------------------------------------------------------------------------------- |
| `enums`      | `Record`\<`string`, `string`[]\>                                                   |
| `interfaces` | `Record`\<`string`, [`ObjectDefinition`](devtools.md#objectdefinition)\>           |
| `models`     | `Record`\<`string`, [`ParsedModelDefinition`](devtools.md#parsedmodeldefinition)\> |
| `objects`    | `Record`\<`string`, [`ObjectDefinition`](devtools.md#objectdefinition)\>           |

---

### ViewFieldDefinition

Ƭ **ViewFieldDefinition**: [`FieldCommonDefinition`](devtools.md#fieldcommondefinition) & `RuntimeViewField`

## Functions

### createAbstractCompositeDefinition

▸ **createAbstractCompositeDefinition**(`schema`): [`AbstractCompositeDefinition`](devtools.md#abstractcompositedefinition)

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `schema` | `string` |

#### Returns

[`AbstractCompositeDefinition`](devtools.md#abstractcompositedefinition)
