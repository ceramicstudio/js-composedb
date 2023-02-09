"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6504],{4852:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>f});var n=r(9231);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,l=d(e,["components","mdxType","originalType","parentName"]),s=c(r),u=a,f=s["".concat(p,".").concat(u)]||s[u]||m[u]||i;return r?n.createElement(f,o(o({ref:t},l),{},{components:r})):n.createElement(f,o({ref:t},l))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var d={};for(var p in t)hasOwnProperty.call(t,p)&&(d[p]=t[p]);d.originalType=e,d[s]="string"==typeof e?e:a,o[1]=d;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4039:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>d,toc:()=>c});var n=r(1504),a=(r(9231),r(4852));const i={id:"cli.did",title:"CLI: did:* commands",custom_edit_url:null},o=void 0,d={unversionedId:"api/commands/cli.did",id:"api/commands/cli.did",title:"CLI: did:* commands",description:"The group of CLI did:* commands enables interactions with DIDs and private keys",source:"@site/docs/api/commands/cli.did.md",sourceDirName:"api/commands",slug:"/api/commands/cli.did",permalink:"/docs/preview/api/commands/cli.did",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"cli.did",title:"CLI: did:* commands",custom_edit_url:null},sidebar:"api",previous:{title:"Module: CLI",permalink:"/docs/preview/api/modules/cli"},next:{title:"CLI: composite:* commands",permalink:"/docs/preview/api/commands/cli.composite"}},p={},c=[{value:"Command List",id:"command-list",level:2},{value:"Usage",id:"usage",level:2},{value:"<code>composedb did:generate-private-key</code>",id:"composedb-didgenerate-private-key",level:3},{value:"<code>composedb did:from-private-key</code>",id:"composedb-didfrom-private-key",level:3}],l={toc:c},s="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(s,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The group of ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/api/modules/cli"},"CLI")," ",(0,a.kt)("inlineCode",{parentName:"p"},"did:*")," commands enables interactions with DIDs and private keys"),(0,a.kt)("p",null,"DIDs are identifiers for ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/graph-structure#accounts"},"Ceramic Accounts")),(0,a.kt)("h2",{id:"command-list"},"Command List"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#composedb-didgenerate-private-key"},(0,a.kt)("inlineCode",{parentName:"a"},"composedb did:generate-private-key"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#composedb-didfrom-private-key"},(0,a.kt)("inlineCode",{parentName:"a"},"composedb did:from-private-key")))),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("h3",{id:"composedb-didgenerate-private-key"},(0,a.kt)("inlineCode",{parentName:"h3"},"composedb did:generate-private-key")),(0,a.kt)("p",null,"Generate a new random 32 byte private key and return its base 16 representation"),(0,a.kt)("p",null,"You can use this command to generate a fresh private key which you can later use a the ",(0,a.kt)("inlineCode",{parentName:"p"},"--did-private-key")," flag to\nauthenticate other ComposeDB CLI command calls"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb did:generate-private-key\n")),(0,a.kt)("h3",{id:"composedb-didfrom-private-key"},(0,a.kt)("inlineCode",{parentName:"h3"},"composedb did:from-private-key")),(0,a.kt)("p",null,"Create a new DID from a private key passed either as an argument or as a value of the flag"),(0,a.kt)("p",null,"You can use this command to see what DID corresponds to a given private key"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb did:from-private-key KEY\n  \nOPTIONS\n  --did-private-key        A random 32 byte private key represented as a base16 string (pass only if not passed as positional argument)\n")))}m.isMDXComponent=!0}}]);