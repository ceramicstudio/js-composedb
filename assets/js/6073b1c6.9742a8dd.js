"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2874],{4852:(e,o,t)=>{t.d(o,{Zo:()=>r,kt:()=>f});var n=t(9231);function i(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}function a(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?a(Object(t),!0).forEach((function(o){i(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}function m(e,o){if(null==e)return{};var t,n,i=function(e,o){if(null==e)return{};var t,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],o.indexOf(t)>=0||(i[t]=e[t]);return i}(e,o);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],o.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=n.createContext({}),s=function(e){var o=n.useContext(p),t=o;return e&&(t="function"==typeof e?e(o):c(c({},o),e)),t},r=function(e){var o=s(e.components);return n.createElement(p.Provider,{value:o},e.children)},d="mdxType",l={inlineCode:"code",wrapper:function(e){var o=e.children;return n.createElement(n.Fragment,{},o)}},u=n.forwardRef((function(e,o){var t=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,r=m(e,["components","mdxType","originalType","parentName"]),d=s(t),u=i,f=d["".concat(p,".").concat(u)]||d[u]||l[u]||a;return t?n.createElement(f,c(c({ref:o},r),{},{components:t})):n.createElement(f,c({ref:o},r))}));function f(e,o){var t=arguments,i=o&&o.mdxType;if("string"==typeof e||i){var a=t.length,c=new Array(a);c[0]=u;var m={};for(var p in o)hasOwnProperty.call(o,p)&&(m[p]=o[p]);m.originalType=e,m[d]="string"==typeof e?e:i,c[1]=m;for(var s=2;s<a;s++)c[s]=t[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},839:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>p,contentTitle:()=>c,default:()=>l,frontMatter:()=>a,metadata:()=>m,toc:()=>s});var n=t(644),i=(t(9231),t(4852));const a={id:"cli.composite",title:"CLI: composite:* commands",custom_edit_url:null},c=void 0,m={unversionedId:"api/commands/cli.composite",id:"version-0.2.x/api/commands/cli.composite",title:"CLI: composite:* commands",description:"The group of CLI composite:* commands enables the creation and interactions with Composites",source:"@site/versioned_docs/version-0.2.x/api/commands/cli.composite.md",sourceDirName:"api/commands",slug:"/api/commands/cli.composite",permalink:"/docs/0.2.x/api/commands/cli.composite",draft:!1,editUrl:null,tags:[],version:"0.2.x",frontMatter:{id:"cli.composite",title:"CLI: composite:* commands",custom_edit_url:null},sidebar:"api",previous:{title:"CLI: did:* commands",permalink:"/docs/0.2.x/api/commands/cli.did"},next:{title:"CLI: model:* commands",permalink:"/docs/0.2.x/api/commands/cli.model"}},p={},s=[{value:"Command List",id:"command-list",level:2},{value:"Usage",id:"usage",level:2},{value:"<code>composedb composite:from-model</code>",id:"composedb-compositefrom-model",level:3},{value:"<code>composedb composite:create</code>",id:"composedb-compositecreate",level:3},{value:"<code>composedb composite:models</code>",id:"composedb-compositemodels",level:3},{value:"<code>composedb composite:extract-model</code>",id:"composedb-compositeextract-model",level:3},{value:"<code>composedb composite:merge</code>",id:"composedb-compositemerge",level:3},{value:"<code>composedb composite:deploy</code>",id:"composedb-compositedeploy",level:3},{value:"<code>composedb composite:compile</code>",id:"composedb-compositecompile",level:3}],r={toc:s},d="wrapper";function l(e){let{components:o,...t}=e;return(0,i.kt)(d,(0,n.Z)({},r,t,{components:o,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The group of ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.2.x/api/modules/cli"},"CLI")," ",(0,i.kt)("inlineCode",{parentName:"p"},"composite:*")," commands enables the creation and interactions with ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/concepts-overview#composites"},"Composites")),(0,i.kt)("h2",{id:"command-list"},"Command List"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#composedb-compositefrom-model"},(0,i.kt)("inlineCode",{parentName:"a"},"composedb composite:from-model STREAMIDS"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#composedb-compositecreate"},(0,i.kt)("inlineCode",{parentName:"a"},"composedb composite:create INPUT"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#composedb-compositemodels"},(0,i.kt)("inlineCode",{parentName:"a"},"composedb composite:models PATH"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#composedb-compositeextract-model"},(0,i.kt)("inlineCode",{parentName:"a"},"composedb composite:extract-model PATH MODELS"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#composedb-compositemerge"},(0,i.kt)("inlineCode",{parentName:"a"},"composedb composite:merge PATHS"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#composedb-compositedeploy"},(0,i.kt)("inlineCode",{parentName:"a"},"composedb composite:deploy PATH"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#composedb-compositecompile"},(0,i.kt)("inlineCode",{parentName:"a"},"composedb composite:compile PATH OUTPUTPATHS")))),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("h3",{id:"composedb-compositefrom-model"},(0,i.kt)("inlineCode",{parentName:"h3"},"composedb composite:from-model")),(0,i.kt)("p",null,"Create an encoded composite definition from a list of already existing model stream ids (usually found by ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/using-composites/discovery"},"Composites Discovery"),")"),(0,i.kt)("p",null,"You can find a detailed guide on using an existing model to create your composite ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.2.x/first-composite"},"here")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb composite:from-model PATH MODELS\n\nARGUMENTS\n  PATH                     a path to an encoded composite definition file\n  MODELS                   a list of models (identified by names of stream IDs) to extract from the given composite\n\nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n  -o, --output             a path to file where the resulting encoded composite definition should be saved\n")),(0,i.kt)("h3",{id:"composedb-compositecreate"},(0,i.kt)("inlineCode",{parentName:"h3"},"composedb composite:create")),(0,i.kt)("p",null,"Create an encoded composite definition from GraphQL ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/creating-composites/overview#composite-schema"},"Composite Schema")),(0,i.kt)("p",null,"You can find a detailed guide on the creation of Composites ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/creating-composites/overview"},"here")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb composite:create INPUT\n\nARGUMENTS\n  INPUT                    a path to file containing valid ceramic composite definition in GraphQL Schema Definition Language\n\nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n  -k, --did-private-key    DID Private Key (you can generate a fresh private key using composedb did:generate-private-key)\n  -o, --output             a path to file where the resulting encoded composite definition should be saved\n")),(0,i.kt)("h3",{id:"composedb-compositemodels"},(0,i.kt)("inlineCode",{parentName:"h3"},"composedb composite:models")),(0,i.kt)("p",null,"Display the list of models included in a composite"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb composite:models PATH\n\nARGUMENTS\n  PATH                     a path to a file containing a composite's encoded definition\n\nOPTIONS\n  --id-only                display only the stream IDs of models included in the composite (exclusive to --table)\n  --table                  display the models in a table (excusive to --id-only)\n")),(0,i.kt)("h3",{id:"composedb-compositeextract-model"},(0,i.kt)("inlineCode",{parentName:"h3"},"composedb composite:extract-model")),(0,i.kt)("p",null,"Create an encoded composite definition from another one by extracting given models"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb composite:extract-model PATH MODELS\n\nARGUMENTS\n  PATH                     a path to encoded representation of a composite\n  MODELS                   one or more models to use when extracting a new composite, identified by name or stream ID\n\nOPTIONS\n  -o, --output             a path to file where the resulting encoded composite definition should be saved\n")),(0,i.kt)("h3",{id:"composedb-compositemerge"},(0,i.kt)("inlineCode",{parentName:"h3"},"composedb composite:merge")),(0,i.kt)("p",null,"Create an encoded composite definition by merging other composites"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb composite:merge PATHS\n\nARGUMENTS\n  PATHS                    a list of paths to files containing encoded composites, separated by spaces\n\nOPTIONS\n  -e, --common-embeds      'all','none' or a list of comma-separated embeds to extract from input composites into the output composite\n  -o, --output             a path to file where the resulting encoded composite definition should be saved\n")),(0,i.kt)("h3",{id:"composedb-compositedeploy"},(0,i.kt)("inlineCode",{parentName:"h3"},"composedb composite:deploy")),(0,i.kt)("p",null,"Deploy models included in the composite on connected ceramic node"),(0,i.kt)("p",null,"You will need to use this command to make sure that your DApp's Composite is available on the Ceramic Node that yor DApp\nconnects to. You can find a detailed guide on Composites' deployment ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/using-composites/deployment"},"here")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb composite:deploy PATH\n\nARGUMENTS\n  PATH                     a path to a file containing a composite's encoded definition\n  \nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n")),(0,i.kt)("h3",{id:"composedb-compositecompile"},(0,i.kt)("inlineCode",{parentName:"h3"},"composedb composite:compile")),(0,i.kt)("p",null,"Creates a runtime definition of the composite and saves it in given path(s)."),(0,i.kt)("p",null,"You will need the runtime definition to configure your ComposeDB Client. You can find a detailed guide on how to configure a ComposeDB Client ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.2.x/client-setup"},"here")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"USAGE\n  $ composedb composite:compile PATH OUTPUTPATHS\n\nARGUMENTS\n  PATH                     a path to a file containing a composite's encoded definition\n  OUTPUTPATHS              one or more paths to save runtime representation in. Supported extensions: .json, .js and .ts\n")))}l.isMDXComponent=!0}}]);