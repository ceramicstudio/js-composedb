"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1429],{4852:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var r=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},d="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,h=d["".concat(c,".").concat(m)]||d[m]||l[m]||o;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[d]="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2412:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var r=n(644),a=(n(9231),n(4852));const o={},i="Graph",s={unversionedId:"graph-structure",id:"version-0.4.x/graph-structure",title:"Graph",description:"ComposeDB provides a\xa0graph structure\xa0for interacting with data on\xa0Ceramic. The ComposeDB content graph supports two types of nodes:\xa0accounts\xa0that are able to able to create & edit data in the graph, and\xa0documents\xa0containing mutable data of a given shape.",source:"@site/versioned_docs/version-0.4.x/graph-structure.mdx",sourceDirName:".",slug:"/graph-structure",permalink:"/docs/0.4.x/graph-structure",draft:!1,tags:[],version:"0.4.x",frontMatter:{},sidebar:"docs",previous:{title:"Core Concepts",permalink:"/docs/0.4.x/core-concepts"},next:{title:"Models",permalink:"/docs/0.4.x/data-modeling-concepts"}},c={},p=[{value:"Accounts",id:"accounts",level:2},{value:"Documents",id:"documents",level:2}],u={toc:p},d="wrapper";function l(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"graph"},"Graph"),(0,a.kt)("p",null,"ComposeDB provides a\xa0",(0,a.kt)("strong",{parentName:"p"},"graph structure"),"\xa0for interacting with data on\xa0",(0,a.kt)("a",{parentName:"p",href:"https://ceramic.network/"},"Ceramic"),". The ComposeDB content graph supports two types of nodes:\xa0",(0,a.kt)("strong",{parentName:"p"},"accounts"),"\xa0that are able to able to create & edit data in the graph, and\xa0",(0,a.kt)("strong",{parentName:"p"},"documents"),"\xa0containing mutable data of a given shape."),(0,a.kt)("p",null,"The\xa0",(0,a.kt)("strong",{parentName:"p"},"nodes"),"\xa0in the graph can be\xa0",(0,a.kt)("strong",{parentName:"p"},"accounts"),"\xa0or\xa0",(0,a.kt)("strong",{parentName:"p"},"documents"),", while the\xa0",(0,a.kt)("strong",{parentName:"p"},"edges"),"\xa0in the graph represent relations between\xa0",(0,a.kt)("strong",{parentName:"p"},"nodes"),". All nodes in the ComposeDB graph use a globally unique identifier, allowing direct access to any known node."),(0,a.kt)("p",null,"ComposeDB is is designed similar to a property graph database."),(0,a.kt)("h2",{id:"accounts"},"Accounts"),(0,a.kt)("p",null,"Ceramic uses\xa0",(0,a.kt)("a",{parentName:"p",href:"https://w3c.github.io/did-core/"},"Decentralized Identifiers (DIDs)"),"\xa0for ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/composedb-client/user-sessions"},"Authentication"),", which get translated to\xa0",(0,a.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-interactions/queries#ceramicaccount-object"},(0,a.kt)("inlineCode",{parentName:"a"},"CeramicAccount"),"\xa0objects"),"\xa0by the ComposeDB client."),(0,a.kt)("p",null,"DIDs can represent any entity that is able to write data on Ceramic and therefore in ComposeDB, which can be end-users of an application, groups, applications or any kind of authenticated service."),(0,a.kt)("p",null,"In order to write or ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-interactions/mutations"},"mutate data"),"\xa0 within ComposeDB, a DID must be authorized within the client instance."),(0,a.kt)("h2",{id:"documents"},"Documents"),(0,a.kt)("p",null,"Documents are\xa0",(0,a.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/learn/advanced/overview/#streams"},"Ceramic streams"),"\xa0that store structured data as defined by a\xa0",(0,a.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-modeling/introduction-to-modeling"},"model"),"."),(0,a.kt)("p",null,"Ceramic nodes can be configured to index specific models, storing all the documents using a model in a local database in order to provide fast access and query capabilities."),(0,a.kt)("p",null,"Using\xa0",(0,a.kt)("a",{parentName:"p",href:"https://graphql.org/"},"GraphQL"),", the ComposeDB client allows to query documents indexed by a Ceramic node, as well as creating new documents and updating existing ones when ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-interactions/mutations"},"mutations")," are enabled."))}l.isMDXComponent=!0}}]);