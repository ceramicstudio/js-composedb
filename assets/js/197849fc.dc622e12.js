"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2825],{4852:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var a=n(9231);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,g=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(g,r(r({ref:t},c),{},{components:n})):a.createElement(g,r({ref:t},c))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:i,r[1]=l;for(var p=2;p<o;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},816:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(5527),i=(n(9231),n(4852));const o={},r="Runtime Schema",l={unversionedId:"api/runtime/schema",id:"api/runtime/schema",title:"Runtime Schema",description:"ComposeDB automatically generates the runtime GraphQL schema used by applications to interact with their composites.",source:"@site/docs/api/runtime/schema.mdx",sourceDirName:"api/runtime",slug:"/api/runtime/schema",permalink:"/docs/preview/api/runtime/schema",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Supported directives",permalink:"/docs/preview/api/sdl/directives"}},s={},p=[{value:"Objects",id:"objects",level:2},{value:"Document objects",id:"document-objects",level:3},{value:"Embedded objects",id:"embedded-objects",level:3},{value:"<code>CeramicAccount</code> object",id:"ceramicaccount-object",level:3},{value:"<code>Query</code> object",id:"query-object",level:3},{value:"Connections",id:"connections",level:2},{value:"Interfaces",id:"interfaces",level:2},{value:"Inputs",id:"inputs",level:2},{value:"Filtering",id:"filtering",level:3},{value:"Value conditions",id:"value-conditions",level:4},{value:"Logical conditions",id:"logical-conditions",level:4},{value:"Sorting",id:"sorting",level:3},{value:"Document creation",id:"document-creation",level:3},{value:"Document update",id:"document-update",level:3}],c={toc:p},d="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"runtime-schema"},"Runtime Schema"),(0,i.kt)("p",null,"ComposeDB automatically generates the runtime GraphQL schema used by applications to interact with their composites."),(0,i.kt)("h2",{id:"objects"},"Objects"),(0,i.kt)("h3",{id:"document-objects"},"Document objects"),(0,i.kt)("p",null,"Documents are uniquely identifiable objects in the graph using ",(0,i.kt)("a",{parentName:"p",href:"https://graphql.org/learn/global-object-identification/"},"GraphQL's Global Object Identification")," specification with the ",(0,i.kt)("inlineCode",{parentName:"p"},"Node")," interface. All document objects contain an ",(0,i.kt)("inlineCode",{parentName:"p"},"id: ID!")," field representing their unique stream ID."),(0,i.kt)("p",null,"The other fields present in document objects are generated based on the ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/writing-models"},"model's definition")," and possibly added ",(0,i.kt)("a",{parentName:"p",href:"/docs/preview/api/sdl/directives#views"},"views"),"."),(0,i.kt)("p",null,"For example, using the following ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas"},"Schema definition"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'enum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post @createModel(accountRelation: LIST, description: "A simple post") {\n  author: DID! @documentAccount\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String! @string(minLength: 5, maxLength: 100)\n  text: String! @string(minLength: 5, maxLength: 10000)\n}\n')),(0,i.kt)("p",null,"This runtime schema will be generated:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"# \u2139\ufe0f Some types are omitted in this example for brevity\n\ntype CeramicAccount implements Node {\n  # Default fields always present on the CeramicAccount object\n  id: ID!\n  isViewer: Boolean!\n  # Added connection to Post documents controlled by the account\n  postList: PostConnection\n}\n\nenum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post implements Node {\n  # The ID field representing the document stream ID is always added to document objects\n  id: ID!\n  # DID scalar field converted to CeramicAccount object\n  author: CeramicAccount!\n  # Other fields defined in the schema\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String!\n  text: String!\n}\n\ntype PostConnection {\n  edges: [PostEdge]\n  pageInfo: PageInfo\n}\n\ntype PostEdge {\n  cursor: String\n  node: Post\n}\n")),(0,i.kt)("h3",{id:"embedded-objects"},"Embedded objects"),(0,i.kt)("p",null,"Embedded objects can only be accessed from the document storing them."),(0,i.kt)("p",null,"Example ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas"},"Schema definition"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'type ImageSource {\n  src: URI!\n  alt: String! @string(minLength: 5, maxLength: 100)\n  width: Int\n  height: Int\n}\n\ntype ImageMetadata {\n  original: ImageSource!\n  alternatives: [ImageSource!]!\n}\n\ntype Profile @createModel(accountRelation: SINGLE, description: "A basic profile") {\n  displayName: String! @string(minLength: 5, maxLength: 100)\n  avatar: ImageMetadata\n}\n\ntype Post @createModel(accountRelation: LIST, description: "A simple post") {\n  title: String! @string(minLength: 5, maxLength: 100)\n  cover: ImageMetadata\n}\n')),(0,i.kt)("p",null,"This runtime schema will be generated:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"# \u2139\ufe0f Some types are omitted in this example for brevity\n\ntype PostImageMetadata {\n  original: PostImageSource!\n  alternatives: [PostImageSource!]!\n}\n\ntype PostImageSource {\n  src: URI!\n  alt: String!\n  width: Int\n  height: Int\n}\n\ntype Post implements Node {\n  id: ID!\n  title: String!\n  cover: PostImageMetadata\n}\n\ntype ProfileImageMetadata {\n  original: ProfileImageSource!\n  alternatives: [ProfileImageSource!]!\n}\n\ntype ProfileImageSource {\n  src: URI!\n  alt: String!\n  width: Int\n  height: Int\n}\n\ntype Profile implements Node {\n  id: ID!\n  displayName: String!\n  avatar: ProfileImageMetadata\n}\n")),(0,i.kt)("p",null,"In the runtime schema above, the ",(0,i.kt)("inlineCode",{parentName:"p"},"ImageMetadata")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"ImageSources")," objects from the schema definition are generated as ",(0,i.kt)("inlineCode",{parentName:"p"},"PostImageMetadata"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"PostImageSources"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"ProfileImageMetadata")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"ProfileImageSources")," to avoid naming conflicts between embedded objects."),(0,i.kt)("p",null,"Using the ",(0,i.kt)("a",{parentName:"p",href:"/docs/preview/api/classes/devtools.Composite#setcommonembeds"},(0,i.kt)("inlineCode",{parentName:"a"},"setCommomEmbeds()")," method of the ",(0,i.kt)("inlineCode",{parentName:"a"},"Composite")," class"),", it is possible to specify that embedded objects can be safely shared by multiple documents, generating the following runtime schema:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"# \u2139\ufe0f Some types are omitted in this example for brevity\n\ntype ImageMetadata {\n  original: ImageSource!\n  alternatives: [ImageSource!]!\n}\n\ntype ImageSource {\n  src: URI!\n  alt: String!\n  width: Int\n  height: Int\n}\n\ntype Post implements Node {\n  id: ID!\n  title: String!\n  cover: ImageMetadata\n}\n\ntype Profile implements Node {\n  id: ID!\n  displayName: String!\n  avatar: ImageMetadata\n}\n")),(0,i.kt)("h3",{id:"ceramicaccount-object"},(0,i.kt)("inlineCode",{parentName:"h3"},"CeramicAccount")," object"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"CeramicAccount")," object is generated to represent any DID and its associated documents in the network."),(0,i.kt)("p",null,"Similar to ",(0,i.kt)("a",{parentName:"p",href:"#document-objects"},"Document objects"),", all ",(0,i.kt)("inlineCode",{parentName:"p"},"CeramicAccount")," objects are uniquely identifiable objects in the graph using ",(0,i.kt)("a",{parentName:"p",href:"https://graphql.org/learn/global-object-identification/"},"GraphQL's Global Object Identification")," specification with the ",(0,i.kt)("inlineCode",{parentName:"p"},"Node")," interface, with their ",(0,i.kt)("inlineCode",{parentName:"p"},"id: ID!")," field representing their unique DID string."),(0,i.kt)("p",null,"In addition to the ",(0,i.kt)("inlineCode",{parentName:"p"},"id: ID!")," field, the ",(0,i.kt)("inlineCode",{parentName:"p"},"isViewer: Boolean!")," field representing whether the account is the viewer associated to the ComposeDB client are always present, while other fields are generated based on the models present in the composite."),(0,i.kt)("p",null,"Relations to all documents controlled by the given DID for the models present in the composite are automatically generated, while relations from documents using a ",(0,i.kt)("inlineCode",{parentName:"p"},"DID")," scalar field can be explicitly added using the ",(0,i.kt)("a",{parentName:"p",href:"/docs/preview/api/sdl/directives#accountreference"},(0,i.kt)("inlineCode",{parentName:"a"},"@accountReference")," directive"),"."),(0,i.kt)("p",null,"Example ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas"},"Schema definition"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'type Profile @createModel(accountRelation: SINGLE, description: "A basic profile") {\n  displayName: String! @string(minLength: 5, maxLength: 100)\n}\n\ntype Meeting @createModel(accountRelation: LIST, description: "Meeting event") {\n  # @documentAccount represents the account controlling the document\n  self: DID! @documentAccount\n  # @accountReference signals the field needs to be indexed and queryable on the CeramicAccount object\n  other: DID! @accountReference\n  date: Date\n}\n')),(0,i.kt)("p",null,"This runtime schema will be generated:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'# \u2139\ufe0f Some types are omitted in this example for brevity\n\ntype CeramicAccount implements Node {\n  # The following fields are always present\n  id: ID!\n  isViewer: Boolean!\n  # The Meeting relation is a connection because the Meeting account relation is LIST\n  # The meetingList connection allows to access all the Meeting documents controlled by the account\n  meetingList: MeetingConnection\n  meetingListCount: Int!\n  # The otherOfMeetingList connection allows to access all the Meeting documents where the account DID is set as the value of the "other" field\n  otherOfMeetingList: MeetingConnection\n  otherOfMeetingListCount: Int!\n  # The Profile relation is a single object because the Profile account relation is SINGLE\n  profile: Profile\n}\n\ntype Meeting implements Node {\n  id: ID!\n  # DID scalars are turned into CeramicAccount objects so their relations can be accessed\n  self: CeramicAccount!\n  other: CeramicAccount!\n  date: Date\n}\n\ntype MeetingConnection {\n  edges: [MeetingEdge]\n  pageInfo: PageInfo\n}\n\ntype MeetingEdge {\n  cursor: String\n  node: Meeting\n}\n\ntype Profile implements Node {\n  id: ID!\n  displayName: String!\n}\n')),(0,i.kt)("h3",{id:"query-object"},(0,i.kt)("inlineCode",{parentName:"h3"},"Query")," object"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Query")," object represents the root object to perform GraphQL queries, it always contains the following two fields:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"node(id: ID!): Node"),": allowing to access any ",(0,i.kt)("a",{parentName:"li",href:"#document-objects"},"Document object")," or ",(0,i.kt)("a",{parentName:"li",href:"#ceramicaccount-object"},"DID account")," using the ",(0,i.kt)("a",{parentName:"li",href:"https://graphql.org/learn/global-object-identification/#node-interface"},"GraphQL's ",(0,i.kt)("inlineCode",{parentName:"a"},"Node")," interface"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"viewer: CeramicAccount"),": allowing to access the ",(0,i.kt)("a",{parentName:"li",href:"#ceramicaccount-object"},(0,i.kt)("inlineCode",{parentName:"a"},"CeramicAccount")," object")," for the DID associated to the ComposeDB client, if set.")),(0,i.kt)("p",null,"In addition to these fields, the ComposeDB runtime will generate connections for all models defined in the composite."),(0,i.kt)("p",null,"Example ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas"},"Schema definition"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'type Profile @createModel(accountRelation: SINGLE, description: "A basic profile") {\n  displayName: String! @string(minLength: 5, maxLength: 100)\n}\n\ntype Post @createModel(accountRelation: LIST, description: "A simple post") {\n  text: String! @string(minLength: 5, maxLength: 100)\n}\n')),(0,i.kt)("p",null,"This runtime schema will be generated:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"# \u2139\ufe0f Some types are omitted in this example for brevity\n\ntype Query {\n  node(id: ID!): Node\n  viewer: CeramicAccount\n  # \u2139\ufe0f Connection arguments are omitted in this example for brevity\n  postIndex: PostConnection\n  postCount: Int!\n  profileIndex: ProfileConnection\n  profileCount: Int!\n}\n\ntype CeramicAccount implements Node {\n  id: ID!\n  isViewer: Boolean!\n  postList: PostConnection\n  postListCount: Int!\n  profile: Profile\n}\n\ntype Post implements Node {\n  id: ID!\n  text: String!\n}\n\ntype PostConnection {\n  edges: [PostEdge]\n  pageInfo: PageInfo\n}\n\ntype PostEdge {\n  cursor: String\n  node: Post\n}\n\ntype Profile implements Node {\n  id: ID!\n  displayName: String!\n}\n\ntype ProfileConnection {\n  edges: [ProfileEdge]\n  pageInfo: PageInfo\n}\n\ntype ProfileEdge {\n  cursor: String\n  node: Profile\n}\n")),(0,i.kt)("h2",{id:"connections"},"Connections"),(0,i.kt)("p",null,"ComposeDB implements ",(0,i.kt)("a",{parentName:"p",href:"https://relay.dev/graphql/connections.htm"},"Relay's Connection specification")," to represent one-to-many relationships between nodes (",(0,i.kt)("a",{parentName:"p",href:"#document-objects"},"Document objects")," and ",(0,i.kt)("a",{parentName:"p",href:"#ceramicaccount-object"},"DID accounts"),") in the graph."),(0,i.kt)("p",null,"Connection objects are generated for all models in the composite, supporting the ",(0,i.kt)("a",{parentName:"p",href:"https://relay.dev/graphql/connections.htm#sec-Arguments"},"Connection arguments")," and possibly additional arguments for ",(0,i.kt)("a",{parentName:"p",href:"#filtering"},"filtering")," and ",(0,i.kt)("a",{parentName:"p",href:"#sorting"},"sorting")," the associated documents."),(0,i.kt)("h2",{id:"interfaces"},"Interfaces"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://graphql.org/learn/schema/#interfaces"},"GraphQL interfaces")," are generated for all interface models present in a composite, along with entry points on the ",(0,i.kt)("a",{parentName:"p",href:"#query-object"},(0,i.kt)("inlineCode",{parentName:"a"},"Query")," object")," and related ",(0,i.kt)("a",{parentName:"p",href:"#inputs"},"inputs"),". Querying these entry points returns documents for all the models implementing the given interface that are indexed by the Ceramic node."),(0,i.kt)("admonition",{title:"Indices creation",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Inputs for ",(0,i.kt)("a",{parentName:"p",href:"#filtering"},"filtering")," and ",(0,i.kt)("a",{parentName:"p",href:"#sorting"},"sorting")," are generated for all fields of the interface regardless of the created indices. When querying using these fields, the expected indices should have been ",(0,i.kt)("a",{parentName:"p",href:"/docs/preview/api/sdl/directives#indexing"},"created on the matching models")," first.")),(0,i.kt)("h2",{id:"inputs"},"Inputs"),(0,i.kt)("p",null,"GraphQL differentiates objects handled in queries from objects used to perform mutations and arguments, using ",(0,i.kt)("a",{parentName:"p",href:"https://graphql.org/learn/schema/#input-types"},"input types"),"."),(0,i.kt)("p",null,"ComposeDB generates input types based on models present in the composite as described below."),(0,i.kt)("h3",{id:"filtering"},"Filtering"),(0,i.kt)("p",null,"Filtering inputs can be used as arguments to ",(0,i.kt)("a",{parentName:"p",href:"#connections"},"Connection")," queries in order to filter the documents returned by the query based on the value of fields present in the document identified using the ",(0,i.kt)("a",{parentName:"p",href:"/docs/preview/api/sdl/directives#createindex"},(0,i.kt)("inlineCode",{parentName:"a"},"@createIndex")," directive"),"."),(0,i.kt)("p",null,"Filters support two types of conditions: ",(0,i.kt)("a",{parentName:"p",href:"#value-conditions"},"value conditions")," that apply to a single field in a document and ",(0,i.kt)("a",{parentName:"p",href:"#logical-conditions"},"logical conditions")," that combine multiple conditions to create more complex filters."),(0,i.kt)("p",null,"For example, using the following ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas"},"Schema definition"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'enum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post\n  @createModel(accountRelation: LIST, description: "A simple post")\n  @createIndex(fields: [{ path: ["status"] }])\n  @createIndex(fields: [{ path: ["publicationDate"] }])\n  @createIndex(fields: [{ path: ["title"] }]) {\n  author: DID! @documentAccount\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String! @string(minLength: 5, maxLength: 100)\n  text: String! @string(minLength: 5, maxLength: 10000)\n}\n')),(0,i.kt)("p",null,"This runtime schema will be generated:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"# \u2139\ufe0f Some types are omitted in this example for brevity\n\nenum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post implements Node {\n  id: ID!\n  author: CeramicAccount!\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String!\n  text: String!\n}\n\ntype PostConnection {\n  edges: [PostEdge]\n  pageInfo: PageInfo\n}\n\ntype PostEdge {\n  cursor: String\n  node: Post\n}\n\n# High-level filter conditions for Post documents\ninput PostFiltersInput {\n  where: PostObjectFilterInput\n  and: [PostFiltersInput!]\n  or: [PostFiltersInput!]\n  not: PostFiltersInput\n}\n\n# Filter conditions for fields in Post documents\ninput PostObjectFilterInput {\n  status: PostStatusValueFilterInput\n  publicationDate: StringValueFilterInput\n  title: StringValueFilterInput\n}\n\n# Generated value filter for the PostStatus enum\ninput PostStatusValueFilterInput {\n  isNull: Boolean\n  equalTo: PostStatus\n  notEqualTo: PostStatus\n  in: [PostStatus!]\n  notIn: [PostStatus!]\n}\n\n# Generic string value filter\ninput StringValueFilterInput {\n  isNull: Boolean\n  equalTo: String\n  notEqualTo: String\n  in: [String!]\n  notIn: [String!]\n  lessThan: String\n  lessThanOrEqualTo: String\n  greaterThan: String\n  greaterThanOrEqualTo: String\n}\n\ntype Query {\n  node(id: ID!): Node\n  viewer: CeramicAccount\n  # \u2139\ufe0f Other connection arguments are omitted in this example for brevity\n  postIndex(filters: PostFiltersInput): PostConnection\n}\n")),(0,i.kt)("h4",{id:"value-conditions"},"Value conditions"),(0,i.kt)("p",null,"Value conditions apply to the value of a single field in a document. They are generated based on the value type (such as ",(0,i.kt)("inlineCode",{parentName:"p"},"Boolean"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"String"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Float"),"...), with different value types supporting different conditions."),(0,i.kt)("p",null,"The following table describes all the available conditions and the matching SQL statement, where ",(0,i.kt)("inlineCode",{parentName:"p"},"(value)")," is used as a placeholder for a single value and ",(0,i.kt)("inlineCode",{parentName:"p"},"...values")," for a list of values:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"GraphQL input"),(0,i.kt)("th",{parentName:"tr",align:null},"Generated SQL"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"isNull: ",(0,i.kt)("inlineCode",{parentName:"td"},"Boolean")),(0,i.kt)("td",{parentName:"tr",align:null},"IS NULL / IS NOT NULL")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"equalTo: ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)")),(0,i.kt)("td",{parentName:"tr",align:null},"= ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"notEqualTo: ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)")),(0,i.kt)("td",{parentName:"tr",align:null},"!= ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"in: ",(0,i.kt)("inlineCode",{parentName:"td"},"[...values]")),(0,i.kt)("td",{parentName:"tr",align:null},"IN (",(0,i.kt)("inlineCode",{parentName:"td"},"...values"),")")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"notIn: ",(0,i.kt)("inlineCode",{parentName:"td"},"[...values]")),(0,i.kt)("td",{parentName:"tr",align:null},"NOT IN (",(0,i.kt)("inlineCode",{parentName:"td"},"...values"),")")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"lessThan: ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)")),(0,i.kt)("td",{parentName:"tr",align:null},"< ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"lessThanOrEqualTo: ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)")),(0,i.kt)("td",{parentName:"tr",align:null},"<= ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"greaterThan: ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)")),(0,i.kt)("td",{parentName:"tr",align:null},"> ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"greaterThanOrEqualTo: ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)")),(0,i.kt)("td",{parentName:"tr",align:null},">= ",(0,i.kt)("inlineCode",{parentName:"td"},"(value)"))))),(0,i.kt)("p",null,"Even though the generated GraphQL input types support multiple condition fields, ",(0,i.kt)("strong",{parentName:"p"},"ComposeDB does not support ambiguous conditions"),"."),(0,i.kt)("p",null,"In most cases, only a single condition can be present in the input. The exception is when using the ",(0,i.kt)("inlineCode",{parentName:"p"},"lessThan"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"lessThanOrEqualTo"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"greaterThan")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"greaterThanOrEqualTo")," where two matching boundaries can be set together, as in the examples below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u274c Invalid input with two conditions making the filter ambiguous\n{ "isNull": true, "equalTo": "test" }\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u2705 Valid input with a single condition\n{ "isNull": true }\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u2705 Valid input with a single condition\n{ "equalTo": "test" }\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u2705 Valid input with range conditions\n{ "greaterThan": 5, "lessThanOrEqualTo": 10 }\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u274c Invalid input with ambiguous conditions\n{ "greaterThan": 5, "greaterThanOrEqualTo": 10 }\n')),(0,i.kt)("h4",{id:"logical-conditions"},"Logical conditions"),(0,i.kt)("p",null,"Beyond using the ",(0,i.kt)("inlineCode",{parentName:"p"},"where")," keyword to match object fields with ",(0,i.kt)("a",{parentName:"p",href:"#value-conditions"},"value conditions"),", the ",(0,i.kt)("inlineCode",{parentName:"p"},"and"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"or")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"not")," keywords can be used to create more complex conditions, for example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u2705 Valid input with conditions on multiple fields\n{\n  "where": {\n    "status": { "notEqualTo": "DRAFT" },\n    "publicationDate": { "greaterThanOrEqualTo": "2023-07-01", "lessThan": "2023-08-01" }\n  }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u2705 Valid input with nested logical filters\n{\n  "or": [\n    {\n      "where": {\n        "status": { "equalTo": "PUBLISHED" }\n      }\n    },\n    {\n      "not": {\n        "where": {\n          "publicationDate": { "greaterThanOrEqualTo": "2023-07-01" }\n        }\n      }\n    }\n  ]\n}\n')),(0,i.kt)("p",null,"Only one key/value pair can be provided per object, filters such as the following are not supported:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u274c Invalid input with multiple keys, see previous example for correct syntax\n{\n  "not": {\n    "where": {\n      "publicationDate": { "greaterThanOrEqualTo": "2023-07-01" }\n    }\n  },\n  "or": [\n    {\n      "where": {\n        "status": { "equalTo": "PUBLISHED" }\n      }\n    }\n  ]\n}\n')),(0,i.kt)("h3",{id:"sorting"},"Sorting"),(0,i.kt)("p",null,"Similar to ",(0,i.kt)("a",{parentName:"p",href:"#filtering"},"filtering inputs"),", sorting inputs can be used as arguments to ",(0,i.kt)("a",{parentName:"p",href:"#connections"},"Connection")," queries in order to order the documents returned by the query based on the value of fields present in the document identified using the ",(0,i.kt)("a",{parentName:"p",href:"/docs/preview/api/sdl/directives#createindex"},(0,i.kt)("inlineCode",{parentName:"a"},"@createIndex")," directive"),"."),(0,i.kt)("p",null,"For example, using the following ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas"},"Schema definition"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'enum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post\n  @createModel(accountRelation: LIST, description: "A simple post")\n  @createIndex(fields: [{ path: ["status"] }])\n  @createIndex(fields: [{ path: ["publicationDate"] }]) {\n  author: DID! @documentAccount\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String! @string(minLength: 5, maxLength: 100)\n  text: String! @string(minLength: 5, maxLength: 10000)\n}\n')),(0,i.kt)("p",null,"This runtime schema will be generated:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"# \u2139\ufe0f Some types are omitted in this example for brevity\n\nenum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post implements Node {\n  id: ID!\n  author: CeramicAccount!\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String!\n  text: String!\n}\n\ntype PostConnection {\n  edges: [PostEdge]\n  pageInfo: PageInfo\n}\n\ntype PostEdge {\n  cursor: String\n  node: Post\n}\n\ninput PostSortingInput {\n  status: SortOrder\n  publicationDate: SortOrder\n}\n\nenum SortOrder {\n  ASC\n  DESC\n}\n\ntype Query {\n  node(id: ID!): Node\n  viewer: CeramicAccount\n  # \u2139\ufe0f Other connection arguments are omitted in this example for brevity\n  postIndex(sorting: PostSortingInput): PostConnection\n}\n")),(0,i.kt)("p",null,"Multiple fields can be set in the ",(0,i.kt)("inlineCode",{parentName:"p"},"sorting")," input, for example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// \u2705 Valid input with multiple fields\n{ "publicationDate": "DESC", "title": "ASC" }\n')),(0,i.kt)("h3",{id:"document-creation"},"Document creation"),(0,i.kt)("p",null,"Document creation uses two input objects: one for the content fields and another one wrapping it."),(0,i.kt)("p",null,"For example, using the following ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas"},"Schema definition"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'enum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post @createModel(accountRelation: LIST, description: "A simple post") {\n  author: DID! @documentAccount\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String! @string(minLength: 5, maxLength: 100)\n  text: String! @string(minLength: 5, maxLength: 10000)\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"# \u2139\ufe0f Some types are omitted in this example for brevity\n\nenum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post implements Node {\n  id: ID!\n  author: CeramicAccount!\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String!\n  text: String!\n}\n\n# Post input based on content fields\ninput PostInput {\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String!\n  text: String!\n}\n\n# High-level input type\ninput CreatePostInput {\n  content: PostInput!\n  clientMutationId: String\n}\n\ntype Mutation {\n  createPost(input: CreatePostInput!): CreatePostPayload\n}\n")),(0,i.kt)("h3",{id:"document-update"},"Document update"),(0,i.kt)("p",null,"Similart to document creation, document update uses two input objects for the content fields and another one wrapping it, as well as an options object."),(0,i.kt)("p",null,"For example, using the following ",(0,i.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas"},"Schema definition"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'enum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post @createModel(accountRelation: LIST, description: "A simple post") {\n  author: DID! @documentAccount\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String! @string(minLength: 5, maxLength: 100)\n  text: String! @string(minLength: 5, maxLength: 10000)\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"# \u2139\ufe0f Some types are omitted in this example for brevity\n\nenum PostStatus {\n  ARCHIVED\n  DRAFT\n  PUBLISHED\n}\n\ntype Post implements Node {\n  id: ID!\n  author: CeramicAccount!\n  status: PostStatus!\n  publicationDate: DateTime\n  title: String!\n  text: String!\n}\n\n# Partial Post input with all content fields set as optional\ninput PartialPostInput {\n  status: PostStatus\n  publicationDate: DateTime\n  title: String\n  text: String\n}\n\n# Generic input for update options\ninput UpdateOptionsInput {\n  # Set to `true` to replace existing contents rather than doing a shallow merge (default)\n  replace: Boolean = false\n  # Expected current version of the document, mutation fails if there is a mismatch\n  version: CeramicCommitID\n}\n\n# High-level input type\ninput UpdatePostInput {\n  # ID of the document to update\n  id: ID!\n  content: PartialPostInput!\n  options: UpdateOptionsInput\n  clientMutationId: String\n}\n\ntype Mutation {\n  updatePost(input: UpdatePostInput!): UpdatePostPayload\n}\n")))}u.isMDXComponent=!0}}]);