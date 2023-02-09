"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7846],{4852:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var o=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),p=c(n),u=a,f=p["".concat(s,".").concat(u)]||p[u]||d[u]||l;return n?o.createElement(f,r(r({ref:t},m),{},{components:n})):o.createElement(f,r({ref:t},m))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,r=new Array(l);r[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[p]="string"==typeof e?e:a,r[1]=i;for(var c=2;c<l;c++)r[c]=n[c];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9845:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var o=n(1504),a=(n(9231),n(4852));const l={},r="Relations",i={unversionedId:"guides/data-modeling/relations",id:"guides/data-modeling/relations",title:"Relations",description:"Define queryable relationships between models and other models or accounts.",source:"@site/docs/guides/data-modeling/relations.mdx",sourceDirName:"guides/data-modeling",slug:"/guides/data-modeling/relations",permalink:"/docs/preview/guides/data-modeling/relations",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"guides",previous:{title:"Schemas",permalink:"/docs/preview/guides/data-modeling/schemas"},next:{title:"Composites",permalink:"/docs/preview/guides/data-modeling/composites"}},s={},c=[{value:"Types of Relations",id:"types-of-relations",level:2},{value:"Account to Model",id:"account-to-model",level:2},{value:"Example: Simple Profile",id:"example-simple-profile",level:3},{value:"Model to Account",id:"model-to-account",level:2},{value:"Example: Direct message (DM)",id:"example-direct-message-dm",level:3},{value:"Model to Model",id:"model-to-model",level:2},{value:"Example: Post with comments",id:"example-post-with-comments",level:3},{value:"Account to Account",id:"account-to-account",level:2},{value:"Next Steps",id:"next-steps",level:2}],m={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"relations"},"Relations"),(0,a.kt)("p",null,"Define queryable relationships between models and other models or accounts."),(0,a.kt)("h2",{id:"types-of-relations"},"Types of Relations"),(0,a.kt)("p",null,"There are a few primary forms of relations currently supported by ComposeDB:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#account-to-model"},"Account to model")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#model-to-account"},"Model to account")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#model-to-model"},"Model to model")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#account-to-account"},"Account to account"))),(0,a.kt)("h2",{id:"account-to-model"},"Account to Model"),(0,a.kt)("p",null,"Account to model relations enable linking and querying data to the account that created it. By default the ",(0,a.kt)("inlineCode",{parentName:"p"},"@createmodel")," directive (used when creating a new model) requires that every model must specify a relation to its author\u2019s account. This was covered in ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/guides/data-modeling/writing-models"},"Writing Models"),"."),(0,a.kt)("h3",{id:"example-simple-profile"},"Example: Simple Profile"),(0,a.kt)("p",null,"Here\u2019s a model for a very simple user profile that can be queried based on the author:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'# Define simple profile model\n# Relate it to the author\'s account\n# Limit to one profile per account\n# Enable queries based on author\n\ntype SimpleProfile @createModel(accountRelation: SINGLE, description: "Very basic profile") {\n  displayName: String! @string(minLength: 3, maxLength: 50)\n}\n')),(0,a.kt)("p",null,"Where:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"accountRelation")," relates the profile to the author\u2019s account"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SINGLE")," limits to one profile per account")),(0,a.kt)("h2",{id:"model-to-account"},"Model to Account"),(0,a.kt)("p",null,"Model to account relations enable you to link data to and query data from an account other than the data\u2019s author. When using this type of relation, you need to define a model field that stores an account (e.g. a ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/guides/composedb-client/user-sessions"},"DID"),"), then add the ",(0,a.kt)("inlineCode",{parentName:"p"},"@accountReference")," directive to make it queryable."),(0,a.kt)("h3",{id:"example-direct-message-dm"},"Example: Direct message (DM)"),(0,a.kt)("p",null,"Here\u2019s a model for a user-to-user message that can be queried based on the recipient:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"# Define message model\n# Relate it to author's account\n# Allow unlimited sent messages\n# Store reference to recipient's account\n# Enable queries based on recipient\n\ntype Message @createModel(accountRelation: LIST, description: \"Direct message model\") {\n  recipient: DID! @accountReference\n    directMessage: String! @string(minLength: 1, maxLength: 200)\n}\n")),(0,a.kt)("p",null,"Where:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"accountRelation")," relates the message to the author\u2019s account"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"LIST")," allows unlimited messages"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"recipient")," references the recipient\u2019s account by storing its ",(0,a.kt)("inlineCode",{parentName:"li"},"DID!"),", using ",(0,a.kt)("inlineCode",{parentName:"li"},"@accountReference"))),(0,a.kt)("h2",{id:"model-to-model"},"Model to Model"),(0,a.kt)("p",null,"Model to model relations enable you to link data to and query data from another piece of data. These relations can be uni-directional (e.g. query a post from a comment) or bi-directional (e.g. query a post from a comment and query all comments from a post)."),(0,a.kt)("h3",{id:"example-post-with-comments"},"Example: Post with comments"),(0,a.kt)("p",null,"Here\u2019s a model that allows many comments to be made on a single post. It supports unlimited comments per user, and bi-directional queries from any comment to the original post and from the original post to all of its comments."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'# Load post model (using streamID)\n\ntype Post @loadModel(id: "kjzl6hvfrbw6c99mdfpjx1z3fue7sesgua6gsl1vu97229lq56344zu9bawnf96"){\n    id: ID!\n}\n\n# New comment model\n# Set relationship to original post\n# Enable querying comment to get original post\n\ntype Comment @createModel(accountRelation: LIST, description: "A comment on a Post") {\n  postID: StreamID! @documentReference(model: "Post")\n  post: Post! @relationDocument(property: "postID")\n  text: String! @string(maxLength: 500)\n}\n\n# Load comment model\n\ntype Comment @loadModel(id: "kjzl6hvfrbw6c9oo2ync09y6z5c9mas9u49lfzcowepuzxmcn3pzztvzd0c7gh0") {\n  id: ID!\n}\n\n# Load post model\n# Extend post model with comments\n# Set relationships to all comments\n# Enable querying post to get all comments\n\ntype Post @loadModel(id: "kjzl6hvfrbw6c99mdfpjx1z3fue7sesgua6gsl1vu97229lq56344zu9bawnf96") {\n  comments: [Comment] @relationFrom(model: "Comment", property: "postID")\n}\n')),(0,a.kt)("p",null,"Where:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"id")," is a simple placeholder, since empty types are not allowed"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"postID")," defines the relationship from a comment to the original post, using ",(0,a.kt)("inlineCode",{parentName:"li"},"@documentReference")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"post")," allows accessing the original post from the comment, using ",(0,a.kt)("inlineCode",{parentName:"li"},"@relationDocument")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"text")," defines a string for the comment"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"comments")," defines the relationships from a post to a collection of comments, using  ",(0,a.kt)("inlineCode",{parentName:"li"},"@relationFrom"),"; requires specifying the model relation (",(0,a.kt)("inlineCode",{parentName:"li"},"Comment"),") and the specific property that stores the relation (",(0,a.kt)("inlineCode",{parentName:"li"},"postID"),")")),(0,a.kt)("h2",{id:"account-to-account"},"Account to Account"),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Account to account relations are on the roadmap, but not yet supported.")),(0,a.kt)("p",null,"Account to account relations enable you to define a relationship between an account and a different account, and query both ways based on that relationship. This is useful for creating structures such as social graphs where the relationship represents a follow."),(0,a.kt)("h2",{id:"next-steps"},"Next Steps"),(0,a.kt)("p",null,"Now that you understand the fundamentals of creating models with different types of relations, learn how to create composites using them. "),(0,a.kt)("p",null,"Head to ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/guides/data-modeling/composites"},(0,a.kt)("strong",{parentName:"a"},"Composites"))," next to learn more ",(0,a.kt)("a",{parentName:"p",href:"/docs/preview/guides/data-modeling/composites"},(0,a.kt)("strong",{parentName:"a"},"\u2192"))))}d.isMDXComponent=!0}}]);