"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4880],{4452:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var r=a(7512),s=a(4496),l=a(900),t=a(4340);const o={},i="Installation",c={id:"installation",title:"Installation",description:"ComposeDB packages are still under development and only released as a developer preview, they are not ready for production use.",source:"@site/versioned_docs/version-0.2.x/installation.mdx",sourceDirName:".",slug:"/installation",permalink:"/docs/0.2.x/installation",draft:!1,unlisted:!1,tags:[],version:"0.2.x",frontMatter:{},sidebar:"docs",previous:{title:"Welcome to ComposeDB API Reference",permalink:"/docs/0.2.x/introduction"}},d={},u=[{value:"Requirements",id:"requirements",level:2},{value:"Development tools",id:"development-tools",level:2},{value:"CLI",id:"cli",level:3},{value:"Libraries",id:"libraries",level:3},{value:"Runtime libraries",id:"runtime-libraries",level:2},{value:"Using TypeScript",id:"using-typescript",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,s.M)(),...e.components},{Head:a}=n;return a||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"installation",children:"Installation"}),"\n",(0,r.jsxs)(a,{children:[(0,r.jsx)("meta",{name:"robots",content:"noindex"}),(0,r.jsx)("meta",{name:"googlebot",content:"noindex"})]}),"\n",(0,r.jsxs)(n.admonition,{title:"Developer preview",type:"caution",children:[(0,r.jsxs)(n.p,{children:["ComposeDB packages are still under development and only released as a developer preview, they are ",(0,r.jsx)(n.strong,{children:"not ready for production use"}),"."]}),(0,r.jsxs)(n.p,{children:["There may be ",(0,r.jsx)(n.strong,{children:"breaking changes"})," between v0.x versions before a stable v1.0 version is released, causing models or composites created from previous versions not to be compatible."]})]}),"\n",(0,r.jsx)(n.h2,{id:"requirements",children:"Requirements"}),"\n",(0,r.jsxs)(n.p,{children:["ComposeDB runs on top of ",(0,r.jsx)(n.a,{href:"https://ceramic.network/",children:"Ceramic"}),". Running ",(0,r.jsx)(n.a,{href:"https://developers.ceramic.network/docs/composedb/set-up-your-environment",children:"a local Ceramic node"})," is needed for app development."]}),"\n",(0,r.jsx)(n.h2,{id:"development-tools",children:"Development tools"}),"\n",(0,r.jsx)(n.p,{children:"ComposeDB provides libraries and a CLI to help support common development needs."}),"\n",(0,r.jsx)(n.p,{children:"The CLI provides commands for the most common flows, while the libraries can be used in scripts to support more complex use-cases."}),"\n",(0,r.jsx)(n.h3,{id:"cli",children:"CLI"}),"\n",(0,r.jsxs)(l.c,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],children:[(0,r.jsx)(t.c,{value:"npm",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"npm install --location=global @composedb/cli@^0.2.0\n"})})}),(0,r.jsx)(t.c,{value:"pnpm",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"pnpm add -g @composedb/cli@^0.2.0\n"})})}),(0,r.jsxs)(t.c,{value:"yarn",children:[(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.p,{children:["Global packages are only supported for yarn 2.x and older. For yarn 3.x and newer, use ",(0,r.jsx)(n.code,{children:"yarn dlx"})," to run composedb cli commands"]})}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"yarn global add @composedb/cli@^0.2.0\n"})})]})]}),"\n",(0,r.jsx)(n.h3,{id:"libraries",children:"Libraries"}),"\n",(0,r.jsxs)(n.p,{children:["ComposeDB exposes two complementary development libraries: ",(0,r.jsx)(n.a,{href:"/docs/0.2.x/api/modules/devtools",children:(0,r.jsx)(n.code,{children:"@composedb/devtools"})})," for generic interactions with composites, and ",(0,r.jsx)(n.a,{href:"/docs/0.2.x/api/modules/devtools_node",children:(0,r.jsx)(n.code,{children:"@composedb/devtools-node"})})," with additional functions to interact with the local file system and start a local HTTP server."]}),"\n",(0,r.jsxs)(l.c,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],children:[(0,r.jsx)(t.c,{value:"npm",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"npm install -D @composedb/devtools@^0.2.0 @composedb/devtools-node@^0.2.0\n"})})}),(0,r.jsx)(t.c,{value:"pnpm",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"pnpm add -D @composedb/devtools@^0.2.0 @composedb/devtools-node@^0.2.0\n"})})}),(0,r.jsx)(t.c,{value:"yarn",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"yarn add -D @composedb/devtools@^0.2.0 @composedb/devtools-node@^0.2.0\n"})})})]}),"\n",(0,r.jsx)(n.h2,{id:"runtime-libraries",children:"Runtime libraries"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.a,{href:"/docs/0.2.x/api/modules/client",children:(0,r.jsx)(n.code,{children:"@composedb/client"})})," package exposes the primary APIs to interact with Ceramic based on a Composite definition."]}),"\n",(0,r.jsxs)(l.c,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],children:[(0,r.jsx)(t.c,{value:"npm",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"npm install @composedb/client@^0.2.0\n"})})}),(0,r.jsx)(t.c,{value:"pnpm",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"pnpm add @composedb/client@^0.2.0\n"})})}),(0,r.jsx)(t.c,{value:"yarn",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"yarn add @composedb/client@^0.2.0\n"})})})]}),"\n",(0,r.jsx)(n.h2,{id:"using-typescript",children:"Using TypeScript"}),"\n",(0,r.jsxs)(n.p,{children:["You may need to install the ",(0,r.jsx)(n.code,{children:"@composedb/types"})," package used by the different libraries if you use TypeScript."]}),"\n",(0,r.jsxs)(l.c,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],children:[(0,r.jsx)(t.c,{value:"npm",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"npm install -D @composedb/types@^0.2.0\n"})})}),(0,r.jsx)(t.c,{value:"pnpm",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"pnpm add -D @composedb/types@^0.2.0\n"})})}),(0,r.jsx)(t.c,{value:"yarn",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"yarn add -D @composedb/types@^0.2.0\n"})})})]})]})}function m(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},4340:(e,n,a)=>{a.d(n,{c:()=>t});a(5496);var r=a(8536);const s={tabItem:"tabItem_wIB7"};var l=a(7512);function t(e){let{children:n,hidden:a,className:t}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,r.c)(s.tabItem,t),hidden:a,children:n})}},900:(e,n,a)=>{a.d(n,{c:()=>w});var r=a(5496),s=a(8536),l=a(8288),t=a(6252),o=a(3156),i=a(9688),c=a(2716),d=a(4019);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:a}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:a,attributes:r,default:s}}=e;return{value:n,label:a,attributes:r,default:s}}))}(a);return function(e){const n=(0,c.w)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,a])}function m(e){let{value:n,tabValues:a}=e;return a.some((e=>e.value===n))}function h(e){let{queryString:n=!1,groupId:a}=e;const s=(0,t.Uz)(),l=function(e){let{queryString:n=!1,groupId:a}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:n,groupId:a});return[(0,i._M)(l),(0,r.useCallback)((e=>{if(!l)return;const n=new URLSearchParams(s.location.search);n.set(l,e),s.replace({...s.location,search:n.toString()})}),[l,s])]}function b(e){const{defaultValue:n,queryString:a=!1,groupId:s}=e,l=p(e),[t,i]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=a.find((e=>e.default))??a[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:l}))),[c,u]=h({queryString:a,groupId:s}),[b,v]=function(e){let{groupId:n}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,l]=(0,d.IN)(a);return[s,(0,r.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:s}),x=(()=>{const e=c??b;return m({value:e,tabValues:l})?e:null})();(0,o.c)((()=>{x&&i(x)}),[x]);return{selectedValue:t,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),v(e)}),[u,v,l]),tabValues:l}}var v=a(436);const x={tabList:"tabList_ZLPU",tabItem:"tabItem_wwWM"};var f=a(7512);function g(e){let{className:n,block:a,selectedValue:r,selectValue:t,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.MV)(),d=e=>{const n=e.currentTarget,a=i.indexOf(n),s=o[a].value;s!==r&&(c(n),t(s))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const a=i.indexOf(e.currentTarget)+1;n=i[a]??i[0];break}case"ArrowLeft":{const a=i.indexOf(e.currentTarget)-1;n=i[a]??i[i.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.c)("tabs",{"tabs--block":a},n),children:o.map((e=>{let{value:n,label:a,attributes:l}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>i.push(e),onKeyDown:u,onClick:d,...l,className:(0,s.c)("tabs__item",x.tabItem,l?.className,{"tabs__item--active":r===n}),children:a??n},n)}))})}function j(e){let{lazy:n,children:a,selectedValue:s}=e;const l=(Array.isArray(a)?a:[a]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function y(e){const n=b(e);return(0,f.jsxs)("div",{className:(0,s.c)("tabs-container",x.tabList),children:[(0,f.jsx)(g,{...e,...n}),(0,f.jsx)(j,{...e,...n})]})}function w(e){const n=(0,v.c)();return(0,f.jsx)(y,{...e,children:u(e.children)},String(n))}},4496:(e,n,a)=>{a.d(n,{I:()=>o,M:()=>t});var r=a(5496);const s={},l=r.createContext(s);function t(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);