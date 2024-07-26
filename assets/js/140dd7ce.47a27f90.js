"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5247],{8646:(e,d,i)=>{i.r(d),i.d(d,{assets:()=>a,contentTitle:()=>t,default:()=>p,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var n=i(6106),o=i(9252);const s={id:"cli.did",title:"CLI: did:* commands",custom_edit_url:null},t=void 0,r={id:"api/commands/cli.did",title:"CLI: did:* commands",description:"The group of CLI did:* commands enables interactions with DIDs and private keys",source:"@site/versioned_docs/version-0.8.x/api/commands/cli.did.md",sourceDirName:"api/commands",slug:"/api/commands/cli.did",permalink:"/docs/0.8.x/api/commands/cli.did",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"0.8.x",frontMatter:{id:"cli.did",title:"CLI: did:* commands",custom_edit_url:null},sidebar:"api",previous:{title:"Overview",permalink:"/docs/0.8.x/api/modules/cli"},next:{title:"composite commands",permalink:"/docs/0.8.x/api/commands/cli.composite"}},a={},c=[{value:"Command List",id:"command-list",level:2},{value:"Usage",id:"usage",level:2},{value:"<code>composedb did:generate-private-key</code>",id:"composedb-didgenerate-private-key",level:3},{value:"<code>composedb did:from-private-key</code>",id:"composedb-didfrom-private-key",level:3}];function l(e){const d={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.p,{children:["The group of ",(0,n.jsx)(d.a,{href:"/docs/0.8.x/api/modules/cli",children:"CLI"})," ",(0,n.jsx)(d.code,{children:"did:*"})," commands enables interactions with DIDs and private keys"]}),"\n",(0,n.jsxs)(d.p,{children:["DIDs are identifiers for ",(0,n.jsx)(d.a,{href:"https://developers.ceramic.network/docs/composedb/core-concepts#accounts",children:"Ceramic Accounts"})]}),"\n",(0,n.jsx)(d.h2,{id:"command-list",children:"Command List"}),"\n",(0,n.jsxs)(d.ul,{children:["\n",(0,n.jsx)(d.li,{children:(0,n.jsx)(d.a,{href:"#composedb-didgenerate-private-key",children:(0,n.jsx)(d.code,{children:"composedb did:generate-private-key"})})}),"\n",(0,n.jsx)(d.li,{children:(0,n.jsx)(d.a,{href:"#composedb-didfrom-private-key",children:(0,n.jsx)(d.code,{children:"composedb did:from-private-key"})})}),"\n"]}),"\n",(0,n.jsx)(d.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsx)(d.h3,{id:"composedb-didgenerate-private-key",children:(0,n.jsx)(d.code,{children:"composedb did:generate-private-key"})}),"\n",(0,n.jsx)(d.p,{children:"Generate a new random 32 byte private key and return its base 16 representation"}),"\n",(0,n.jsxs)(d.p,{children:["You can use this command to generate a fresh private key which you can later use a the ",(0,n.jsx)(d.code,{children:"--did-private-key"})," flag to\nauthenticate other ComposeDB CLI command calls"]}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{children:"USAGE\n  $ composedb did:generate-private-key\n"})}),"\n",(0,n.jsx)(d.h3,{id:"composedb-didfrom-private-key",children:(0,n.jsx)(d.code,{children:"composedb did:from-private-key"})}),"\n",(0,n.jsx)(d.p,{children:"Create a new DID from a private key passed either as an argument or as a value of the flag"}),"\n",(0,n.jsx)(d.p,{children:"You can use this command to see what DID corresponds to a given private key"}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{children:"USAGE\n  $ composedb did:from-private-key KEY\n  \nOPTIONS\n  --did-private-key        A random 32 byte private key represented as a base16 string (pass only if not passed as positional argument)\n"})})]})}function p(e={}){const{wrapper:d}={...(0,o.R)(),...e.components};return d?(0,n.jsx)(d,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},9252:(e,d,i)=>{i.d(d,{R:()=>t,x:()=>r});var n=i(7378);const o={},s=n.createContext(o);function t(e){const d=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function r(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),n.createElement(s.Provider,{value:d},e.children)}}}]);