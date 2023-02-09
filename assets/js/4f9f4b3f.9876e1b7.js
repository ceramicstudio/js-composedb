"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8789],{4852:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var o=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),d=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=d(e.components);return o.createElement(s.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=a,h=u["".concat(s,".").concat(m)]||u[m]||p[m]||i;return n?o.createElement(h,r(r({ref:t},c),{},{components:n})):o.createElement(h,r({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,r[1]=l;for(var d=2;d<i;d++)r[d]=n[d];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5452:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var o=n(1504),a=(n(9231),n(4852));const i={},r="Queries",l={unversionedId:"guides/data-interactions/queries",id:"guides/data-interactions/queries",title:"Queries",description:"Access data stored on the network.",source:"@site/docs/guides/data-interactions/queries.mdx",sourceDirName:"guides/data-interactions",slug:"/guides/data-interactions/queries",permalink:"/docs/preview/guides/data-interactions/queries",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"guides",previous:{title:"Data Interactions",permalink:"/docs/preview/guides/data-interactions/"},next:{title:"Mutations",permalink:"/docs/preview/guides/data-interactions/mutations"}},s={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Basic queries",id:"basic-queries",level:2},{value:"Querying relations",id:"querying-relations",level:2},{value:"Model to model relations",id:"model-to-model-relations",level:3},{value:"Account-to-Model",id:"account-to-model",level:3},{value:"Model-to-Account",id:"model-to-account",level:3},{value:"Things to Know",id:"things-to-know",level:2},{value:"CeramicAccount Object",id:"ceramicaccount-object",level:3},{value:"Query Object",id:"query-object",level:3},{value:"Next Steps",id:"next-steps",level:2},{value:"Related Guides",id:"related-guides",level:2}],c={toc:d},u="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"queries"},"Queries"),(0,a.kt)("p",null,"Access data stored on the network."),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Before your node can index your models, you need to deploy your composite."),(0,a.kt)("li",{parentName:"ul"},"Before your client can perform queries on those models, you need to ",(0,a.kt)("a",{parentName:"li",href:"/docs/preview/guides/data-modeling/composites"},"compile your composite"),". ",(0,a.kt)("a",{parentName:"li",href:"/docs/preview/api/classes/client.ComposeClient"},(0,a.kt)("inlineCode",{parentName:"a"},"ComposeClient")),"\xa0automatically generates a GraphQL Schema from your compiled composite")),(0,a.kt)("h2",{id:"basic-queries"},"Basic queries"),(0,a.kt)("p",null,"For our model, let\u2019s say we have a ",(0,a.kt)("inlineCode",{parentName:"p"},"Post")," Data Model:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'# Post model\n\ntype Post @createModel(accountRelation: LIST, description: "A simple text post") {\n  author: DID! @documentAccount\n  title: String! @string(minLength: 10, maxLength: 100)\n  text: String! @string(maxLength: 500)\n}\n')),(0,a.kt)("p",null,"Now, query for posts:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"# Get first 2 posts\n\nquery{\n  postIndex(first:2){\n        edges{\n      node{\n        title\n                text\n        id\n      }\n    }\n  }\n}\n")),(0,a.kt)("p",null,"Where:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"query")," instructs GraphQL to perform a query"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"postIndex")," is a built-in binding of your runtime composite. This binding enables us to look through the indexed data for a specific model and retrieve it."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"(first: 2)")," grabs the first 2 items that are indexed.  You can also pass in ",(0,a.kt)("inlineCode",{parentName:"li"},"last: n")," to get the last ",(0,a.kt)("inlineCode",{parentName:"li"},"n")," number of items."),(0,a.kt)("li",{parentName:"ul"},"The remainder of the query is standard GraphQL to retrieve the desired fields")),(0,a.kt)("h2",{id:"querying-relations"},"Querying relations"),(0,a.kt)("p",null,"In ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/guides/data-modeling/relations"},"Relations")," you learned how to write models with relationships to other models or accounts. Here we demonstrate how to query those relations. Unlike basic queries, when querying relations allows you to specify fields in a related model to be returned as fields of the original model."),(0,a.kt)("h3",{id:"model-to-model-relations"},"Model to model relations"),(0,a.kt)("p",null,"For our models, let\u2019s say we have a ",(0,a.kt)("inlineCode",{parentName:"p"},"Post")," and we extend it by adding ",(0,a.kt)("inlineCode",{parentName:"p"},"Comments"),". "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'# Post model\n\ntype Post @createModel(accountRelation: LIST, description: "A simple text post") {\n  author: DID! @documentAccount\n  title: String! @string(minLength: 10, maxLength: 100)\n  text: String! @string(maxLength: 500)\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'# Extend post model with comment relations\n\ntype Comment @loadModel(id: "...") {\n  id\n}\n\ntype Post @loadModel(id: "kjzl6hvfrbw6c99mdfpjx1z3fue7sesgua6gsl1vu97229lq56344zu9bawnf96") {\n  comments: [Comment] @relationFrom(model: "Comment", property: "postID")\n}\n')),(0,a.kt)("p",null,"Query for comments on posts:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"# Get first 5 posts\n# Get first 5 comments per post\n\nquery {\n       postIndex(first: 5) {\n         edges {\n           node {\n             title\n             text\n             commentsCount\n             commentsIndex(first: 5) {\n               edges {\n                 node {\n                   text \n               }\n             }\n           }\n         }\n       }\n     }\n   }\n")),(0,a.kt)("h3",{id:"account-to-model"},"Account-to-Model"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"# $id references the account DID string\nquery ($id: ID!) {\n  node(id: $id) {\n    ...on CeramicAccount {\n      postConnection (first: 5) {\n        edges {\n          node {\n            id\n            title\n            text\n          }\n        }\n      }\n    }\n  }\n}\n")),(0,a.kt)("h3",{id:"model-to-account"},"Model-to-Account"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"# $id references a Post document stream ID\nquery ($id: ID!) {\n  node(id: $id) {\n    ...on Post {\n      author {\n        id\n        postConnection (first: 5) {\n          edges {\n            node {\n              id\n              title\n              text\n            }\n          }\n        }\n      }\n    }\n  }\n}\n")),(0,a.kt)("h2",{id:"things-to-know"},"Things to Know"),(0,a.kt)("p",null,"ComposeDB client automatically generates a GraphQL Schema from a compiled composite. It includes two objects: a \xa0",(0,a.kt)("inlineCode",{parentName:"p"},"CeramicAccount"),"\xa0object and a root ",(0,a.kt)("inlineCode",{parentName:"p"},"Query"),"\xa0object\xa0used as an entrypoint to access the graph."),(0,a.kt)("h3",{id:"ceramicaccount-object"},"CeramicAccount Object"),(0,a.kt)("p",null,"The\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"CeramicAccount"),"\xa0object replaces\xa0",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/api/sdl/scalars#did"},(0,a.kt)("inlineCode",{parentName:"a"},"DID"),"\xa0scalars"),"\xa0in your composite with the following fields:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"id: ID!"),": the DID string value"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"isViewer: Boolean!"),": whether the account authenticated to the Ceramic instance matches the\xa0",(0,a.kt)("inlineCode",{parentName:"li"},"id")),(0,a.kt)("li",{parentName:"ul"},"Other fields will be generated based on the models present in the definition")),(0,a.kt)("h3",{id:"query-object"},"Query Object"),(0,a.kt)("p",null,"The\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"Query"),"\xa0object provides entrypoints for accessing data in the graph, using the following fields:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"node(id: ID!): Node"),": loads any\xa0",(0,a.kt)("inlineCode",{parentName:"li"},"Node"),"\xa0(account or document) by its\xa0",(0,a.kt)("inlineCode",{parentName:"li"},"id")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"viewer: CeramicAccount"),": the account attached to the Ceramic instance, if authenticated"),(0,a.kt)("li",{parentName:"ul"},"Other fields will be generated based on the models present in the definition, providing entry-points by querying the index")),(0,a.kt)("h2",{id:"next-steps"},"Next Steps"),(0,a.kt)("p",null,"Head to the next section, ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/guides/data-interactions/mutations"},(0,a.kt)("strong",{parentName:"a"},"Mutations")),", to learn how to write or modify data on the network. "),(0,a.kt)("h2",{id:"related-guides"},"Related Guides"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"For additional context on the types of account and model relations, see the ",(0,a.kt)("a",{parentName:"li",href:"/docs/preview/guides/data-modeling/relations"},(0,a.kt)("strong",{parentName:"a"},"Relations"))," guide"),(0,a.kt)("li",{parentName:"ul"},"To learn how to compile and deploy a composite, see ",(0,a.kt)("a",{parentName:"li",href:"/docs/preview/guides/data-modeling/composites"},(0,a.kt)("strong",{parentName:"a"},"Composites")))))}p.isMDXComponent=!0}}]);