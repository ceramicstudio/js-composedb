"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3448],{832:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>r,contentTitle:()=>c,default:()=>h,frontMatter:()=>n,metadata:()=>d,toc:()=>o});var i=l(7512),s=l(2036);const n={id:"client",title:"Module: client",custom_edit_url:null},c=void 0,d={id:"api/modules/client",title:"Module: client",description:"High-level ComposeDB client, based on the ComposeDB runtime.",source:"@site/docs/api/modules/client.md",sourceDirName:"api/modules",slug:"/api/modules/client",permalink:"/docs/preview/api/modules/client",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"client",title:"Module: client",custom_edit_url:null},sidebar:"api",previous:{title:"Public APIs",permalink:"/docs/preview/category/public-apis"},next:{title:"Module: runtime",permalink:"/docs/preview/api/modules/runtime"}},r={},o=[{value:"Installation",id:"installation",level:2},{value:"Classes",id:"classes",level:2},{value:"Type Aliases",id:"type-aliases",level:2},{value:"ComposeClientParams",id:"composeclientparams",level:3},{value:"Type declaration",id:"type-declaration",level:4}];function a(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["High-level ComposeDB client, based on the ",(0,i.jsx)(t.a,{href:"/docs/preview/api/modules/runtime",children:(0,i.jsx)(t.code,{children:"ComposeDB runtime"})}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-sh",children:"npm install @composedb/client\n"})}),"\n",(0,i.jsx)(t.h2,{id:"classes",children:"Classes"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"/docs/preview/api/classes/client.ComposeClient",children:"ComposeClient"})}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"type-aliases",children:"Type Aliases"}),"\n",(0,i.jsx)(t.h3,{id:"composeclientparams",children:"ComposeClientParams"}),"\n",(0,i.jsxs)(t.p,{children:["\u01ac ",(0,i.jsx)(t.strong,{children:"ComposeClientParams"}),": ",(0,i.jsx)(t.code,{children:"Object"})]}),"\n",(0,i.jsx)(t.h4,{id:"type-declaration",children:"Type declaration"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"cache?"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"DocumentCache"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Optional cache for documents."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"ceramic"})}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:[(0,i.jsx)(t.code,{children:"CeramicAPI"})," | ",(0,i.jsx)(t.code,{children:"string"})]}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Ceramic client instance or HTTP URL."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"definition"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"RuntimeCompositeDefinition"})}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:["Runtime composite definition, created using the ",(0,i.jsx)(t.a,{href:"/docs/preview/api/classes/devtools.Composite",children:(0,i.jsx)(t.code,{children:"Composite"})})," development tools."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"loader?"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"DocumentLoader"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Optional document loader."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"remoteExecutor?"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"Executor"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Optional remote query executor."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"serverURL?"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"string"})}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:["Optional ",(0,i.jsx)(t.a,{href:"/docs/preview/api/modules/server",children:(0,i.jsx)(t.code,{children:"query server"})})," URL."]})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,s.M)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},2036:(e,t,l)=>{l.d(t,{I:()=>d,M:()=>c});var i=l(5496);const s={},n=i.createContext(s);function c(e){const t=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),i.createElement(n.Provider,{value:t},e.children)}}}]);