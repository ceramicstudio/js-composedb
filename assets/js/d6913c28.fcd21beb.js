"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2742],{3367:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>o,contentTitle:()=>r,default:()=>x,frontMatter:()=>i,metadata:()=>d,toc:()=>c});var n=t(5250),l=t(9074);const i={id:"devtools.Composite",title:"Class: Composite",custom_edit_url:null},r=void 0,d={id:"api/classes/devtools.Composite",title:"Class: Composite",description:"devtools.Composite",source:"@site/versioned_docs/version-0.3.x/api/classes/devtools.Composite.md",sourceDirName:"api/classes",slug:"/api/classes/devtools.Composite",permalink:"/docs/0.3.x/api/classes/devtools.Composite",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.3.x",frontMatter:{id:"devtools.Composite",title:"Class: Composite",custom_edit_url:null},sidebar:"api",previous:{title:"Module: devtools-node",permalink:"/docs/0.3.x/api/modules/devtools_node"},next:{title:"CLI",permalink:"/docs/0.3.x/category/cli"}},o={},c=[{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Properties",id:"properties",level:2},{value:"VERSION",id:"version",level:3},{value:"Accessors",id:"accessors",level:2},{value:"hash",id:"hash",level:3},{value:"Returns",id:"returns",level:4},{value:"modelIDs",id:"modelids",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Methods",id:"methods",level:2},{value:"copy",id:"copy",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"equals",id:"equals",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-3",level:4},{value:"merge",id:"merge",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-4",level:4},{value:"setAliases",id:"setaliases",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-5",level:4},{value:"setCommonEmbeds",id:"setcommonembeds",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-6",level:4},{value:"setViews",id:"setviews",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-7",level:4},{value:"startIndexingOn",id:"startindexingon",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-8",level:4},{value:"toJSON",id:"tojson",level:3},{value:"Returns",id:"returns-9",level:4},{value:"toParams",id:"toparams",level:3},{value:"Returns",id:"returns-10",level:4},{value:"toRuntime",id:"toruntime",level:3},{value:"Returns",id:"returns-11",level:4},{value:"create",id:"create",level:3},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-12",level:4},{value:"from",id:"from",level:3},{value:"Parameters",id:"parameters-9",level:4},{value:"Returns",id:"returns-13",level:4},{value:"fromJSON",id:"fromjson",level:3},{value:"Parameters",id:"parameters-10",level:4},{value:"Returns",id:"returns-14",level:4},{value:"fromModels",id:"frommodels",level:3},{value:"Parameters",id:"parameters-11",level:4},{value:"Returns",id:"returns-15",level:4}];function h(e){const s={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.a)(),...e.components},{Head:t}=s;return t||function(e,s){throw new Error("Expected "+(s?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t,{children:[(0,n.jsx)("meta",{name:"robots",content:"noindex"}),(0,n.jsx)("meta",{name:"googlebot",content:"noindex"})]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools",children:"devtools"}),".Composite"]}),"\n",(0,n.jsxs)(s.p,{children:["The Composite class provides APIs for managing composites (sets of Model streams) through their\ndevelopment lifecycle, including the creation of new Models, import and export of existing\ncomposites encoded as JSON, and compilation to the runtime format used by the\n",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/client.ComposeClient",children:(0,n.jsx)(s.code,{children:"ComposeClient class"})}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["Composite instances are ",(0,n.jsx)(s.strong,{children:"immutable"}),", so methods affecting the contents of the internal\ncomposite definition will ",(0,n.jsx)(s.strong,{children:"return new instances"})," of the Composite class."]}),"\n",(0,n.jsxs)(s.p,{children:["Composite class is exported by the ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools",children:(0,n.jsx)(s.code,{children:"devtools"})})," module."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sh",children:"import { Composite } from '@composedb/devtools'\n"})}),"\n",(0,n.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,n.jsx)(s.h3,{id:"constructor",children:"constructor"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.strong,{children:"new Composite"}),"(",(0,n.jsx)(s.code,{children:"params"}),")"]}),"\n",(0,n.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"params"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeparams",children:(0,n.jsx)(s.code,{children:"CompositeParams"})})})]})})]}),"\n",(0,n.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,n.jsx)(s.h3,{id:"version",children:"VERSION"}),"\n",(0,n.jsxs)(s.p,{children:["\u25aa ",(0,n.jsx)(s.code,{children:"Static"})," ",(0,n.jsx)(s.strong,{children:"VERSION"}),": ",(0,n.jsx)(s.code,{children:"string"})," = ",(0,n.jsx)(s.code,{children:"'1.0'"})]}),"\n",(0,n.jsx)(s.p,{children:"Current version of the composites format."}),"\n",(0,n.jsx)(s.h2,{id:"accessors",children:"Accessors"}),"\n",(0,n.jsx)(s.h3,{id:"hash",children:"hash"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.code,{children:"get"})," ",(0,n.jsx)(s.strong,{children:"hash"}),"(): ",(0,n.jsx)(s.code,{children:"string"})]}),"\n",(0,n.jsx)(s.p,{children:"Stable hash of the internal definition, mostly used for comparisons."}),"\n",(0,n.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"string"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"modelids",children:"modelIDs"}),"\n",(0,n.jsxs)(s.p,{children:["\u2022 ",(0,n.jsx)(s.code,{children:"get"})," ",(0,n.jsx)(s.strong,{children:"modelIDs"}),"(): ",(0,n.jsx)(s.code,{children:"string"}),"[]"]}),"\n",(0,n.jsx)(s.p,{children:"StreamID of the Models used in the Composite."}),"\n",(0,n.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"string"}),"[]"]}),"\n",(0,n.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(s.h3,{id:"copy",children:"copy"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"copy"}),"(",(0,n.jsx)(s.code,{children:"models"}),"): ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})]}),"\n",(0,n.jsx)(s.p,{children:"Copy a given set of Models identified by their stream ID, name or alias into a new Composite."}),"\n",(0,n.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"models"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"string"}),"[]"]})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"equals",children:"equals"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"equals"}),"(",(0,n.jsx)(s.code,{children:"other"}),"): ",(0,n.jsx)(s.code,{children:"boolean"})]}),"\n",(0,n.jsx)(s.p,{children:"Check if the composite is equal to the other one provided as input."}),"\n",(0,n.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"other"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeinput",children:(0,n.jsx)(s.code,{children:"CompositeInput"})})})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-3",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"boolean"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"merge",children:"merge"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"merge"}),"(",(0,n.jsx)(s.code,{children:"other"}),", ",(0,n.jsx)(s.code,{children:"options?"}),"): ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})]}),"\n",(0,n.jsx)(s.p,{children:"Merge the composite with the other one(s) into a new Composite."}),"\n",(0,n.jsx)(s.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"other"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeinput",children:(0,n.jsx)(s.code,{children:"CompositeInput"})})," | ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeinput",children:(0,n.jsx)(s.code,{children:"CompositeInput"})}),"[]"]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"options"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeoptions",children:(0,n.jsx)(s.code,{children:"CompositeOptions"})})})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-4",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"setaliases",children:"setAliases"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"setAliases"}),"(",(0,n.jsx)(s.code,{children:"aliases"}),", ",(0,n.jsx)(s.code,{children:"replace?"}),"): ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})]}),"\n",(0,n.jsxs)(s.p,{children:["Set aliases for the Models in the composite, merging with existing ones unless ",(0,n.jsx)(s.code,{children:"replace"})," is\n",(0,n.jsx)(s.code,{children:"true"}),", and return a new Composite."]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Default value"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"aliases"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"Record"}),"<",(0,n.jsx)(s.code,{children:"string"}),", ",(0,n.jsx)(s.code,{children:"string"}),">"]}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"undefined"})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"replace"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"boolean"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"false"})})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-5",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"setcommonembeds",children:"setCommonEmbeds"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"setCommonEmbeds"}),"(",(0,n.jsx)(s.code,{children:"names"}),", ",(0,n.jsx)(s.code,{children:"replace?"}),"): ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})]}),"\n",(0,n.jsxs)(s.p,{children:["Set common embeds for the Models in the composite, merging with existing ones unless ",(0,n.jsx)(s.code,{children:"replace"}),"\nis ",(0,n.jsx)(s.code,{children:"true"}),", and return a new Composite."]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Default value"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"names"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"Iterable"}),"<",(0,n.jsx)(s.code,{children:"string"}),">"]}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"undefined"})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"replace"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"boolean"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"false"})})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-6",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"setviews",children:"setViews"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"setViews"}),"(",(0,n.jsx)(s.code,{children:"views"}),", ",(0,n.jsx)(s.code,{children:"replace?"}),"): ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})]}),"\n",(0,n.jsxs)(s.p,{children:["Set views for the Models in the composite, merging with existing ones unless ",(0,n.jsx)(s.code,{children:"replace"})," is\n",(0,n.jsx)(s.code,{children:"true"}),", and return a new Composite."]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Default value"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"views"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"CompositeViewsDefinition"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"undefined"})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"replace"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"boolean"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"false"})})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-7",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"startindexingon",children:"startIndexingOn"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"startIndexingOn"}),"(",(0,n.jsx)(s.code,{children:"ceramic"}),"): ",(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.code,{children:"void"}),">"]}),"\n",(0,n.jsx)(s.p,{children:"Configure the Ceramic node to index the models defined in the composite. An authenticated DID\nset as admin in the Ceramic node configuration must be attached to the Ceramic instance."}),"\n",(0,n.jsx)(s.h4,{id:"parameters-7",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"ceramic"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"CeramicApi"})})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-8",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.code,{children:"void"}),">"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"tojson",children:"toJSON"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"toJSON"}),"(): ",(0,n.jsx)(s.code,{children:"EncodedCompositeDefinition"})]}),"\n",(0,n.jsxs)(s.p,{children:["Return a JSON-encoded ",(0,n.jsx)(s.code,{children:"CompositeDefinition"})," structure that can be shared and reused."]}),"\n",(0,n.jsx)(s.h4,{id:"returns-9",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"EncodedCompositeDefinition"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"toparams",children:"toParams"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"toParams"}),"(): ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeparams",children:(0,n.jsx)(s.code,{children:"CompositeParams"})})]}),"\n",(0,n.jsxs)(s.p,{children:["Return a deep clone of the internal ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeparams",children:(0,n.jsx)(s.code,{children:"CompositeParams"})})," for safe external access."]}),"\n",(0,n.jsx)(s.h4,{id:"returns-10",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeparams",children:(0,n.jsx)(s.code,{children:"CompositeParams"})})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"toruntime",children:"toRuntime"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.strong,{children:"toRuntime"}),"(): ",(0,n.jsx)(s.code,{children:"RuntimeCompositeDefinition"})]}),"\n",(0,n.jsxs)(s.p,{children:["Return a ",(0,n.jsx)(s.code,{children:"RuntimeCompositeDefinition"})," to be used at runtime by the\n",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/client.ComposeClient",children:(0,n.jsx)(s.code,{children:"ComposeClient"})}),"."]}),"\n",(0,n.jsx)(s.h4,{id:"returns-11",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"RuntimeCompositeDefinition"})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"create",children:"create"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.code,{children:"Static"})," ",(0,n.jsx)(s.strong,{children:"create"}),"(",(0,n.jsx)(s.code,{children:"params"}),"): ",(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})}),">"]}),"\n",(0,n.jsxs)(s.p,{children:["Create new model streams based on the provided ",(0,n.jsx)(s.code,{children:"schema"})," and group them in a composite\nwrapped in a Composite instance."]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-8",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"params"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#createparams",children:(0,n.jsx)(s.code,{children:"CreateParams"})})})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-12",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})}),">"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"from",children:"from"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.code,{children:"Static"})," ",(0,n.jsx)(s.strong,{children:"from"}),"(",(0,n.jsx)(s.code,{children:"composites"}),", ",(0,n.jsx)(s.code,{children:"options?"}),"): ",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})]}),"\n",(0,n.jsx)(s.p,{children:"Create a Composite instance by merging existing composites."}),"\n",(0,n.jsx)(s.h4,{id:"parameters-9",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"composites"})}),(0,n.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,n.jsx)(s.code,{children:"Iterable"}),"<",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeinput",children:(0,n.jsx)(s.code,{children:"CompositeInput"})}),">"]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"options?"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#compositeoptions",children:(0,n.jsx)(s.code,{children:"CompositeOptions"})})})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-13",children:"Returns"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})})}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"fromjson",children:"fromJSON"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.code,{children:"Static"})," ",(0,n.jsx)(s.strong,{children:"fromJSON"}),"(",(0,n.jsx)(s.code,{children:"params"}),"): ",(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})}),">"]}),"\n",(0,n.jsxs)(s.p,{children:["Create a Composite instance from a JSON-encoded ",(0,n.jsx)(s.code,{children:"CompositeDefinition"}),"."]}),"\n",(0,n.jsx)(s.h4,{id:"parameters-10",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"params"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#fromjsonparams",children:(0,n.jsx)(s.code,{children:"FromJSONParams"})})})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-14",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})}),">"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"frommodels",children:"fromModels"}),"\n",(0,n.jsxs)(s.p,{children:["\u25b8 ",(0,n.jsx)(s.code,{children:"Static"})," ",(0,n.jsx)(s.strong,{children:"fromModels"}),"(",(0,n.jsx)(s.code,{children:"params"}),"): ",(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})}),">"]}),"\n",(0,n.jsx)(s.p,{children:"Create a Composite instance from a set of Model streams already present on a Ceramic node."}),"\n",(0,n.jsx)(s.h4,{id:"parameters-11",children:"Parameters"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,n.jsx)(s.tbody,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.code,{children:"params"})}),(0,n.jsx)(s.td,{style:{textAlign:"left"},children:(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/modules/devtools#frommodelsparams",children:(0,n.jsx)(s.code,{children:"FromModelsParams"})})})]})})]}),"\n",(0,n.jsx)(s.h4,{id:"returns-15",children:"Returns"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"Promise"}),"<",(0,n.jsx)(s.a,{href:"/docs/0.3.x/api/classes/devtools.Composite",children:(0,n.jsx)(s.code,{children:"Composite"})}),">"]})]})}function x(e={}){const{wrapper:s}={...(0,l.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},9074:(e,s,t)=>{t.d(s,{Z:()=>d,a:()=>r});var n=t(79);const l={},i=n.createContext(l);function r(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:r(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);