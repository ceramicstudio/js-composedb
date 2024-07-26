"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5850],{6935:(e,l,t)=>{t.r(l),t.d(l,{assets:()=>r,contentTitle:()=>i,default:()=>a,frontMatter:()=>s,metadata:()=>c,toc:()=>o});var d=t(6106),n=t(9252);const s={id:"loader",title:"Module: loader",custom_edit_url:null},i=void 0,c={id:"api/modules/loader",title:"Module: loader",description:"ComposeDB loader module, handling streams loading and caching.",source:"@site/versioned_docs/version-0.8.x/api/modules/loader.md",sourceDirName:"api/modules",slug:"/api/modules/loader",permalink:"/docs/0.8.x/api/modules/loader",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.8.x",frontMatter:{id:"loader",title:"Module: loader",custom_edit_url:null},sidebar:"api",previous:{title:"ComposeDB Runtime",permalink:"/docs/0.8.x/api/modules/runtime"},next:{title:"ComposeDB Server",permalink:"/docs/0.8.x/api/modules/server"}},r={},o=[{value:"Installation",id:"installation",level:2},{value:"Classes",id:"classes",level:2},{value:"Type Aliases",id:"type-aliases",level:2},{value:"CacheMap",id:"cachemap",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Type declaration",id:"type-declaration",level:4},{value:"ConnectionQuery",id:"connectionquery",level:3},{value:"CreateOptions",id:"createoptions",level:3},{value:"DeterministicKeysCache",id:"deterministickeyscache",level:3},{value:"DeterministicLoadOptions",id:"deterministicloadoptions",level:3},{value:"DocID",id:"docid",level:3},{value:"DocumentCache",id:"documentcache",level:3},{value:"DocumentLoaderParams",id:"documentloaderparams",level:3},{value:"Type declaration",id:"type-declaration-1",level:4},{value:"LoadKey",id:"loadkey",level:3},{value:"Type declaration",id:"type-declaration-2",level:4},{value:"UpdateDocOptions",id:"updatedocoptions",level:3},{value:"Type declaration",id:"type-declaration-3",level:4},{value:"UpdateOptions",id:"updateoptions",level:3}];function h(e){const l={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.p,{children:"ComposeDB loader module, handling streams loading and caching."}),"\n",(0,d.jsx)(l.h2,{id:"installation",children:"Installation"}),"\n",(0,d.jsx)(l.pre,{children:(0,d.jsx)(l.code,{className:"language-sh",children:"npm install @composedb/loader\n"})}),"\n",(0,d.jsx)(l.h2,{id:"classes",children:"Classes"}),"\n",(0,d.jsxs)(l.ul,{children:["\n",(0,d.jsx)(l.li,{children:(0,d.jsx)(l.a,{href:"/docs/0.8.x/api/classes/loader.DocumentLoader",children:"DocumentLoader"})}),"\n"]}),"\n",(0,d.jsx)(l.h2,{id:"type-aliases",children:"Type Aliases"}),"\n",(0,d.jsx)(l.h3,{id:"cachemap",children:"CacheMap"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"CacheMap"}),"<",(0,d.jsx)(l.code,{children:"Value"}),", ",(0,d.jsx)(l.code,{children:"Key"}),">: ",(0,d.jsx)(l.code,{children:"Object"})]}),"\n",(0,d.jsx)(l.h4,{id:"type-parameters",children:"Type parameters"}),"\n",(0,d.jsxs)(l.table,{children:[(0,d.jsx)(l.thead,{children:(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Name"}),(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,d.jsxs)(l.tbody,{children:[(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"Value"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"Value"})})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"Key"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"string"})})]})]})]}),"\n",(0,d.jsx)(l.h4,{id:"type-declaration",children:"Type declaration"}),"\n",(0,d.jsxs)(l.table,{children:[(0,d.jsx)(l.thead,{children:(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Name"}),(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,d.jsxs)(l.tbody,{children:[(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"clear"})}),(0,d.jsxs)(l.td,{style:{textAlign:"left"},children:["() => ",(0,d.jsx)(l.code,{children:"any"})]})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"delete"})}),(0,d.jsxs)(l.td,{style:{textAlign:"left"},children:["(",(0,d.jsx)(l.code,{children:"key"}),": ",(0,d.jsx)(l.code,{children:"Key"}),") => ",(0,d.jsx)(l.code,{children:"any"})]})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"get"})}),(0,d.jsxs)(l.td,{style:{textAlign:"left"},children:["(",(0,d.jsx)(l.code,{children:"key"}),": ",(0,d.jsx)(l.code,{children:"Key"}),") => ",(0,d.jsx)(l.code,{children:"void"})," | ",(0,d.jsx)(l.code,{children:"Promise"}),"<",(0,d.jsx)(l.code,{children:"Value"}),">"]})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"set"})}),(0,d.jsxs)(l.td,{style:{textAlign:"left"},children:["(",(0,d.jsx)(l.code,{children:"key"}),": ",(0,d.jsx)(l.code,{children:"Key"}),", ",(0,d.jsx)(l.code,{children:"value"}),": ",(0,d.jsx)(l.code,{children:"Promise"}),"<",(0,d.jsx)(l.code,{children:"Value"}),">) => ",(0,d.jsx)(l.code,{children:"any"})]})]})]})]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"connectionquery",children:"ConnectionQuery"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"ConnectionQuery"}),": ",(0,d.jsx)(l.code,{children:"BaseQuery"})," & ",(0,d.jsx)(l.code,{children:"ConnectionArguments"})]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"createoptions",children:"CreateOptions"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"CreateOptions"}),": ",(0,d.jsx)(l.code,{children:"CreateOpts"})," & { ",(0,d.jsx)(l.code,{children:"controller?"}),": ",(0,d.jsx)(l.code,{children:"string"})," ; ",(0,d.jsx)(l.code,{children:"shouldIndex?"}),": ",(0,d.jsx)(l.code,{children:"boolean"}),"  }"]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"deterministickeyscache",children:"DeterministicKeysCache"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"DeterministicKeysCache"}),": ",(0,d.jsx)(l.a,{href:"/docs/0.8.x/api/modules/loader#cachemap",children:(0,d.jsx)(l.code,{children:"CacheMap"})}),"<",(0,d.jsx)(l.a,{href:"/docs/0.8.x/api/modules/loader#loadkey",children:(0,d.jsx)(l.code,{children:"LoadKey"})}),">"]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"deterministicloadoptions",children:"DeterministicLoadOptions"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"DeterministicLoadOptions"}),": ",(0,d.jsx)(l.code,{children:"CreateOpts"})," & { ",(0,d.jsx)(l.code,{children:"ignoreEmpty?"}),": ",(0,d.jsx)(l.code,{children:"boolean"})," ; ",(0,d.jsx)(l.code,{children:"onlyIndexed?"}),": ",(0,d.jsx)(l.code,{children:"boolean"}),"  }"]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"docid",children:"DocID"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"DocID"}),": ",(0,d.jsx)(l.code,{children:"CommitID"})," | ",(0,d.jsx)(l.code,{children:"StreamID"})," | ",(0,d.jsx)(l.code,{children:"string"})]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"documentcache",children:"DocumentCache"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"DocumentCache"}),": ",(0,d.jsx)(l.a,{href:"/docs/0.8.x/api/modules/loader#cachemap",children:(0,d.jsx)(l.code,{children:"CacheMap"})}),"<",(0,d.jsx)(l.code,{children:"ModelInstanceDocument"}),">"]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"documentloaderparams",children:"DocumentLoaderParams"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"DocumentLoaderParams"}),": ",(0,d.jsx)(l.code,{children:"Object"})]}),"\n",(0,d.jsx)(l.h4,{id:"type-declaration-1",children:"Type declaration"}),"\n",(0,d.jsxs)(l.table,{children:[(0,d.jsx)(l.thead,{children:(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Name"}),(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Type"}),(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,d.jsxs)(l.tbody,{children:[(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"cache?"})}),(0,d.jsxs)(l.td,{style:{textAlign:"left"},children:[(0,d.jsx)(l.a,{href:"/docs/0.8.x/api/modules/loader#documentcache",children:(0,d.jsx)(l.code,{children:"DocumentCache"})})," | ",(0,d.jsx)(l.code,{children:"boolean"})]}),(0,d.jsxs)(l.td,{style:{textAlign:"left"},children:["A supported cache implementation, ",(0,d.jsx)(l.code,{children:"true"})," to use the default implementation or ",(0,d.jsx)(l.code,{children:"false"})," to disable the cache (default)"]})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"ceramic"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"CeramicAPI"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:"A Ceramic client instance"})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"deterministicKeysCache?"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.a,{href:"/docs/0.8.x/api/modules/loader#deterministickeyscache",children:(0,d.jsx)(l.code,{children:"DeterministicKeysCache"})})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:"Optional cache for deterministic streams keys"})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"multiqueryTimeout?"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"number"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:"MultiQuery request timeout in milliseconds"})]})]})]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"loadkey",children:"LoadKey"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"LoadKey"}),": ",(0,d.jsx)(l.code,{children:"Object"})]}),"\n",(0,d.jsx)(l.h4,{id:"type-declaration-2",children:"Type declaration"}),"\n",(0,d.jsxs)(l.table,{children:[(0,d.jsx)(l.thead,{children:(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Name"}),(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Type"}),(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,d.jsxs)(l.tbody,{children:[(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"genesis?"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"GenesisCommit"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:"Optional genesis commit for deterministic streams"})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"id"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.a,{href:"/docs/0.8.x/api/modules/loader#docid",children:(0,d.jsx)(l.code,{children:"DocID"})})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:"Document ID"})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"opts?"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"LoadOpts"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:"Stream load options"})]})]})]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"updatedocoptions",children:"UpdateDocOptions"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"UpdateDocOptions"}),": ",(0,d.jsx)(l.code,{children:"Object"})]}),"\n",(0,d.jsx)(l.h4,{id:"type-declaration-3",children:"Type declaration"}),"\n",(0,d.jsxs)(l.table,{children:[(0,d.jsx)(l.thead,{children:(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Name"}),(0,d.jsx)(l.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,d.jsxs)(l.tbody,{children:[(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"replace?"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"boolean"})})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"shouldIndex?"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"boolean"})})]}),(0,d.jsxs)(l.tr,{children:[(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"version?"})}),(0,d.jsx)(l.td,{style:{textAlign:"left"},children:(0,d.jsx)(l.code,{children:"string"})})]})]})]}),"\n",(0,d.jsx)(l.hr,{}),"\n",(0,d.jsx)(l.h3,{id:"updateoptions",children:"UpdateOptions"}),"\n",(0,d.jsxs)(l.p,{children:["\u01ac ",(0,d.jsx)(l.strong,{children:"UpdateOptions"}),": ",(0,d.jsx)(l.code,{children:"UpdateOpts"})," & ",(0,d.jsx)(l.a,{href:"/docs/0.8.x/api/modules/loader#updatedocoptions",children:(0,d.jsx)(l.code,{children:"UpdateDocOptions"})})]})]})}function a(e={}){const{wrapper:l}={...(0,n.R)(),...e.components};return l?(0,d.jsx)(l,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}},9252:(e,l,t)=>{t.d(l,{R:()=>i,x:()=>c});var d=t(7378);const n={},s=d.createContext(n);function i(e){const l=d.useContext(s);return d.useMemo((function(){return"function"==typeof e?e(l):{...l,...e}}),[l,e])}function c(e){let l;return l=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),d.createElement(s.Provider,{value:l},e.children)}}}]);