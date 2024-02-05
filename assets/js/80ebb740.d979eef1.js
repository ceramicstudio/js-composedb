"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1351],{967:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>c,contentTitle:()=>t,default:()=>l,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var s=n(5250),r=n(5990);const a={id:"cli.graphql",title:"CLI: graphql:* commands",custom_edit_url:null},t=void 0,i={id:"api/commands/cli.graphql",title:"CLI: graphql:* commands",description:"The group of CLI graphql:* commands makes it possible to generate GraphQL Schemas from runtime definitions of your Composites and run a local GraphQL HTTP server",source:"@site/versioned_docs/version-0.3.x/api/commands/cli.graphql.md",sourceDirName:"api/commands",slug:"/api/commands/cli.graphql",permalink:"/docs/0.3.x/api/commands/cli.graphql",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.3.x",frontMatter:{id:"cli.graphql",title:"CLI: graphql:* commands",custom_edit_url:null},sidebar:"api",previous:{title:"CLI: document:* commands",permalink:"/docs/0.3.x/api/commands/cli.document"}},c={},d=[{value:"Command List",id:"command-list",level:2},{value:"Usage",id:"usage",level:2},{value:"<code>composedb graphql:schema</code>",id:"composedb-graphqlschema",level:3},{value:"<code>composedb graphql:server</code>",id:"composedb-graphqlserver",level:3}];function h(e){const o={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components},{Head:n}=o;return n||function(e,o){throw new Error("Expected "+(o?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n,{children:[(0,s.jsx)("meta",{name:"robots",content:"noindex"}),(0,s.jsx)("meta",{name:"googlebot",content:"noindex"})]}),"\n",(0,s.jsxs)(o.p,{children:["The group of ",(0,s.jsx)(o.a,{href:"/docs/0.3.x/api/modules/cli",children:"CLI"})," ",(0,s.jsx)(o.code,{children:"graphql:*"})," commands makes it possible to generate GraphQL Schemas from ",(0,s.jsx)(o.a,{href:"/docs/0.3.x/api/commands/cli.composite#composedb-compositecompile",children:"runtime definitions"})," of your ",(0,s.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/core-concepts#composites",children:"Composites"})," and run a local GraphQL HTTP server"]}),"\n",(0,s.jsx)(o.h2,{id:"command-list",children:"Command List"}),"\n",(0,s.jsxs)(o.ul,{children:["\n",(0,s.jsx)(o.li,{children:(0,s.jsx)(o.a,{href:"#composedb-graphqlschema",children:(0,s.jsx)(o.code,{children:"composedb graphql:schema PATH"})})}),"\n",(0,s.jsx)(o.li,{children:(0,s.jsx)(o.a,{href:"#composedb-graphqlserver",children:(0,s.jsx)(o.code,{children:"composedb graphql:server PATH"})})}),"\n"]}),"\n",(0,s.jsx)(o.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(o.h3,{id:"composedb-graphqlschema",children:(0,s.jsx)(o.code,{children:"composedb graphql:schema"})}),"\n",(0,s.jsx)(o.p,{children:"Load the runtime graphql schema for the composite with given runtime definition"}),"\n",(0,s.jsxs)(o.p,{children:["You can use this command to see the ComposeDB GraphQL Execution Schema for your composite.\nYou will be using this schema in your DApp to perform ",(0,s.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-interactions/queries",children:"Queries"})," and ",(0,s.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-interactions/mutations",children:"Mutations"})]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{children:"USAGE\n  $ composedb graphql:schema PATH\n\nARGUMENTS\n  PATH                     a path to a runtime representation of a composite encoded as JSON\n\nOPTIONS\n  -o, --output             a path to a file where the schema should be saved\n"})}),"\n",(0,s.jsx)(o.h3,{id:"composedb-graphqlserver",children:(0,s.jsx)(o.code,{children:"composedb graphql:server"})}),"\n",(0,s.jsx)(o.p,{children:"Launch a graphQL server supporting the runtime schema of the composite with given runtime definition"}),"\n",(0,s.jsxs)(o.p,{children:["You can use this command to launch a local GraphQL HTTP server that will be able to process queries and mutations against\nyour Composite's ",(0,s.jsx)(o.a,{href:"/docs/0.3.x/api/commands/cli.graphql#composedb-graphqlschema",children:"GraphQL Execution Schema"})]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{children:"USAGE\n  $ composedb graphql:server PATH\n\nARGUMENTS\n  PATH                     a path to a runtime representation of a composite encoded as JSON\n\nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n  -k, --did-private-key    DID Private Key that should be used to authenticate the queries and mutations (you can generate a fresh private key using composedb did:generate-private-key)\n  --readonly               a boolean indicating whether the server should load the schema without mutations\n  --port                   the port that the server should listen on\n  --graphiql               a boolean indicating whether the GraphiQL IDE should be available when opening the server's url in the browser. See https://github.com/graphql/graphiql for more info on GraphiQL\n  \n"})})]})}function l(e={}){const{wrapper:o}={...(0,r.a)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},5990:(e,o,n)=>{n.d(o,{Z:()=>i,a:()=>t});var s=n(79);const r={},a=s.createContext(r);function t(e){const o=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),s.createElement(a.Provider,{value:o},e.children)}}}]);