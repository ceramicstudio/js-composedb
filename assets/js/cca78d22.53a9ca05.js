"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7398],{4852:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(9231);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,f=m["".concat(s,".").concat(d)]||m[d]||p[d]||a;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8286:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(9231),o=n(9841);const a="tabItem_bDAQ";function i(e){let{children:t,hidden:n,className:i}=e;return r.createElement("div",{role:"tabpanel",className:(0,o.Z)(a,i),hidden:n},t)}},3510:(e,t,n)=>{n.d(t,{Z:()=>d});var r=n(4011),o=n(9231),a=n(9841),i=n(8383),l=n(6720),s=n(412),c=n(2029);const u="tabList_J1bR",p="tabItem_lwZo";function m(e){var t,n;const{lazy:i,block:m,defaultValue:d,values:f,groupId:h,className:b}=e,v=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),g=null!=f?f:v.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),y=(0,l.l)(g,((e,t)=>e.value===t.value));if(y.length>0)throw new Error('Docusaurus error: Duplicate values "'+y.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.');const k=null===d?d:null!=(t=null!=d?d:null==(n=v.find((e=>e.props.default)))?void 0:n.props.value)?t:v[0].props.value;if(null!==k&&!g.some((e=>e.value===k)))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+k+'" but none of its children has the corresponding value. Available values are: '+g.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");const{tabGroupChoices:C,setTabGroupChoices:w}=(0,s.U)(),[x,N]=(0,o.useState)(k),O=[],{blockElementScrollPositionUntilNextRender:j}=(0,c.o5)();if(null!=h){const e=C[h];null!=e&&e!==x&&g.some((t=>t.value===e))&&N(e)}const E=e=>{const t=e.currentTarget,n=O.indexOf(t),r=g[n].value;r!==x&&(j(t),N(r),null!=h&&w(h,String(r)))},T=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{var r;const t=O.indexOf(e.currentTarget)+1;n=null!=(r=O[t])?r:O[0];break}case"ArrowLeft":{var o;const t=O.indexOf(e.currentTarget)-1;n=null!=(o=O[t])?o:O[O.length-1];break}}null==(t=n)||t.focus()};return o.createElement("div",{className:(0,a.Z)("tabs-container",u)},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":m},b)},g.map((e=>{let{value:t,label:n,attributes:i}=e;return o.createElement("li",(0,r.Z)({role:"tab",tabIndex:x===t?0:-1,"aria-selected":x===t,key:t,ref:e=>O.push(e),onKeyDown:T,onFocus:E,onClick:E},i,{className:(0,a.Z)("tabs__item",p,null==i?void 0:i.className,{"tabs__item--active":x===t})}),null!=n?n:t)}))),i?(0,o.cloneElement)(v.filter((e=>e.props.value===x))[0],{className:"margin-top--md"}):o.createElement("div",{className:"margin-top--md"},v.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==x})))))}function d(e){const t=(0,i.Z)();return o.createElement(m,(0,r.Z)({key:String(t)},e))}},3364:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var r=n(4011),o=(n(9231),n(4852)),a=n(3510),i=n(8286);const l={},s="Client setup",c={unversionedId:"client-setup",id:"version-0.2.x/client-setup",title:"Client setup",description:"Compiling the composite",source:"@site/versioned_docs/version-0.2.x/client-setup.mdx",sourceDirName:".",slug:"/client-setup",permalink:"/docs/0.2.x/client-setup",draft:!1,tags:[],version:"0.2.x",frontMatter:{},sidebar:"docs",previous:{title:"Your first composite",permalink:"/docs/0.2.x/first-composite"},next:{title:"Guides",permalink:"/docs/0.2.x/category/guides"}},u={},p=[{value:"Compiling the composite",id:"compiling-the-composite",level:2},{value:"Configuring the client",id:"configuring-the-client",level:2},{value:"Executing queries",id:"executing-queries",level:2}],m={toc:p};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"client-setup"},"Client setup"),(0,o.kt)("h2",{id:"compiling-the-composite"},"Compiling the composite"),(0,o.kt)("p",null,"In order to interact with a composite at runtime, it is first necessary to create a runtime composite definition file that will be used to configure the client."),(0,o.kt)(a.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"api",mdxType:"TabItem"},(0,o.kt)("p",null,"Make sure you have the ",(0,o.kt)("inlineCode",{parentName:"p"},"composedb")," packages ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/installation"},"installed"),", before running the code below."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { writeEncodedCompositeRuntime } from '@composedb/devtools-node'\n\n// Replace by the URL of the Ceramic node you want to deploy the models to\nconst ceramic = new CeramicClient('http://localhost:7007')\n\n// Replace by the path to the local encoded composite file\nawait writeEncodedCompositeRuntime(\n  ceramic,\n  'my-first-composite.json',\n  'src/__generated__/definition.js'\n)\n")),(0,o.kt)("p",null,"More details: ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/modules/devtools_node#writeencodedcompositeruntime"},(0,o.kt)("inlineCode",{parentName:"a"},"writeEncodedCompositeRuntime")))),(0,o.kt)(i.Z,{value:"cli",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:compile my-first-composite.json src/__generated__/definition.js --ceramic-url=http://localhost:7007\n")))),(0,o.kt)("h2",{id:"configuring-the-client"},"Configuring the client"),(0,o.kt)("p",null,"Once the composite definition file is written, for example in ",(0,o.kt)("inlineCode",{parentName:"p"},"src/__generated__/definition.js")," using the example above, it can be imported in the app to configure the client."),(0,o.kt)("p",null,"Make sure you have the ",(0,o.kt)("inlineCode",{parentName:"p"},"composedb")," packages ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/installation"},"installed"),", before running the code below."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/compose.js"',title:'"src/compose.js"'},"import { ComposeClient } from '@composedb/client'\n\nimport { definition } from './__generated__/definition.js'\n\nexport const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })\n")),(0,o.kt)("p",null,"More details: ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/classes/client.ComposeClient"},(0,o.kt)("inlineCode",{parentName:"a"},"ComposeClient"))),(0,o.kt)("h2",{id:"executing-queries"},"Executing queries"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/classes/client.ComposeClient"},(0,o.kt)("inlineCode",{parentName:"a"},"ComposeClient"))," instance created in the previous step can be used to execute GraphQL queries using a schema automatically generated from the runtime composite definition."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"await compose.executeQuery(`\n  query {\n    viewer {\n      id\n    }\n  }\n`)\n")),(0,o.kt)("p",null,"More details: ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/classes/client.ComposeClient#executequery"},(0,o.kt)("inlineCode",{parentName:"a"},"executeQuery"))))}d.isMDXComponent=!0}}]);