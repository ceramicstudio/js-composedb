"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4088],{2328:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>d,default:()=>a,frontMatter:()=>n,metadata:()=>i,toc:()=>h});var s=t(7512),l=t(4496);const n={id:"server",title:"Module: server",custom_edit_url:null},d=void 0,i={id:"api/modules/server",title:"Module: server",description:"ComposeDB server for hybrid execution on the ComposeDB client.",source:"@site/versioned_docs/version-0.4.x/api/modules/server.md",sourceDirName:"api/modules",slug:"/api/modules/server",permalink:"/docs/0.4.x/api/modules/server",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.4.x",frontMatter:{id:"server",title:"Module: server",custom_edit_url:null},sidebar:"api",previous:{title:"Module: runtime",permalink:"/docs/0.4.x/api/modules/runtime"},next:{title:"Class: ComposeClient",permalink:"/docs/0.4.x/api/classes/client.ComposeClient"}},c={},h=[{value:"Installation",id:"installation",level:2},{value:"Type Aliases",id:"type-aliases",level:2},{value:"GraphQLParams",id:"graphqlparams",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"GraphQLServer",id:"graphqlserver",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"HandlerParams",id:"handlerparams",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Type declaration",id:"type-declaration-1",level:4},{value:"Functions",id:"functions",level:2},{value:"createHandler",id:"createhandler",level:3},{value:"Type parameters",id:"type-parameters-2",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"getViewerID",id:"getviewerid",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"startGraphQLServer",id:"startgraphqlserver",level:3},{value:"Type parameters",id:"type-parameters-3",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4}];function x(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.M)(),...e.components},{Head:t}=r;return t||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t,{children:[(0,s.jsx)("meta",{name:"robots",content:"noindex"}),(0,s.jsx)("meta",{name:"googlebot",content:"noindex"})]}),"\n",(0,s.jsxs)(r.p,{children:["ComposeDB server for hybrid execution on the ",(0,s.jsx)(r.a,{href:"/docs/0.4.x/api/modules/client",children:(0,s.jsx)(r.code,{children:"ComposeDB client"})}),"."]}),"\n",(0,s.jsx)(r.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-sh",children:"npm install @composedb/server\n"})}),"\n",(0,s.jsx)(r.h2,{id:"type-aliases",children:"Type Aliases"}),"\n",(0,s.jsx)(r.h3,{id:"graphqlparams",children:"GraphQLParams"}),"\n",(0,s.jsxs)(r.p,{children:["\u01ac ",(0,s.jsx)(r.strong,{children:"GraphQLParams"}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),">: ",(0,s.jsx)(r.a,{href:"/docs/0.4.x/api/modules/server#handlerparams",children:(0,s.jsx)(r.code,{children:"HandlerParams"})}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),"> & { ",(0,s.jsx)(r.code,{children:"port?"}),": ",(0,s.jsx)(r.code,{children:"number"})," | ",(0,s.jsx)(r.code,{children:"number"}),"[] }"]}),"\n",(0,s.jsx)(r.h4,{id:"type-parameters",children:"Type parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"ServerContext"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"any"}),"> = ",(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"graphqlserver",children:"GraphQLServer"}),"\n",(0,s.jsxs)(r.p,{children:["\u01ac ",(0,s.jsx)(r.strong,{children:"GraphQLServer"}),": ",(0,s.jsx)(r.code,{children:"Object"})]}),"\n",(0,s.jsx)(r.h4,{id:"type-declaration",children:"Type declaration"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"port"})}),(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"number"})})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"stop"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:["() => ",(0,s.jsx)(r.code,{children:"Promise"}),"<",(0,s.jsx)(r.code,{children:"void"}),">"]})]})]})]}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"handlerparams",children:"HandlerParams"}),"\n",(0,s.jsxs)(r.p,{children:["\u01ac ",(0,s.jsx)(r.strong,{children:"HandlerParams"}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),">: ",(0,s.jsx)(r.code,{children:"Object"})]}),"\n",(0,s.jsx)(r.h4,{id:"type-parameters-1",children:"Type parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"ServerContext"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"any"}),"> = ",(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"type-declaration-1",children:"Type declaration"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"cache?"})}),(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"DocumentCache"})}),(0,s.jsx)(r.td,{style:{textAlign:"left"},children:"Optional cache for documents."})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"ceramic"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,s.jsx)(r.code,{children:"CeramicApi"})," | ",(0,s.jsx)(r.code,{children:"string"})]}),(0,s.jsx)(r.td,{style:{textAlign:"left"},children:"Ceramic client instance or HTTP URL."})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"definition?"})}),(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"RuntimeCompositeDefinition"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:["Runtime composite definition, created using the ",(0,s.jsx)(r.a,{href:"/docs/0.4.x/api/classes/devtools.Composite",children:(0,s.jsx)(r.code,{children:"Composite"})})," development tools."]})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"options?"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,s.jsx)(r.code,{children:"YogaServerOptions"}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),", ",(0,s.jsx)(r.code,{children:"Context"}),">"]}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,s.jsx)(r.a,{href:"https://the-guild.dev/graphql/yoga-server/docs",children:"Yoga server"})," options."]})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"schema?"})}),(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"GraphQLSchema"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:["GraphQL Schema to use, ignores the ",(0,s.jsx)(r.code,{children:"definition"})," parameter if provided."]})]})]})]}),"\n",(0,s.jsx)(r.h2,{id:"functions",children:"Functions"}),"\n",(0,s.jsx)(r.h3,{id:"createhandler",children:"createHandler"}),"\n",(0,s.jsxs)(r.p,{children:["\u25b8 ",(0,s.jsx)(r.strong,{children:"createHandler"}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),">(",(0,s.jsx)(r.code,{children:"params"}),"): ",(0,s.jsx)(r.code,{children:"YogaServerInstance"}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),", ",(0,s.jsx)(r.code,{children:"Context"}),">"]}),"\n",(0,s.jsxs)(r.p,{children:["Create a ",(0,s.jsx)(r.a,{href:"https://the-guild.dev/graphql/yoga-server/docs",children:"Yoga server"})," handling GraphQL requests."]}),"\n",(0,s.jsx)(r.h4,{id:"type-parameters-2",children:"Type parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"ServerContext"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"any"}),"> = ",(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"params"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,s.jsx)(r.a,{href:"/docs/0.4.x/api/modules/server#handlerparams",children:(0,s.jsx)(r.code,{children:"HandlerParams"})}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),">"]})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"YogaServerInstance"}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),", ",(0,s.jsx)(r.code,{children:"Context"}),">"]}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"getviewerid",children:"getViewerID"}),"\n",(0,s.jsxs)(r.p,{children:["\u25b8 ",(0,s.jsx)(r.strong,{children:"getViewerID"}),"(",(0,s.jsx)(r.code,{children:"request"}),"): ",(0,s.jsx)(r.code,{children:"string"})," | ",(0,s.jsx)(r.code,{children:"null"})," | ",(0,s.jsx)(r.code,{children:"undefined"})]}),"\n",(0,s.jsx)(r.p,{children:"Returns the viewer ID sent by the client, if set."}),"\n",(0,s.jsx)(r.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"request"})}),(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"Request"})})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"string"})," | ",(0,s.jsx)(r.code,{children:"null"})," | ",(0,s.jsx)(r.code,{children:"undefined"})]}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"startgraphqlserver",children:"startGraphQLServer"}),"\n",(0,s.jsxs)(r.p,{children:["\u25b8 ",(0,s.jsx)(r.strong,{children:"startGraphQLServer"}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),">(",(0,s.jsx)(r.code,{children:"params"}),"): ",(0,s.jsx)(r.code,{children:"Promise"}),"<",(0,s.jsx)(r.a,{href:"/docs/0.4.x/api/modules/server#graphqlserver",children:(0,s.jsx)(r.code,{children:"GraphQLServer"})}),">"]}),"\n",(0,s.jsx)(r.p,{children:"Start a local GraphQL server."}),"\n",(0,s.jsx)(r.h4,{id:"type-parameters-3",children:"Type parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"ServerContext"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"any"}),"> = ",(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(r.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{style:{textAlign:"left"},children:(0,s.jsx)(r.code,{children:"params"})}),(0,s.jsxs)(r.td,{style:{textAlign:"left"},children:[(0,s.jsx)(r.a,{href:"/docs/0.4.x/api/modules/server#graphqlparams",children:(0,s.jsx)(r.code,{children:"GraphQLParams"})}),"<",(0,s.jsx)(r.code,{children:"ServerContext"}),">"]})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"Promise"}),"<",(0,s.jsx)(r.a,{href:"/docs/0.4.x/api/modules/server#graphqlserver",children:(0,s.jsx)(r.code,{children:"GraphQLServer"})}),">"]})]})}function a(e={}){const{wrapper:r}={...(0,l.M)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},4496:(e,r,t)=>{t.d(r,{I:()=>i,M:()=>d});var s=t(5496);const l={},n=s.createContext(l);function d(e){const r=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:d(e.components),s.createElement(n.Provider,{value:r},e.children)}}}]);