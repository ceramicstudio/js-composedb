"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[384],{6876:(e,o,i)=>{i.r(o),i.d(o,{assets:()=>m,contentTitle:()=>d,default:()=>l,frontMatter:()=>s,metadata:()=>t,toc:()=>p});var c=i(7512),n=i(4496);const s={id:"cli.composite",title:"CLI: composite:* commands",custom_edit_url:null},d=void 0,t={id:"api/commands/cli.composite",title:"CLI: composite:* commands",description:"The group of CLI composite:* commands enables the",source:"@site/docs/api/commands/cli.composite.md",sourceDirName:"api/commands",slug:"/api/commands/cli.composite",permalink:"/docs/preview/api/commands/cli.composite",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"cli.composite",title:"CLI: composite:* commands",custom_edit_url:null},sidebar:"api",previous:{title:"CLI: did:* commands",permalink:"/docs/preview/api/commands/cli.did"},next:{title:"CLI: model:* commands",permalink:"/docs/preview/api/commands/cli.model"}},m={},p=[{value:"Command List",id:"command-list",level:2},{value:"Usage",id:"usage",level:2},{value:"<code>composedb composite:from-model</code>",id:"composedb-compositefrom-model",level:3},{value:"<code>composedb composite:create</code>",id:"composedb-compositecreate",level:3},{value:"<code>composedb composite:models</code>",id:"composedb-compositemodels",level:3},{value:"<code>composedb composite:extract-model</code>",id:"composedb-compositeextract-model",level:3},{value:"<code>composedb composite:merge</code>",id:"composedb-compositemerge",level:3},{value:"<code>composedb composite:deploy</code>",id:"composedb-compositedeploy",level:3},{value:"<code>composedb composite:compile</code>",id:"composedb-compositecompile",level:3}];function r(e){const o={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.M)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(o.p,{children:["The group of ",(0,c.jsx)(o.a,{href:"/docs/preview/api/modules/cli",children:"CLI"})," ",(0,c.jsx)(o.code,{children:"composite:*"})," commands enables the\ncreation and interactions with ",(0,c.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/composites",children:"Composites"})]}),"\n",(0,c.jsx)(o.h2,{id:"command-list",children:"Command List"}),"\n",(0,c.jsxs)(o.ul,{children:["\n",(0,c.jsx)(o.li,{children:(0,c.jsx)(o.a,{href:"#composedb-compositefrom-model",children:(0,c.jsx)(o.code,{children:"composedb composite:from-model STREAMIDS"})})}),"\n",(0,c.jsx)(o.li,{children:(0,c.jsx)(o.a,{href:"#composedb-compositecreate",children:(0,c.jsx)(o.code,{children:"composedb composite:create INPUT"})})}),"\n",(0,c.jsx)(o.li,{children:(0,c.jsx)(o.a,{href:"#composedb-compositemodels",children:(0,c.jsx)(o.code,{children:"composedb composite:models PATH"})})}),"\n",(0,c.jsx)(o.li,{children:(0,c.jsx)(o.a,{href:"#composedb-compositeextract-model",children:(0,c.jsx)(o.code,{children:"composedb composite:extract-model PATH MODELS"})})}),"\n",(0,c.jsx)(o.li,{children:(0,c.jsx)(o.a,{href:"#composedb-compositemerge",children:(0,c.jsx)(o.code,{children:"composedb composite:merge PATHS"})})}),"\n",(0,c.jsx)(o.li,{children:(0,c.jsx)(o.a,{href:"#composedb-compositedeploy",children:(0,c.jsx)(o.code,{children:"composedb composite:deploy PATH"})})}),"\n",(0,c.jsx)(o.li,{children:(0,c.jsx)(o.a,{href:"#composedb-compositecompile",children:(0,c.jsx)(o.code,{children:"composedb composite:compile PATH OUTPUTPATHS"})})}),"\n"]}),"\n",(0,c.jsx)(o.h2,{id:"usage",children:"Usage"}),"\n",(0,c.jsx)(o.h3,{id:"composedb-compositefrom-model",children:(0,c.jsx)(o.code,{children:"composedb composite:from-model"})}),"\n",(0,c.jsxs)(o.p,{children:["Create an encoded composite definition from a list of already existing model\nstream ids (usually found within ",(0,c.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/core-concepts#model-catalog",children:"Model Catalog"})]}),"\n",(0,c.jsxs)(o.p,{children:["You can find a detailed guide on using an existing model to create your\ncomposite ",(0,c.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/composites",children:"here"})]}),"\n",(0,c.jsx)(o.pre,{children:(0,c.jsx)(o.code,{children:"USAGE\n  $ composedb composite:from-model PATH MODELS\n\nARGUMENTS\n  PATH                     a path to an encoded composite definition file\n  MODELS                   a list of models (identified by names of stream IDs) to extract from the given composite\n\nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n  -o, --output             a path to file where the resulting encoded composite definition should be saved\n"})}),"\n",(0,c.jsx)(o.h3,{id:"composedb-compositecreate",children:(0,c.jsx)(o.code,{children:"composedb composite:create"})}),"\n",(0,c.jsxs)(o.p,{children:["Create an encoded composite definition from GraphQL ",(0,c.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/composites#creating-composites",children:"Composite Schema"})]}),"\n",(0,c.jsxs)(o.p,{children:["You can find a detailed guide on the creation of Composites ",(0,c.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/composites",children:"here"})]}),"\n",(0,c.jsx)(o.pre,{children:(0,c.jsx)(o.code,{children:"USAGE\n  $ composedb composite:create INPUT\n\nARGUMENTS\n  INPUT                    a path to file containing valid ceramic composite definition in GraphQL Schema Definition Language\n\nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n  -k, --did-private-key    DID Private Key (you can generate a fresh private key using composedb did:generate-private-key)\n  -o, --output             a path to file where the resulting encoded composite definition should be saved\n"})}),"\n",(0,c.jsx)(o.h3,{id:"composedb-compositemodels",children:(0,c.jsx)(o.code,{children:"composedb composite:models"})}),"\n",(0,c.jsx)(o.p,{children:"Display the list of models included in a composite"}),"\n",(0,c.jsx)(o.pre,{children:(0,c.jsx)(o.code,{children:"USAGE\n  $ composedb composite:models PATH\n\nARGUMENTS\n  PATH                     a path to a file containing a composite's encoded definition\n\nOPTIONS\n  --id-only                display only the stream IDs of models included in the composite (exclusive to --table)\n  --table                  display the models in a table (excusive to --id-only)\n"})}),"\n",(0,c.jsx)(o.h3,{id:"composedb-compositeextract-model",children:(0,c.jsx)(o.code,{children:"composedb composite:extract-model"})}),"\n",(0,c.jsx)(o.p,{children:"Create an encoded composite definition from another one by extracting given\nmodels"}),"\n",(0,c.jsx)(o.pre,{children:(0,c.jsx)(o.code,{children:"USAGE\n  $ composedb composite:extract-model PATH MODELS\n\nARGUMENTS\n  PATH                     a path to encoded representation of a composite\n  MODELS                   one or more models to use when extracting a new composite, identified by name or stream ID\n\nOPTIONS\n  -o, --output             a path to file where the resulting encoded composite definition should be saved\n"})}),"\n",(0,c.jsx)(o.h3,{id:"composedb-compositemerge",children:(0,c.jsx)(o.code,{children:"composedb composite:merge"})}),"\n",(0,c.jsx)(o.p,{children:"Create an encoded composite definition by merging other composites"}),"\n",(0,c.jsx)(o.pre,{children:(0,c.jsx)(o.code,{children:"USAGE\n  $ composedb composite:merge PATHS\n\nARGUMENTS\n  PATHS                    a list of paths to files containing encoded composites, separated by spaces\n\nOPTIONS\n  -e, --common-embeds      'all','none' or a list of comma-separated embeds to extract from input composites into the output composite\n  -o, --output             a path to file where the resulting encoded composite definition should be saved\n"})}),"\n",(0,c.jsx)(o.h3,{id:"composedb-compositedeploy",children:(0,c.jsx)(o.code,{children:"composedb composite:deploy"})}),"\n",(0,c.jsx)(o.p,{children:"Deploy models included in the composite on connected ceramic node"}),"\n",(0,c.jsxs)(o.p,{children:["You will need to use this command to make sure that your DApp's Composite is\navailable on the Ceramic Node that yor DApp connects to. You can find a detailed\nguide on Composites' deployment\n",(0,c.jsx)(o.a,{href:"https://developers.ceramic.network/docs/composedb/guides/data-modeling/composites#deploying-composites",children:"here"})]}),"\n",(0,c.jsx)(o.pre,{children:(0,c.jsx)(o.code,{children:"USAGE\n  $ composedb composite:deploy PATH\n\nARGUMENTS\n  PATH                     a path to a file containing a composite's encoded definition\n  \nOPTIONS\n  -c, --ceramic-url        Ceramic API URL\n"})}),"\n",(0,c.jsx)(o.h3,{id:"composedb-compositecompile",children:(0,c.jsx)(o.code,{children:"composedb composite:compile"})}),"\n",(0,c.jsx)(o.p,{children:"Creates a runtime definition of the composite and saves it in given path(s)."}),"\n",(0,c.jsx)(o.p,{children:"You will need the runtime definition to configure your ComposeDB."}),"\n",(0,c.jsx)(o.pre,{children:(0,c.jsx)(o.code,{children:"USAGE\n  $ composedb composite:compile PATH OUTPUTPATHS\n\nARGUMENTS\n  PATH                     a path to a file containing a composite's encoded definition\n  OUTPUTPATHS              one or more paths to save runtime representation in. Supported extensions: .json, .js and .ts\n"})})]})}function l(e={}){const{wrapper:o}={...(0,n.M)(),...e.components};return o?(0,c.jsx)(o,{...e,children:(0,c.jsx)(r,{...e})}):r(e)}},4496:(e,o,i)=>{i.d(o,{I:()=>t,M:()=>d});var c=i(5496);const n={},s=c.createContext(n);function d(e){const o=c.useContext(s);return c.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function t(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:d(e.components),c.createElement(s.Provider,{value:o},e.children)}}}]);