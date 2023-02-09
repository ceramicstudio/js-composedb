"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6366],{4852:(e,t,a)=>{a.d(t,{Zo:()=>o,kt:()=>c});var n=a(9231);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function d(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var m=n.createContext({}),p=function(e){var t=n.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},o=function(e){var t=p(e.components);return n.createElement(m.Provider,{value:t},e.children)},k="mdxType",N={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,m=e.parentName,o=d(e,["components","mdxType","originalType","parentName"]),k=p(a),s=r,c=k["".concat(m,".").concat(s)]||k[s]||N[s]||i;return a?n.createElement(c,l(l({ref:t},o),{},{components:a})):n.createElement(c,l({ref:t},o))}));function c(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=s;var d={};for(var m in t)hasOwnProperty.call(t,m)&&(d[m]=t[m]);d.originalType=e,d[k]="string"==typeof e?e:r,l[1]=d;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}s.displayName="MDXCreateElement"},4147:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>N,frontMatter:()=>i,metadata:()=>d,toc:()=>p});var n=a(1504),r=(a(9231),a(4852));const i={id:"runtime",title:"Module: runtime",custom_edit_url:null},l=void 0,d={unversionedId:"api/modules/runtime",id:"api/modules/runtime",title:"Module: runtime",description:"ComposeDB runtime module, converting a runtime composite to an executable GraphQL schema.",source:"@site/docs/api/modules/runtime.md",sourceDirName:"api/modules",slug:"/api/modules/runtime",permalink:"/docs/preview/api/modules/runtime",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"runtime",title:"Module: runtime",custom_edit_url:null},sidebar:"api",previous:{title:"Module: client",permalink:"/docs/preview/api/modules/client"},next:{title:"Module: server",permalink:"/docs/preview/api/modules/server"}},m={},p=[{value:"Installation",id:"installation",level:2},{value:"Classes",id:"classes",level:2},{value:"Type Aliases",id:"type-aliases",level:2},{value:"ComposeRuntimeParams",id:"composeruntimeparams",level:3},{value:"Context",id:"context",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"ContextParams",id:"contextparams",level:3},{value:"Type declaration",id:"type-declaration-1",level:4},{value:"DocumentCache",id:"documentcache",level:3},{value:"Type declaration",id:"type-declaration-2",level:4},{value:"GetSchemaParams",id:"getschemaparams",level:3},{value:"Type declaration",id:"type-declaration-3",level:4},{value:"Functions",id:"functions",level:2},{value:"createContext",id:"createcontext",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"createGraphQLSchema",id:"creategraphqlschema",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"getSchema",id:"getschema",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"printGraphQLSchema",id:"printgraphqlschema",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4}],o={toc:p},k="wrapper";function N(e){let{components:t,...a}=e;return(0,r.kt)(k,(0,n.Z)({},o,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"ComposeDB runtime module, converting a runtime composite to an executable GraphQL schema."),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"npm install @composedb/runtime\n")),(0,r.kt)("h2",{id:"classes"},"Classes"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/preview/api/classes/runtime.ComposeRuntime"},"ComposeRuntime"))),(0,r.kt)("h2",{id:"type-aliases"},"Type Aliases"),(0,r.kt)("h3",{id:"composeruntimeparams"},"ComposeRuntimeParams"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"ComposeRuntimeParams"),": ",(0,r.kt)("a",{parentName:"p",href:"/docs/preview/api/modules/runtime#getschemaparams"},(0,r.kt)("inlineCode",{parentName:"a"},"GetSchemaParams"))," & { ",(0,r.kt)("inlineCode",{parentName:"p"},"cache?"),": ",(0,r.kt)("a",{parentName:"p",href:"/docs/preview/api/modules/runtime#documentcache"},(0,r.kt)("inlineCode",{parentName:"a"},"DocumentCache"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")," ; ",(0,r.kt)("inlineCode",{parentName:"p"},"ceramic"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"CeramicApi")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,r.kt)("inlineCode",{parentName:"p"},"context?"),": ",(0,r.kt)("a",{parentName:"p",href:"/docs/preview/api/modules/runtime#context"},(0,r.kt)("inlineCode",{parentName:"a"},"Context")),"  }"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"context"},"Context"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"Context"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Object")),(0,r.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"ceramic")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"CeramicApi")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Ceramic client instance used internally.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"createDoc")),(0,r.kt)("td",{parentName:"tr",align:"left"},"<Content",">","(",(0,r.kt)("inlineCode",{parentName:"td"},"model"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"content"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"Content"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"ModelInstanceDocument"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"Content"),">",">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Create a new document with the given model and content.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"createSingle")),(0,r.kt)("td",{parentName:"tr",align:"left"},"<Content",">","(",(0,r.kt)("inlineCode",{parentName:"td"},"model"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"content"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"Content"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"ModelInstanceDocument"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"Content"),">",">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Create a new single document with the given model and content.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"getViewerID")),(0,r.kt)("td",{parentName:"tr",align:"left"},"() => ",(0,r.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"left"},"ID of the current viewer (authenticated DID), if set.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"isAuthenticated")),(0,r.kt)("td",{parentName:"tr",align:"left"},"() => ",(0,r.kt)("inlineCode",{parentName:"td"},"boolean")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Returns whether the Ceramic client instance used internally is authenticated or not. When not authenticated, mutations will fail.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"loadDoc")),(0,r.kt)("td",{parentName:"tr",align:"left"},"<Content",">","(",(0,r.kt)("inlineCode",{parentName:"td"},"id"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"CommitID")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"StreamID"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"fresh?"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"boolean"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"ModelInstanceDocument"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"Content"),">",">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Load a document by ID, using the cache if possible.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"loader")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"DocumentLoader")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Document loader instance used internally.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"queryConnection")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"query"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"ConnectionQuery"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"Connection"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"ModelInstanceDocument")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"null"),">",">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Query the index for a connection of documents.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"queryCount")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"query"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"BaseQuery"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"number"),">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Query the index for the total number of documents matching the query parameters.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"querySingle")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"query"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"BaseQuery"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"ModelInstanceDocument")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"null"),">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Query the index for a single document.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"updateDoc")),(0,r.kt)("td",{parentName:"tr",align:"left"},"<Content",">","(",(0,r.kt)("inlineCode",{parentName:"td"},"id"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"StreamID"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"content"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"Content"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"options?"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"UpdateDocOptions"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"ModelInstanceDocument"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"Content"),">",">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Update an existing document.")))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"contextparams"},"ContextParams"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"ContextParams"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Object")),(0,r.kt)("h4",{id:"type-declaration-1"},"Type declaration"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"cache?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/docs/preview/api/modules/runtime#documentcache"},(0,r.kt)("inlineCode",{parentName:"a"},"DocumentCache"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"boolean")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Optional cache for documents.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"ceramic")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"CeramicApi")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Ceramic client instance.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"fallbackViewerID?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"null")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Fallback viewer ID to use when the Ceramic instance is not authenticated.")))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"documentcache"},"DocumentCache"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"DocumentCache"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Object")),(0,r.kt)("h4",{id:"type-declaration-2"},"Type declaration"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"clear")),(0,r.kt)("td",{parentName:"tr",align:"left"},"() => ",(0,r.kt)("inlineCode",{parentName:"td"},"any"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"delete")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"id"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"any"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"get")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"id"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"void")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"ModelInstanceDocument"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"any"),">",">",">")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"set")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"id"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"value"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"ModelInstanceDocument"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"any"),">",">",">",") => ",(0,r.kt)("inlineCode",{parentName:"td"},"any"))))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"getschemaparams"},"GetSchemaParams"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"GetSchemaParams"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Object")),(0,r.kt)("h4",{id:"type-declaration-3"},"Type declaration"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"definition?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"RuntimeCompositeDefinition")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Runtime composite definition, created using the ",(0,r.kt)("a",{parentName:"td",href:"/docs/preview/api/classes/devtools.Composite"},(0,r.kt)("inlineCode",{parentName:"a"},"Composite"))," development tools.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"readonly?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"boolean")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Set the schema to read-only, disabling mutations support.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"schema?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"GraphQLSchema")),(0,r.kt)("td",{parentName:"tr",align:"left"},"GraphQL Schema to use, ignores the ",(0,r.kt)("inlineCode",{parentName:"td"},"definition")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"readonly")," parameters if provided.")))),(0,r.kt)("h2",{id:"functions"},"Functions"),(0,r.kt)("h3",{id:"createcontext"},"createContext"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"createContext"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"params"),"): ",(0,r.kt)("a",{parentName:"p",href:"/docs/preview/api/modules/runtime#context"},(0,r.kt)("inlineCode",{parentName:"a"},"Context"))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/docs/preview/api/modules/runtime#contextparams"},(0,r.kt)("inlineCode",{parentName:"a"},"ContextParams")))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/preview/api/modules/runtime#context"},(0,r.kt)("inlineCode",{parentName:"a"},"Context"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"creategraphqlschema"},"createGraphQLSchema"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"createGraphQLSchema"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"params"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"GraphQLSchema")),(0,r.kt)("p",null,"Create a GraphQL schema from a runtime composite definition"),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"CreateSchemaParams"))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"GraphQLSchema")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"getschema"},"getSchema"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"getSchema"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"params"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"GraphQLSchema")),(0,r.kt)("p",null,"Use or create a GraphQL schema based on the provided parameters."),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/docs/preview/api/modules/runtime#getschemaparams"},(0,r.kt)("inlineCode",{parentName:"a"},"GetSchemaParams")))))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"GraphQLSchema")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"printgraphqlschema"},"printGraphQLSchema"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"printGraphQLSchema"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"definition"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"readonly?"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,"Create a GraphQL schema from a runtime composite definition and return its string\nrepresentation."),(0,r.kt)("h4",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default value"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"definition")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"RuntimeCompositeDefinition")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"readonly")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"boolean")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"false"))))),(0,r.kt)("h4",{id:"returns-3"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"string")))}N.isMDXComponent=!0}}]);