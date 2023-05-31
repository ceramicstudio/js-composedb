"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6908],{4852:(e,t,o)=>{o.d(t,{Zo:()=>u,kt:()=>f});var n=o(9231);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=c(o),d=r,f=m["".concat(l,".").concat(d)]||m[d]||p[d]||a;return o?n.createElement(f,s(s({ref:t},u),{},{components:o})):n.createElement(f,s({ref:t},u))}));function f(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,s=new Array(a);s[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[m]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<a;c++)s[c]=o[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,o)}d.displayName="MDXCreateElement"},5947:(e,t,o)=>{o.d(t,{Z:()=>s});var n=o(9231),r=o(3531);const a={tabItem:"tabItem_kfQ4"};function s(e){let{children:t,hidden:o,className:s}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(a.tabItem,s),hidden:o},t)}},6600:(e,t,o)=>{o.d(t,{Z:()=>w});var n=o(5675),r=o(9231),a=o(3531),s=o(1600),i=o(9409),l=o(1603),c=o(1693),u=o(6025);function m(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:o,attributes:n,default:r}}=e;return{value:t,label:o,attributes:n,default:r}}))}function p(e){const{values:t,children:o}=e;return(0,r.useMemo)((()=>{const e=t??m(o);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,o])}function d(e){let{value:t,tabValues:o}=e;return o.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:o}=e;const n=(0,i.k6)(),a=function(e){let{queryString:t=!1,groupId:o}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!o)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return o??null}({queryString:t,groupId:o});return[(0,l._X)(a),(0,r.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(n.location.search);t.set(a,e),n.replace({...n.location,search:t.toString()})}),[a,n])]}function g(e){const{defaultValue:t,queryString:o=!1,groupId:n}=e,a=p(e),[s,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:o}=e;if(0===o.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:o}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${o.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=o.find((e=>e.default))??o[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:a}))),[l,c]=f({queryString:o,groupId:n}),[m,g]=function(e){let{groupId:t}=e;const o=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,a]=(0,u.Nk)(o);return[n,(0,r.useCallback)((e=>{o&&a.set(e)}),[o,a])]}({groupId:n}),b=(()=>{const e=l??m;return d({value:e,tabValues:a})?e:null})();(0,r.useLayoutEffect)((()=>{b&&i(b)}),[b]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),c(e),g(e)}),[c,g,a]),tabValues:a}}var b=o(3688);const h={tabList:"tabList_VxpX",tabItem:"tabItem_qdMt"};function v(e){let{className:t,block:o,selectedValue:i,selectValue:l,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:m}=(0,s.o5)(),p=e=>{const t=e.currentTarget,o=u.indexOf(t),n=c[o].value;n!==i&&(m(t),l(n))},d=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const o=u.indexOf(e.currentTarget)+1;t=u[o]??u[0];break}case"ArrowLeft":{const o=u.indexOf(e.currentTarget)-1;t=u[o]??u[u.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":o},t)},c.map((e=>{let{value:t,label:o,attributes:s}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>u.push(e),onKeyDown:d,onClick:p},s,{className:(0,a.Z)("tabs__item",h.tabItem,s?.className,{"tabs__item--active":i===t})}),o??t)})))}function y(e){let{lazy:t,children:o,selectedValue:n}=e;const a=(Array.isArray(o)?o:[o]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},a.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function k(e){const t=g(e);return r.createElement("div",{className:(0,a.Z)("tabs-container",h.tabList)},r.createElement(v,(0,n.Z)({},e,t)),r.createElement(y,(0,n.Z)({},e,t)))}function w(e){const t=(0,b.Z)();return r.createElement(k,(0,n.Z)({key:String(t)},e))}},5453:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>m});var n=o(5675),r=(o(9231),o(4852)),a=o(6600),s=o(5947);const i={},l="Composites customization",c={unversionedId:"guides/using-composites/customization",id:"version-0.3.x/guides/using-composites/customization",title:"Composites customization",description:"Merging composites",source:"@site/versioned_docs/version-0.3.x/guides/using-composites/customization.mdx",sourceDirName:"guides/using-composites",slug:"/guides/using-composites/customization",permalink:"/docs/0.3.x/guides/using-composites/customization",draft:!1,tags:[],version:"0.3.x",frontMatter:{},sidebar:"docs",previous:{title:"Composites deployment",permalink:"/docs/0.3.x/guides/using-composites/deployment"},next:{title:"Creating Composites",permalink:"/docs/0.3.x/guides/creating-composites/overview"}},u={},m=[{value:"Merging composites",id:"merging-composites",level:2},{value:"Extracting models",id:"extracting-models",level:2},{value:"Aliasing Models",id:"aliasing-models",level:2}],p={toc:m},d="wrapper";function f(e){let{components:t,...o}=e;return(0,r.kt)(d,(0,n.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"composites-customization"},"Composites customization"),(0,r.kt)("h2",{id:"merging-composites"},"Merging composites"),(0,r.kt)("p",null,"Multiple composites can be merged together into a single composite including all the models from the source composites."),(0,r.kt)(a.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"api",mdxType:"TabItem"},(0,r.kt)("p",null,"Make sure you have the ",(0,r.kt)("inlineCode",{parentName:"p"},"composedb")," packages ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.3.x/installation"},"installed"),", before running the code below."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { Composite } from '@composedb/devtools'\nimport { readEncodedComposite, writeEncodedComposite } from '@composedb/devtools-node'\n\nconst ceramic = new CeramicClient('http://localhost:7007')\n\nconst loadSources = [\n  'src/first-composite.json',\n  'src/second-composite.json',\n  'src/third-composite.json',\n].map(async (path) => await readEncodedComposite(ceramic, path))\nconst sourceComposites = await Promise.all(loadSources)\nconst mergedComposite = Composite.from(sourceComposites)\n\nawait writeEncodedComposite(mergedComposite, 'merged-composite.json')\n"))),(0,r.kt)(s.Z,{value:"cli",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:merge src/first-composite.json src/second-composite.json src/third-composite.json --output=merged-composite.json\n")))),(0,r.kt)("h2",{id:"extracting-models"},"Extracting models"),(0,r.kt)("p",null,"Composites can contain more models than useful to a given app. To avoid using unnecessary models, it is possible to extract only the wanted models from a given composite, to create a new composite."),(0,r.kt)(a.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"api",mdxType:"TabItem"},(0,r.kt)("p",null,"Make sure you have the ",(0,r.kt)("inlineCode",{parentName:"p"},"composedb")," packages ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.3.x/installation"},"installed"),", before running the code below."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { Composite } from '@composedb/devtools'\nimport { readEncodedComposite, writeEncodedComposite } from '@composedb/devtools-node'\n\nconst ceramic = new CeramicClient('http://localhost:7007')\nconst sourceComposite = await readEncodedComposite(ceramic, 'source-composite.json')\n\nconst mergedComposite = sourceComposite.copy(['modelID1', 'modelID2'])\nawait writeEncodedComposite(mergedComposite, 'new-composite.json')\n"))),(0,r.kt)(s.Z,{value:"cli",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:extract-model source-composite.json modelID1 modelID2 --output=new-composite.json\n")))),(0,r.kt)("h2",{id:"aliasing-models"},"Aliasing Models"),(0,r.kt)("p",null,"Models can be aliases in a given composite, so that the GraphQL Schema uses the provided names instead of the ones defined in the model definition."),(0,r.kt)("p",null,"Make sure you have the ",(0,r.kt)("inlineCode",{parentName:"p"},"composedb")," packages ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.3.x/installation"},"installed"),", before running the code below."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { Composite } from '@composedb/devtools'\nimport { readEncodedComposite, writeEncodedComposite } from '@composedb/devtools-node'\n\nconst ceramic = new CeramicClient('http://localhost:7007')\nconst sourceComposite = await readEncodedComposite(ceramic, 'source-composite.json')\n\nconst newComposite = sourceComposite.setAliases({\n  'kjz...123': 'SomeName',\n  'kjz...456': 'SomeOtherName',\n})\nawait writeEncodedComposite(newComposite, 'new-composite.json')\n")))}f.isMDXComponent=!0}}]);