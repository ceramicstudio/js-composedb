"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1562],{4852:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},l="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),l=c(n),u=a,f=l["".concat(p,".").concat(u)]||l[u]||m[u]||o;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var d={};for(var p in t)hasOwnProperty.call(t,p)&&(d[p]=t[p]);d.originalType=e,d[l]="string"==typeof e?e:a,i[1]=d;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1093:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>d,toc:()=>c});var r=n(5527),a=(n(9231),n(4852));const o={id:"cli.did",title:"CLI: did:* commands",custom_edit_url:null},i=void 0,d={unversionedId:"api/commands/cli.did",id:"version-0.3.x/api/commands/cli.did",title:"CLI: did:* commands",description:"The group of CLI did:* commands enables interactions with DIDs and private keys",source:"@site/versioned_docs/version-0.3.x/api/commands/cli.did.md",sourceDirName:"api/commands",slug:"/api/commands/cli.did",permalink:"/docs/0.3.x/api/commands/cli.did",draft:!1,editUrl:null,tags:[],version:"0.3.x",frontMatter:{id:"cli.did",title:"CLI: did:* commands",custom_edit_url:null},sidebar:"api",previous:{title:"Module: CLI",permalink:"/docs/0.3.x/api/modules/cli"},next:{title:"CLI: composite:* commands",permalink:"/docs/0.3.x/api/commands/cli.composite"}},p={},c=[{value:"Command List",id:"command-list",level:2},{value:"Usage",id:"usage",level:2},{value:"<code>composedb did:generate-private-key</code>",id:"composedb-didgenerate-private-key",level:3},{value:"<code>composedb did:from-private-key</code>",id:"composedb-didfrom-private-key",level:3}],s={toc:c},l="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(l,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("head",null,(0,a.kt)("meta",{name:"robots",content:"noindex"}),(0,a.kt)("meta",{name:"googlebot",content:"noindex"})),(0,a.kt)("p",null,"The group of ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/cli"},"CLI")," ",(0,a.kt)("inlineCode",{parentName:"p"},"did:*")," commands enables interactions with DIDs and private keys"),(0,a.kt)("p",null,"DIDs are identifiers for ",(0,a.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/docs/composedb/core-concepts#accounts"},"Ceramic Accounts")),(0,a.kt)("h2",{id:"command-list"},"Command List"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#composedb-didgenerate-private-key"},(0,a.kt)("inlineCode",{parentName:"a"},"composedb did:generate-private-key"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#composedb-didfrom-private-key"},(0,a.kt)("inlineCode",{parentName:"a"},"composedb did:from-private-key")))),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("h3",{id:"composedb-didgenerate-private-key"},(0,a.kt)("inlineCode",{parentName:"h3"},"composedb did:generate-private-key")),(0,a.kt)("p",null,"Generate a new random 32 byte private key and return its base 16 representation"),(0,a.kt)("p",null,"You can use this command to generate a fresh private key which you can later use a the ",(0,a.kt)("inlineCode",{parentName:"p"},"--did-private-key")," flag to\nauthenticate other ComposeDB CLI command calls"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb did:generate-private-key\n")),(0,a.kt)("h3",{id:"composedb-didfrom-private-key"},(0,a.kt)("inlineCode",{parentName:"h3"},"composedb did:from-private-key")),(0,a.kt)("p",null,"Create a new DID from a private key passed either as an argument or as a value of the flag"),(0,a.kt)("p",null,"You can use this command to see what DID corresponds to a given private key"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb did:from-private-key KEY\n  \nOPTIONS\n  --did-private-key        A random 32 byte private key represented as a base16 string (pass only if not passed as positional argument)\n")))}m.isMDXComponent=!0}}]);