"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2240],{4852:(e,t,o)=>{o.d(t,{Zo:()=>m,kt:()=>h});var a=o(9231);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function l(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?l(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function r(e,t){if(null==e)return{};var o,a,n=function(e,t){if(null==e)return{};var o,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)o=l[a],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)o=l[a],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var s=a.createContext({}),p=function(e){var t=a.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},m=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var o=e.components,n=e.mdxType,l=e.originalType,s=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),d=p(o),u=n,h=d["".concat(s,".").concat(u)]||d[u]||c[u]||l;return o?a.createElement(h,i(i({ref:t},m),{},{components:o})):a.createElement(h,i({ref:t},m))}));function h(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=o.length,i=new Array(l);i[0]=u;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[d]="string"==typeof e?e:n,i[1]=r;for(var p=2;p<l;p++)i[p]=o[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,o)}u.displayName="MDXCreateElement"},9680:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>r,toc:()=>p});var a=o(5675),n=(o(9231),o(4852));const l={},i="Create your composite",r={unversionedId:"create-your-composite",id:"version-0.4.x/create-your-composite",title:"Create your composite",description:"The second step in getting started with ComposeDB on Ceramic is creating your composite to serve as your database schema. In this guide, we will create your first composite.",source:"@site/versioned_docs/version-0.4.x/create-your-composite.mdx",sourceDirName:".",slug:"/create-your-composite",permalink:"/docs/0.4.x/create-your-composite",draft:!1,tags:[],version:"0.4.x",frontMatter:{},sidebar:"docs",previous:{title:"Set up your environment",permalink:"/docs/0.4.x/set-up-your-environment"},next:{title:"Interact with data",permalink:"/docs/0.4.x/interact-with-data"}},s={},p=[{value:"Overview",id:"overview",level:2},{value:"Data Model Catalog",id:"data-model-catalog",level:2},{value:"Creation",id:"creation",level:2},{value:"Single model",id:"single-model",level:3},{value:"Multiple models",id:"multiple-models",level:3},{value:"Usage",id:"usage",level:2},{value:"Deployment",id:"deployment",level:3},{value:"Compilation",id:"compilation",level:3},{value:"Next Steps",id:"next-steps",level:2},{value:"Related Guides",id:"related-guides",level:2}],m={toc:p},d="wrapper";function c(e){let{components:t,...l}=e;return(0,n.kt)(d,(0,a.Z)({},m,l,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"create-your-composite"},"Create your composite"),(0,n.kt)("p",null,"The second step in getting started with ComposeDB on Ceramic is creating your composite to serve as your database schema. In this guide, we will create your first composite."),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Before continuing, you must have ",(0,n.kt)("a",{parentName:"p",href:"/docs/0.4.x/set-up-your-environment"},"set up your environment")," in the previous step")),(0,n.kt)("h2",{id:"overview"},"Overview"),(0,n.kt)("p",null,"A composite is your database schema for ComposeDB, which includes a collection of data models. Once created, your composite instructs your node which models to index and also allows your client to perform queries and mutations on these models."),(0,n.kt)("h2",{id:"data-model-catalog"},"Data Model Catalog"),(0,n.kt)("p",null,"The ",(0,n.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-modeling/model-catalog"},"Model Catalog")," contains all models created by other ComposeDB developers. By creating or reusing models within the model catalog in your composite, you can instantly share and sync data with other applications. This brings native app data composability to Web3 -- no more API integrations."),(0,n.kt)("p",null,"To list all models in the model catalog, run the following command:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"composedb model:list --table\n")),(0,n.kt)("p",null,"Here, the flag ",(0,n.kt)("inlineCode",{parentName:"p"},"--table")," will display the output in an organized table view and provide more details about each model\u2019s functionality. By default, this command lists models in production on mainnet. To see models being developed on clay testnet, specify ",(0,n.kt)("inlineCode",{parentName:"p"},"--network=testnet-clay"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"composedb model:list --network=testnet-clay --table\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Response:")," Below see a small snippet of the the output table. Each model has the following properties:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Name")," - model name"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Unique ID")," - unique identifier (stream ID) for the model"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Description")," - description of the model\u2019s functionality")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Data Model Table",src:o(2620).Z,width:"2824",height:"1422"})),(0,n.kt)("h2",{id:"creation"},"Creation"),(0,n.kt)("p",null,"In this section we will demonstrate how to create a composite by downloading models from the model catalog."),(0,n.kt)("h3",{id:"single-model"},"Single model"),(0,n.kt)("p",null,"You can fetch any existing model from the catalog by referencing the model\u2019s unique ID. For example, for your basic social media app, use the existing model ",(0,n.kt)("inlineCode",{parentName:"p"},"SimpleProfile"),". To fetch the model, to your working directory, take note of the model stream ID in the table above and run the following command:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"composedb composite:from-model kjzl6hvfrbw6c5ajfmes842lu09vjxu5956e3xq0xk12gp2jcf9s90cagt2god9 --ceramic-url=http://localhost:7007 --output=my-first-composite-single.json\n")),(0,n.kt)("p",null,"After running the command above, your will have the ",(0,n.kt)("inlineCode",{parentName:"p"},"SimpleProfile")," model stored locally in a file called ",(0,n.kt)("inlineCode",{parentName:"p"},"my-first-composite-single.json"),"."),(0,n.kt)("h3",{id:"multiple-models"},"Multiple models"),(0,n.kt)("p",null,"If your application needs multiple models, for example the ",(0,n.kt)("inlineCode",{parentName:"p"},"SimpleProfile")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"Post")," models, you can. To fetch them, take note of the model stream IDs and provide them in a ComposeDB CLI command as follows:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"composedb composite:from-model kjzl6hvfrbw6c5ajfmes842lu09vjxu5956e3xq0xk12gp2jcf9s90cagt2god9 kjzl6hvfrbw6c99mdfpjx1z3fue7sesgua6gsl1vu97229lq56344zu9bawnf96 --ceramic-url=http://localhost:7007 --output=my-first-composite.json\n")),(0,n.kt)("p",null,"The output of this command will be a composite file named ",(0,n.kt)("inlineCode",{parentName:"p"},"my-first-composite.json"),"."),(0,n.kt)("h2",{id:"usage"},"Usage"),(0,n.kt)("h3",{id:"deployment"},"Deployment"),(0,n.kt)("p",null,"You will have to deploy the composite with fetched models to your local Ceramic node so that they can be used when building and running your applications. This can be achieved by using ComposeDB CLI and referencing the composite file of fetched models in your local environment as shown below. Note that you have to provide your did private key to deploy the model:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"composedb composite:deploy my-first-composite.json --ceramic-url=http://localhost:7007 --did-private-key=your_private_key\n")),(0,n.kt)("p",null,"Whenever composites are deployed, the models will be automatically indexed. This also means that these models are shared across the network (at the moment, only Clay testnet). If you check the output produced by the terminal that runs your Ceramic local node, you should see a similar output:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"IMPORTANT: Starting indexing for Model kjzl6hvfrbw6c5ajfmes842lu09vjxu5956e3xq0xk12gp2jcf9s90cagt2god9\n\nIMPORTANT: Starting indexing for Model kjzl6hvfrbw6c99mdfpjx1z3fue7sesgua6gsl1vu97229lq56344zu9bawnf96\n\nIMPORTANT: Creating Compose DB Indexing table for model: kjzl6hvfrbw6c5ajfmes842lu09vjxu5956e3xq0xk12gp2jcf9s90cagt2god9\n\nIMPORTANT: Creating Compose DB Indexing table for model: kjzl6hvfrbw6c99mdfpjx1z3fue7sesgua6gsl1vu97229lq56344zu9bawnf96\n")),(0,n.kt)("p",null,"This means that the composite was deployed and the models were indexed on your local node successfully! \ud83c\udf89"),(0,n.kt)("h3",{id:"compilation"},"Compilation"),(0,n.kt)("p",null,"The last step left is compiling the composite. This is necessary to interact with the data in the next step of this guide:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"composedb composite:compile my-first-composite.json runtime-composite.json\n")),(0,n.kt)("p",null,"The output of this command will be a json file called ",(0,n.kt)("inlineCode",{parentName:"p"},"runtime-composite.json")),(0,n.kt)("h2",{id:"next-steps"},"Next Steps"),(0,n.kt)("p",null,"Now that you have created your composite, you are ready to use it: ",(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("a",{parentName:"strong",href:"/docs/0.4.x/interact-with-data"},"Interact with data")," \u2192")),(0,n.kt)("h2",{id:"related-guides"},"Related Guides"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-modeling/"},"Intro to Data Modeling"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-modeling/model-catalog"},"Model Catalog"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-modeling/writing-models"},"Writing New Models"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/data-modeling/composites"},"Create, Deploy & Use Composites")))))}c.isMDXComponent=!0},2620:(e,t,o)=>{o.d(t,{Z:()=>a});const a=o.p+"assets/images/data-model-table-9edfb95dc33320c39c7c54bf99facad5.png"}}]);