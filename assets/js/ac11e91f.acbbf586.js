"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[682],{4852:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var a=n(9231);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||r;return n?a.createElement(f,i(i({ref:t},p),{},{components:n})):a.createElement(f,i({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9269:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(9231),o=n(9841);const r={tabItem:"tabItem_Z7jx"};function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(r.tabItem,i),hidden:n},t)}},9484:(e,t,n)=>{n.d(t,{Z:()=>w});var a=n(1504),o=n(9231),r=n(9841),i=n(7537),l=n(9409),s=n(240),c=n(818),p=n(1273);function m(e){return function(e){return o.Children.map(e,(e=>{if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:o}}=e;return{value:t,label:n,attributes:a,default:o}}))}function u(e){const{values:t,children:n}=e;return(0,o.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,l.k6)(),r=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s._X)(r),(0,o.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(a.location.search);t.set(r,e),a.replace({...a.location,search:t.toString()})}),[r,a])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,r=u(e),[i,l]=(0,o.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:r}))),[s,c]=f({queryString:n,groupId:a}),[m,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,r]=(0,p.Nk)(n);return[a,(0,o.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:a}),b=(()=>{const e=s??m;return d({value:e,tabValues:r})?e:null})();(0,o.useLayoutEffect)((()=>{b&&l(b)}),[b]);return{selectedValue:i,selectValue:(0,o.useCallback)((e=>{if(!d({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),h(e)}),[c,h,r]),tabValues:r}}var b=n(4947);const g={tabList:"tabList_YkLP",tabItem:"tabItem_dswv"};function v(e){let{className:t,block:n,selectedValue:l,selectValue:s,tabValues:c}=e;const p=[],{blockElementScrollPositionUntilNextRender:m}=(0,i.o5)(),u=e=>{const t=e.currentTarget,n=p.indexOf(t),a=c[n].value;a!==l&&(m(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}t?.focus()};return o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":n},t)},c.map((e=>{let{value:t,label:n,attributes:i}=e;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>p.push(e),onKeyDown:d,onClick:u},i,{className:(0,r.Z)("tabs__item",g.tabItem,i?.className,{"tabs__item--active":l===t})}),n??t)})))}function k(e){let{lazy:t,children:n,selectedValue:a}=e;if(n=Array.isArray(n)?n:[n],t){const e=n.find((e=>e.props.value===a));return e?(0,o.cloneElement)(e,{className:"margin-top--md"}):null}return o.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function y(e){const t=h(e);return o.createElement("div",{className:(0,r.Z)("tabs-container",g.tabList)},o.createElement(v,(0,a.Z)({},e,t)),o.createElement(k,(0,a.Z)({},e,t)))}function w(e){const t=(0,b.Z)();return o.createElement(y,(0,a.Z)({key:String(t)},e))}},7254:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>f,frontMatter:()=>l,metadata:()=>c,toc:()=>m});var a=n(1504),o=(n(9231),n(4852)),r=n(9484),i=n(9269);const l={},s="Your first composite",c={unversionedId:"first-composite",id:"version-0.3.x/first-composite",title:"Your first composite",description:"ComposeDB provides an abstraction on top of Ceramic streams by leveraging composites, an internal data structure referencing Ceramic model streams and associated metadata. Most of ComposeDB tools and clients interact with various representations of composites.",source:"@site/versioned_docs/version-0.3.x/first-composite.mdx",sourceDirName:".",slug:"/first-composite",permalink:"/docs/0.3.x/first-composite",draft:!1,tags:[],version:"0.3.x",frontMatter:{},sidebar:"docs",previous:{title:"Ceramic configuration",permalink:"/docs/0.3.x/configuration"},next:{title:"Client setup",permalink:"/docs/0.3.x/client-setup"}},p={},m=[{value:"Running a local Ceramic node",id:"running-a-local-ceramic-node",level:2},{value:"Importing a model",id:"importing-a-model",level:2},{value:"Deploying to a local node",id:"deploying-to-a-local-node",level:2},{value:"Interacting using GraphiQL",id:"interacting-using-graphiql",level:2}],u={toc:m},d="wrapper";function f(e){let{components:t,...l}=e;return(0,o.kt)(d,(0,a.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"your-first-composite"},"Your first composite"),(0,o.kt)("p",null,"ComposeDB provides an abstraction on top of Ceramic streams by leveraging composites, an internal data structure referencing Ceramic model streams and associated metadata. Most of ComposeDB tools and clients interact with various representations of composites."),(0,o.kt)("p",null,"This page presents how to create your first composite and deploy it to your local Ceramic node, in order to interact with documents on Ceramic."),(0,o.kt)("h2",{id:"running-a-local-ceramic-node"},"Running a local Ceramic node"),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Because ComposeDB is still an experimental feature set built on top of Ceramic, if you want to use it with a Ceramic node, you need to set the ",(0,o.kt)("inlineCode",{parentName:"p"},"CERAMIC_ENABLE_EXPERIMENTAL_COMPOSE_DB")," environment variable to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", before running a node. Note that ComposeDB is not yet supported on Ceramic mainnet.")),(0,o.kt)("p",null,"The following steps require a local Ceramic node to be running. If you do not already have it running, you can use the following command:"),(0,o.kt)(r.Z,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"npm",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"npx @ceramicnetwork/cli daemon\n"))),(0,o.kt)(i.Z,{value:"pnpm",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"pnpm dlx @ceramicnetwork/cli daemon\n"))),(0,o.kt)(i.Z,{value:"yarn",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"yarn dlx @ceramicnetwork/cli daemon\n")))),(0,o.kt)("h2",{id:"importing-a-model"},"Importing a model"),(0,o.kt)("p",null,"Composites can be created by importing existing models. Here we're going to import a simple profile model with the stream ID ",(0,o.kt)("inlineCode",{parentName:"p"},"kjzl6hvfrbw6ca7nidsnrv78x7r4xt0xki71nvwe4j5a3s9wgou8yu3aj8cz38e"),", that exists on the Clay testnet."),(0,o.kt)("admonition",{title:"Alternative option",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"If for some reason the model can't be loaded from the Clay testnet, you can ",(0,o.kt)("a",{target:"_blank",href:n(1872).Z},"download the composite file directly instead")," and store it in ",(0,o.kt)("inlineCode",{parentName:"p"},"my-first-composite.json")," file.")),(0,o.kt)(r.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"api",mdxType:"TabItem"},(0,o.kt)("admonition",{title:"Dependencies required",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Make sure you have the listed packages installed before running the code below and your local Ceramic node is connected to the Clay testnet in order to load this model.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { Composite } from '@composedb/devtools'\nimport { writeEncodedComposite } from '@composedb/devtools-node'\n\nconst ceramic = new CeramicClient('http://localhost:7007')\nconst composite = await Composite.fromModels({\n  ceramic,\n  models: ['kjzl6hvfrbw6c7keo17n66rxyo21nqqaa9lh491jz16od43nokz7ksfcvzi6bwc'],\n})\n\nawait writeEncodedComposite(composite, 'my-first-composite.json')\n")),(0,o.kt)("p",null,"More details: ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/classes/devtools.Composite#frommodels"},(0,o.kt)("inlineCode",{parentName:"a"},"Composite.fromModels")),", ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/devtools_node#writeencodedcomposite"},(0,o.kt)("inlineCode",{parentName:"a"},"writeEncodedComposite")))),(0,o.kt)(i.Z,{value:"cli",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:from-model kjzl6hvfrbw6c7keo17n66rxyo21nqqaa9lh491jz16od43nokz7ksfcvzi6bwc --output=my-first-composite.json\n")))),(0,o.kt)("h2",{id:"deploying-to-a-local-node"},"Deploying to a local node"),(0,o.kt)("p",null,"The composite can be deployed from a script or the CLI using the composite file:"),(0,o.kt)(r.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"api",mdxType:"TabItem"},(0,o.kt)("admonition",{title:"Dependencies required",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Make sure you have installed the packages imported in the code below before running the script.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { readEncodedComposite } from '@composedb/devtools-node'\nimport { DID } from 'dids'\nimport { Ed25519Provider } from 'key-did-provider-ed25519'\nimport { getResolver } from 'key-did-resolver'\nimport { fromString } from 'uint8arrays/from-string'\n\n// Hexadecimal-encoded private key for a DID having admin access to the target Ceramic node\n// Replace the example key here by your admin private key\nconst privateKey = fromString('b0cb[...]515f', 'base16')\n\nconst did = new DID({\n  resolver: getResolver(),\n  provider: new Ed25519Provider(privateKey),\n})\nawait did.authenticate()\n\n// Replace by the URL of the Ceramic node you want to deploy the Models to\nconst ceramic = new CeramicClient('http://localhost:7007')\n// An authenticated DID with admin access must be set on the Ceramic instance\nceramic.did = did\n\n// Replace by the path to the local encoded composite file\nconst composite = await readEncodedComposite(ceramic, 'my-first-composite.json')\n\n// Notify the Ceramic node to index the models present in the composite\nawait composite.startIndexingOn(ceramic)\n")),(0,o.kt)("p",null,"More details: ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/devtools_node#readencodedcomposite"},(0,o.kt)("inlineCode",{parentName:"a"},"readEncodedComposite")))),(0,o.kt)(i.Z,{value:"cli",mdxType:"TabItem"},(0,o.kt)("admonition",{title:"Private key required",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Running this command requires an ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.3.x/configuration#admin-dids"},"admin DID")," private key to be\nprovided, using the ",(0,o.kt)("inlineCode",{parentName:"p"},"DID_PRIVATE_KEY")," environment variable or the ",(0,o.kt)("inlineCode",{parentName:"p"},"--did-private-key")," flag.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:deploy my-first-composite.json --ceramic-url=http://localhost:7007\n")))),(0,o.kt)("h2",{id:"interacting-using-graphiql"},"Interacting using GraphiQL"),(0,o.kt)("p",null,"Once the composite is deployed and the Ceramic node configured, it is possible to start a local HTTP server to interact with the generated GraphQL schema, notably using GraphiQL:"),(0,o.kt)(r.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"api",mdxType:"TabItem"},(0,o.kt)("admonition",{title:"Dependencies required",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Make sure you have the ",(0,o.kt)("inlineCode",{parentName:"p"},"@composedb/devtools-node")," package ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.3.x/installation#libraries"},"installed"),", before running the code below.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { serveEncodedDefinition } from '@composedb/devtools-node'\n\nconst server = await serveEncodedDefinition({\n  ceramicURL: 'http://localhost:7007',\n  graphiql: true,\n  path: new URL('my-first-composite.json', import.meta.url),\n  port: 5001,\n})\n\nconsole.log(`Server started on ${server.url}`)\n\nprocess.on('SIGTERM', () => {\n  server.close(() => {\n    console.log('Server stopped')\n  })\n})\n")),(0,o.kt)("p",null,"More details: ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/devtools_node#serveencodeddefinition"},(0,o.kt)("inlineCode",{parentName:"a"},"serveEncodedDefinition")))),(0,o.kt)(i.Z,{value:"cli",mdxType:"TabItem"},(0,o.kt)("p",null,"First, we need to compile the encoded composite definition to a runtime definition:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:compile my-first-composite.json runtime-composite.json\n")),(0,o.kt)("p",null,"Then we can start the local server with GraphiQL using the runtime composite:"),(0,o.kt)("admonition",{title:"Private key required if you want to run mutations",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Running this command in authenticated mode requires a\nprivate key to be\nprovided, using the ",(0,o.kt)("inlineCode",{parentName:"p"},"DID_PRIVATE_KEY")," environment variable or the ",(0,o.kt)("inlineCode",{parentName:"p"},"--did-private-key")," flag."),(0,o.kt)("p",{parentName:"admonition"},"You will not be able to run mutations, unless you start the server in authenticated mode.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"composedb graphql:server --ceramic-url=http://localhost:7007 --graphiql --port=5001 runtime-composite.json\n")))),(0,o.kt)("p",null,"Now you can open ",(0,o.kt)("inlineCode",{parentName:"p"},"http://localhost:5001/graphql")," in your browser and use the GraphiQL web app to query and mutate the model from your composite."),(0,o.kt)("p",null,"For example, to create a ",(0,o.kt)("inlineCode",{parentName:"p"},"SimpleProfile")," instance for the authenticated account:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},'mutation {\n  createSimpleProfile(input: { content: { displayName: "Ceramic Dev" } }) {\n    document {\n      displayName\n    }\n  }\n}\n')),(0,o.kt)("p",null,", and to query the first 10 ",(0,o.kt)("inlineCode",{parentName:"p"},"SimpleProfile")," instances:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n  simpleProfileIndex(first: 10) {\n    edges {\n      node {\n        displayName\n      }\n    }\n  }\n}\n")),(0,o.kt)("p",null,"To check the details of the GraphQL schema built from your runtime composite representation, you can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"graphql:schema")," CLI command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"composedb graphql:schema runtime-composite.json\n")))}f.isMDXComponent=!0},1872:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/my-first-composite-630f0140b8331240c075ee3f25bfcb47.json"}}]);