"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3997],{54852:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>g});var a=t(49231);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var c=a.createContext({}),s=function(e){var n=a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},d=function(e){var n=s(e.components);return a.createElement(c.Provider,{value:n},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=s(t),u=l,g=p["".concat(c,".").concat(u)]||p[u]||m[u]||o;return t?a.createElement(g,r(r({ref:n},d),{},{components:t})):a.createElement(g,r({ref:n},d))}));function g(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var o=t.length,r=new Array(o);r[0]=u;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i[p]="string"==typeof e?e:l,r[1]=i;for(var s=2;s<o;s++)r[s]=t[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},11405:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var a=t(35664),l=(t(49231),t(54852));const o={},r="Example: Container of Items",i={unversionedId:"guides/data-modeling/relations-combine-items",id:"version-0.4.x/guides/data-modeling/relations-combine-items",title:"Example: Container of Items",description:"Creating the Models",source:"@site/versioned_docs/version-0.4.x/guides/data-modeling/relations-combine-items.mdx",sourceDirName:"guides/data-modeling",slug:"/guides/data-modeling/relations-combine-items",permalink:"/docs/0.4.x/guides/data-modeling/relations-combine-items",draft:!1,tags:[],version:"0.4.x",frontMatter:{},sidebar:"guides",previous:{title:"Example: Container of Items",permalink:"/docs/0.4.x/guides/data-modeling/relations-container-of-items"},next:{title:"Composites",permalink:"/docs/0.4.x/guides/data-modeling/composites"}},c={},s=[{value:"Creating the Models",id:"creating-the-models",level:2},{value:"Inserting Data",id:"inserting-data",level:2},{value:"Query The Data",id:"query-the-data",level:2}],d={toc:s},p="wrapper";function m(e){let{components:n,...t}=e;return(0,l.kt)(p,(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"example-container-of-items"},"Example: Container of Items"),(0,l.kt)("head",null,(0,l.kt)("meta",{name:"robots",content:"noindex"}),(0,l.kt)("meta",{name:"googlebot",content:"noindex"})),(0,l.kt)("h2",{id:"creating-the-models"},"Creating the Models"),(0,l.kt)("p",null,"First, create the SDL for the first model to be combined"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},'type Ball @createModel(accountRelation: LIST, description: "A ball to display") {\n  creator: DID! @accountReference\n  red: Int\n  green: Int\n  blue: Int\n  radius: Float\n}\n')),(0,l.kt)("p",null,"You will then save this to a file, such as ",(0,l.kt)("inlineCode",{parentName:"p"},"ball.graphql"),". You can then add the model and get the id."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"}," composedb composite:create --output ball.json ball.graphql\n cat ball.json | jq '.models | keys_unsorted[0]'\n")),(0,l.kt)("p",null,"Now we need a second model that will ",(0,l.kt)("em",{parentName:"p"},"combine")," with the first model"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},'type Obstacle @createModel(accountRelation: LIST, description: "An obstacle a ball can collide with") {\n  creator: DID! @accountReference\n  x: Int\n  y: Int\n  z: Int\n  length: Int\n  width: Int\n  height: Int\n}\n')),(0,l.kt)("p",null,"Next, we're going to combine the existing models into a new model"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},'type Ball @loadModel(id: "<id of ball>") {\n  id: ID!\n}\n\ntype Obstacle @loadModel(id: "<id of obstacle>"){\n  id: ID!\n}\n\ntype Collision @createModel(accountRelation: LIST, description: "Collision between ball and object") {\n  ballID: StreamID! @documentReference(model: "Ball")\n  ball: Ball! @relationDocument(property: "ballID")\n  obstacleID: StreamID! @documentReference(model: "Obstacle")\n  obstacle: Ball! @relationDocument(property: "ballID")\n  x: Int\n  y: Int\n  z: Int\n}\n')),(0,l.kt)("p",null,"Save this to a file and add as above."),(0,l.kt)("p",null,"We can now merge all of these and deploy them as a composite."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"composedb composite:merge ball.json obstacle.json collision.json --output=merged.json\ncomposedb composite:deploy merged.json\ncomposedb composite:compile merged.json runtime.json\n")),(0,l.kt)("p",null,"Our composite is now ready to use. We can use it with graphiql"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"composedb graphql:server --graphiql runtime.json\n")),(0,l.kt)("h2",{id:"inserting-data"},"Inserting Data"),(0,l.kt)("p",null,"We can create an item with mutation"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"mutation CreateNewBall($i: CreateBallInput!){\n  createBall(input: $i){\n    document {\n      id\n      radius\n    }\n  }\n}\n")),(0,l.kt)("p",null,"and variables"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},'{\n  "i": {\n    "content": {\n      "creator": "<some did key>",\n      "radius": 45,\n      "red": 10,\n      "green": 20,\n      "blue": 30\n    }\n  }\n}\n')),(0,l.kt)("p",null,"We can create a second object with a mutation"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"mutation CreateNewObstacle($i: CreateObstacleInput!){\n  createObstacle(input: $i){\n    document {\n      id\n    }\n  }\n}\n")),(0,l.kt)("p",null,"and variables"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},'{\n  "i": {\n    "content": {\n      "creator": "<some did key>"\n      "x": 1\n      "y": 2\n      "z": 3\n      "length": 4\n      "width": 5\n      "height": 6\n    }\n  }\n}\n')),(0,l.kt)("p",null,"Finally we can define the resultant object from combining items"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"mutation CreateCollision($i: CreateCollisionInput!){\n  createCollision(input: $i){\n    document {\n      id\n    }\n  }\n}\n")),(0,l.kt)("p",null,"and variables"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},'{\n  "i": {\n    "content": {\n      "ballID": "<id from ball mutation>",\n      "obstacleID": "<id from obstacle mutation>"\n    }\n  }\n}\n')),(0,l.kt)("h2",{id:"query-the-data"},"Query The Data"),(0,l.kt)("p",null,"We can query for the combined item"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n  collisionIndex(first:5) {\n    edges {\n      node {\n        id\n        ball {\n          id\n          radius\n        }\n        obstacle {\n          id\n        }\n      }\n    }\n  }\n}\n")))}m.isMDXComponent=!0}}]);