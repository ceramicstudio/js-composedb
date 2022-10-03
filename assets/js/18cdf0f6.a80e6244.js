"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8443],{4852:(e,t,o)=>{o.d(t,{Zo:()=>u,kt:()=>d});var r=o(9231);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=c(o),d=n,v=m["".concat(l,".").concat(d)]||m[d]||p[d]||a;return o?r.createElement(v,s(s({ref:t},u),{},{components:o})):r.createElement(v,s({ref:t},u))}));function d(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var c=2;c<a;c++)s[c]=o[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,o)}m.displayName="MDXCreateElement"},4300:(e,t,o)=>{o.d(t,{Z:()=>s});var r=o(9231),n=o(9841);const a="tabItem_PkC0";function s(e){let{children:t,hidden:o,className:s}=e;return r.createElement("div",{role:"tabpanel",className:(0,n.Z)(a,s),hidden:o},t)}},5327:(e,t,o)=>{o.d(t,{Z:()=>d});var r=o(2203),n=o(9231),a=o(9841),s=o(5775),i=o(535),l=o(2925),c=o(8910);const u="tabList_OF_g",p="tabItem_Krmg";function m(e){var t;const{lazy:o,block:s,defaultValue:m,values:d,groupId:v,className:b}=e,f=n.Children.map(e.children,(e=>{if((0,n.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),y=d??f.map((e=>{let{props:{value:t,label:o,attributes:r}}=e;return{value:t,label:o,attributes:r}})),g=(0,i.l)(y,((e,t)=>e.value===t.value));if(g.length>0)throw new Error(`Docusaurus error: Duplicate values "${g.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const h=null===m?m:m??(null==(t=f.find((e=>e.props.default)))?void 0:t.props.value)??f[0].props.value;if(null!==h&&!y.some((e=>e.value===h)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${h}" but none of its children has the corresponding value. Available values are: ${y.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:k,setTabGroupChoices:w}=(0,l.U)(),[C,O]=(0,n.useState)(h),T=[],{blockElementScrollPositionUntilNextRender:E}=(0,c.o5)();if(null!=v){const e=k[v];null!=e&&e!==C&&y.some((t=>t.value===e))&&O(e)}const x=e=>{const t=e.currentTarget,o=T.indexOf(t),r=y[o].value;r!==C&&(E(t),O(r),null!=v&&w(v,String(r)))},N=e=>{var t;let o=null;switch(e.key){case"ArrowRight":{const t=T.indexOf(e.currentTarget)+1;o=T[t]??T[0];break}case"ArrowLeft":{const t=T.indexOf(e.currentTarget)-1;o=T[t]??T[T.length-1];break}}null==(t=o)||t.focus()};return n.createElement("div",{className:(0,a.Z)("tabs-container",u)},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":s},b)},y.map((e=>{let{value:t,label:o,attributes:s}=e;return n.createElement("li",(0,r.Z)({role:"tab",tabIndex:C===t?0:-1,"aria-selected":C===t,key:t,ref:e=>T.push(e),onKeyDown:N,onFocus:x,onClick:x},s,{className:(0,a.Z)("tabs__item",p,null==s?void 0:s.className,{"tabs__item--active":C===t})}),o??t)}))),o?(0,n.cloneElement)(f.filter((e=>e.props.value===C))[0],{className:"margin-top--md"}):n.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==C})))))}function d(e){const t=(0,s.Z)();return n.createElement(m,(0,r.Z)({key:String(t)},e))}},4231:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var r=o(2203),n=(o(9231),o(4852)),a=o(5327),s=o(4300);const i={},l="Composites discovery",c={unversionedId:"guides/using-composites/discovery",id:"guides/using-composites/discovery",title:"Composites discovery",description:"ComposeDB does not yet provide a way to discover composites directly, however it is possible to create composites from known models.",source:"@site/docs/guides/using-composites/discovery.mdx",sourceDirName:"guides/using-composites",slug:"/guides/using-composites/discovery",permalink:"/docs/0.3.x/guides/using-composites/discovery",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Using composites",permalink:"/docs/0.3.x/category/using-composites"},next:{title:"Composites deployment",permalink:"/docs/0.3.x/guides/using-composites/deployment"}},u={},p=[{value:"Models discovery",id:"models-discovery",level:2},{value:"Creating a composite from known models",id:"creating-a-composite-from-known-models",level:2}],m={toc:p};function d(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,r.Z)({},m,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"composites-discovery"},"Composites discovery"),(0,n.kt)("p",null,"ComposeDB does not yet provide a way to discover composites directly, however it is possible to create composites from known models."),(0,n.kt)("h2",{id:"models-discovery"},"Models discovery"),(0,n.kt)("p",null,"The ComposeDB CLI can be used to list the models indexed by 3Box Labs on the Clay network."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"composedb model:list --table\n")),(0,n.kt)("h2",{id:"creating-a-composite-from-known-models"},"Creating a composite from known models"),(0,n.kt)("p",null,"When models are available on a Ceramic network, it is possible to load them into a composite so they can be easily reused."),(0,n.kt)(a.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,n.kt)(s.Z,{value:"api",mdxType:"TabItem"},(0,n.kt)("p",null,"Make sure you have the ",(0,n.kt)("inlineCode",{parentName:"p"},"composedb")," packages ",(0,n.kt)("a",{parentName:"p",href:"/docs/0.3.x/installation"},"installed"),", before running the code below."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { Composite } from '@composedb/devtools'\nimport { writeEncodedComposite } from '@composedb/devtools-node'\n\nconst ceramic = new CeramicClient('https://gateway-clay.ceramic.network')\nconst composite = await Composite.fromModels({ ceramic, models: ['<model ID>'] })\n\nawait writeEncodedComposite(composite, 'my-composite.json')\n"))),(0,n.kt)(s.Z,{value:"cli",mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:from-model <model ID> --ceramic-url=https://gateway-clay.ceramic.network --output=my-composite.json\n")))))}d.isMDXComponent=!0}}]);