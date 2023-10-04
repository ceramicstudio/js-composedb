"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3431],{54852:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>g});var r=t(49231);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=r.createContext({}),s=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(u.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=s(t),m=o,g=c["".concat(u,".").concat(m)]||c[m]||d[m]||a;return t?r.createElement(g,i(i({ref:n},p),{},{components:t})):r.createElement(g,i({ref:n},p))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=m;var l={};for(var u in n)hasOwnProperty.call(n,u)&&(l[u]=n[u]);l.originalType=e,l[c]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},81043:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=t(35664),o=(t(49231),t(54852));const a={},i="Running Locally",l={unversionedId:"guides/composedb-server/running-locally",id:"version-0.4.x/guides/composedb-server/running-locally",title:"Running Locally",description:"Run a ComposeDB server on your local machine, e.g. your laptop",source:"@site/versioned_docs/version-0.4.x/guides/composedb-server/running-locally.mdx",sourceDirName:"guides/composedb-server",slug:"/guides/composedb-server/running-locally",permalink:"/docs/0.4.x/guides/composedb-server/running-locally",draft:!1,tags:[],version:"0.4.x",frontMatter:{},sidebar:"guides",previous:{title:"ComposeDB Server",permalink:"/docs/0.4.x/guides/composedb-server/"},next:{title:"Running in the Cloud",permalink:"/docs/0.4.x/guides/composedb-server/running-in-the-cloud"}},u={},s=[{value:"Things to Know",id:"things-to-know",level:2},{value:"Using Wheel",id:"using-wheel",level:2},{value:"Requirements",id:"requirements",level:3},{value:"Setup",id:"setup",level:3},{value:"Using npm",id:"using-npm",level:2},{value:"Requirements",id:"requirements-1",level:3},{value:"Installation",id:"installation",level:3},{value:"Basic Setup",id:"basic-setup",level:3},{value:"Admin account",id:"admin-account",level:3},{value:"Start the daemon",id:"start-the-daemon",level:4},{value:"Configurations",id:"configurations",level:3},{value:"Next Steps",id:"next-steps",level:2},{value:"Related Guides",id:"related-guides",level:2}],p={toc:s},c="wrapper";function d(e){let{components:n,...t}=e;return(0,o.kt)(c,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"running-locally"},"Running Locally"),(0,o.kt)("p",null,"Run a ComposeDB server on your local machine, e.g. your laptop"),(0,o.kt)("h2",{id:"things-to-know"},"Things to Know"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"ComposeDB requires running a Ceramic node (which uses IPFS) for decentralized data and a SQL instance for your index database."),(0,o.kt)("li",{parentName:"ul"},"ComposeDB server can also be run locally ",(0,o.kt)("a",{parentName:"li",href:"/docs/0.4.x/guides/composedb-server/running-in-the-cloud"},"using Docker"),".")),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"If you want to serve a live application in production, see ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/composedb-server/running-in-the-cloud"},"Running in the Cloud"),".")),(0,o.kt)("h2",{id:"using-wheel"},"Using Wheel"),(0,o.kt)("p",null,"The easiest way to to run ComposeDB server on your local machine is using ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/ceramicstudio/wheel.git"},"Wheel"),". "),(0,o.kt)("h3",{id:"requirements"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Node.js"),(0,o.kt)("li",{parentName:"ul"},"jq"),(0,o.kt)("li",{parentName:"ul"},"PostgreSQL (optional dependent on the network)")),(0,o.kt)("p",null,"Head to ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.4.x/set-up-your-environment#install-the-dependencies"},"Setup Your Environment")," section for more detailed dependency installation instructions."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Supported Operating Systems")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Linux"),(0,o.kt)("li",{parentName:"ul"},"Mac"),(0,o.kt)("li",{parentName:"ul"},"Windows (only WSL2)")),(0,o.kt)("h3",{id:"setup"},"Setup"),(0,o.kt)("p",null,"First, download the Wheel:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/ceramicstudio/wheel/main/wheel.sh | bash\n")),(0,o.kt)("p",null,"Once dowloaded, start the Wheel and follow the setup prompt:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"./wheel\n")),(0,o.kt)("p",null,"When following the prompt, make sure to accept the ",(0,o.kt)("inlineCode",{parentName:"p"},"Include Caramic?")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Include ComposeDB?")," option to start a\nlocal Ceramic node enabled with CompoeDB."),(0,o.kt)("p",null,"For detailed prompt reference and advanced Ceramic configurations head to ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.4.x/wheel-reference"},"Wheel Reference"),"."),(0,o.kt)("h2",{id:"using-npm"},"Using npm"),(0,o.kt)("p",null,"Alternative way to run ComposeDB Server locally is using npm. This option includes more manual configurations."),(0,o.kt)("h3",{id:"requirements-1"},"Requirements"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Runtime")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Node.js Version 16")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Package Manager")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"npm Version 6")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Supported Operating Systems")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Linux"),(0,o.kt)("li",{parentName:"ul"},"Mac"),(0,o.kt)("li",{parentName:"ul"},"Windows")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"For Windows, Windows Subsystem for Linux 2 (WSL2) is strongly recommended. Using the Windows command line is not portable and can cause compatibility issue when running the same configuration on a different operating system (e.g. in a Linux-based cloud deployment).")),(0,o.kt)("h3",{id:"installation"},"Installation"),(0,o.kt)("p",null,"Install the Ceramic CLI and ComposeDB CLI using npm:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm install -g @ceramicnetwork/cli @composedb/cli\n")),(0,o.kt)("h3",{id:"basic-setup"},"Basic Setup"),(0,o.kt)("h3",{id:"admin-account"},"Admin account"),(0,o.kt)("p",null,"If you don\u2019t already have one, you\u2019ll need to create an admin account (DID) to handle restricted changes and admin operations on your node. To do so, follow the  steps in ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.4.x/set-up-your-environment#developer-account"},"Set up your environment")," to generate a key & account. Once you\u2019ve added your admin DID to the config file, return here."),(0,o.kt)("h4",{id:"start-the-daemon"},"Start the daemon"),(0,o.kt)("p",null,"Using a command line utility or terminal, start the Ceramic daemon: "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"ceramic daemon\n")),(0,o.kt)("h3",{id:"configurations"},"Configurations"),(0,o.kt)("p",null,"You now have a server running with the default configuration and a preconfigured IPFS node that can be used by the ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/composedb-client/"},"ComposeDB Client"),". "),(0,o.kt)("h2",{id:"next-steps"},"Next Steps"),(0,o.kt)("p",null,"Edit your ",(0,o.kt)("a",{parentName:"p",href:"/docs/0.4.x/guides/composedb-server/server-configurations"},"Server Configurations")," for your use case. "),(0,o.kt)("h2",{id:"related-guides"},"Related Guides"),(0,o.kt)("p",null,"Check out our other guides for running a node:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/0.4.x/guides/composedb-server/running-in-the-cloud"},"Running in the Cloud"))))}d.isMDXComponent=!0}}]);