"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3897],{342:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>x,frontMatter:()=>r,metadata:()=>i,toc:()=>o});var t=s(6106),l=s(9252);const r={id:"client.ComposeClient",title:"Class: ComposeClient",custom_edit_url:null},d=void 0,i={id:"api/classes/client.ComposeClient",title:"Class: ComposeClient",description:"client.ComposeClient",source:"@site/versioned_docs/version-0.3.x/api/classes/client.ComposeClient.md",sourceDirName:"api/classes",slug:"/api/classes/client.ComposeClient",permalink:"/docs/0.3.x/api/classes/client.ComposeClient",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.3.x",frontMatter:{id:"client.ComposeClient",title:"Class: ComposeClient",custom_edit_url:null},sidebar:"api",previous:{title:"Overview",permalink:"/docs/0.3.x/api/modules/client"},next:{title:"Context class",permalink:"/docs/0.3.x/api/classes/client.Context"}},c={},o=[{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Accessors",id:"accessors",level:2},{value:"context",id:"context",level:3},{value:"Returns",id:"returns",level:4},{value:"did",id:"did",level:3},{value:"Returns",id:"returns-1",level:4},{value:"id",id:"id",level:3},{value:"Returns",id:"returns-2",level:4},{value:"resources",id:"resources",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Methods",id:"methods",level:2},{value:"execute",id:"execute",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-4",level:4},{value:"executeQuery",id:"executequery",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-5",level:4},{value:"setDID",id:"setdid",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-6",level:4}];function h(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.R)(),...e.components},{Head:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s,{children:[(0,t.jsx)("meta",{name:"robots",content:"noindex"}),(0,t.jsx)("meta",{name:"googlebot",content:"noindex"})]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"/docs/0.3.x/api/modules/client",children:"client"}),".ComposeClient"]}),"\n",(0,t.jsxs)(n.p,{children:["The ComposeClient class provides APIs to execute queries on a GraphQL schema generated from a\n",(0,t.jsx)(n.code,{children:"RuntimeCompositeDefinition"}),". It allows applications to interact with documents using known\nmodels on a Ceramic node."]}),"\n",(0,t.jsxs)(n.p,{children:["It is exported by the ",(0,t.jsx)(n.a,{href:"/docs/0.3.x/api/modules/client",children:(0,t.jsx)(n.code,{children:"client"})})," module."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"import { ComposeClient } from '@composedb/client'\n"})}),"\n",(0,t.jsx)(n.h2,{id:"constructors",children:"Constructors"}),"\n",(0,t.jsx)(n.h3,{id:"constructor",children:"constructor"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"new ComposeClient"}),"(",(0,t.jsx)(n.code,{children:"params"}),")"]}),"\n",(0,t.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"params"})}),(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.a,{href:"/docs/0.3.x/api/modules/client#composeclientparams",children:(0,t.jsx)(n.code,{children:"ComposeClientParams"})})})]})})]}),"\n",(0,t.jsx)(n.h2,{id:"accessors",children:"Accessors"}),"\n",(0,t.jsx)(n.h3,{id:"context",children:"context"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.code,{children:"get"})," ",(0,t.jsx)(n.strong,{children:"context"}),"(): ",(0,t.jsx)(n.a,{href:"/docs/0.3.x/api/classes/client.Context",children:(0,t.jsx)(n.code,{children:"Context"})})]}),"\n",(0,t.jsx)(n.p,{children:"Context instance used internally."}),"\n",(0,t.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"/docs/0.3.x/api/classes/client.Context",children:(0,t.jsx)(n.code,{children:"Context"})})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"did",children:"did"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.code,{children:"get"})," ",(0,t.jsx)(n.strong,{children:"did"}),"(): ",(0,t.jsx)(n.code,{children:"undefined"})," | ",(0,t.jsx)(n.code,{children:"DID"})]}),"\n",(0,t.jsx)(n.p,{children:"DID instance used internally by the Ceramic client instance."}),"\n",(0,t.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"undefined"})," | ",(0,t.jsx)(n.code,{children:"DID"})]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"id",children:"id"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.code,{children:"get"})," ",(0,t.jsx)(n.strong,{children:"id"}),"(): ",(0,t.jsx)(n.code,{children:"null"})," | ",(0,t.jsx)(n.code,{children:"string"})]}),"\n",(0,t.jsxs)(n.p,{children:["ID of the DID attached to the Ceramic client instance used internally. If ",(0,t.jsx)(n.code,{children:"null"}),", the\nCeramic instance is not authenticated and mutations will fail."]}),"\n",(0,t.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"null"})," | ",(0,t.jsx)(n.code,{children:"string"})]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"resources",children:"resources"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.code,{children:"get"})," ",(0,t.jsx)(n.strong,{children:"resources"}),"(): ",(0,t.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,t.jsx)(n.p,{children:"CACAO resources URLs for the models the client interacts with."}),"\n",(0,t.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,t.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,t.jsx)(n.h3,{id:"execute",children:"execute"}),"\n",(0,t.jsxs)(n.p,{children:["\u25b8 ",(0,t.jsx)(n.strong,{children:"execute"}),"<",(0,t.jsx)(n.code,{children:"Data"}),">(",(0,t.jsx)(n.code,{children:"document"}),", ",(0,t.jsx)(n.code,{children:"variableValues?"}),"): ",(0,t.jsx)(n.code,{children:"Promise"}),"<",(0,t.jsx)(n.code,{children:"ExecutionResult"}),"<",(0,t.jsx)(n.code,{children:"Data"}),", ",(0,t.jsx)(n.code,{children:"ObjMap"}),"<",(0,t.jsx)(n.code,{children:"unknown"}),">>>"]}),"\n",(0,t.jsx)(n.p,{children:"Execute a GraphQL query from a DocumentNode and optional variables."}),"\n",(0,t.jsx)(n.h4,{id:"type-parameters",children:"Type parameters"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"Data"})}),(0,t.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,t.jsx)(n.code,{children:"Record"}),"<",(0,t.jsx)(n.code,{children:"string"}),", ",(0,t.jsx)(n.code,{children:"unknown"}),">"]})]})})]}),"\n",(0,t.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"document"})}),(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"DocumentNode"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"variableValues?"})}),(0,t.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,t.jsx)(n.code,{children:"Record"}),"<",(0,t.jsx)(n.code,{children:"string"}),", ",(0,t.jsx)(n.code,{children:"unknown"}),">"]})]})]})]}),"\n",(0,t.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"Promise"}),"<",(0,t.jsx)(n.code,{children:"ExecutionResult"}),"<",(0,t.jsx)(n.code,{children:"Data"}),", ",(0,t.jsx)(n.code,{children:"ObjMap"}),"<",(0,t.jsx)(n.code,{children:"unknown"}),">>>"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"executequery",children:"executeQuery"}),"\n",(0,t.jsxs)(n.p,{children:["\u25b8 ",(0,t.jsx)(n.strong,{children:"executeQuery"}),"<",(0,t.jsx)(n.code,{children:"Data"}),">(",(0,t.jsx)(n.code,{children:"source"}),", ",(0,t.jsx)(n.code,{children:"variableValues?"}),"): ",(0,t.jsx)(n.code,{children:"Promise"}),"<",(0,t.jsx)(n.code,{children:"ExecutionResult"}),"<",(0,t.jsx)(n.code,{children:"Data"}),", ",(0,t.jsx)(n.code,{children:"ObjMap"}),"<",(0,t.jsx)(n.code,{children:"unknown"}),">>>"]}),"\n",(0,t.jsx)(n.p,{children:"Execute a GraphQL query from its source and optional variables."}),"\n",(0,t.jsx)(n.h4,{id:"type-parameters-1",children:"Type parameters"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"Data"})}),(0,t.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,t.jsx)(n.code,{children:"Record"}),"<",(0,t.jsx)(n.code,{children:"string"}),", ",(0,t.jsx)(n.code,{children:"unknown"}),">"]})]})})]}),"\n",(0,t.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"source"})}),(0,t.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,t.jsx)(n.code,{children:"string"})," | ",(0,t.jsx)(n.code,{children:"Source"})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"variableValues?"})}),(0,t.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,t.jsx)(n.code,{children:"Record"}),"<",(0,t.jsx)(n.code,{children:"string"}),", ",(0,t.jsx)(n.code,{children:"unknown"}),">"]})]})]})]}),"\n",(0,t.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"Promise"}),"<",(0,t.jsx)(n.code,{children:"ExecutionResult"}),"<",(0,t.jsx)(n.code,{children:"Data"}),", ",(0,t.jsx)(n.code,{children:"ObjMap"}),"<",(0,t.jsx)(n.code,{children:"unknown"}),">>>"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"setdid",children:"setDID"}),"\n",(0,t.jsxs)(n.p,{children:["\u25b8 ",(0,t.jsx)(n.strong,{children:"setDID"}),"(",(0,t.jsx)(n.code,{children:"did"}),"): ",(0,t.jsx)(n.code,{children:"void"})]}),"\n",(0,t.jsx)(n.p,{children:"Attach the given DID instance to the Ceramic client instance used internally. An authenticated\nDID instance is necessary to perform GraphQL mutations."}),"\n",(0,t.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"did"})}),(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"DID"})})]})})]}),"\n",(0,t.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"void"})})]})}function x(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},9252:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>i});var t=s(7378);const l={},r=t.createContext(l);function d(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:d(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);