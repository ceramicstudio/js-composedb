"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9357],{4852:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var i=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=i.createContext({}),c=function(e){var t=i.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=c(e.components);return i.createElement(d.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,d=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=a,f=p["".concat(d,".").concat(m)]||p[m]||u[m]||r;return n?i.createElement(f,o(o({ref:t},s),{},{components:n})):i.createElement(f,o({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=m;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[p]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<r;c++)o[c]=n[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6825:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var i=n(644),a=(n(9231),n(4852));const r={},o="Supported directives",l={unversionedId:"guides/creating-composites/directives",id:"version-0.2.x/guides/creating-composites/directives",title:"Supported directives",description:"Directives provide extra metadata when declaring scalars, lists and shapes.",source:"@site/versioned_docs/version-0.2.x/guides/creating-composites/directives.md",sourceDirName:"guides/creating-composites",slug:"/guides/creating-composites/directives",permalink:"/docs/0.2.x/guides/creating-composites/directives",draft:!1,tags:[],version:"0.2.x",frontMatter:{},sidebar:"docs",previous:{title:"Supported scalars",permalink:"/docs/0.2.x/guides/creating-composites/scalars"},next:{title:"Interacting with data",permalink:"/docs/0.2.x/category/interacting-with-data"}},d={},c=[{value:"Model identification",id:"model-identification",level:2},{value:"<code>@createModel</code>",id:"createmodel",level:3},{value:"Type validation",id:"type-validation",level:2},{value:"<code>@int</code>",id:"int",level:3},{value:"<code>@float</code>",id:"float",level:3},{value:"<code>@string</code>",id:"string",level:3},{value:"<code>@list</code>",id:"list",level:3},{value:"Views",id:"views",level:2},{value:"<code>@documentAccount</code>",id:"documentaccount",level:3},{value:"<code>@documentVersion</code>",id:"documentversion",level:3}],s={toc:c},p="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,i.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"supported-directives"},"Supported directives"),(0,a.kt)("p",null,"Directives provide extra metadata when declaring scalars, lists and shapes."),(0,a.kt)("h2",{id:"model-identification"},"Model identification"),(0,a.kt)("h3",{id:"createmodel"},(0,a.kt)("inlineCode",{parentName:"h3"},"@createModel")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"@createModel")," directive applies to shapes, indicating the shape needs to be created as a Model. A Composite must contain at least one Model to be valid, otherwise there would be nothing to interact with."),(0,a.kt)("p",null,"When using the ",(0,a.kt)("inlineCode",{parentName:"p"},"@createModel")," directive, two parameters must be provided:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"accountRelation"),": the type of relation between documents created using the Model and the account controlling the document, which can be ",(0,a.kt)("inlineCode",{parentName:"li"},"SINGLE")," for a single document of the given Model (for example profile information), or ",(0,a.kt)("inlineCode",{parentName:"li"},"LIST")," for a potentially infinite list of documents."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"description"),": a string describing the Model, to help with discovery.")),(0,a.kt)("h2",{id:"type-validation"},"Type validation"),(0,a.kt)("p",null,"The following directives provide validation information on primitive scalars and lists:"),(0,a.kt)("h3",{id:"int"},(0,a.kt)("inlineCode",{parentName:"h3"},"@int")),(0,a.kt)("p",null,"Defines the optional ",(0,a.kt)("inlineCode",{parentName:"p"},"max: Int")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"min: Int")," value for ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/creating-composites/scalars#int"},(0,a.kt)("inlineCode",{parentName:"a"},"Int")," scalars"),"."),(0,a.kt)("h3",{id:"float"},(0,a.kt)("inlineCode",{parentName:"h3"},"@float")),(0,a.kt)("p",null,"Defines the optional ",(0,a.kt)("inlineCode",{parentName:"p"},"max: Float")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"min: Float")," value for ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/creating-composites/scalars#float"},(0,a.kt)("inlineCode",{parentName:"a"},"Float")," scalars"),"."),(0,a.kt)("h3",{id:"string"},(0,a.kt)("inlineCode",{parentName:"h3"},"@string")),(0,a.kt)("p",null,"Defines the required ",(0,a.kt)("inlineCode",{parentName:"p"},"maxLength: Int")," and optional ",(0,a.kt)("inlineCode",{parentName:"p"},"minLength: Int")," value for ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/creating-composites/scalars#string"},(0,a.kt)("inlineCode",{parentName:"a"},"String")," scalars")," and scalars extending ",(0,a.kt)("inlineCode",{parentName:"p"},"String"),"."),(0,a.kt)("h3",{id:"list"},(0,a.kt)("inlineCode",{parentName:"h3"},"@list")),(0,a.kt)("p",null,"Defines the required ",(0,a.kt)("inlineCode",{parentName:"p"},"maxLength: Int")," and optional ",(0,a.kt)("inlineCode",{parentName:"p"},"minLength: Int")," numbers of items in a list."),(0,a.kt)("h2",{id:"views"},"Views"),(0,a.kt)("p",null,"View directives represent read-only fields that are not part of the document contents, but rather from metadata."),(0,a.kt)("h3",{id:"documentaccount"},(0,a.kt)("inlineCode",{parentName:"h3"},"@documentAccount")),(0,a.kt)("p",null,"Defines a field as being a view to the account controlling the document, using the ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/creating-composites/scalars#did"},(0,a.kt)("inlineCode",{parentName:"a"},"DID")," scalar type"),"."),(0,a.kt)("p",null,"For example: ",(0,a.kt)("inlineCode",{parentName:"p"},"author: DID! @documentAccount"),"."),(0,a.kt)("h3",{id:"documentversion"},(0,a.kt)("inlineCode",{parentName:"h3"},"@documentVersion")),(0,a.kt)("p",null,"Defines a field as being a view to the current version of the document, using the ",(0,a.kt)("a",{parentName:"p",href:"/docs/0.2.x/guides/creating-composites/scalars#commitid"},(0,a.kt)("inlineCode",{parentName:"a"},"CommitID")," scalar type"),"."),(0,a.kt)("p",null,"For example: ",(0,a.kt)("inlineCode",{parentName:"p"},"version: CommitID! @documentVersion"),"."))}u.isMDXComponent=!0}}]);