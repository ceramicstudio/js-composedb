"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9474],{4852:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var o=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),u=a,f=d["".concat(s,".").concat(u)]||d[u]||m[u]||r;return n?o.createElement(f,i(i({ref:t},p),{},{components:n})):o.createElement(f,i({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4300:(e,t,n)=>{n.d(t,{Z:()=>i});var o=n(9231),a=n(9841);const r="tabItem_PkC0";function i(e){let{children:t,hidden:n,className:i}=e;return o.createElement("div",{role:"tabpanel",className:(0,a.Z)(r,i),hidden:n},t)}},5327:(e,t,n)=>{n.d(t,{Z:()=>u});var o=n(2203),a=n(9231),r=n(9841),i=n(5775),l=n(535),s=n(2925),c=n(8910);const p="tabList_OF_g",m="tabItem_Krmg";function d(e){var t;const{lazy:n,block:i,defaultValue:d,values:u,groupId:f,className:h}=e,v=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=u??v.map((e=>{let{props:{value:t,label:n,attributes:o}}=e;return{value:t,label:n,attributes:o}})),y=(0,l.l)(g,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const b=null===d?d:d??(null==(t=v.find((e=>e.props.default)))?void 0:t.props.value)??v[0].props.value;if(null!==b&&!g.some((e=>e.value===b)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${b}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:k,setTabGroupChoices:w}=(0,s.U)(),[C,N]=(0,a.useState)(b),x=[],{blockElementScrollPositionUntilNextRender:T}=(0,c.o5)();if(null!=f){const e=k[f];null!=e&&e!==C&&g.some((t=>t.value===e))&&N(e)}const I=e=>{const t=e.currentTarget,n=x.indexOf(t),o=g[n].value;o!==C&&(T(t),N(o),null!=f&&w(f,String(o)))},E=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=x.indexOf(e.currentTarget)+1;n=x[t]??x[0];break}case"ArrowLeft":{const t=x.indexOf(e.currentTarget)-1;n=x[t]??x[x.length-1];break}}null==(t=n)||t.focus()};return a.createElement("div",{className:(0,r.Z)("tabs-container",p)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":i},h)},g.map((e=>{let{value:t,label:n,attributes:i}=e;return a.createElement("li",(0,o.Z)({role:"tab",tabIndex:C===t?0:-1,"aria-selected":C===t,key:t,ref:e=>x.push(e),onKeyDown:E,onFocus:I,onClick:I},i,{className:(0,r.Z)("tabs__item",m,null==i?void 0:i.className,{"tabs__item--active":C===t})}),n??t)}))),n?(0,a.cloneElement)(v.filter((e=>e.props.value===C))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},v.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==C})))))}function u(e){const t=(0,i.Z)();return a.createElement(d,(0,o.Z)({key:String(t)},e))}},6032:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>l,metadata:()=>c,toc:()=>m});var o=n(2203),a=(n(9231),n(4852)),r=n(5327),i=n(4300);const l={},s="Your first composite",c={unversionedId:"first-composite",id:"first-composite",title:"Your first composite",description:"ComposeDB provides an abstraction on top of Ceramic streams by leveraging composites, an internal data structure referencing Ceramic model streams and associated metadata. Most of ComposeDB tools and clients interact with various representations of composites.",source:"@site/docs/first-composite.mdx",sourceDirName:".",slug:"/first-composite",permalink:"/docs/0.3.x/first-composite",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Ceramic configuration",permalink:"/docs/0.3.x/configuration"},next:{title:"Client setup",permalink:"/docs/0.3.x/client-setup"}},p={},m=[{value:"Running a local Ceramic node",id:"running-a-local-ceramic-node",level:2},{value:"Importing a model",id:"importing-a-model",level:2},{value:"Deploying to a local node",id:"deploying-to-a-local-node",level:2},{value:"Interacting using GraphiQL",id:"interacting-using-graphiql",level:2}],d={toc:m};function u(e){let{components:t,...l}=e;return(0,a.kt)("wrapper",(0,o.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"your-first-composite"},"Your first composite"),(0,a.kt)("p",null,"ComposeDB provides an abstraction on top of Ceramic streams by leveraging composites, an internal data structure referencing Ceramic model streams and associated metadata. Most of ComposeDB tools and clients interact with various representations of composites."),(0,a.kt)("p",null,"This page presents how to create your first composite and deploy it to your local Ceramic node, in order to interact with documents on Ceramic."),(0,a.kt)("h2",{id:"running-a-local-ceramic-node"},"Running a local Ceramic node"),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Because ComposeDB is still an experimental feature set built on top of Ceramic, if you want to use it with a Ceramic node, you need to set the ",(0,a.kt)("inlineCode",{parentName:"p"},"CERAMIC_ENABLE_EXPERIMENTAL_COMPOSE_DB")," environment variable to ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),", before running a node. Note that ComposeDB is not yet supported on Ceramic mainnet.")),(0,a.kt)("p",null,"The following steps require a local Ceramic node to be running. If you do not already have it running, you can use the following command:"),(0,a.kt)(r.Z,{defaultValue:"pnpm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,a.kt)(i.Z,{value:"npm",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"npx @ceramicnetwork/cli daemon --network=inmemory\n"))),(0,a.kt)(i.Z,{value:"pnpm",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"pnpm dlx @ceramicnetwork/cli daemon --network=inmemory\n"))),(0,a.kt)(i.Z,{value:"yarn",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"yarn dlx @ceramicnetwork/cli daemon --network=inmemory\n")))),(0,a.kt)("h2",{id:"importing-a-model"},"Importing a model"),(0,a.kt)("p",null,"Composites can be created by importing existing models. Here we're going to import a simple profile model with the stream ID ",(0,a.kt)("inlineCode",{parentName:"p"},"kjzl6hvfrbw6ca7nidsnrv78x7r4xt0xki71nvwe4j5a3s9wgou8yu3aj8cz38e"),", that exists on the Clay testnet."),(0,a.kt)("admonition",{title:"Alternative option",type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"If for some reason the model can't be loaded from the Clay testnet, you can ",(0,a.kt)("a",{target:"_blank",href:n(4678).Z},"download the composite file directly instead")," and store it in ",(0,a.kt)("inlineCode",{parentName:"p"},"my-first-composite.json")," file.")),(0,a.kt)(r.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,a.kt)(i.Z,{value:"api",mdxType:"TabItem"},(0,a.kt)("admonition",{title:"Dependencies required",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Make sure you have the listed packages installed before running the code below and your local Ceramic node is connected to the Clay testnet in order to load this model.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { Composite } from '@composedb/devtools'\nimport { writeEncodedComposite } from '@composedb/devtools-node'\n\nconst ceramic = new CeramicClient('http://localhost:7007')\nconst composite = await Composite.fromModels({\n  ceramic,\n  models: ['kjzl6hvfrbw6ca7nidsnrv78x7r4xt0xki71nvwe4j5a3s9wgou8yu3aj8cz38e'],\n})\n\nawait writeEncodedComposite(composite, 'my-first-composite.json')\n")),(0,a.kt)("p",null,"More details: ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/classes/devtools.Composite#frommodels"},(0,a.kt)("inlineCode",{parentName:"a"},"Composite.fromModels")),", ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/devtools_node#writeencodedcomposite"},(0,a.kt)("inlineCode",{parentName:"a"},"writeEncodedComposite")))),(0,a.kt)(i.Z,{value:"cli",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:from-model kjzl6hvfrbw6ca7nidsnrv78x7r4xt0xki71nvwe4j5a3s9wgou8yu3aj8cz38e --network=testnet-clay --output=my-first-composite.json\n")))),(0,a.kt)("h2",{id:"deploying-to-a-local-node"},"Deploying to a local node"),(0,a.kt)("p",null,"The composite can be deployed from a script or the CLI using the composite file:"),(0,a.kt)(r.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,a.kt)(i.Z,{value:"api",mdxType:"TabItem"},(0,a.kt)("admonition",{title:"Dependencies required",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Make sure you have installed the packages imported in the code below before running the script.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { CeramicClient } from '@ceramicnetwork/http-client'\nimport { readEncodedComposite } from '@composedb/devtools-node'\nimport { DID } from 'dids'\nimport { Ed25519Provider } from 'key-did-provider-ed25519'\nimport { getResolver } from 'key-did-resolver'\nimport { fromString } from 'uint8arrays/from-string'\n\n// Hexadecimal-encoded private key for a DID having admin access to the target Ceramic node\n// Replace the example key here by your admin private key\nconst privateKey = fromString('b0cb[...]515f')\n\nconst did = new DID({\n  resolver: getResolver(),\n  provider: new Ed25519Provider(privateKey),\n})\nawait did.authenticate()\n\n// Replace by the URL of the Ceramic node you want to deploy the Models to\nconst ceramic = new CeramicClient('http://localhost:7007')\n// An authenticated DID with admin access must be set on the Ceramic instance\nceramic.did = did\n\n// Replace by the path to the local encoded composite file\nconst composite = await readEncodedComposite(ceramic, 'my-first-composite.json')\n\n// Notify the Ceramic node to index the models present in the composite\nawait composite.startIndexingOn(ceramic)\n")),(0,a.kt)("p",null,"More details: ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/devtools_node#readencodedcomposite"},(0,a.kt)("inlineCode",{parentName:"a"},"readEncodedComposite")))),(0,a.kt)(i.Z,{value:"cli",mdxType:"TabItem"},(0,a.kt)("admonition",{title:"Private key required",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Running this command requires an ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/configuration#admin-dids"},"admin DID")," private key to be\nprovided, using the ",(0,a.kt)("inlineCode",{parentName:"p"},"DID_PRIVATE_KEY")," environment variable or the ",(0,a.kt)("inlineCode",{parentName:"p"},"--did-private-key")," flag.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:deploy my-first-composite.json --ceramic-url=http://localhost:7007\n")))),(0,a.kt)("h2",{id:"interacting-using-graphiql"},"Interacting using GraphiQL"),(0,a.kt)("p",null,"Once the composite is deployed and the Ceramic node configured, it is possible to start a local HTTP server to interact with the generated GraphQL schema, notably using GraphiQL:"),(0,a.kt)(r.Z,{defaultValue:"api",groupId:"api-or-cli",values:[{label:"Using the CLI",value:"cli"},{label:"Using the API",value:"api"}],mdxType:"Tabs"},(0,a.kt)(i.Z,{value:"api",mdxType:"TabItem"},(0,a.kt)("admonition",{title:"Dependencies required",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Make sure you have the ",(0,a.kt)("inlineCode",{parentName:"p"},"@composedb/devtools-node")," package ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/installation#libraries"},"installed"),", before running the code below.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { serveEncodedDefinition } from '@composedb/devtools-node'\n\nconst server = await serveEncodedDefinition({\n  ceramicURL: 'http://localhost:7007',\n  graphiql: true,\n  path: new URL('my-first-composite.json', import.meta.url),\n  port: 5000,\n})\n\nconsole.log(`Server started on ${server.url}`)\n\nprocess.on('SIGTERM', () => {\n  server.close(() => {\n    console.log('Server stopped')\n  })\n})\n")),(0,a.kt)("p",null,"More details: ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.3.x/api/modules/devtools_node#serveencodeddefinition"},(0,a.kt)("inlineCode",{parentName:"a"},"serveEncodedDefinition")))),(0,a.kt)(i.Z,{value:"cli",mdxType:"TabItem"},(0,a.kt)("p",null,"First, we need to compile the encoded composite definition to a runtime definition:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"composedb composite:compile my-first-composite.json runtime-composite.json\n")),(0,a.kt)("p",null,"Then we can start the local server with GraphiQL using the runtime composite:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"composedb graphql:server --ceramic-url=http://localhost:7007 --graphiql --port=5000 runtime-composite.json\n")))))}u.isMDXComponent=!0},4678:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/files/my-first-composite-630f0140b8331240c075ee3f25bfcb47.json"}}]);