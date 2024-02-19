"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[452],{5900:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var d=i(7512),t=i(2036);const o={},c="Supported directives",s={id:"api/sdl/directives",title:"Supported directives",description:"Directives provide extra metadata when declaring scalars, lists and shapes.",source:"@site/docs/api/sdl/directives.mdx",sourceDirName:"api/sdl",slug:"/api/sdl/directives",permalink:"/docs/preview/api/sdl/directives",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Supported scalars",permalink:"/docs/preview/api/sdl/scalars"},next:{title:"Runtime Schema",permalink:"/docs/preview/api/runtime/schema"}},r={},l=[{value:"Model identification",id:"model-identification",level:2},{value:"<code>@createModel</code>",id:"createmodel",level:3},{value:"<code>@loadModel</code>",id:"loadmodel",level:3},{value:"Indexing",id:"indexing",level:2},{value:"<code>@createIndex</code>",id:"createindex",level:3},{value:"Type validation",id:"type-validation",level:2},{value:"<code>@int</code>",id:"int",level:3},{value:"<code>@float</code>",id:"float",level:3},{value:"<code>@string</code>",id:"string",level:3},{value:"<code>@list</code>",id:"list",level:3},{value:"Relations",id:"relations",level:2},{value:"<code>@accountReference</code>",id:"accountreference",level:3},{value:"<code>@documentReference</code>",id:"documentreference",level:3},{value:"Views",id:"views",level:2},{value:"Document metadata views",id:"document-metadata-views",level:2},{value:"<code>@documentAccount</code>",id:"documentaccount",level:3},{value:"<code>@documentVersion</code>",id:"documentversion",level:3},{value:"Relation views",id:"relation-views",level:2},{value:"<code>@relationDocument</code>",id:"relationdocument",level:3},{value:"<code>@relationFrom</code>",id:"relationfrom",level:3},{value:"<code>@relationCountFrom</code>",id:"relationcountfrom",level:3}];function a(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.M)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h1,{id:"supported-directives",children:"Supported directives"}),"\n",(0,d.jsx)(n.p,{children:"Directives provide extra metadata when declaring scalars, lists and shapes."}),"\n",(0,d.jsx)(n.h2,{id:"model-identification",children:"Model identification"}),"\n",(0,d.jsx)(n.h3,{id:"createmodel",children:(0,d.jsx)(n.code,{children:"@createModel"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"@createModel"})," directive applies to shapes and interfaces, indicating they\nneed to be created as a Model. A Composite must contain at least one Model to\nbe valid, otherwise there would be nothing to interact with."]}),"\n",(0,d.jsxs)(n.p,{children:["When using the ",(0,d.jsx)(n.code,{children:"@createModel"})," directive, two parameters must be provided:"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"accountRelation"}),": the type of relation between documents created using the\nModel and the account controlling the document, which can be ",(0,d.jsx)(n.code,{children:"SINGLE"})," for a\nsingle document of the given Model (for example profile information), or\n",(0,d.jsx)(n.code,{children:"LIST"})," (default) for a potentially infinite list of documents. When creating\ninterfaces, the ",(0,d.jsx)(n.code,{children:"accountRelation"})," is ignored if provided."]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"description"}),": a string describing the Model, to help with discovery."]}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-graphql",children:'type Post @createModel(accountRelation: LIST, description: "A simple text post") {\n  author: DID! @documentAccount\n  title: String! @string(minLength: 10, maxLength: 100)\n  text: String! @string(maxLength: 500)\n}\n'})}),"\n",(0,d.jsx)(n.h3,{id:"loadmodel",children:(0,d.jsx)(n.code,{children:"@loadModel"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"@loadModel"})," directive can be used to identify pre-existing models and use\nthem in a schema, by providing the model stream ID with the ",(0,d.jsx)(n.code,{children:"id"})," argument of the\ndirective."]}),"\n",(0,d.jsxs)(n.admonition,{type:"caution",children:[(0,d.jsxs)(n.p,{children:["When loading models, it is ",(0,d.jsx)(n.strong,{children:"not possible"})," to add extra content fields, but it\nis possible to add extra ",(0,d.jsx)(n.a,{href:"#views",children:"views"}),"."]}),(0,d.jsxs)(n.p,{children:["The GraphQL parser used by schemas does not allow empty types to be created. If\nneeded, an ",(0,d.jsx)(n.code,{children:"id: ID"})," field can be added, as shown in the examples below."]})]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-graphql",children:'# \u274c the following declaration will NOT work:\ntype MyModel @loadModel(id: "<existing model stream ID>") {}\n\n# \u2705 the following declaration will work:\ntype MyModel @loadModel(id: "<existing model stream ID>") {\n  id: ID\n}\n\n# \u2705 the following declaration will also work:\ntype MyModel @loadModel(id: "<existing model stream ID>") {\n  owner: DID! @documentAccount\n}\n'})}),"\n",(0,d.jsx)(n.h2,{id:"indexing",children:"Indexing"}),"\n",(0,d.jsx)(n.admonition,{type:"caution",children:(0,d.jsxs)(n.p,{children:["The indexing directive can only be set on types ",(0,d.jsx)(n.strong,{children:"defined as model"}),",\nidentified using the ",(0,d.jsx)(n.a,{href:"#createmodel",children:(0,d.jsx)(n.code,{children:"@createModel"})})," or\n",(0,d.jsx)(n.a,{href:"#loadmodel",children:(0,d.jsx)(n.code,{children:"@loadModel"})})," directive.\nThe indexing directive cannot be used when defining interfaces, as interfaces\nthemselves are not indexed, only the models implementing them."]})}),"\n",(0,d.jsx)(n.h3,{id:"createindex",children:(0,d.jsx)(n.code,{children:"@createIndex"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"@createIndex"})," directive ensures content fields in a model are indexed in the underlying database and can be used for filtering and ordering."]}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-graphql",children:'type Post\n  @createModel(accountRelation: LIST, description: "A simple text post")\n  @createIndex(fields: [{ path: ["title"] }]) {\n  author: DID! @documentAccount\n  title: String! @string(minLength: 10, maxLength: 100)\n  publishedAt: DateTime\n  text: String! @string(maxLength: 500)\n}\n'})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"@createIndex"})," directive can be used multiple times:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-graphql",children:'type Post\n  @createModel(accountRelation: LIST, description: "A simple text post")\n  @createIndex(fields: [{ path: ["title"] }])\n  @createIndex(fields: [{ path: ["publishedAt"] }]) {\n  author: DID! @documentAccount\n  title: String! @string(minLength: 10, maxLength: 100)\n  publishedAt: DateTime\n  text: String! @string(maxLength: 500)\n}\n'})}),"\n",(0,d.jsx)(n.h2,{id:"type-validation",children:"Type validation"}),"\n",(0,d.jsx)(n.p,{children:"The following directives provide validation information on primitive scalars and\nlists:"}),"\n",(0,d.jsx)(n.h3,{id:"int",children:(0,d.jsx)(n.code,{children:"@int"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines the optional ",(0,d.jsx)(n.code,{children:"max: Int"})," and ",(0,d.jsx)(n.code,{children:"min: Int"})," value for\n",(0,d.jsxs)(n.a,{href:"/docs/preview/api/sdl/scalars#int",children:[(0,d.jsx)(n.code,{children:"Int"})," scalars"]}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"float",children:(0,d.jsx)(n.code,{children:"@float"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines the optional ",(0,d.jsx)(n.code,{children:"max: Float"})," and ",(0,d.jsx)(n.code,{children:"min: Float"})," value for\n",(0,d.jsxs)(n.a,{href:"/docs/preview/api/sdl/scalars#float",children:[(0,d.jsx)(n.code,{children:"Float"})," scalars"]}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"string",children:(0,d.jsx)(n.code,{children:"@string"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines the required ",(0,d.jsx)(n.code,{children:"maxLength: Int"})," and optional ",(0,d.jsx)(n.code,{children:"minLength: Int"})," value for\n",(0,d.jsxs)(n.a,{href:"/docs/preview/api/sdl/scalars#string",children:[(0,d.jsx)(n.code,{children:"String"})," scalars"]})," and scalars extending ",(0,d.jsx)(n.code,{children:"String"}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"list",children:(0,d.jsx)(n.code,{children:"@list"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines the required ",(0,d.jsx)(n.code,{children:"maxLength: Int"})," and optional ",(0,d.jsx)(n.code,{children:"minLength: Int"})," numbers of\nitems in a list."]}),"\n",(0,d.jsx)(n.h2,{id:"relations",children:"Relations"}),"\n",(0,d.jsx)(n.p,{children:"Relations support can be added on individual fields by specifying the type of\nreference the field can contain, using the following directives:"}),"\n",(0,d.jsx)(n.admonition,{type:"caution",children:(0,d.jsxs)(n.p,{children:["Relation directives can only be set on fields ",(0,d.jsx)(n.strong,{children:"directly defined on a model"}),",\nidentified using the ",(0,d.jsx)(n.a,{href:"#createmodel",children:(0,d.jsx)(n.code,{children:"@createModel"})})," or\n",(0,d.jsx)(n.a,{href:"#loadmodel",children:(0,d.jsx)(n.code,{children:"@loadModel"})})," directive."]})}),"\n",(0,d.jsx)(n.h3,{id:"accountreference",children:(0,d.jsx)(n.code,{children:"@accountReference"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines a relation to an account, using a ",(0,d.jsxs)(n.a,{href:"/docs/preview/api/sdl/scalars#did",children:[(0,d.jsx)(n.code,{children:"DID"})," scalar"]}),", making it accessible from the ",(0,d.jsxs)(n.a,{href:"/docs/preview/api/runtime/schema#ceramicaccount-object",children:[(0,d.jsx)(n.code,{children:"CeramicAccount"})," object"]}),"."]}),"\n",(0,d.jsxs)(n.p,{children:["Example: ",(0,d.jsx)(n.code,{children:"recipient: DID! @accountReference"}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"documentreference",children:(0,d.jsx)(n.code,{children:"@documentReference"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines a relation to a document, using a\n",(0,d.jsxs)(n.a,{href:"/docs/preview/api/sdl/scalars#streamid",children:[(0,d.jsx)(n.code,{children:"StreamID"})," scalar"]})," and a ",(0,d.jsx)(n.code,{children:"model"})," argument containing the\nname of a model added in the schema using the ",(0,d.jsx)(n.a,{href:"#loadmodel",children:(0,d.jsx)(n.code,{children:"@loadModel"})}),"\ndirective or ",(0,d.jsx)(n.code,{children:"Node"})," to reference a document of any model."]}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-graphql",metastring:"{2,6}",children:'type Post @loadModel(id: "<Post model stream ID>") {\n  id: ID!\n}\n\ntype Comment @createModel(accountRelation: LIST, description: "A comment on a Post") {\n  postID: StreamID! @documentReference(model: "Post")\n  text: String! @string(maxLength: 500)\n}\n'})}),"\n",(0,d.jsx)(n.h2,{id:"views",children:"Views"}),"\n",(0,d.jsxs)(n.p,{children:["View directives represent read-only fields that are not stored in the contents\nof the stream, but in its ",(0,d.jsx)(n.a,{href:"#document-metadata-views",children:"metadata"})," or used to access\n",(0,d.jsx)(n.a,{href:"#relation-views",children:"relations"}),"."]}),"\n",(0,d.jsx)(n.admonition,{type:"caution",children:(0,d.jsxs)(n.p,{children:["View directives can only be set on fields ",(0,d.jsx)(n.strong,{children:"directly defined on a model"}),",\nidentified using the ",(0,d.jsx)(n.a,{href:"#createmodel",children:(0,d.jsx)(n.code,{children:"@createModel"})})," or\n",(0,d.jsx)(n.a,{href:"#loadmodel",children:(0,d.jsx)(n.code,{children:"@loadModel"})})," directive."]})}),"\n",(0,d.jsx)(n.h2,{id:"document-metadata-views",children:"Document metadata views"}),"\n",(0,d.jsx)(n.h3,{id:"documentaccount",children:(0,d.jsx)(n.code,{children:"@documentAccount"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines a field as being a view to the account controlling the document, using\nthe ",(0,d.jsxs)(n.a,{href:"/docs/preview/api/sdl/scalars#did",children:[(0,d.jsx)(n.code,{children:"DID"})," scalar type"]}),"."]}),"\n",(0,d.jsxs)(n.p,{children:["Example: ",(0,d.jsx)(n.code,{children:"author: DID! @documentAccount"}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"documentversion",children:(0,d.jsx)(n.code,{children:"@documentVersion"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines a field as being a view to the current version of the document, using\nthe ",(0,d.jsxs)(n.a,{href:"/docs/preview/api/sdl/scalars#commitid",children:[(0,d.jsx)(n.code,{children:"CommitID"})," scalar type"]}),"."]}),"\n",(0,d.jsxs)(n.p,{children:["Example: ",(0,d.jsx)(n.code,{children:"version: CommitID! @documentVersion"}),"."]}),"\n",(0,d.jsx)(n.h2,{id:"relation-views",children:"Relation views"}),"\n",(0,d.jsx)(n.h3,{id:"relationdocument",children:(0,d.jsx)(n.code,{children:"@relationDocument"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines a field representing another document in the graph, that have its stream\nID stored in another field of the current document, using a model identified by\nthe ",(0,d.jsx)(n.code,{children:"model"})," argument of the directive. The value ",(0,d.jsx)(n.code,{children:'"Node"'})," can be used for the\n",(0,d.jsx)(n.code,{children:"model"})," argument to accept documents using any model."]}),"\n",(0,d.jsxs)(n.p,{children:["Example where ",(0,d.jsx)(n.code,{children:"post"})," fields allows to access the post document the comment is\nmade on, based on the ",(0,d.jsx)(n.code,{children:"postID"})," value stored in the comment document:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-graphql",metastring:"{6,7}",children:'type Post @loadModel(id: "<Post model stream ID>") {\n  id: ID!\n}\n\ntype Comment @createModel(accountRelation: LIST, description: "A comment on a Post") {\n  postID: StreamID! @documentReference(model: "Post")\n  post: Post! @relationDocument(property: "postID")\n  text: String! @string(maxLength: 500)\n}\n'})}),"\n",(0,d.jsx)(n.h3,{id:"relationfrom",children:(0,d.jsx)(n.code,{children:"@relationFrom"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines a field representing an inverse relation of documents pointing to the\ncurrent document for a given ",(0,d.jsx)(n.code,{children:"model"})," and ",(0,d.jsx)(n.code,{children:"property"})," identified by the arguments\nof the directive."]}),"\n",(0,d.jsxs)(n.p,{children:["Example where a ",(0,d.jsx)(n.code,{children:"comments"})," view is added to an existing Post model, using the\nComment model described in the\n",(0,d.jsxs)(n.a,{href:"#relationdocument",children:[(0,d.jsx)(n.code,{children:"@relationDocument"})," directive example"]}),":"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-graphql",metastring:"{6}",children:'type Comment @loadModel(id: "<Comment model stream ID>") {\n  id: ID!\n}\n\ntype Post @loadModel(id: "<Post model stream ID>") {\n  comments: [Comment] @relationFrom(model: "Comment", property: "postID")\n}\n'})}),"\n",(0,d.jsx)(n.h3,{id:"relationcountfrom",children:(0,d.jsx)(n.code,{children:"@relationCountFrom"})}),"\n",(0,d.jsxs)(n.p,{children:["Defines a field representing the number of documents pointing to the current\ndocument for a given ",(0,d.jsx)(n.code,{children:"model"})," and ",(0,d.jsx)(n.code,{children:"property"})," identified by the arguments of the\ndirective."]}),"\n",(0,d.jsxs)(n.p,{children:["Example where a ",(0,d.jsx)(n.code,{children:"commentsCount"})," view is added to an existing Post model, using\nthe Comment model described in the\n",(0,d.jsxs)(n.a,{href:"#relationdocument",children:[(0,d.jsx)(n.code,{children:"@relationDocument"})," directive example"]}),":"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-graphql",metastring:"{6}",children:'type Comment @loadModel(id: "<Comment model stream ID>") {\n  id: ID!\n}\n\ntype Post @loadModel(id: "<Post model stream ID>") {\n  commentsCount: Int! @relationCountFrom(model: "Comment", property: "postID")\n}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,t.M)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(a,{...e})}):a(e)}},2036:(e,n,i)=>{i.d(n,{I:()=>s,M:()=>c});var d=i(5496);const t={},o=d.createContext(t);function c(e){const n=d.useContext(o);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),d.createElement(o.Provider,{value:n},e.children)}}}]);