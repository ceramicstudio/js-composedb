"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1911],{54852:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(49231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=a,f=p["".concat(c,".").concat(m)]||p[m]||d[m]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1650:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(49231),a=n(19841);const o={tabItem:"tabItem_HMhy"};function i(e){let{children:t,hidden:n,className:i}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o.tabItem,i),hidden:n},t)}},83651:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(35664),a=n(49231),o=n(19841),i=n(63629),s=n(19409),c=n(10372),l=n(60441),u=n(20437);function p(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function d(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,l.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,c._X)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(r.location.search);t.set(o,e),r.replace({...r.location,search:t.toString()})}),[o,r])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,o=d(e),[i,s]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[c,l]=f({queryString:n,groupId:r}),[p,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,o]=(0,u.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:r}),b=(()=>{const e=c??p;return m({value:e,tabValues:o})?e:null})();(0,a.useLayoutEffect)((()=>{b&&s(b)}),[b]);return{selectedValue:i,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),l(e),h(e)}),[l,h,o]),tabValues:o}}var b=n(45203);const v={tabList:"tabList_QrKk",tabItem:"tabItem_kLQQ"};function g(e){let{className:t,block:n,selectedValue:s,selectValue:c,tabValues:l}=e;const u=[],{blockElementScrollPositionUntilNextRender:p}=(0,i.o5)(),d=e=>{const t=e.currentTarget,n=u.indexOf(t),r=l[n].value;r!==s&&(p(t),c(r))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},l.map((e=>{let{value:t,label:n,attributes:i}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>u.push(e),onKeyDown:m,onClick:d},i,{className:(0,o.Z)("tabs__item",v.tabItem,i?.className,{"tabs__item--active":s===t})}),n??t)})))}function y(e){let{lazy:t,children:n,selectedValue:r}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function k(e){const t=h(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",v.tabList)},a.createElement(g,(0,r.Z)({},e,t)),a.createElement(y,(0,r.Z)({},e,t)))}function w(e){const t=(0,b.Z)();return a.createElement(k,(0,r.Z)({key:String(t)},e))}},27889:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>f,frontMatter:()=>s,metadata:()=>l,toc:()=>p});var r=n(35664),a=(n(49231),n(54852)),o=n(83651),i=n(1650);const s={},c="Creating Composites",l={unversionedId:"guides/creating-composites/overview",id:"version-0.3.x/guides/creating-composites/overview",title:"Creating Composites",description:"Composites are the abstraction ComposeDB tools and client use to represent and manipulate data models used by applications.",source:"@site/versioned_docs/version-0.3.x/guides/creating-composites/overview.mdx",sourceDirName:"guides/creating-composites",slug:"/guides/creating-composites/overview",permalink:"/docs/0.3.x/guides/creating-composites/overview",draft:!1,tags:[],version:"0.3.x",frontMatter:{},sidebar:"docs",previous:{title:"Composites customization",permalink:"/docs/0.3.x/guides/using-composites/customization"},next:{title:"Schema definition",permalink:"/docs/0.3.x/guides/creating-composites/schema"}},u={},p=[{value:"Composite schema",id:"composite-schema",level:2},{value:"Converting a schema to a composite",id:"converting-a-schema-to-a-composite",level:2}],d={toc:p},m="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"creating-composites"},"Creating Composites"),(0,a.kt)("head",null,(0,a.kt)("meta",{name:"robots",content:"noindex"}),(0,a.kt)("meta",{name:"googlebot",content:"noindex"})),(0,a.kt)("p",null,"Composites are the abstraction ComposeDB tools and client use to represent and manipulate data models used by applications."),(0,a.kt)("p",null,"In order to create new composites, especially to create new models that do not already exist on the Ceramic network, a high-level schema can be used as an abstraction for the composite structure."),(0,a.kt)("h2",{id:"composite-schema"},"Composite schema"),(0,a.kt)("p",null,"The recommended way to create composites including new models is to use a schema file based on GraphQL, described in the ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/guides/creating-composites/schema"},"dedicated documentation page"),"."),(0,a.kt)("h2",{id:"converting-a-schema-to-a-composite"},"Converting a schema to a composite"),(0,a.kt)("p",null,"After a schema file has been created, it must be converted to a composite to be usable by the other tools and client."),(0,a.kt)(o.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,a.kt)(i.Z,{value:"api",mdxType:"TabItem"},(0,a.kt)("admonition",{title:"Dependencies required",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Make sure you have installed the packages imported in the code below before running the script.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { createComposite, writeEncodedComposite } from '@composedb/devtools-node'\nimport { DID } from 'dids'\nimport { Ed25519Provider } from 'key-did-provider-ed25519'\nimport { getResolver } from 'key-did-resolver'\nimport { fromString } from 'uint8arrays/from-string'\n\n// Hexadecimal-encoded private key for a DID having admin access to the target Ceramic node\n// Replace the example key here by your admin private key\nconst privateKey = fromString('b0cb[...]515f', 'base16')\n\nconst did = new DID({\n  resolver: getResolver(),\n  provider: new Ed25519Provider(privateKey),\n})\nawait did.authenticate()\n\n// Replace by the URL of the Ceramic node you want to deploy the Models to\nconst ceramic = new CeramicClient('http://localhost:7007')\n// An authenticated DID with admin access must be set on the Ceramic instance\nceramic.did = did\n\n// Replace by the path to the source schema file\nconst composite = await createComposite(ceramic, 'source-schema.graphql')\n\n// Replace by the path to the encoded composite file\nawait writeEncodedComposite(composite, 'my-composite.json')\n")),(0,a.kt)("p",null,"More details: ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/devtools_node#createcomposite"},(0,a.kt)("inlineCode",{parentName:"a"},"createComposite")),", ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/devtools_node#writeencodedcomposite"},(0,a.kt)("inlineCode",{parentName:"a"},"writeEncodedComposite")))),(0,a.kt)(i.Z,{value:"cli",mdxType:"TabItem"},(0,a.kt)("admonition",{title:"Private key required",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Running this command requires an ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/configuration#admin-dids"},"admin DID")," private key to be\nprovided, using the ",(0,a.kt)("inlineCode",{parentName:"p"},"DID_PRIVATE_KEY")," environment variable or the ",(0,a.kt)("inlineCode",{parentName:"p"},"--did-private-key")," flag.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:create source-schema.graphql --output=my-composite.json\n")))))}f.isMDXComponent=!0}}]);