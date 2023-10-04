"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8666],{54852:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var r=n(49231);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),d=o,y=u["".concat(s,".").concat(d)]||u[d]||m[d]||i;return n?r.createElement(y,a(a({ref:t},p),{},{components:n})):r.createElement(y,a({ref:t},p))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},96472:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=n(35664),o=(n(49231),n(54852));const i={},a="Using Relay GraphQL Client",l={unversionedId:"guides/composedb-client/using-relay",id:"version-0.5.x/guides/composedb-client/using-relay",title:"Using Relay GraphQL Client",description:"Relay\xa0is a popular GraphQL client for React.",source:"@site/versioned_docs/version-0.5.x/guides/composedb-client/using-relay.mdx",sourceDirName:"guides/composedb-client",slug:"/guides/composedb-client/using-relay",permalink:"/docs/0.5.x/guides/composedb-client/using-relay",draft:!1,tags:[],version:"0.5.x",frontMatter:{},sidebar:"guides",previous:{title:"Using Apollo GraphQL Client",permalink:"/docs/0.5.x/guides/composedb-client/using-apollo"},next:{title:"Authenticate Users",permalink:"/docs/0.5.x/guides/composedb-client/authenticate-users"}},s={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Usage",id:"usage",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"using-relay-graphql-client"},"Using Relay GraphQL Client"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://relay.dev/"},"Relay"),"\xa0is a popular GraphQL client for React."),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Install the\xa0",(0,o.kt)("a",{parentName:"li",href:"/docs/0.5.x/set-up-your-environment"},(0,o.kt)("inlineCode",{parentName:"a"},"composedb"))," packages"),(0,o.kt)("li",{parentName:"ul"},"Install the\xa0",(0,o.kt)("inlineCode",{parentName:"li"},"relay-runtime"),"package"),(0,o.kt)("li",{parentName:"ul"},"A compiled composite")),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"The ComposeDB client can be used with\xa0Relay by creating a custom\xa0",(0,o.kt)("a",{parentName:"p",href:"https://relay.dev/docs/guides/network-layer/"},"network layer"),", as shown:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import { ComposeClient } from '@composedb/client'\nimport { Environment, Network, RecordSource, Store } from 'relay-runtime'\n\n// Path to compiled composite\nimport { definition } from './__generated__/definition.js'\n\nconst compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })\n\n// Create custom Network using ComposeClient instance to execute operations\nconst network = Network.create(async (request, variables) => {\n  return await client.executeQuery(request.text, variables)\n})\n\n// Use created Network instance to create Relay Environment\nexport const environment = new Environment({ network, store: new Store(new RecordSource()) })\n")))}m.isMDXComponent=!0}}]);