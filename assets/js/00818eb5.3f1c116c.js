"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9975],{1081:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>t});var s=n(5250),d=n(9074);const a={},c="Supported scalars",r={id:"api/sdl/scalars",title:"Supported scalars",description:"Scalars represent the leaf values in the graph, either as part of key-value",source:"@site/versioned_docs/version-0.4.x/api/sdl/scalars.mdx",sourceDirName:"api/sdl",slug:"/api/sdl/scalars",permalink:"/docs/0.4.x/api/sdl/scalars",draft:!1,unlisted:!1,tags:[],version:"0.4.x",frontMatter:{},sidebar:"api",previous:{title:"CLI: graphql:* commands",permalink:"/docs/0.4.x/api/commands/cli.graphql"},next:{title:"Supported scalars",permalink:"/docs/0.4.x/api/sdl/scalars"}},l={},t=[{value:"Primitive types",id:"primitive-types",level:2},{value:"<code>Boolean</code>",id:"boolean",level:3},{value:"<code>Int</code>",id:"int",level:3},{value:"<code>Float</code>",id:"float",level:3},{value:"<code>String</code>",id:"string",level:3},{value:"Identifiers",id:"identifiers",level:2},{value:"<code>ID</code>",id:"id",level:3},{value:"<code>DID</code>",id:"did",level:3},{value:"<code>StreamID</code>",id:"streamid",level:3},{value:"<code>CommitID</code>",id:"commitid",level:3},{value:"<code>CID</code>",id:"cid",level:3},{value:"<code>ChainID</code>",id:"chainid",level:3},{value:"<code>AccountID</code>",id:"accountid",level:3},{value:"<code>URI</code>",id:"uri",level:3},{value:"Date and time",id:"date-and-time",level:2},{value:"<code>Date</code>",id:"date",level:3},{value:"<code>DateTime</code>",id:"datetime",level:3},{value:"<code>Time</code>",id:"time",level:3},{value:"<code>LocalDate</code>",id:"localdate",level:3},{value:"<code>LocalTime</code>",id:"localtime",level:3},{value:"<code>TimeZone</code>",id:"timezone",level:3},{value:"<code>UTCOffset</code>",id:"utcoffset",level:3},{value:"<code>Duration</code>",id:"duration",level:3},{value:"Geography and internationalization",id:"geography-and-internationalization",level:2},{value:"<code>Latitude</code>",id:"latitude",level:3},{value:"<code>Longitude</code>",id:"longitude",level:3},{value:"<code>CountryCode</code>",id:"countrycode",level:3},{value:"<code>Locale</code>",id:"locale",level:3}];function o(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...(0,d.a)(),...e.components},{Head:n}=i;return n||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{id:"supported-scalars",children:"Supported scalars"}),"\n",(0,s.jsxs)(n,{children:[(0,s.jsx)("meta",{name:"robots",content:"noindex"}),(0,s.jsx)("meta",{name:"googlebot",content:"noindex"})]}),"\n",(0,s.jsxs)(i.p,{children:["Scalars represent the leaf values in the graph, either as part of key-value\nproperties in shapes, or value of items in lists. You can learn more about\nscalars in the\n",(0,s.jsx)(i.a,{href:"https://graphql.org/learn/schema/#scalar-types",children:"GraphQL specification"}),"."]}),"\n",(0,s.jsx)(i.h2,{id:"primitive-types",children:"Primitive types"}),"\n",(0,s.jsxs)(i.p,{children:["The following scalars are part of the\n",(0,s.jsx)(i.a,{href:"https://graphql.org/learn/schema/#scalar-types",children:"GraphQL specification"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"boolean",children:(0,s.jsx)(i.code,{children:"Boolean"})}),"\n",(0,s.jsxs)(i.p,{children:["A ",(0,s.jsx)(i.code,{children:"true"})," or ",(0,s.jsx)(i.code,{children:"false"})," value."]}),"\n",(0,s.jsx)(i.h3,{id:"int",children:(0,s.jsx)(i.code,{children:"Int"})}),"\n",(0,s.jsx)(i.p,{children:"A signed 32-bit integer."}),"\n",(0,s.jsxs)(i.p,{children:["A range of valid values can be defined using\n",(0,s.jsxs)(i.a,{href:"/docs/0.4.x/api/sdl/directives#int",children:["the ",(0,s.jsx)(i.code,{children:"@int"})," directive"]}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"float",children:(0,s.jsx)(i.code,{children:"Float"})}),"\n",(0,s.jsx)(i.p,{children:"A signed double-precision floating-point value."}),"\n",(0,s.jsxs)(i.p,{children:["A range of valid values can be defined using\n",(0,s.jsxs)(i.a,{href:"/docs/0.4.x/api/sdl/directives#float",children:["the ",(0,s.jsx)(i.code,{children:"@float"})," directive"]}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"string",children:(0,s.jsx)(i.code,{children:"String"})}),"\n",(0,s.jsx)(i.p,{children:"A UTF-8 character sequence."}),"\n",(0,s.jsx)(i.admonition,{type:"caution",children:(0,s.jsxs)(i.p,{children:["The ",(0,s.jsxs)(i.a,{href:"/docs/0.4.x/api/sdl/directives#string",children:[(0,s.jsx)(i.code,{children:"@string"})," directive"]})," ",(0,s.jsx)(i.strong,{children:"must be used"})," along with\n",(0,s.jsx)(i.code,{children:"String"})," scalars to define the ",(0,s.jsx)(i.code,{children:"maxLength"})," of the string."]})}),"\n",(0,s.jsx)(i.h2,{id:"identifiers",children:"Identifiers"}),"\n",(0,s.jsx)(i.p,{children:"The following scalars represent unique identifiers in the graph. In ComposedDB,\nthey are all stored as string values."}),"\n",(0,s.jsx)(i.h3,{id:"id",children:(0,s.jsx)(i.code,{children:"ID"})}),"\n",(0,s.jsx)(i.p,{children:"A Node identifier used by GraphQL."}),"\n",(0,s.jsx)(i.admonition,{type:"tip",children:(0,s.jsxs)(i.p,{children:["By default, IDs are configured with a ",(0,s.jsx)(i.code,{children:"maxLength"})," of ",(0,s.jsx)(i.code,{children:"100"}),". The\n",(0,s.jsxs)(i.a,{href:"/docs/0.4.x/api/sdl/directives#string",children:[(0,s.jsx)(i.code,{children:"@string"})," directive"]})," can be used along with ",(0,s.jsx)(i.code,{children:"ID"}),"\nscalars to define a different ",(0,s.jsx)(i.code,{children:"maxLength"})," as needed."]})}),"\n",(0,s.jsx)(i.h3,{id:"did",children:(0,s.jsx)(i.code,{children:"DID"})}),"\n",(0,s.jsxs)(i.p,{children:["A Decentralized Identifier, representing an actor able to create and mutate\nDocuments in the graph, using\n",(0,s.jsx)(i.a,{href:"https://www.graphql-scalars.dev/docs/scalars/did",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"streamid",children:(0,s.jsx)(i.code,{children:"StreamID"})}),"\n",(0,s.jsxs)(i.p,{children:["Identifies a specific Stream in the Ceramic network, following the\n",(0,s.jsx)(i.a,{href:"https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-59/CIP-59.md#streamid",children:"StreamID specification"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"commitid",children:(0,s.jsx)(i.code,{children:"CommitID"})}),"\n",(0,s.jsxs)(i.p,{children:["Identifies a specific version of a Stream in the Ceramic network, following the\n",(0,s.jsx)(i.a,{href:"https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-59/CIP-59.md#commitid",children:"CommitID specification"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"cid",children:(0,s.jsx)(i.code,{children:"CID"})}),"\n",(0,s.jsxs)(i.p,{children:["A Content Identifier, as used by\n",(0,s.jsx)(i.a,{href:"https://docs.ipfs.tech/concepts/content-addressing/#what-is-a-cid",children:"IPFS"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"chainid",children:(0,s.jsx)(i.code,{children:"ChainID"})}),"\n",(0,s.jsxs)(i.p,{children:["A Chain Agnostic Chain Identifier, as\n",(0,s.jsx)(i.a,{href:"https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md",children:"specified by Chain Agnostic CAIP-2"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"accountid",children:(0,s.jsx)(i.code,{children:"AccountID"})}),"\n",(0,s.jsxs)(i.p,{children:["A Chain Agnostic Account Identifier, as\n",(0,s.jsx)(i.a,{href:"https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md",children:"specified by Chain Agnostic CAIP-10"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"uri",children:(0,s.jsx)(i.code,{children:"URI"})}),"\n",(0,s.jsxs)(i.p,{children:["RFC 3986 compliant URI string, such as ",(0,s.jsx)(i.code,{children:"https://ceramic.network"}),"."]}),"\n",(0,s.jsx)(i.h2,{id:"date-and-time",children:"Date and time"}),"\n",(0,s.jsx)(i.p,{children:"The following scalars can be used to store date and time values using standard\nrepresentations."}),"\n",(0,s.jsx)(i.h3,{id:"date",children:(0,s.jsx)(i.code,{children:"Date"})}),"\n",(0,s.jsxs)(i.p,{children:["RFC 3339 compliant date string without time information, such as ",(0,s.jsx)(i.code,{children:"2007-12-03"}),",\nusing ",(0,s.jsx)(i.a,{href:"https://www.graphql-scalars.dev/docs/scalars/date",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"datetime",children:(0,s.jsx)(i.code,{children:"DateTime"})}),"\n",(0,s.jsxs)(i.p,{children:["A date-time string at UTC, such as ",(0,s.jsx)(i.code,{children:"2007-12-03T10:15:30Z"}),", using\n",(0,s.jsx)(i.a,{href:"https://www.graphql-scalars.dev/docs/scalars/date-time",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"time",children:(0,s.jsx)(i.code,{children:"Time"})}),"\n",(0,s.jsxs)(i.p,{children:["A time string at UTC, such as ",(0,s.jsx)(i.code,{children:"10:15:30Z"}),", using\n",(0,s.jsx)(i.a,{href:"https://www.graphql-scalars.dev/docs/scalars/time",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"localdate",children:(0,s.jsx)(i.code,{children:"LocalDate"})}),"\n",(0,s.jsxs)(i.p,{children:["A local date string (with no associated timezone) in ",(0,s.jsx)(i.code,{children:"YYYY-MM-DD"})," format, such\nas ",(0,s.jsx)(i.code,{children:"2007-12-03"}),", using\n",(0,s.jsx)(i.a,{href:"https://www.graphql-scalars.dev/docs/scalars/local-date",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"localtime",children:(0,s.jsx)(i.code,{children:"LocalTime"})}),"\n",(0,s.jsxs)(i.p,{children:["A local time string (i.e., with no associated timezone) in 24-hr\n",(0,s.jsx)(i.code,{children:"HH:mm[:ss[.SSS]]"})," format, such as ",(0,s.jsx)(i.code,{children:"14:25"}),", ",(0,s.jsx)(i.code,{children:"14:25:06"})," or ",(0,s.jsx)(i.code,{children:"14:25:06.123"}),", using\n",(0,s.jsx)(i.a,{href:"https://www.graphql-scalars.dev/docs/scalars/local-time",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"timezone",children:(0,s.jsx)(i.code,{children:"TimeZone"})}),"\n",(0,s.jsxs)(i.p,{children:["Standard IANA time zone, using\n",(0,s.jsx)(i.a,{href:"https://the-guild.dev/graphql/scalars/docs/scalars/time-zone",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"utcoffset",children:(0,s.jsx)(i.code,{children:"UTCOffset"})}),"\n",(0,s.jsxs)(i.p,{children:["A string with format ",(0,s.jsx)(i.code,{children:"\xb1hh: mm"}),", using\n",(0,s.jsx)(i.a,{href:"https://www.graphql-scalars.dev/docs/scalars/utc-offset",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"duration",children:(0,s.jsx)(i.code,{children:"Duration"})}),"\n",(0,s.jsxs)(i.p,{children:["ISO 8601 duration string, such as ",(0,s.jsx)(i.code,{children:"P1W1DT13H23M34S"}),", using\n",(0,s.jsx)(i.a,{href:"https://www.graphql-scalars.dev/docs/scalars/duration",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h2,{id:"geography-and-internationalization",children:"Geography and internationalization"}),"\n",(0,s.jsx)(i.h3,{id:"latitude",children:(0,s.jsx)(i.code,{children:"Latitude"})}),"\n",(0,s.jsxs)(i.p,{children:["Decimal degrees latitude number, using\n",(0,s.jsx)(i.a,{href:"https://the-guild.dev/graphql/scalars/docs/scalars/latitude",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"longitude",children:(0,s.jsx)(i.code,{children:"Longitude"})}),"\n",(0,s.jsxs)(i.p,{children:["Decimal degrees longitude number, using\n",(0,s.jsx)(i.a,{href:"https://the-guild.dev/graphql/scalars/docs/scalars/longitude",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"countrycode",children:(0,s.jsx)(i.code,{children:"CountryCode"})}),"\n",(0,s.jsxs)(i.p,{children:["ISO 3166-1 alpha-2 country code string, using\n",(0,s.jsx)(i.a,{href:"https://the-guild.dev/graphql/scalars/docs/scalars/country-code",children:"GraphQL Scalars"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"locale",children:(0,s.jsx)(i.code,{children:"Locale"})}),"\n",(0,s.jsxs)(i.p,{children:["RFC 5646 locale string, such as ",(0,s.jsx)(i.code,{children:"en-GB"}),", using\n",(0,s.jsx)(i.a,{href:"https://the-guild.dev/graphql/scalars/docs/scalars/locale",children:"GraphQL Scalars"}),"."]})]})}function h(e={}){const{wrapper:i}={...(0,d.a)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},9074:(e,i,n)=>{n.d(i,{Z:()=>r,a:()=>c});var s=n(79);const d={},a=s.createContext(d);function c(e){const i=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:c(e.components),s.createElement(a.Provider,{value:i},e.children)}}}]);