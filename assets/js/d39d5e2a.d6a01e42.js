"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4312],{4852:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(9231);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=u(n),m=r,h=c["".concat(s,".").concat(m)]||c[m]||d[m]||o;return n?a.createElement(h,i(i({ref:t},p),{},{components:n})):a.createElement(h,i({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:r,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5947:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(9231),r=n(3531);const o={tabItem:"tabItem_kfQ4"};function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o.tabItem,i),hidden:n},t)}},6600:(e,t,n)=>{n.d(t,{Z:()=>w});var a=n(5675),r=n(9231),o=n(3531),i=n(1600),l=n(9409),s=n(1603),u=n(1693),p=n(6025);function c(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??c(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const a=(0,l.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=d(e),[i,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:o}))),[s,u]=h({queryString:n,groupId:a}),[c,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,p.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),g=(()=>{const e=s??c;return m({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{g&&l(g)}),[g]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),f(e)}),[u,f,o]),tabValues:o}}var g=n(3688);const k={tabList:"tabList_VxpX",tabItem:"tabItem_qdMt"};function y(e){let{className:t,block:n,selectedValue:l,selectValue:s,tabValues:u}=e;const p=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.o5)(),d=e=>{const t=e.currentTarget,n=p.indexOf(t),a=u[n].value;a!==l&&(c(t),s(a))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:i}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>p.push(e),onKeyDown:m,onClick:d},i,{className:(0,o.Z)("tabs__item",k.tabItem,i?.className,{"tabs__item--active":l===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:a}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function b(e){const t=f(e);return r.createElement("div",{className:(0,o.Z)("tabs-container",k.tabList)},r.createElement(y,(0,a.Z)({},e,t)),r.createElement(v,(0,a.Z)({},e,t)))}function w(e){const t=(0,g.Z)();return r.createElement(b,(0,a.Z)({key:String(t)},e))}},5599:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=n(5675),r=(n(9231),n(4852));n(6600),n(5947);const o={},i="Interact with data",l={unversionedId:"interact-with-data",id:"version-0.4.x/interact-with-data",title:"Interact with data",description:"The final step of getting started with ComposeDB is interacting with your data using GraphQL. In this guide you will learn how to perform GraphQL queries and mutations using your composite.",source:"@site/versioned_docs/version-0.4.x/interact-with-data.mdx",sourceDirName:".",slug:"/interact-with-data",permalink:"/docs/0.4.x/interact-with-data",draft:!1,tags:[],version:"0.4.x",frontMatter:{},sidebar:"docs",previous:{title:"Create your composite",permalink:"/docs/0.4.x/create-your-composite"},next:{title:"Next Steps",permalink:"/docs/0.4.x/next-steps"}},s={},u=[{value:"Setup",id:"setup",level:2},{value:"GraphQL Server",id:"graphql-server",level:3},{value:"GraphQL Web UI",id:"graphql-web-ui",level:3},{value:"Queries",id:"queries",level:2},{value:"Mutations",id:"mutations",level:2},{value:"Creating records",id:"creating-records",level:3},{value:"Updating records",id:"updating-records",level:3},{value:"Authentication",id:"authentication",level:2},{value:"Next Steps",id:"next-steps",level:2},{value:"Related Guides",id:"related-guides",level:2}],p={toc:u},c="wrapper";function d(e){let{components:t,...o}=e;return(0,r.kt)(c,(0,a.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"interact-with-data"},"Interact with data"),(0,r.kt)("p",null,"The final step of getting started with ComposeDB is interacting with your data using GraphQL. In this guide you will learn how to perform GraphQL queries and mutations using your composite."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Want to interact with data using JavaScript instead? See ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/composedb-client/javascript-client"},"Client setup"))),(0,r.kt)("h2",{id:"setup"},"Setup"),(0,r.kt)("h3",{id:"graphql-server"},"GraphQL Server"),(0,r.kt)("p",null,"To interact with data on the network, start a local GraphQL server by running the command below. Note that you have to provide the seed to your ",(0,r.kt)("inlineCode",{parentName:"p"},"did-private-key")," here \u2014 it is also required for performing mutations, covered below."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"composedb graphql:server --ceramic-url=http://localhost:7007 --graphiql runtime-composite.json --did-private-key=your_private_key --port=5005\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u270f\ufe0f ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"Note:"))," You can customize the port by configuring the ",(0,r.kt)("inlineCode",{parentName:"p"},"\u2014-port")," flag.")),(0,r.kt)("p",null,"The output will display a URL, for example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"GraphQL server is listening on http://localhost:5005/graphql\n")),(0,r.kt)("h3",{id:"graphql-web-ui"},"GraphQL Web UI"),(0,r.kt)("p",null,"In your browser, visit the URL that your local GraphQL server is listening on. You will see a simple UI that you can use to easily interact with your data:\n",(0,r.kt)("img",{alt:"GraphQL Web UI",src:n(1272).Z,width:"1328",height:"902"})),(0,r.kt)("h2",{id:"queries"},"Queries"),(0,r.kt)("p",null,"One of the most common data interactions you might want to do with ComposeDB is read records from the graph. Using GraphQL, you can query ComposeDB records indexed by your Ceramic node."),(0,r.kt)("p",null,"In the ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/create-your-composite"},"Create your composite")," guide, we fetched two models from the Catalog: ",(0,r.kt)("inlineCode",{parentName:"p"},"Post")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"SimpleProfile"),". Here we will focus on ",(0,r.kt)("inlineCode",{parentName:"p"},"Post")," model. For example, let\u2019s say you want to check the first 2 entries that were indexed on the Post graph. This can be achieved running a query like below and specifying that you want to retrieve first 2 records:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Query"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"query{\n  postIndex(first: 2) {\n    edges {\n      node {\n        text\n      }\n    }\n  }\n}\n")),(0,r.kt)("p",null,"You should see a response similar to the one below. Here, nodes correspond to stored documents while edges represent the relations between nodes."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Response"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "data": {\n    "postIndex": {\n      "edges": [\n        {\n          "node": {\n            "text": "This is my first post."\n          }\n        },\n        {\n          "node": {\n            "text": "My second post about ComposeDB!"\n          }\n        }\n      ]\n    }\n  }\n}\n')),(0,r.kt)("p",null,"You have options to retrieve specific records or last ",(0,r.kt)("inlineCode",{parentName:"p"},"n")," indexed records as well. For example, to check the last 3 records, run the query below:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Query:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"query{\n  postIndex(last: 3) {\n    edges {\n      node {\n        text\n      }\n    }\n  }\n}\n")),(0,r.kt)("h2",{id:"mutations"},"Mutations"),(0,r.kt)("p",null,"There are two types of mutations you can perform on ComposeDB data: creating and updating records."),(0,r.kt)("h3",{id:"creating-records"},"Creating records"),(0,r.kt)("p",null,"Let\u2019s say, you would like to create a post and add it to the graph. To do that, you will have to run a mutation as shown below and pass the actual text as a variable:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Query:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"mutation CreateNewPost($i: CreatePostInput!){\n  createPost(input: $i){\n        document{\n            id\n      text\n    }\n  }\n}\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Variables:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "i": {\n    "content": {\n      "text": "A Post created using composites and GraphQL" \n    }\n  }\n}\n')),(0,r.kt)("p",null,"The result of the query above will be a new document with a unique ID and the content you provided:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Response"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "data": {\n    "createPost": {\n      "document": {\n        "id": "kjzl6kcym7w8y9xlffqruh3v7ou1vn11t8203i6te2i3pliizt65ad3vdh5nl4l",\n        "text": "A Post created using composites and GraphQL"\n      }\n    }\n  }\n}\n')),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Stream IDs are unique. The \u201cid\u201d you will see in the response when performing the mutation above will be different.")),(0,r.kt)("h3",{id:"updating-records"},"Updating records"),(0,r.kt)("p",null,"Now let\u2019s say you want to edit the post you created in the previous step. To update it, you have to run the ",(0,r.kt)("inlineCode",{parentName:"p"},"UpdatePost")," mutation and pass the post\u2019s unique ID along with the updated content as variables."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"You can find your post\u2019s ID in the response after you ran the ",(0,r.kt)("inlineCode",{parentName:"p"},"CreateNewPost")," mutation.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Query:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"mutation UpdatePost($i: UpdatePostInput!) {\n    updatePost(input: $i) {\n        document {\n            id\n            text\n        }\n    }\n}\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Variables:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "i": {\n    "id": "kjzl6kcym7w8y9xlffqruh3v7ou1vn11t8203i6te2i3pliizt65ad3vdh5nl4l",\n    "content": {\n      "text": "My best post!"\n    }\n  }\n}\n')),(0,r.kt)("p",null,"This mutation will update the record with ID ",(0,r.kt)("inlineCode",{parentName:"p"},"kjzl6kcym7w8y9xlffqruh3v7ou1vn11t8203i6te2i3pliizt65ad3vdh5nl4l"),"."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Response:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "data": {\n    "updatePost": {\n      "document": {\n        "id": "kjzl6kcym7w8y9xlffqruh3v7ou1vn11t8203i6te2i3pliizt65ad3vdh5nl4l",\n        "text": "My best post!"\n      }\n    }\n  }\n}\n')),(0,r.kt)("h2",{id:"authentication"},"Authentication"),(0,r.kt)("p",null,"Although you can query records created by other accounts, you can only perform mutations on records controlled by your account. This guide did not require your authentication because you previously did that in the ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/set-up-your-environment"},"Set up your environment")," guide."),(0,r.kt)("p",null,"\ud83d\udd11 ",(0,r.kt)("inlineCode",{parentName:"p"},"did-private-key")," plays a very important role for these kind of mutations - it ensures that only you, the account owner, can make changes to the streams that you created."),(0,r.kt)("h2",{id:"next-steps"},"Next Steps"),(0,r.kt)("p",null,"Congratulations \u2014 you\u2019re on your way to becoming a ComposeDB developer! \ud83d\udd25 "),(0,r.kt)("p",null,"Visit ",(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/next-steps"},"Next Steps")," for more integration guides and opportunities to contribute to the ComposeDB on Ceramic ecosystem."),(0,r.kt)("h2",{id:"related-guides"},"Related Guides"),(0,r.kt)("p",null,"For more detailed descriptions and examples, see our advanced guides:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/composedb-client/user-sessions"},"Authentication for Mutations"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-interactions/"},"Data Interactions"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-interactions/queries"},"Queries"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-interactions/mutations"},"Mutations"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/composedb-client/javascript-client"},"ComposeDB Client setup")))))}d.isMDXComponent=!0},1272:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/graphiql-7b3b68ea5dc0a1acf5ab8c22f2129efb.png"}}]);