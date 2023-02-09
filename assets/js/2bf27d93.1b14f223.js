"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1128],{4852:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>b});var n=a(9231);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),p=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(a),d=r,b=c["".concat(i,".").concat(d)]||c[d]||m[d]||l;return a?n.createElement(b,o(o({ref:t},u),{},{components:a})):n.createElement(b,o({ref:t},u))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[c]="string"==typeof e?e:r,o[1]=s;for(var p=2;p<l;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},9269:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(9231),r=a(9841);const l={tabItem:"tabItem_Z7jx"};function o(e){let{children:t,hidden:a,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,o),hidden:a},t)}},9484:(e,t,a)=>{a.d(t,{Z:()=>T});var n=a(1504),r=a(9231),l=a(9841),o=a(7537),s=a(9409),i=a(240),p=a(818),u=a(1273);function c(e){return function(e){return r.Children.map(e,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function m(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=t??c(a);return function(e){const t=(0,p.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function d(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:a}=e;const n=(0,s.k6)(),l=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,i._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(n.location.search);t.set(l,e),n.replace({...n.location,search:t.toString()})}),[l,n])]}function v(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,l=m(e),[o,s]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:l}))),[i,p]=b({queryString:a,groupId:n}),[c,v]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,l]=(0,u.Nk)(a);return[n,(0,r.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:n}),f=(()=>{const e=i??c;return d({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{f&&s(f)}),[f]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),p(e),v(e)}),[p,v,l]),tabValues:l}}var f=a(4947);const y={tabList:"tabList_YkLP",tabItem:"tabItem_dswv"};function k(e){let{className:t,block:a,selectedValue:s,selectValue:i,tabValues:p}=e;const u=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),m=e=>{const t=e.currentTarget,a=u.indexOf(t),n=p[a].value;n!==s&&(c(t),i(n))},d=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const a=u.indexOf(e.currentTarget)+1;t=u[a]??u[0];break}case"ArrowLeft":{const a=u.indexOf(e.currentTarget)-1;t=u[a]??u[u.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":a},t)},p.map((e=>{let{value:t,label:a,attributes:o}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>u.push(e),onKeyDown:d,onClick:m},o,{className:(0,l.Z)("tabs__item",y.tabItem,o?.className,{"tabs__item--active":s===t})}),a??t)})))}function g(e){let{lazy:t,children:a,selectedValue:n}=e;if(a=Array.isArray(a)?a:[a],t){const e=a.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},a.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function h(e){const t=v(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",y.tabList)},r.createElement(k,(0,n.Z)({},e,t)),r.createElement(g,(0,n.Z)({},e,t)))}function T(e){const t=(0,f.Z)();return r.createElement(h,(0,n.Z)({key:String(t)},e))}},9616:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>b,frontMatter:()=>s,metadata:()=>p,toc:()=>c});var n=a(1504),r=(a(9231),a(4852)),l=a(9484),o=a(9269);const s={},i="Installation",p={unversionedId:"installation",id:"version-0.2.x/installation",title:"Installation",description:"ComposeDB packages are still under development and only released as a developer preview, they are not ready for production use.",source:"@site/versioned_docs/version-0.2.x/installation.mdx",sourceDirName:".",slug:"/installation",permalink:"/docs/0.2.x/installation",draft:!1,tags:[],version:"0.2.x",frontMatter:{},sidebar:"docs",previous:{title:"Welcome to ComposeDB",permalink:"/docs/0.2.x/introduction"},next:{title:"Your first composite",permalink:"/docs/0.2.x/first-composite"}},u={},c=[{value:"Requirements",id:"requirements",level:2},{value:"Development tools",id:"development-tools",level:2},{value:"CLI",id:"cli",level:3},{value:"Libraries",id:"libraries",level:3},{value:"Runtime libraries",id:"runtime-libraries",level:2},{value:"Using TypeScript",id:"using-typescript",level:2}],m={toc:c},d="wrapper";function b(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"installation"},"Installation"),(0,r.kt)("admonition",{title:"Developer preview",type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"ComposeDB packages are still under development and only released as a developer preview, they are ",(0,r.kt)("strong",{parentName:"p"},"not ready for production use"),"."),(0,r.kt)("p",{parentName:"admonition"},"There may be ",(0,r.kt)("strong",{parentName:"p"},"breaking changes")," between v0.x versions before a stable v1.0 version is released, causing models or composites created from previous versions not to be compatible.")),(0,r.kt)("h2",{id:"requirements"},"Requirements"),(0,r.kt)("p",null,"ComposeDB runs on top of ",(0,r.kt)("a",{parentName:"p",href:"https://ceramic.network/"},"Ceramic"),". Running ",(0,r.kt)("a",{parentName:"p",href:"https://developers.ceramic.network/build/cli/installation/"},"a local Ceramic node")," is needed for app development."),(0,r.kt)("h2",{id:"development-tools"},"Development tools"),(0,r.kt)("p",null,"ComposeDB provides libraries and a CLI to help support common development needs."),(0,r.kt)("p",null,"The CLI provides commands for the most common flows, while the libraries can be used in scripts to support more complex use-cases."),(0,r.kt)("h3",{id:"cli"},"CLI"),(0,r.kt)(l.Z,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"npm install --location=global @composedb/cli@^0.2.0\n"))),(0,r.kt)(o.Z,{value:"pnpm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"pnpm add -g @composedb/cli@^0.2.0\n"))),(0,r.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Global packages are only supported for yarn 2.x and older. For yarn 3.x and newer, use ",(0,r.kt)("inlineCode",{parentName:"p"},"yarn dlx")," to run composedb cli commands")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"yarn global add @composedb/cli@^0.2.0\n")))),(0,r.kt)("h3",{id:"libraries"},"Libraries"),(0,r.kt)("p",null,"ComposeDB exposes two complementary development libraries: ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/modules/devtools"},(0,r.kt)("inlineCode",{parentName:"a"},"@composedb/devtools"))," for generic interactions with composites, and ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/modules/devtools_node"},(0,r.kt)("inlineCode",{parentName:"a"},"@composedb/devtools-node"))," with additional functions to interact with the local file system and start a local HTTP server."),(0,r.kt)(l.Z,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"npm install -D @composedb/devtools@^0.2.0 @composedb/devtools-node@^0.2.0\n"))),(0,r.kt)(o.Z,{value:"pnpm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"pnpm add -D @composedb/devtools@^0.2.0 @composedb/devtools-node@^0.2.0\n"))),(0,r.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"yarn add -D @composedb/devtools@^0.2.0 @composedb/devtools-node@^0.2.0\n")))),(0,r.kt)("h2",{id:"runtime-libraries"},"Runtime libraries"),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/modules/client"},(0,r.kt)("inlineCode",{parentName:"a"},"@composedb/client"))," package exposes the primary APIs to interact with Ceramic based on a Composite definition."),(0,r.kt)(l.Z,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"npm install @composedb/client@^0.2.0\n"))),(0,r.kt)(o.Z,{value:"pnpm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"pnpm add @composedb/client@^0.2.0\n"))),(0,r.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"yarn add @composedb/client@^0.2.0\n")))),(0,r.kt)("h2",{id:"using-typescript"},"Using TypeScript"),(0,r.kt)("p",null,"You may need to install the ",(0,r.kt)("inlineCode",{parentName:"p"},"@composedb/types")," package used by the different libraries if you use TypeScript."),(0,r.kt)(l.Z,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"npm install -D @composedb/types@^0.2.0\n"))),(0,r.kt)(o.Z,{value:"pnpm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"pnpm add -D @composedb/types@^0.2.0\n"))),(0,r.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"yarn add -D @composedb/types@^0.2.0\n")))))}b.isMDXComponent=!0}}]);