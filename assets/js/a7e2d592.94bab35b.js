"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[523],{4852:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>f});var n=r(9231);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),i=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},l=function(e){var t=i(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=i(r),m=a,f=u["".concat(c,".").concat(m)]||u[m]||d[m]||o;return r?n.createElement(f,p(p({ref:t},l),{},{components:r})):n.createElement(f,p({ref:t},l))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:a,p[1]=s;for(var i=2;i<o;i++)p[i]=r[i];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},2503:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>i});var n=r(1504),a=(r(9231),r(4852));const o={},p="Core Concepts",s={unversionedId:"core-concepts",id:"core-concepts",title:"Core Concepts",description:"Learn about the Core Concepts for ComposeDB:",source:"@site/docs/core-concepts.mdx",sourceDirName:".",slug:"/core-concepts",permalink:"/docs/preview/core-concepts",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Next Steps",permalink:"/docs/preview/next-steps"},next:{title:"Graph",permalink:"/docs/preview/graph-structure"}},c={},i=[{value:"Graph",id:"graph",level:2},{value:"Models",id:"models",level:2},{value:"Database",id:"database",level:2}],l={toc:i},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"core-concepts"},"Core Concepts"),(0,a.kt)("p",null,"Learn about the Core Concepts for ComposeDB:"),(0,a.kt)("h2",{id:"graph"},(0,a.kt)("a",{parentName:"h2",href:"/docs/preview/graph-structure"},"Graph")),(0,a.kt)("p",null,"ComposeDB provides a graph structure for interacting with data on Ceramic, with two types of nodes ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/graph-structure#accounts"},"accounts")," & ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/graph-structure#documents"},"documents"),", and edges between nodes representing relations. ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/graph-structure"},(0,a.kt)("strong",{parentName:"a"},"\u2192"))),(0,a.kt)("h2",{id:"models"},(0,a.kt)("a",{parentName:"h2",href:"/docs/preview/data-modeling-concepts"},"Models")),(0,a.kt)("p",null,"Streams of data on Ceramic are automatically tagged to Data Models, like profiles or blog posts, which in turn can have relations with other data models or be formed into groups of models called Composites. ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/data-modeling-concepts"},(0,a.kt)("strong",{parentName:"a"},"\u2192"))),(0,a.kt)("h2",{id:"database"},(0,a.kt)("a",{parentName:"h2",href:"/docs/preview/database"},"Database")),(0,a.kt)("p",null,"ComposeDB is powered by a network of Ceramic nodes, with global state synced across. Today, you\u2019ll need to run your own node to ensure data availability. You can query against your node using Ceramic\u2019s native Client in GraphQL. ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/database"},(0,a.kt)("strong",{parentName:"a"},"\u2192"))),(0,a.kt)("hr",null),(0,a.kt)("p",null,"Ready to dive deeper? Head to ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/next-steps"},(0,a.kt)("strong",{parentName:"a"},"Next Steps \u2192"))))}d.isMDXComponent=!0}}]);