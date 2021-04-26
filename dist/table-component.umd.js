!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TableComponent={},e.React)}(this,(function(e,t){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=n(t),a=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const l=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,i=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,o=/<[a-z][^>]+$/i,r=/>[^<>]*$/,c=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,u=/\s+$/,d=(e,t)=>0<t--&&(o.test(e[t])||!r.test(e[t])&&d(e,t)),h=(e,t,n)=>i.test(t)?e:`<${t}${n.replace(u,"")}></${t}>`;const{isArray:f}=Array,{indexOf:p,slice:m}=[],g=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;const w=(e,t)=>{let n,s=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(s=s.toLowerCase()),t=>{const a=f(t)?t:[t,!1];n!==a[0]&&(n&&e.removeEventListener(s,n,a[1]),(n=a[0])&&e.addEventListener(s,n,a[1]))}};
/*! (c) Andrea Giammarchi - ISC */
var v=function(e){var t="fragment",n="template",s="content"in l(n)?function(e){var t=l(n);return t.innerHTML=e,t.content}:function(e){var s=l(t),i=l(n),o=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var r=RegExp.$1;i.innerHTML="<table>"+e+"</table>",o=i.querySelectorAll(r)}else i.innerHTML=e,o=i.childNodes;return a(s,o),s};return function(e,t){return("svg"===t?i:s)(e)};function a(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function l(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function i(e){var n=l(t),s=l("div");return s.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",a(n,s.firstChild.childNodes),n}}(document);const C=({childNodes:e},t)=>e[t],y=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(p.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:b,importNode:$}=document,H=1!=$.length,k=H?(e,t,n)=>$.call(document,v(e,t,n),!0):v,x=H?e=>b.call(document,e,129,null,!1):e=>b.call(document,e,129),R=(e,t,n)=>((e,t,n,s,a)=>{const l=n.length;let i=t.length,o=l,r=0,c=0,u=null;for(;r<i||c<o;)if(i===r){const t=o<l?c?s(n[c-1],-0).nextSibling:s(n[o-c],0):a;for(;c<o;)e.insertBefore(s(n[c++],1),t)}else if(o===c)for(;r<i;)u&&u.has(t[r])||e.removeChild(s(t[r],-1)),r++;else if(t[r]===n[c])r++,c++;else if(t[i-1]===n[o-1])i--,o--;else if(t[r]===n[o-1]&&n[c]===t[i-1]){const a=s(t[--i],-1).nextSibling;e.insertBefore(s(n[c++],1),s(t[r++],-1).nextSibling),e.insertBefore(s(n[--o],1),a),t[i]=n[o]}else{if(!u){u=new Map;let e=c;for(;e<o;)u.set(n[e],e++)}if(u.has(t[r])){const a=u.get(t[r]);if(c<a&&a<o){let l=r,d=1;for(;++l<i&&l<o&&u.get(t[l])===a+d;)d++;if(d>a-c){const l=s(t[r],0);for(;c<a;)e.insertBefore(s(n[c++],1),l)}else e.replaceChild(s(n[c++],1),s(t[r++],-1))}else r++}else e.removeChild(s(t[r++],-1))}return n})(e.parentNode,t,n,g,e),S=(e,t)=>{switch(t[0]){case"?":return((e,t,n)=>s=>{n!==!!s&&((n=!!s)?e.setAttribute(t,""):e.removeAttribute(t))})(e,t.slice(1),!1);case".":return((e,t)=>"dataset"===t?(({dataset:e})=>t=>{for(const n in t){const s=t[n];null==s?delete e[n]:e[n]=s}})(e):n=>{e[t]=n})(e,t.slice(1));case"@":return w(e,"on"+t.slice(1));case"o":if("n"===t[1])return w(e,t)}switch(t){case"ref":return(e=>{let t;return n=>{t!==n&&(t=n,"function"==typeof n?n(e):n.current=e)}})(e);case"aria":return(e=>t=>{for(const n in t){const s="role"===n?n:`aria-${n}`,a=t[n];null==a?e.removeAttribute(s):e.setAttribute(s,a)}})(e)}return((e,t)=>{let n,s=!0;const a=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?s||(e.removeAttributeNode(a),s=!0):(a.value=t,s&&(e.setAttributeNodeNS(a),s=!1)))}})(e,t)};function N(e){const{type:t,path:n}=e,s=n.reduceRight(C,this);return"node"===t?(e=>{let t,n,s=[];const a=l=>{switch(typeof l){case"string":case"number":case"boolean":t!==l&&(t=l,n||(n=document.createTextNode("")),n.data=l,s=R(e,s,[n]));break;case"object":case"undefined":if(null==l){t!=l&&(t=l,s=R(e,s,[]));break}if(f(l)){t=l,0===l.length?s=R(e,s,[]):"object"==typeof l[0]?s=R(e,s,l):a(String(l));break}t!==l&&"ELEMENT_NODE"in l&&(t=l,s=R(e,s,11===l.nodeType?m.call(l.childNodes):[l]));break;case"function":a(l(e))}};return a})(s):"attr"===t?S(s,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(s)}const E="isµ",A=a(new WeakMap),_=/^(?:plaintext|script|style|textarea|title|xmp)$/i,T=(e,t)=>{const n=((e,t,n)=>{const s=[],{length:a}=e;for(let o=1;o<a;o++){const n=e[o-1];s.push(l.test(n)&&d(e,o)?n.replace(l,((e,n,s)=>`${t}${o-1}=${s||'"'}${n}${s?"":'"'}`)):`${n}\x3c!--${t}${o-1}--\x3e`)}s.push(e[a-1]);const i=s.join("").trim();return n?i:i.replace(c,h)})(t,E,"svg"===e),s=k(n,e),a=x(s),i=[],o=t.length-1;let r=0,u=`isµ${r}`;for(;r<o;){const e=a.nextNode();if(!e)throw`bad template: ${n}`;if(8===e.nodeType)e.data===u&&(i.push({type:"node",path:y(e)}),u="isµ"+ ++r);else{for(;e.hasAttribute(u);)i.push({type:"attr",path:y(e),name:e.getAttribute(u)}),e.removeAttribute(u),u="isµ"+ ++r;_.test(e.tagName)&&e.textContent.trim()===`\x3c!--${u}--\x3e`&&(e.textContent="",i.push({type:"text",path:y(e)}),u="isµ"+ ++r)}}return{content:s,nodes:i}},I=(e,t)=>{const{content:n,nodes:s}=A.get(t)||A.set(t,T(e,t)),a=$.call(document,n,!0);return{content:a,updates:s.map(N,a)}},M=(e,{type:t,template:n,values:s})=>{const{length:a}=s;D(e,s,a);let{entry:l}=e;l&&l.template===n&&l.type===t||(e.entry=l=((e,t)=>{const{content:n,updates:s}=I(e,t);return{type:e,template:t,content:n,updates:s,wire:null}})(t,n));const{content:i,updates:o,wire:r}=l;for(let c=0;c<a;c++)o[c](s[c]);return r||(l.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const s=m.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:s[0],lastChild:s[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(s[t++])}return e}}})(i))},D=({stack:e},t,n)=>{for(let s=0;s<n;s++){const n=t[s];n instanceof O?t[s]=M(e[s]||(e[s]={stack:[],entry:null,wire:null}),n):f(n)?D(e[s]||(e[s]={stack:[],entry:null,wire:null}),n,n.length):e[s]=null}n<e.length&&e.splice(n)};function O(e,t,n){this.type=e,this.template=t,this.values=n}const{create:P,defineProperties:L}=Object,j=e=>{const t=a(new WeakMap);return L(((t,...n)=>new O(e,t,n)),{for:{value(n,s){const a=t.get(n)||t.set(n,P(null));return a[s]||(a[s]=(l={stack:[],entry:null,wire:null},(t,...n)=>M(l,{type:e,template:t,values:n})));var l}},node:{value:(t,...n)=>M({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},z=a(new WeakMap),B=j("html");j("svg");class W{constructor(e,t,n,s=!0){this.containerElement=null,this.areaHeight=0,this.additionalArea=0,this.lastDataSnapshot={dataHeadColumnsCount:0,headRowsCount:0,offset:0,startRowIndex:0,values:[],headerRows:[]},this.scrollPosition=0,this.setContainerElement=e=>{this.containerElement!==e&&(this.containerElement&&this.resizeObserver.unobserve(e),this.containerElement=e,this.resizeObserver.observe(e))},this.setScrollPosition=e=>{this.scrollPosition!==e&&(this.scrollPosition=e,this.commit())},this.setAreaHeight=(e,t)=>{this.areaHeight=e,this.additionalArea=t,this.commit()},this.data=e,this.rowHeights=new Array(e.values.length).fill(n),this.onChange=t,this.stickyHeader=s,this.resizeObserver=new ResizeObserver((()=>{this.containerElement&&this.setAreaHeight(this.containerElement.clientHeight,.5*this.containerElement.clientHeight)}))}get contentHeight(){return this.rowHeights.reduce(((e,t)=>e+t),0)+1}get visibleTableData(){return this.lastDataSnapshot}getRowInfo(e){var t;const n=null==(t=this.data.values[e])?void 0:t[0];if(!n)return{span:0,height:0};const s=n.span||1;return{span:s,height:this.rowHeights.slice(e,e+s).reduce(((e,t)=>e+t),0)}}commit(){let e=0,t=0,n=this.areaHeight,s=0;this.stickyHeader&&(t=this.data.headRowsCount,n-=this.rowHeights.slice(0,t).reduce(((e,t)=>e+t),0));const a=Math.max(0,this.scrollPosition-this.additionalArea),l=this.scrollPosition+n+this.additionalArea;let i=this.getRowInfo(t);for(;i.height+e<a;)e+=i.height,t+=i.span,i=this.getRowInfo(t);let o=t;for(i=this.getRowInfo(o);s+e<l&&o<this.data.values.length;)s+=i.height,o+=i.span,i=this.getRowInfo(o);this.lastDataSnapshot.startRowIndex===t&&this.lastDataSnapshot.values.length+this.lastDataSnapshot.startRowIndex===o||(this.lastDataSnapshot={startRowIndex:t,offset:e,dataHeadColumnsCount:this.data.dataHeadColumnsCount,headRowsCount:this.stickyHeader?0:this.data.headRowsCount,values:this.data.values.slice(t,o),headerRows:this.stickyHeader?this.data.values.slice(0,this.data.headRowsCount):null},this.onChange())}containSameData(e){return this.data===e}setRowHeights(e,t){this.rowHeights.splice(e,t.length,...t)}dispose(){this.resizeObserver.disconnect()}}var q="_container_1mnkb_1",F="_table_1mnkb_6",K="_stickyHeader_1mnkb_12",Y="_cell_1mnkb_19",G="_cellContainer_1mnkb_31",J="_cellContent_1mnkb_38";function Q({key:e,row:t,rowIndex:n,isRowHeader:s,dataHeadColumnsCount:a,meta:l,cellClasses:i,stickySide:o}){return B.for(e,n.toString())`<tr
    data-rowIndex=${n}
  >
    ${t.flatMap(((e,t)=>function({cell:e,rowIndex:t,columnIndex:n,isRowHeader:s,isColumnHeader:a,meta:l,cellClasses:i,stickySide:o}){var r;if(null==(r=l[t])?void 0:r[n])return[];const c=s?null==e?void 0:e.span:void 0,u=a?null==e?void 0:e.span:void 0;if(c)for(let p=1;p<c;++p){const e=l[t]||{};e[n+p]=!0,l[t]=e}if(u)for(let p=1;p<u;++p){const e=t+p,s=l[e]||{};s[n]=!0,l[e]=s}let d="";o&&(d=`position: ${a?"sticky":"static"}; left: ${150*n}px;`);const h=[s||a?"header":"body"];e.styles&&h.push(...e.styles);const f=h.map((e=>i[e])).filter((e=>null!=e)).join(" ");return B`<td
    class=${`${Y} ${f}`}
    colspan=${c}
    rowspan=${u}
    style=${d}
    .dataset=${{column:n,row:t}}
  >
    <div class=${G}>
      <div class=${J}>${e.value}</div>
    </div>
  </td>`}({cell:e,rowIndex:n,columnIndex:t,isRowHeader:s,isColumnHeader:a>t,meta:l,cellClasses:i,stickySide:o})))}
  </tr>`}function U(e,t,{values:n,headRowsCount:s,dataHeadColumnsCount:a},l,i,o){const r={};return B`
    <table
      class=${F}
      onclick=${o?e=>{let t=e.target;for(;t&&"TD"!==t.tagName&&t!==e.currentTarget;)t=t.parentElement;const{column:n,row:s}=(null==t?void 0:t.dataset)||{};if(n&&s){const e=parseInt(n,10),t=parseInt(s,10);o({row:t,column:e})}}:null}
    >
      ${n.map(((n,o)=>{const c=t+o;return Q({key:e,row:n,rowIndex:c,isRowHeader:s>c,dataHeadColumnsCount:a,meta:r,cellClasses:l,stickySide:i})}))}
    </table>
  `}const V=new Map;function X({className:e,table:t,target:n,minCellHeight:s=30,cellClasses:a={},onCellClick:l,stickyHeader:i,stickySide:o}){const r=function({table:e,target:t,redraw:n,minCellHeight:s,stickyHeader:a}){let l=V.get(t);if(null==l?void 0:l.containSameData(e))return l;l&&l.dispose();const i=new W(e,n,s,a);return V.set(t,i),i}({table:t,target:n,redraw:c,minCellHeight:s,stickyHeader:i});function c(){const t=r.visibleTableData,s=t.headerRows?U(r,0,{dataHeadColumnsCount:t.dataHeadColumnsCount,headRowsCount:t.headerRows.length,values:t.headerRows},a,o,l):null,i=U(n,t.startRowIndex,t,a,o,l);((e,t)=>{const n="function"==typeof t?t():t,s=z.get(e)||z.set(e,{stack:[],entry:null,wire:null}),a=n instanceof O?M(s,n):n;a!==s.wire&&(s.wire=a,e.textContent="",e.appendChild(a.valueOf()))})(n,function({content:e,headers:t,height:n,offset:s,onScroll:a,setContainerElement:l,className:i=""}){return B`
    <div
      class=${`${i} ${q}`}
      ref=${l}
      onscroll=${e=>{a(e.target.scrollTop)}}
      onwheel=${e=>{e.ctrlKey||e.stopPropagation()}}
    >
      <div style=${`height: ${n}px;`}>
        <div class=${K}>${t}</div>
        <div style=${`transform: translateY(${s}px)`}>${e}</div>
      </div>
    </div>
  `}({content:i,headers:s,height:r.contentHeight,offset:t.offset,onScroll:r.setScrollPosition,setContainerElement:r.setContainerElement,className:e}));const c=n.querySelectorAll("table"),u=s?c[0]:null,d=s?c[1]:c[0];function h(e,t){if(t){const n=[...t.children||[]].map((e=>e.clientHeight));r.setRowHeights(e,n)}}h(0,u),h(t.startRowIndex,d)}n.style.setProperty("--table-min-cell-height",`${s}px`),c()}e.ReactTable=({table:e,className:n,minCellHeight:a,cellClasses:l,stickyHeader:i=!0,stickySide:o=!0,onCellClick:r})=>{const c=t.useRef(null);return t.useEffect((()=>{const t=c.current;return X({table:e,target:t,className:n,minCellHeight:a,cellClasses:l,stickyHeader:i,stickySide:o,onCellClick:r}),()=>function(e){const t=V.get(e);t&&(t.dispose(),V.delete(e))}(t)}),[e,n]),s.default.createElement("div",{ref:c})},Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module"}));
