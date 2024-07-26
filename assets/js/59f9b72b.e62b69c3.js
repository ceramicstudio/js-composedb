"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4167],{5182:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>t,toc:()=>d});var r=n(6106),a=n(9252);const s={id:"cli.graphql",title:"CLI: graphql:* commands",custom_edit_url:null},i=void 0,t={id:"api/commands/cli.graphql",title:"CLI: graphql:* commands",description:"The group of CLI graphql:* commands makes it possible to generate GraphQL Schemas from compiled Composites and run a local GraphQL HTTP server",source:"@site/versioned_docs/version-0.8.x/api/commands/cli.graphql.md",sourceDirName:"api/commands",slug:"/api/commands/cli.graphql",permalink:"/docs/0.8.x/api/commands/cli.graphql",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.8.x",frontMatter:{id:"cli.graphql",title:"CLI: graphql:* commands",custom_edit_url:null},sidebar:"api",previous:{title:"model commands",permalink:"/docs/0.8.x/api/commands/cli.model"},next:{title:"Scalars",permalink:"/docs/0.8.x/api/sdl/scalars"}},c={},d=[{value:"Command List",id:"command-list",level:2},{value:"Usage",id:"usage",level:2},{value:"<code>composedb graphql:execute</code>",id:"composedb-graphqlexecute",level:3},{value:"<code>composedb graphql:schema</code>",id:"composedb-graphqlschema",level:3},{value:"<code>composedb graphql:server</code>",id:"composedb-graphqlserver",level:3}];function l(e){const o={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o.p,{children:["The group of ",(0,r.jsx)(o.a,{href:"/docs/0.8.x/api/modules/cli",children:"CLI"})," ",(0,r.jsx)(o.code,{children:"graphql:*"})," commands makes it possible to generate GraphQL Schemas from compiled ",(0,r.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/composites",children:"Composites"})," and run a local GraphQL HTTP server"]}),"\n",(0,r.jsx)(o.h2,{id:"command-list",children:"Command List"}),"\n",(0,r.jsxs)(o.ul,{children:["\n",(0,r.jsx)(o.li,{children:(0,r.jsx)(o.a,{href:"#composedb-graphqlexecute",children:(0,r.jsx)(o.code,{children:"composedb graphql:execute QUERY"})})}),"\n",(0,r.jsx)(o.li,{children:(0,r.jsx)(o.a,{href:"#composedb-graphqlschema",children:(0,r.jsx)(o.code,{children:"composedb graphql:schema PATH"})})}),"\n",(0,r.jsx)(o.li,{children:(0,r.jsx)(o.a,{href:"#composedb-graphqlserver",children:(0,r.jsx)(o.code,{children:"composedb graphql:server PATH"})})}),"\n"]}),"\n",(0,r.jsx)(o.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(o.h3,{id:"composedb-graphqlexecute",children:(0,r.jsx)(o.code,{children:"composedb graphql:execute"})}),"\n",(0,r.jsx)(o.p,{children:"Execute a GraphQL query or mutation"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{children:'USAGE\n  $ composedb graphql:execute QUERY [VARS] [-c <value>] [-k <value>]\n    [--runtimeDefinitionPath <value>]\n\nARGUMENTS\n  QUERY  GraphQL query or mutation\n  VARS   variables as JSON to provide to a mutation. A "did" variable is always added\n         that is the DID from the environment.\n\nFLAGS\n  -c, --ceramic-url=<value>            Ceramic API URL\n  -k, --did-private-key=<value>        DID private key\n      --runtimeDefinitionPath=<value>  path to runtime-composite definition json file\n'})}),"\n",(0,r.jsx)(o.h3,{id:"composedb-graphqlschema",children:(0,r.jsx)(o.code,{children:"composedb graphql:schema"})}),"\n",(0,r.jsx)(o.p,{children:"Load the runtime graphql schema for the composite with given runtime definition"}),"\n",(0,r.jsx)(o.p,{children:"You can use this command to see the ComposeDB GraphQL Execution Schema for your composite."}),"\n",(0,r.jsxs)(o.p,{children:["You will be using this schema in your app to perform ",(0,r.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-interactions/queries",children:"Queries"})," and ",(0,r.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-interactions/mutations",children:"Mutations"}),"."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{children:"USAGE\n  $ composedb graphql:schema PATH\n\nARGUMENTS\n  PATH                     a path to a runtime representation of a composite encoded as JSON\n\nOPTIONS\n  -o, --output             a path to a file where the schema should be saved\n"})}),"\n",(0,r.jsx)(o.h3,{id:"composedb-graphqlserver",children:(0,r.jsx)(o.code,{children:"composedb graphql:server"})}),"\n",(0,r.jsx)(o.p,{children:"Launch a GraphQL server supporting the runtime schema of the composite with given runtime definition"}),"\n",(0,r.jsxs)(o.p,{children:["You can use this command to launch a local GraphQL HTTP server that will be able to process queries and mutations against\nyour Composite's ",(0,r.jsx)(o.a,{href:"/docs/0.8.x/api/commands/cli.graphql#composedb-graphqlschema",children:"GraphQL Execution Schema"})]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{children:"USAGE\n  $ composedb graphql:server PATH\n\nARGUMENTS\n  PATH                     a path to a runtime representation of a composite encoded as JSON\n\nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n  -k, --did-private-key    DID Private Key that should be used to authenticate the queries and mutations (you can generate a fresh private key using composedb did:generate-private-key)\n  --readonly               a boolean indicating whether the server should load the schema without mutations\n  --port                   the port that the server should listen on\n  --graphiql               a boolean indicating whether the GraphiQL IDE should be available when opening the server's url in the browser. See https://github.com/graphql/graphiql for more info on GraphiQL\n  \n"})})]})}function h(e={}){const{wrapper:o}={...(0,a.R)(),...e.components};return o?(0,r.jsx)(o,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},9252:(e,o,n)=>{n.d(o,{R:()=>i,x:()=>t});var r=n(7378);const a={},s=r.createContext(a);function i(e){const o=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function t(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(s.Provider,{value:o},e.children)}}}]);