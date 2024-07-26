"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9410],{3545:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>o});var n=t(6106),r=t(9252);const l={id:"runtime.ComposeRuntime",title:"Class: ComposeRuntime",custom_edit_url:null},i=void 0,c={id:"api/classes/runtime.ComposeRuntime",title:"Class: ComposeRuntime",description:"runtime.ComposeRuntime",source:"@site/versioned_docs/version-0.8.x/api/classes/runtime.ComposeRuntime.md",sourceDirName:"api/classes",slug:"/api/classes/runtime.ComposeRuntime",permalink:"/docs/0.8.x/api/classes/runtime.ComposeRuntime",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.8.x",frontMatter:{id:"runtime.ComposeRuntime",title:"Class: ComposeRuntime",custom_edit_url:null},sidebar:"api",previous:{title:"ComposeClient class",permalink:"/docs/0.8.x/api/classes/client.ComposeClient"},next:{title:"DocumentLoader class",permalink:"/docs/0.8.x/api/classes/loader.DocumentLoader"}},d={},o=[{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Accessors",id:"accessors",level:2},{value:"context",id:"context",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Methods",id:"methods",level:2},{value:"execute",id:"execute",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"executeQuery",id:"executequery",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-3",level:4}];function x(e){const s={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/docs/0.8.x/api/modules/runtime",children:"runtime"}),".ComposeRuntime"]}),"\n",(0,n.jsxs)(s.p,{children:["The ComposeRuntime class provides APIs to execute queries on a GraphQL schema generated from a\n",(0,n.jsx)(s.code,{children:"RuntimeCompositeDefinition"}),". It allows applications to interact with documents using known\nmodels on a Ceramic node."]}),"\n",(0,n.jsxs)(s.p,{children:["It is exported by the ",(0,n.jsx)(s.a,{href:"/docs/0.8.x/api/modules/runtime",children:(0,n.jsx)(s.code,{children:"runtime"})})," module."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sh",children:"import { ComposeRuntime } from '@composedb/runtime'\n"})}),"\n",(0,n.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,n.jsx)(s.h3,{id:"constructor",children:"constructor"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"new ComposeRuntime"}),"(",(0,n.jsx)(s.code,{children:"params"}),"): ",(0,n.jsx)(s.a,{href:"/docs/0.8.x/api/classes/runtime.ComposeRuntime",children:(0,n.jsx)(s.code,{children:"ComposeRuntime"})})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"params"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.a,{href:"/docs/0.8.x/api/modules/runtime#composeruntimeparams",children:(0,n.jsx)(s.code,{children:"ComposeRuntimeParams"})})})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.8.x/api/classes/runtime.ComposeRuntime",children:(0,n.jsx)(s.code,{children:"ComposeRuntime"})})}),"\n",(0,n.jsx)(s.h2,{id:"accessors",children:"Accessors"}),"\n",(0,n.jsx)(s.h3,{id:"context",children:"context"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.code,{children:"get"})," ",(0,n.jsx)(s.strong,{children:"context"}),"(): ",(0,n.jsx)(s.a,{href:"/docs/0.8.x/api/modules/runtime#context",children:(0,n.jsx)(s.code,{children:"Context"})})]}),"\n",(0,n.jsx)(s.p,{children:"Context object used internally."}),"\n",(0,n.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.8.x/api/modules/runtime#context",children:(0,n.jsx)(s.code,{children:"Context"})})}),"\n",(0,n.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(s.h3,{id:"execute",children:"execute"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"execute"}),"<",(0,n.jsx)(s.code,{children:"Data"}),">(",(0,n.jsx)(s.code,{children:"document"}),", ",(0,n.jsx)(s.code,{children:"variableValues?"}),"): ",(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.code,{children:"ExecutionResult"}),"<",(0,n.jsx)(s.code,{children:"Data"}),", ",(0,n.jsx)(s.code,{children:"ObjMap"}),"<",(0,n.jsx)(s.code,{children:"unknown"}),">>>"]}),"\n",(0,n.jsx)(s.p,{children:"Execute a GraphQL query from a DocumentNode and optional variables."}),"\n",(0,n.jsx)(s.h4,{id:"type-parameters",children:"Type parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"Data"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"Record"}),"<",(0,n.jsx)(s.code,{children:"string"}),", ",(0,n.jsx)(s.code,{children:"unknown"}),">"]})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"document"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"DocumentNode"})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"variableValues?"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"Record"}),"<",(0,n.jsx)(s.code,{children:"string"}),", ",(0,n.jsx)(s.code,{children:"unknown"}),">"]})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.code,{children:"ExecutionResult"}),"<",(0,n.jsx)(s.code,{children:"Data"}),", ",(0,n.jsx)(s.code,{children:"ObjMap"}),"<",(0,n.jsx)(s.code,{children:"unknown"}),">>>"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"executequery",children:"executeQuery"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"executeQuery"}),"<",(0,n.jsx)(s.code,{children:"Data"}),">(",(0,n.jsx)(s.code,{children:"source"}),", ",(0,n.jsx)(s.code,{children:"variableValues?"}),"): ",(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.code,{children:"ExecutionResult"}),"<",(0,n.jsx)(s.code,{children:"Data"}),", ",(0,n.jsx)(s.code,{children:"ObjMap"}),"<",(0,n.jsx)(s.code,{children:"unknown"}),">>>"]}),"\n",(0,n.jsx)(s.p,{children:"Execute a GraphQL query from its source and optional variables."}),"\n",(0,n.jsx)(s.h4,{id:"type-parameters-1",children:"Type parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"Data"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"Record"}),"<",(0,n.jsx)(s.code,{children:"string"}),", ",(0,n.jsx)(s.code,{children:"unknown"}),">"]})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"source"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"string"})," | ",(0,n.jsx)(s.code,{children:"Source"})]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"variableValues?"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"Record"}),"<",(0,n.jsx)(s.code,{children:"string"}),", ",(0,n.jsx)(s.code,{children:"unknown"}),">"]})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-3",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.code,{children:"ExecutionResult"}),"<",(0,n.jsx)(s.code,{children:"Data"}),", ",(0,n.jsx)(s.code,{children:"ObjMap"}),"<",(0,n.jsx)(s.code,{children:"unknown"}),">>>"]})]})}function h(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(x,{...e})}):x(e)}},9252:(e,s,t)=>{t.d(s,{R:()=>i,x:()=>c});var n=t(7378);const r={},l=n.createContext(r);function i(e){const s=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(l.Provider,{value:s},e.children)}}}]);