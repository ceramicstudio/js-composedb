"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4111],{4428:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>d,default:()=>x,frontMatter:()=>r,metadata:()=>c,toc:()=>o});var s=t(5250),l=t(7766);const r={id:"client.Context",title:"Class: Context",custom_edit_url:null},d=void 0,c={id:"api/classes/client.Context",title:"Class: Context",description:"client.Context",source:"@site/versioned_docs/version-0.2.x/api/classes/client.Context.md",sourceDirName:"api/classes",slug:"/api/classes/client.Context",permalink:"/docs/0.2.x/api/classes/client.Context",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.2.x",frontMatter:{id:"client.Context",title:"Class: Context",custom_edit_url:null},sidebar:"api",previous:{title:"Class: ComposeClient",permalink:"/docs/0.2.x/api/classes/client.ComposeClient"},next:{title:"Developer tools",permalink:"/docs/0.2.x/category/developer-tools"}},i={},o=[{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Accessors",id:"accessors",level:2},{value:"authenticated",id:"authenticated",level:3},{value:"Returns",id:"returns",level:4},{value:"ceramic",id:"ceramic",level:3},{value:"Returns",id:"returns-1",level:4},{value:"loader",id:"loader",level:3},{value:"Returns",id:"returns-2",level:4},{value:"viewerID",id:"viewerid",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Methods",id:"methods",level:2},{value:"createDoc",id:"createdoc",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-4",level:4},{value:"loadDoc",id:"loaddoc",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-5",level:4},{value:"queryConnection",id:"queryconnection",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-6",level:4},{value:"querySingle",id:"querysingle",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-7",level:4},{value:"updateDoc",id:"updatedoc",level:3},{value:"Type parameters",id:"type-parameters-2",level:4},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-8",level:4}];function h(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.a)(),...e.components},{Head:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t,{children:[(0,s.jsx)("meta",{name:"robots",content:"noindex"}),(0,s.jsx)("meta",{name:"googlebot",content:"noindex"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/docs/0.2.x/api/modules/client",children:"client"}),".Context"]}),"\n",(0,s.jsxs)(n.p,{children:["GraphQL execution context, exported by the ",(0,s.jsx)(n.a,{href:"/docs/0.2.x/api/modules/client",children:(0,s.jsx)(n.code,{children:"client"})})," module."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"import { Context } from '@composedb/client'\n"})}),"\n",(0,s.jsx)(n.h2,{id:"constructors",children:"Constructors"}),"\n",(0,s.jsx)(n.h3,{id:"constructor",children:"constructor"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"new Context"}),"(",(0,s.jsx)(n.code,{children:"params"}),")"]}),"\n",(0,s.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"params"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"/docs/0.2.x/api/modules/client#contextparams",children:(0,s.jsx)(n.code,{children:"ContextParams"})})})]})})]}),"\n",(0,s.jsx)(n.h2,{id:"accessors",children:"Accessors"}),"\n",(0,s.jsx)(n.h3,{id:"authenticated",children:"authenticated"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.code,{children:"get"})," ",(0,s.jsx)(n.strong,{children:"authenticated"}),"(): ",(0,s.jsx)(n.code,{children:"boolean"})]}),"\n",(0,s.jsx)(n.p,{children:"Returns whether the Ceramic client instance used internally is authenticated or not. When not\nauthenticated, mutations will fail."}),"\n",(0,s.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"boolean"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"ceramic",children:"ceramic"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.code,{children:"get"})," ",(0,s.jsx)(n.strong,{children:"ceramic"}),"(): ",(0,s.jsx)(n.code,{children:"CeramicApi"})]}),"\n",(0,s.jsx)(n.p,{children:"Ceramic client instance used internally."}),"\n",(0,s.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"CeramicApi"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"loader",children:"loader"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.code,{children:"get"})," ",(0,s.jsx)(n.strong,{children:"loader"}),"(): ",(0,s.jsx)(n.code,{children:"DocumentLoader"})]}),"\n",(0,s.jsx)(n.p,{children:"Document loader instance used internally."}),"\n",(0,s.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"DocumentLoader"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"viewerid",children:"viewerID"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.code,{children:"get"})," ",(0,s.jsx)(n.strong,{children:"viewerID"}),"(): ",(0,s.jsx)(n.code,{children:"null"})," | ",(0,s.jsx)(n.code,{children:"string"})]}),"\n",(0,s.jsx)(n.p,{children:"ID of the current viewer (authenticated DID), if set."}),"\n",(0,s.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"null"})," | ",(0,s.jsx)(n.code,{children:"string"})]}),"\n",(0,s.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(n.h3,{id:"createdoc",children:"createDoc"}),"\n",(0,s.jsxs)(n.p,{children:["\u25b8 ",(0,s.jsx)(n.strong,{children:"createDoc"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">(",(0,s.jsx)(n.code,{children:"model"}),", ",(0,s.jsx)(n.code,{children:"content"}),"): ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">>"]}),"\n",(0,s.jsx)(n.p,{children:"Create a new document with the given model and content."}),"\n",(0,s.jsx)(n.h4,{id:"type-parameters",children:"Type parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"Content"})}),(0,s.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,s.jsx)(n.code,{children:"Record"}),"<",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"model"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"string"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"content"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"Content"})})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">>"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"loaddoc",children:"loadDoc"}),"\n",(0,s.jsxs)(n.p,{children:["\u25b8 ",(0,s.jsx)(n.strong,{children:"loadDoc"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">(",(0,s.jsx)(n.code,{children:"id"}),", ",(0,s.jsx)(n.code,{children:"fresh?"}),"): ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">>"]}),"\n",(0,s.jsx)(n.p,{children:"Load a document by ID, using the cache if possible."}),"\n",(0,s.jsx)(n.h4,{id:"type-parameters-1",children:"Type parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"Content"})}),(0,s.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,s.jsx)(n.code,{children:"Record"}),"<",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Default value"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"id"})}),(0,s.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,s.jsx)(n.code,{children:"string"})," | ",(0,s.jsx)(n.code,{children:"StreamID"})," | ",(0,s.jsx)(n.code,{children:"CommitID"})]}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"undefined"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"fresh"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"boolean"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"false"})})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">>"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"queryconnection",children:"queryConnection"}),"\n",(0,s.jsxs)(n.p,{children:["\u25b8 ",(0,s.jsx)(n.strong,{children:"queryConnection"}),"(",(0,s.jsx)(n.code,{children:"query"}),"): ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"Connection"}),"<",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Record"}),"<",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"any"}),">>>>"]}),"\n",(0,s.jsx)(n.p,{children:"Query the index for a connection of documents."}),"\n",(0,s.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"query"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"ConnectionQuery"})})]})})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"Connection"}),"<",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Record"}),"<",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"any"}),">>>>"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"querysingle",children:"querySingle"}),"\n",(0,s.jsxs)(n.p,{children:["\u25b8 ",(0,s.jsx)(n.strong,{children:"querySingle"}),"(",(0,s.jsx)(n.code,{children:"query"}),"): ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"null"})," | ",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Record"}),"<",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"any"}),">>>"]}),"\n",(0,s.jsx)(n.p,{children:"Query the index for a single document."}),"\n",(0,s.jsx)(n.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"query"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"BaseQuery"})})]})})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-7",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"null"})," | ",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Record"}),"<",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"any"}),">>>"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"updatedoc",children:"updateDoc"}),"\n",(0,s.jsxs)(n.p,{children:["\u25b8 ",(0,s.jsx)(n.strong,{children:"updateDoc"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">(",(0,s.jsx)(n.code,{children:"id"}),", ",(0,s.jsx)(n.code,{children:"content"}),", ",(0,s.jsx)(n.code,{children:"options?"}),"): ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">>"]}),"\n",(0,s.jsx)(n.p,{children:"Update an existing document."}),"\n",(0,s.jsx)(n.h4,{id:"type-parameters-2",children:"Type parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"Content"})}),(0,s.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,s.jsx)(n.code,{children:"Record"}),"<",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(n.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"id"})}),(0,s.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,s.jsx)(n.code,{children:"string"})," | ",(0,s.jsx)(n.code,{children:"StreamID"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"content"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"Content"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"options?"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"UpdateDocOptions"})})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-8",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(n.code,{children:"Content"}),">>"]})]})}function x(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},7766:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>d});var s=t(79);const l={},r=s.createContext(l);function d(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:d(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);