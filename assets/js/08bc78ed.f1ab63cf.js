"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5477],{54852:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var r=n(49231);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=c(n),u=o,g=m["".concat(s,".").concat(u)]||m[u]||p[u]||a;return n?r.createElement(g,i(i({ref:t},d),{},{components:n})):r.createElement(g,i({ref:t},d))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},25229:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(49231),o=n(19841),a=n(95732),i=n(69370),l=n(44816),s=n(26270);const c={cardContainer:"cardContainer_VNGj",cardTitle:"cardTitle_gVc1",cardDescription:"cardDescription_T1Dm"};function d(e){let{href:t,children:n}=e;return r.createElement(i.Z,{href:t,className:(0,o.Z)("card padding--lg",c.cardContainer)},n)}function m(e){let{href:t,icon:n,title:a,description:i}=e;return r.createElement(d,{href:t},r.createElement("h2",{className:(0,o.Z)("text--truncate",c.cardTitle),title:a},n," ",a),i&&r.createElement("p",{className:(0,o.Z)("text--truncate",c.cardDescription),title:i},i))}function p(e){let{item:t}=e;const n=(0,a.Wl)(t);return n?r.createElement(m,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,s.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function u(e){let{item:t}=e;const n=(0,l.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,a.xz)(t.docId??void 0);return r.createElement(m,{href:t.href,icon:n,title:t.label,description:t.description??o?.description})}function g(e){let{item:t}=e;switch(t.type){case"link":return r.createElement(u,{item:t});case"category":return r.createElement(p,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function f(e){let{className:t}=e;const n=(0,a.jA)();return r.createElement(h,{items:n.items,className:t})}function h(e){const{items:t,className:n}=e;if(!t)return r.createElement(f,e);const i=(0,a.MN)(t);return r.createElement("section",{className:(0,o.Z)("row",n)},i.map(((e,t)=>r.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},r.createElement(g,{item:e})))))}},60359:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var r=n(35664),o=(n(49231),n(54852)),a=n(25229);const i={},l="Data Modeling",s={unversionedId:"guides/data-modeling/data-modeling",id:"version-0.5.x/guides/data-modeling/data-modeling",title:"Data Modeling",description:"Learn how to model data for ComposeDB.",source:"@site/versioned_docs/version-0.5.x/guides/data-modeling/data-modeling.mdx",sourceDirName:"guides/data-modeling",slug:"/guides/data-modeling/",permalink:"/docs/0.5.x/guides/data-modeling/",draft:!1,tags:[],version:"0.5.x",frontMatter:{},sidebar:"guides",previous:{title:"Guides",permalink:"/docs/0.5.x/guides/"},next:{title:"Model Catalog",permalink:"/docs/0.5.x/guides/data-modeling/model-catalog"}},c={},d=[{value:"Overview",id:"overview",level:2},{value:"Models",id:"models",level:3},{value:"Composites",id:"composites",level:3},{value:"Getting Started",id:"getting-started",level:2}],m={toc:d},p="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"data-modeling"},"Data Modeling"),(0,o.kt)("p",null,"Learn how to model data for ComposeDB."),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("hr",null),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Models")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"composites")," are the core building blocks for ComposeDB apps."),(0,o.kt)("h3",{id:"models"},"Models"),(0,o.kt)("p",null,"A ",(0,o.kt)("inlineCode",{parentName:"p"},"model")," is the GraphQL schema for a single piece of data (e.g. social post) including its relations to other models and accounts. Models are designed to be plug-and-play so they can easily be reused by developers; when multiple apps use the same model, they share the same underlying data set. To be usable in your ComposeDB app, you need to bundle one or more models into a composite."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},'# Example Model that stores a display name\n\ntype DisplayName @createModel(accountRelation: SINGLE, description: "Display name for a user") {\n  displayName: String! @string(minLength: 3, maxLength: 50)\n}\n')),(0,o.kt)("h3",{id:"composites"},"Composites"),(0,o.kt)("p",null,"A ",(0,o.kt)("inlineCode",{parentName:"p"},"composite")," is a group of one or more models that defines the complete graph data schema for your app. Composites are used on both the ComposeDB server and the client."),(0,o.kt)("h2",{id:"getting-started"},"Getting Started"),(0,o.kt)("hr",null),(0,o.kt)(a.Z,{mdxType:"DocCardList"}))}u.isMDXComponent=!0}}]);