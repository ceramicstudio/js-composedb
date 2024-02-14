"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7828],{2272:(e,d,l)=>{l.r(d),l.d(d,{assets:()=>i,contentTitle:()=>t,default:()=>x,frontMatter:()=>n,metadata:()=>c,toc:()=>h});var s=l(7512),r=l(4496);const n={id:"loader.DocumentLoader",title:"Class: DocumentLoader",custom_edit_url:null},t=void 0,c={id:"api/classes/loader.DocumentLoader",title:"Class: DocumentLoader",description:"loader.DocumentLoader",source:"@site/docs/api/classes/loader.DocumentLoader.md",sourceDirName:"api/classes",slug:"/api/classes/loader.DocumentLoader",permalink:"/docs/preview/api/classes/loader.DocumentLoader",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"loader.DocumentLoader",title:"Class: DocumentLoader",custom_edit_url:null},sidebar:"api",previous:{title:"Class: ComposeRuntime",permalink:"/docs/preview/api/classes/runtime.ComposeRuntime"},next:{title:"Developer tools",permalink:"/docs/preview/category/developer-tools"}},i={},h=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Methods",id:"methods",level:2},{value:"_getDeterministicKey",id:"_getdeterministickey",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"_loadDeterministic",id:"_loaddeterministic",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"cache",id:"cache",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"create",id:"create",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-4",level:4},{value:"load",id:"load",level:3},{value:"Type parameters",id:"type-parameters-2",level:4},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"loadSet",id:"loadset",level:3},{value:"Type parameters",id:"type-parameters-3",level:4},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-6",level:4},{value:"loadSingle",id:"loadsingle",level:3},{value:"Type parameters",id:"type-parameters-4",level:4},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-7",level:4},{value:"queryConnection",id:"queryconnection",level:3},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-8",level:4},{value:"queryOne",id:"queryone",level:3},{value:"Parameters",id:"parameters-9",level:4},{value:"Returns",id:"returns-9",level:4},{value:"update",id:"update",level:3},{value:"Type parameters",id:"type-parameters-5",level:4},{value:"Parameters",id:"parameters-10",level:4},{value:"Returns",id:"returns-10",level:4}];function o(e){const d={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader",children:"loader"}),".DocumentLoader"]}),"\n",(0,s.jsx)(d.p,{children:"The DocumentLoader class provides APIs to batch load and cache ModelInstanceDocument streams."}),"\n",(0,s.jsxs)(d.p,{children:["It is exported by the ",(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader",children:(0,s.jsx)(d.code,{children:"loader"})})," module."]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-sh",children:"import { DocumentLoader } from '@composedb/loader'\n"})}),"\n",(0,s.jsx)(d.h2,{id:"hierarchy",children:"Hierarchy"}),"\n",(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsxs)(d.li,{children:["\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"DataLoader"}),"<",(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader#loadkey",children:(0,s.jsx)(d.code,{children:"LoadKey"})}),", ",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),", ",(0,s.jsx)(d.code,{children:"string"}),">"]}),"\n",(0,s.jsxs)(d.p,{children:["\u21b3 ",(0,s.jsx)(d.strong,{children:(0,s.jsx)(d.code,{children:"DocumentLoader"})})]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(d.h2,{id:"constructors",children:"Constructors"}),"\n",(0,s.jsx)(d.h3,{id:"constructor",children:"constructor"}),"\n",(0,s.jsxs)(d.p,{children:["\u2022 ",(0,s.jsx)(d.strong,{children:"new DocumentLoader"}),"(",(0,s.jsx)(d.code,{children:"params"}),"): ",(0,s.jsx)(d.a,{href:"/docs/preview/api/classes/loader.DocumentLoader",children:(0,s.jsx)(d.code,{children:"DocumentLoader"})})]}),"\n",(0,s.jsx)(d.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"params"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader#documentloaderparams",children:(0,s.jsx)(d.code,{children:"DocumentLoaderParams"})})})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.a,{href:"/docs/preview/api/classes/loader.DocumentLoader",children:(0,s.jsx)(d.code,{children:"DocumentLoader"})})}),"\n",(0,s.jsx)(d.h4,{id:"overrides",children:"Overrides"}),"\n",(0,s.jsx)(d.p,{children:"DataLoader&lt;LoadKey, ModelInstanceDocument, string&gt;.constructor"}),"\n",(0,s.jsx)(d.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(d.h3,{id:"_getdeterministickey",children:"_getDeterministicKey"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"_getDeterministicKey"}),"(",(0,s.jsx)(d.code,{children:"meta"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader#loadkey",children:(0,s.jsx)(d.code,{children:"LoadKey"})}),">"]}),"\n",(0,s.jsx)(d.p,{children:"Get or create the LoadKey for a deterministic stream."}),"\n",(0,s.jsx)(d.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"meta"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"GenesisMetadata"})})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader#loadkey",children:(0,s.jsx)(d.code,{children:"LoadKey"})}),">"]}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"_loaddeterministic",children:"_loadDeterministic"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"_loadDeterministic"}),"<",(0,s.jsx)(d.code,{children:"T"}),">(",(0,s.jsx)(d.code,{children:"meta"}),", ",(0,s.jsx)(d.code,{children:"options?"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.p,{children:"Load a deterministic stream and add it to the cache."}),"\n",(0,s.jsx)(d.h4,{id:"type-parameters",children:"Type parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"T"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),"> = ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"meta"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"GenesisMetadata"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"options"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"CreateOpts"})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"cache",children:"cache"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"cache"}),"(",(0,s.jsx)(d.code,{children:"stream"}),"): ",(0,s.jsx)(d.code,{children:"boolean"})]}),"\n",(0,s.jsx)(d.p,{children:"Add a ModelInstanceDocument to the local cache, if enabled."}),"\n",(0,s.jsx)(d.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"stream"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:[(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">>"]})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-3",children:"Returns"}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsx)(d.code,{children:"boolean"})}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"create",children:"create"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"create"}),"<",(0,s.jsx)(d.code,{children:"T"}),">(",(0,s.jsx)(d.code,{children:"model"}),", ",(0,s.jsx)(d.code,{children:"content"}),", ",(0,s.jsx)(d.code,{children:"\xabdestructured\xbb?"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.p,{children:"Create a new ModelInstanceDocument and add it to the cache, if enabled."}),"\n",(0,s.jsx)(d.h4,{id:"type-parameters-1",children:"Type parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"T"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),"> = ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"model"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:[(0,s.jsx)(d.code,{children:"string"})," | ",(0,s.jsx)(d.code,{children:"StreamID"})]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"content"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"T"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"\xabdestructured\xbb"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader#createoptions",children:(0,s.jsx)(d.code,{children:"CreateOptions"})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-4",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"load",children:"load"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"load"}),"<",(0,s.jsx)(d.code,{children:"T"}),">(",(0,s.jsx)(d.code,{children:"key"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.p,{children:"Load a ModelInstanceDocument from the cache (if enabled) or remotely."}),"\n",(0,s.jsx)(d.h4,{id:"type-parameters-2",children:"Type parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"T"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),"> = ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"key"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader#loadkey",children:(0,s.jsx)(d.code,{children:"LoadKey"})})})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-5",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,s.jsx)(d.p,{children:"DataLoader.load"}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"loadset",children:"loadSet"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"loadSet"}),"<",(0,s.jsx)(d.code,{children:"T"}),">(",(0,s.jsx)(d.code,{children:"controller"}),", ",(0,s.jsx)(d.code,{children:"model"}),", ",(0,s.jsx)(d.code,{children:"unique"}),", ",(0,s.jsx)(d.code,{children:"options?"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.p,{children:"Create or load a deterministic ModelInstanceDocument using the SET account\nrelation and cache it."}),"\n",(0,s.jsx)(d.h4,{id:"type-parameters-3",children:"Type parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"T"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),"> = ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"controller"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"string"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"model"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:[(0,s.jsx)(d.code,{children:"string"})," | ",(0,s.jsx)(d.code,{children:"StreamID"})]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"unique"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:[(0,s.jsx)(d.code,{children:"string"}),"[]"]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"options?"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"CreateOpts"})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-6",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"loadsingle",children:"loadSingle"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"loadSingle"}),"<",(0,s.jsx)(d.code,{children:"T"}),">(",(0,s.jsx)(d.code,{children:"controller"}),", ",(0,s.jsx)(d.code,{children:"model"}),", ",(0,s.jsx)(d.code,{children:"options?"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.p,{children:"Create or load a deterministic ModelInstanceDocument and cache it."}),"\n",(0,s.jsx)(d.h4,{id:"type-parameters-4",children:"Type parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"T"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),"> = ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"parameters-7",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"controller"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"string"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"model"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:[(0,s.jsx)(d.code,{children:"string"})," | ",(0,s.jsx)(d.code,{children:"StreamID"})]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"options?"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"CreateOpts"})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-7",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"queryconnection",children:"queryConnection"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"queryConnection"}),"(",(0,s.jsx)(d.code,{children:"query"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"Connection"}),"<",(0,s.jsx)(d.code,{children:"null"})," | ",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">>>>"]}),"\n",(0,s.jsx)(d.p,{children:"Query the index for multiple ModelInstanceDocument streams and cache the results."}),"\n",(0,s.jsx)(d.h4,{id:"parameters-8",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"query"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader#connectionquery",children:(0,s.jsx)(d.code,{children:"ConnectionQuery"})})})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-8",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"Connection"}),"<",(0,s.jsx)(d.code,{children:"null"})," | ",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">>>>"]}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"queryone",children:"queryOne"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"queryOne"}),"(",(0,s.jsx)(d.code,{children:"query"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"null"})," | ",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">>>"]}),"\n",(0,s.jsx)(d.p,{children:"Query the index for a single ModelInstanceDocument stream and cache it."}),"\n",(0,s.jsx)(d.h4,{id:"parameters-9",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"query"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"BaseQuery"})})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-9",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"null"})," | ",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">>>"]}),"\n",(0,s.jsx)(d.hr,{}),"\n",(0,s.jsx)(d.h3,{id:"update",children:"update"}),"\n",(0,s.jsxs)(d.p,{children:["\u25b8 ",(0,s.jsx)(d.strong,{children:"update"}),"<",(0,s.jsx)(d.code,{children:"T"}),">(",(0,s.jsx)(d.code,{children:"streamID"}),", ",(0,s.jsx)(d.code,{children:"content"}),", ",(0,s.jsx)(d.code,{children:"\xabdestructured\xbb?"}),"): ",(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]}),"\n",(0,s.jsx)(d.p,{children:"Update a ModelInstanceDocument after loading the stream remotely, bypassing the cache."}),"\n",(0,s.jsx)(d.h4,{id:"type-parameters-5",children:"Type parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsx)(d.tbody,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"T"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:["extends ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),"> = ",(0,s.jsx)(d.code,{children:"Record"}),"<",(0,s.jsx)(d.code,{children:"string"}),", ",(0,s.jsx)(d.code,{children:"any"}),">"]})]})})]}),"\n",(0,s.jsx)(d.h4,{id:"parameters-10",children:"Parameters"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(d.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"streamID"})}),(0,s.jsxs)(d.td,{style:{textAlign:"left"},children:[(0,s.jsx)(d.code,{children:"string"})," | ",(0,s.jsx)(d.code,{children:"StreamID"})]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"content"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"T"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.code,{children:"\xabdestructured\xbb"})}),(0,s.jsx)(d.td,{style:{textAlign:"left"},children:(0,s.jsx)(d.a,{href:"/docs/preview/api/modules/loader#updateoptions",children:(0,s.jsx)(d.code,{children:"UpdateOptions"})})})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"returns-10",children:"Returns"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"Promise"}),"<",(0,s.jsx)(d.code,{children:"ModelInstanceDocument"}),"<",(0,s.jsx)(d.code,{children:"T"}),">>"]})]})}function x(e={}){const{wrapper:d}={...(0,r.M)(),...e.components};return d?(0,s.jsx)(d,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},4496:(e,d,l)=>{l.d(d,{I:()=>c,M:()=>t});var s=l(5496);const r={},n=s.createContext(r);function t(e){const d=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function c(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),s.createElement(n.Provider,{value:d},e.children)}}}]);