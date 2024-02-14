"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4140],{2712:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>o,frontMatter:()=>i,metadata:()=>d,toc:()=>h});var l=n(7512),s=n(4496);const i={id:"runtime",title:"Module: runtime",custom_edit_url:null},r=void 0,d={id:"api/modules/runtime",title:"Module: runtime",description:"ComposeDB runtime module, converting a runtime composite to an executable GraphQL schema.",source:"@site/docs/api/modules/runtime.md",sourceDirName:"api/modules",slug:"/api/modules/runtime",permalink:"/docs/preview/api/modules/runtime",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"runtime",title:"Module: runtime",custom_edit_url:null},sidebar:"api",previous:{title:"Module: client",permalink:"/docs/preview/api/modules/client"},next:{title:"Module: loader",permalink:"/docs/preview/api/modules/loader"}},c={},h=[{value:"Installation",id:"installation",level:2},{value:"Classes",id:"classes",level:2},{value:"Type Aliases",id:"type-aliases",level:2},{value:"ComposeRuntimeParams",id:"composeruntimeparams",level:3},{value:"Context",id:"context",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"ContextParams",id:"contextparams",level:3},{value:"Type declaration",id:"type-declaration-1",level:4},{value:"GetSchemaParams",id:"getschemaparams",level:3},{value:"Type declaration",id:"type-declaration-2",level:4},{value:"Functions",id:"functions",level:2},{value:"createContext",id:"createcontext",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"createGraphQLSchema",id:"creategraphqlschema",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"getSchema",id:"getschema",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"printGraphQLSchema",id:"printgraphqlschema",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4}];function a(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.M)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.p,{children:"ComposeDB runtime module, converting a runtime composite to an executable GraphQL schema."}),"\n",(0,l.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sh",children:"npm install @composedb/runtime\n"})}),"\n",(0,l.jsx)(t.h2,{id:"classes",children:"Classes"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"/docs/preview/api/classes/runtime.ComposeRuntime",children:"ComposeRuntime"})}),"\n"]}),"\n",(0,l.jsx)(t.h2,{id:"type-aliases",children:"Type Aliases"}),"\n",(0,l.jsx)(t.h3,{id:"composeruntimeparams",children:"ComposeRuntimeParams"}),"\n",(0,l.jsxs)(t.p,{children:["\u01ac ",(0,l.jsx)(t.strong,{children:"ComposeRuntimeParams"}),": ",(0,l.jsx)(t.a,{href:"/docs/preview/api/modules/runtime#getschemaparams",children:(0,l.jsx)(t.code,{children:"GetSchemaParams"})})," & { ",(0,l.jsx)(t.code,{children:"cache?"}),": ",(0,l.jsx)(t.code,{children:"DocumentCache"})," | ",(0,l.jsx)(t.code,{children:"boolean"})," ; ",(0,l.jsx)(t.code,{children:"ceramic"}),": ",(0,l.jsx)(t.code,{children:"CeramicAPI"})," | ",(0,l.jsx)(t.code,{children:"string"})," ; ",(0,l.jsx)(t.code,{children:"context?"}),": ",(0,l.jsx)(t.a,{href:"/docs/preview/api/modules/runtime#context",children:(0,l.jsx)(t.code,{children:"Context"})})," ; ",(0,l.jsx)(t.code,{children:"loader?"}),": ",(0,l.jsx)(t.code,{children:"DocumentLoader"}),"  }"]}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsx)(t.h3,{id:"context",children:"Context"}),"\n",(0,l.jsxs)(t.p,{children:["\u01ac ",(0,l.jsx)(t.strong,{children:"Context"}),": ",(0,l.jsx)(t.code,{children:"Object"})]}),"\n",(0,l.jsx)(t.h4,{id:"type-declaration",children:"Type declaration"}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"ceramic"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"CeramicAPI"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Ceramic client instance used internally."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"getViewerID"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:["() => ",(0,l.jsx)(t.code,{children:"string"})," | ",(0,l.jsx)(t.code,{children:"null"})]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"ID of the current viewer (authenticated DID), if set."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"isAuthenticated"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:["() => ",(0,l.jsx)(t.code,{children:"boolean"})]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Returns whether the Ceramic client instance used internally is authenticated or not. When not authenticated, mutations will fail."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"loadDoc"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:["<Content>(",(0,l.jsx)(t.code,{children:"id"}),": ",(0,l.jsx)(t.code,{children:"string"})," | ",(0,l.jsx)(t.code,{children:"CommitID"})," | ",(0,l.jsx)(t.code,{children:"StreamID"}),", ",(0,l.jsx)(t.code,{children:"fresh?"}),": ",(0,l.jsx)(t.code,{children:"boolean"}),") => ",(0,l.jsx)(t.code,{children:"Promise"}),"<",(0,l.jsx)(t.code,{children:"ModelInstanceDocument"}),"<",(0,l.jsx)(t.code,{children:"Content"}),">>"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Load a document by ID, using the cache if possible."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"loader"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"DocumentLoader"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Document loader instance used internally."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"queryCount"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:["(",(0,l.jsx)(t.code,{children:"query"}),": ",(0,l.jsx)(t.code,{children:"BaseQuery"}),") => ",(0,l.jsx)(t.code,{children:"Promise"}),"<",(0,l.jsx)(t.code,{children:"number"}),">"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Query the index for the total number of documents matching the query parameters."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"upsertSet"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:["<Content>(",(0,l.jsx)(t.code,{children:"model"}),": ",(0,l.jsx)(t.code,{children:"string"}),", ",(0,l.jsx)(t.code,{children:"unique"}),": ",(0,l.jsx)(t.code,{children:"string"}),"[], ",(0,l.jsx)(t.code,{children:"content"}),": ",(0,l.jsx)(t.code,{children:"Content"}),", ",(0,l.jsx)(t.code,{children:"options?"}),": ",(0,l.jsx)(t.code,{children:"CreateOpts"}),") => ",(0,l.jsx)(t.code,{children:"Promise"}),"<",(0,l.jsx)(t.code,{children:"ModelInstanceDocument"}),"<",(0,l.jsx)(t.code,{children:"Content"}),">>"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Create or update a document using the SET account relation with the given model, content and unique fields value."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"upsertSingle"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:["<Content>(",(0,l.jsx)(t.code,{children:"model"}),": ",(0,l.jsx)(t.code,{children:"string"}),", ",(0,l.jsx)(t.code,{children:"content"}),": ",(0,l.jsx)(t.code,{children:"Content"}),", ",(0,l.jsx)(t.code,{children:"options?"}),": ",(0,l.jsx)(t.code,{children:"CreateOpts"}),") => ",(0,l.jsx)(t.code,{children:"Promise"}),"<",(0,l.jsx)(t.code,{children:"ModelInstanceDocument"}),"<",(0,l.jsx)(t.code,{children:"Content"}),">>"]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Create or update a document using the SINGLE account relation with the given model and content."})]})]})]}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsx)(t.h3,{id:"contextparams",children:"ContextParams"}),"\n",(0,l.jsxs)(t.p,{children:["\u01ac ",(0,l.jsx)(t.strong,{children:"ContextParams"}),": ",(0,l.jsx)(t.code,{children:"Object"})]}),"\n",(0,l.jsx)(t.h4,{id:"type-declaration-1",children:"Type declaration"}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"cache?"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.code,{children:"DocumentCache"})," | ",(0,l.jsx)(t.code,{children:"boolean"})]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Optional cache for documents."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"ceramic"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"CeramicAPI"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Ceramic client instance."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"fallbackViewerID?"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,l.jsx)(t.code,{children:"string"})," | ",(0,l.jsx)(t.code,{children:"null"})]}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Fallback viewer ID to use when the Ceramic instance is not authenticated."})]})]})]}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsx)(t.h3,{id:"getschemaparams",children:"GetSchemaParams"}),"\n",(0,l.jsxs)(t.p,{children:["\u01ac ",(0,l.jsx)(t.strong,{children:"GetSchemaParams"}),": ",(0,l.jsx)(t.code,{children:"Object"})]}),"\n",(0,l.jsx)(t.h4,{id:"type-declaration-2",children:"Type declaration"}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"definition?"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"RuntimeCompositeDefinition"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:["Runtime composite definition, created using the ",(0,l.jsx)(t.a,{href:"/docs/preview/api/classes/devtools.Composite",children:(0,l.jsx)(t.code,{children:"Composite"})})," development tools."]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"readonly?"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"boolean"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Set the schema to read-only, disabling mutations support."})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"schema?"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"GraphQLSchema"})}),(0,l.jsxs)(t.td,{style:{textAlign:"left"},children:["GraphQL Schema to use, ignores the ",(0,l.jsx)(t.code,{children:"definition"})," and ",(0,l.jsx)(t.code,{children:"readonly"})," parameters if provided."]})]})]})]}),"\n",(0,l.jsx)(t.h2,{id:"functions",children:"Functions"}),"\n",(0,l.jsx)(t.h3,{id:"createcontext",children:"createContext"}),"\n",(0,l.jsxs)(t.p,{children:["\u25b8 ",(0,l.jsx)(t.strong,{children:"createContext"}),"(",(0,l.jsx)(t.code,{children:"params"}),"): ",(0,l.jsx)(t.a,{href:"/docs/preview/api/modules/runtime#context",children:(0,l.jsx)(t.code,{children:"Context"})})]}),"\n",(0,l.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,l.jsx)(t.tbody,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"params"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.a,{href:"/docs/preview/api/modules/runtime#contextparams",children:(0,l.jsx)(t.code,{children:"ContextParams"})})})]})})]}),"\n",(0,l.jsx)(t.h4,{id:"returns",children:"Returns"}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.a,{href:"/docs/preview/api/modules/runtime#context",children:(0,l.jsx)(t.code,{children:"Context"})})}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsx)(t.h3,{id:"creategraphqlschema",children:"createGraphQLSchema"}),"\n",(0,l.jsxs)(t.p,{children:["\u25b8 ",(0,l.jsx)(t.strong,{children:"createGraphQLSchema"}),"(",(0,l.jsx)(t.code,{children:"params"}),"): ",(0,l.jsx)(t.code,{children:"GraphQLSchema"})]}),"\n",(0,l.jsx)(t.p,{children:"Create a GraphQL schema from a runtime composite definition"}),"\n",(0,l.jsx)(t.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,l.jsx)(t.tbody,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"params"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"CreateSchemaParams"})})]})})]}),"\n",(0,l.jsx)(t.h4,{id:"returns-1",children:"Returns"}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.code,{children:"GraphQLSchema"})}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsx)(t.h3,{id:"getschema",children:"getSchema"}),"\n",(0,l.jsxs)(t.p,{children:["\u25b8 ",(0,l.jsx)(t.strong,{children:"getSchema"}),"(",(0,l.jsx)(t.code,{children:"params"}),"): ",(0,l.jsx)(t.code,{children:"GraphQLSchema"})]}),"\n",(0,l.jsx)(t.p,{children:"Use or create a GraphQL schema based on the provided parameters."}),"\n",(0,l.jsx)(t.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,l.jsx)(t.tbody,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"params"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.a,{href:"/docs/preview/api/modules/runtime#getschemaparams",children:(0,l.jsx)(t.code,{children:"GetSchemaParams"})})})]})})]}),"\n",(0,l.jsx)(t.h4,{id:"returns-2",children:"Returns"}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.code,{children:"GraphQLSchema"})}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsx)(t.h3,{id:"printgraphqlschema",children:"printGraphQLSchema"}),"\n",(0,l.jsxs)(t.p,{children:["\u25b8 ",(0,l.jsx)(t.strong,{children:"printGraphQLSchema"}),"(",(0,l.jsx)(t.code,{children:"definition"}),", ",(0,l.jsx)(t.code,{children:"readonly?"}),"): ",(0,l.jsx)(t.code,{children:"string"})]}),"\n",(0,l.jsx)(t.p,{children:"Create a GraphQL schema from a runtime composite definition and return its string\nrepresentation."}),"\n",(0,l.jsx)(t.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:"Default value"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"definition"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"RuntimeCompositeDefinition"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"undefined"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"readonly"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"boolean"})}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:(0,l.jsx)(t.code,{children:"false"})})]})]})]}),"\n",(0,l.jsx)(t.h4,{id:"returns-3",children:"Returns"}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.code,{children:"string"})})]})}function o(e={}){const{wrapper:t}={...(0,s.M)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(a,{...e})}):a(e)}},4496:(e,t,n)=>{n.d(t,{I:()=>d,M:()=>r});var l=n(5496);const s={},i=l.createContext(s);function r(e){const t=l.useContext(i);return l.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),l.createElement(i.Provider,{value:t},e.children)}}}]);