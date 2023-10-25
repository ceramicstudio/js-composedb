"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2491],{54852:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>h});var n=r(49231);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),m=c(r),u=a,h=m["".concat(s,".").concat(u)]||m[u]||d[u]||o;return r?n.createElement(h,i(i({ref:t},l),{},{components:r})):n.createElement(h,i({ref:t},l))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[m]="string"==typeof e?e:a,i[1]=p;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},91516:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var n=r(35664),a=(r(49231),r(54852));const o={id:"cli.graphql",title:"CLI: graphql:* commands",custom_edit_url:null},i=void 0,p={unversionedId:"api/commands/cli.graphql",id:"version-0.2.x/api/commands/cli.graphql",title:"CLI: graphql:* commands",description:"The group of CLI graphql:* commands makes it possible to generate GraphQL Schemas from runtime definitions of your Composites and run a local GraphQL HTTP server",source:"@site/versioned_docs/version-0.2.x/api/commands/cli.graphql.md",sourceDirName:"api/commands",slug:"/api/commands/cli.graphql",permalink:"/docs/0.2.x/api/commands/cli.graphql",draft:!1,editUrl:null,tags:[],version:"0.2.x",frontMatter:{id:"cli.graphql",title:"CLI: graphql:* commands",custom_edit_url:null},sidebar:"api",previous:{title:"CLI: document:* commands",permalink:"/docs/0.2.x/api/commands/cli.document"}},s={},c=[{value:"Command List",id:"command-list",level:2},{value:"Usage",id:"usage",level:2},{value:"<code>composedb graphql:schema</code>",id:"composedb-graphqlschema",level:3},{value:"<code>composedb graphql:server</code>",id:"composedb-graphqlserver",level:3}],l={toc:c},m="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("head",null,(0,a.kt)("meta",{name:"robots",content:"noindex"}),(0,a.kt)("meta",{name:"googlebot",content:"noindex"})),(0,a.kt)("p",null,"The group of ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/modules/cli"},"CLI")," ",(0,a.kt)("inlineCode",{parentName:"p"},"graphql:*")," commands makes it possible to generate GraphQL Schemas from ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/commands/cli.composite#composedb-compositecompile"},"runtime definitions")," of your ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/concepts-overview#composites"},"Composites")," and run a local GraphQL HTTP server"),(0,a.kt)("h2",{id:"command-list"},"Command List"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#composedb-graphqlschema"},(0,a.kt)("inlineCode",{parentName:"a"},"composedb graphql:schema PATH"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#composedb-graphqlserver"},(0,a.kt)("inlineCode",{parentName:"a"},"composedb graphql:server PATH")))),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("h3",{id:"composedb-graphqlschema"},(0,a.kt)("inlineCode",{parentName:"h3"},"composedb graphql:schema")),(0,a.kt)("p",null,"Load the runtime graphql schema for the composite with given runtime definition"),(0,a.kt)("p",null,"You can use this command to see the ComposeDB GraphQL Execution Schema for your composite.\nYou will be using this schema in your DApp to perform ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/interacting/mutations"},"Queries")," and ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/interacting/mutations"},"Mutations")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb graphql:schema PATH\n\nARGUMENTS\n  PATH                     a path to a runtime representation of a composite encoded as JSON\n\nOPTIONS\n  -o, --output             a path to a file where the schema should be saved\n")),(0,a.kt)("h3",{id:"composedb-graphqlserver"},(0,a.kt)("inlineCode",{parentName:"h3"},"composedb graphql:server")),(0,a.kt)("p",null,"Launch a graphQL server supporting the runtime schema of the composite with given runtime definition"),(0,a.kt)("p",null,"You can use this command to launch a local GraphQL HTTP server that will be able to process queries and mutations against\nyour Composite's ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/commands/cli.graphql#composedb-graphqlschema"},"GraphQL Execution Schema")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb graphql:server PATH\n\nARGUMENTS\n  PATH                     a path to a runtime representation of a composite encoded as JSON\n\nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n  -k, --did-private-key    DID Private Key that should be used to authenticate the queries and mutations (you can generate a fresh private key using composedb did:generate-private-key)\n  --readonly               a boolean indicating whether the server should load the schema without mutations\n  --port                   the port that the server should listen on\n  --graphiql               a boolean indicating whether the GraphiQL IDE should be available when opening the server's url in the browser. See https://github.com/graphql/graphiql for more info on GraphiQL\n  \n")))}d.isMDXComponent=!0}}]);