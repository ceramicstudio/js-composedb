"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5611],{54852:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var r=n(49231);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(n),d=o,y=u["".concat(c,".").concat(d)]||u[d]||m[d]||a;return n?r.createElement(y,i(i({ref:t},p),{},{components:n})):r.createElement(y,i({ref:t},p))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},63325:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=n(35664),o=(n(49231),n(54852));const a={},i="Using Relay",s={unversionedId:"guides/interacting/using-relay",id:"version-0.2.x/guides/interacting/using-relay",title:"Using Relay",description:"Relay is a popular GraphQL client for React.",source:"@site/versioned_docs/version-0.2.x/guides/interacting/using-relay.md",sourceDirName:"guides/interacting",slug:"/guides/interacting/using-relay",permalink:"/docs/0.2.x/guides/interacting/using-relay",draft:!1,tags:[],version:"0.2.x",frontMatter:{},sidebar:"docs",previous:{title:"Using Apollo",permalink:"/docs/0.2.x/guides/interacting/using-apollo"}},c={},l=[],p={toc:l},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"using-relay"},"Using Relay"),(0,o.kt)("admonition",{title:"What is Relay?",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"https://relay.dev/"},"Relay")," is a popular GraphQL client for React."),(0,o.kt)("p",{parentName:"admonition"},"It is ",(0,o.kt)("strong",{parentName:"p"},"not necessary to use it")," to ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/interacting/queries"},"execute queries")," and ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/interacting/mutations"},"mutations")," on ComposeDB, but it can help simplify the developer experience for common use-cases.")),(0,o.kt)("p",null,"The ComposeDB client can be used with ",(0,o.kt)("a",{parentName:"p",href:"https://relay.dev/"},"Relay")," by creating a custom ",(0,o.kt)("a",{parentName:"p",href:"https://relay.dev/docs/guides/network-layer/"},"network layer"),", as shown in the example below:"),(0,o.kt)("p",null,"Make sure you have the ",(0,o.kt)("inlineCode",{parentName:"p"},"composedb")," packages ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/installation"},"installed"),", before running the code below. Additionally, you'll need the ",(0,o.kt)("inlineCode",{parentName:"p"},"relay-runtime")," package."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { ComposeClient } from '@composedb/client'\nimport { Environment, Network, RecordSource, Store } from 'relay-runtime'\n\n// Path to the generated runtime composite definition\nimport { definition } from './__generated__/definition.js'\n\nconst compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })\n\n// Create a custom Network using the ComposeClient instance to execute operations\nconst network = Network.create(async (request, variables) => {\n  return await client.executeQuery(request.text, variables)\n})\n\n// Use the created Network instance to create the Relay Environment\nexport const environment = new Environment({ network, store: new Store(new RecordSource()) })\n")))}m.isMDXComponent=!0}}]);