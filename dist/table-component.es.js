var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,n=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,s=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,o=(e,o)=>{for(var i in o||(o={}))t.call(o,i)&&s(e,i,o[i]);if(n)for(var i of n(o))r.call(o,i)&&s(e,i,o[i]);return e};import i,{useRef as a,useEffect as l}from"react";var c=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const u=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,d=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,h=/<[a-z][^>]+$/i,p=/>[^<>]*$/,f=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,g=/\s+$/,m=(e,t)=>0<t--&&(h.test(e[t])||!p.test(e[t])&&m(e,t)),w=(e,t,n)=>d.test(t)?e:`<${t}${n.replace(g,"")}></${t}>`;const{isArray:y}=Array,{indexOf:v,slice:b}=[],C=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;const x=(e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const s=y(t)?t:[t,!1];n!==s[0]&&(n&&e.removeEventListener(r,n,s[1]),(n=s[0])&&e.addEventListener(r,n,s[1]))}};
/*! (c) Andrea Giammarchi - ISC */
var k=function(e){var t="fragment",n="template",r="content"in o(n)?function(e){var t=o(n);return t.innerHTML=e,t.content}:function(e){var r=o(t),i=o(n),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var l=RegExp.$1;i.innerHTML="<table>"+e+"</table>",a=i.querySelectorAll(l)}else i.innerHTML=e,a=i.childNodes;return s(r,a),r};return function(e,t){return("svg"===t?i:r)(e)};function s(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function o(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function i(e){var n=o(t),r=o("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",s(n,r.firstChild.childNodes),n}}(document);const S=({childNodes:e},t)=>e[t],$=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(v.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:H,importNode:O}=document,R=1!=O.length,E=R?(e,t,n)=>O.call(document,k(e,t,n),!0):k,A=R?e=>H.call(document,e,129,null,!1):e=>H.call(document,e,129),N=(e,t,n)=>((e,t,n,r,s)=>{const o=n.length;let i=t.length,a=o,l=0,c=0,u=null;for(;l<i||c<a;)if(i===l){const t=a<o?c?r(n[c-1],-0).nextSibling:r(n[a-c],0):s;for(;c<a;)e.insertBefore(r(n[c++],1),t)}else if(a===c)for(;l<i;)u&&u.has(t[l])||e.removeChild(r(t[l],-1)),l++;else if(t[l]===n[c])l++,c++;else if(t[i-1]===n[a-1])i--,a--;else if(t[l]===n[a-1]&&n[c]===t[i-1]){const s=r(t[--i],-1).nextSibling;e.insertBefore(r(n[c++],1),r(t[l++],-1).nextSibling),e.insertBefore(r(n[--a],1),s),t[i]=n[a]}else{if(!u){u=new Map;let e=c;for(;e<a;)u.set(n[e],e++)}if(u.has(t[l])){const s=u.get(t[l]);if(c<s&&s<a){let o=l,d=1;for(;++o<i&&o<a&&u.get(t[o])===s+d;)d++;if(d>s-c){const o=r(t[l],0);for(;c<s;)e.insertBefore(r(n[c++],1),o)}else e.replaceChild(r(n[c++],1),r(t[l++],-1))}else l++}else e.removeChild(r(t[l++],-1))}return n})(e.parentNode,t,n,C,e),I=(e,t)=>{switch(t[0]){case"?":return((e,t,n)=>r=>{n!==!!r&&((n=!!r)?e.setAttribute(t,""):e.removeAttribute(t))})(e,t.slice(1),!1);case".":return((e,t)=>"dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):n=>{e[t]=n})(e,t.slice(1));case"@":return x(e,"on"+t.slice(1));case"o":if("n"===t[1])return x(e,t)}switch(t){case"ref":return(e=>{let t;return n=>{t!==n&&(t=n,"function"==typeof n?n(e):n.current=e)}})(e);case"aria":return(e=>t=>{for(const n in t){const r="role"===n?n:`aria-${n}`,s=t[n];null==s?e.removeAttribute(r):e.setAttribute(r,s)}})(e)}return((e,t)=>{let n,r=!0;const s=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(s),r=!0):(s.value=t,r&&(e.setAttributeNodeNS(s),r=!1)))}})(e,t)};function z(e){const{type:t,path:n}=e,r=n.reduceRight(S,this);return"node"===t?(e=>{let t,n,r=[];const s=o=>{switch(typeof o){case"string":case"number":case"boolean":t!==o&&(t=o,n||(n=document.createTextNode("")),n.data=o,r=N(e,r,[n]));break;case"object":case"undefined":if(null==o){t!=o&&(t=o,r=N(e,r,[]));break}if(y(o)){t=o,0===o.length?r=N(e,r,[]):"object"==typeof o[0]?r=N(e,r,o):s(String(o));break}t!==o&&"ELEMENT_NODE"in o&&(t=o,r=N(e,r,11===o.nodeType?b.call(o.childNodes):[o]));break;case"function":s(o(e))}};return s})(r):"attr"===t?I(r,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(r)}const _=c(new WeakMap),P=/^(?:plaintext|script|style|textarea|title|xmp)$/i,T=(e,t)=>{const n=((e,t,n)=>{const r=[],{length:s}=e;for(let i=1;i<s;i++){const n=e[i-1];r.push(u.test(n)&&m(e,i)?n.replace(u,((e,n,r)=>`${t}${i-1}=${r||'"'}${n}${r?"":'"'}`)):`${n}\x3c!--${t}${i-1}--\x3e`)}r.push(e[s-1]);const o=r.join("").trim();return n?o:o.replace(f,w)})(t,"isµ","svg"===e),r=E(n,e),s=A(r),o=[],i=t.length-1;let a=0,l=`isµ${a}`;for(;a<i;){const e=s.nextNode();if(!e)throw`bad template: ${n}`;if(8===e.nodeType)e.data===l&&(o.push({type:"node",path:$(e)}),l="isµ"+ ++a);else{for(;e.hasAttribute(l);)o.push({type:"attr",path:$(e),name:e.getAttribute(l)}),e.removeAttribute(l),l="isµ"+ ++a;P.test(e.tagName)&&e.textContent.trim()===`\x3c!--${l}--\x3e`&&(e.textContent="",o.push({type:"text",path:$(e)}),l="isµ"+ ++a)}}return{content:r,nodes:o}},L=(e,t)=>{const{content:n,nodes:r}=_.get(t)||_.set(t,T(e,t)),s=O.call(document,n,!0);return{content:s,updates:r.map(z,s)}},j=(e,{type:t,template:n,values:r})=>{const{length:s}=r;B(e,r,s);let{entry:o}=e;o&&o.template===n&&o.type===t||(e.entry=o=((e,t)=>{const{content:n,updates:r}=L(e,t);return{type:e,template:t,content:n,updates:r,wire:null}})(t,n));const{content:i,updates:a,wire:l}=o;for(let c=0;c<s;c++)a[c](r[c]);return l||(o.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=b.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}})(i))},B=({stack:e},t,n)=>{for(let r=0;r<n;r++){const n=t[r];n instanceof M?t[r]=j(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):y(n)?B(e[r]||(e[r]={stack:[],entry:null,wire:null}),n,n.length):e[r]=null}n<e.length&&e.splice(n)};function M(e,t,n){this.type=e,this.template=t,this.values=n}const{create:D,defineProperties:V}=Object,Y=e=>{const t=c(new WeakMap);return V(((t,...n)=>new M(e,t,n)),{for:{value(n,r){const s=t.get(n)||t.set(n,D(null));return s[r]||(s[r]=(o={stack:[],entry:null,wire:null},(t,...n)=>j(o,{type:e,template:t,values:n})));var o}},node:{value:(t,...n)=>j({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},F=c(new WeakMap),W=Y("html");Y("svg");var X=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var r,s,o;if(Array.isArray(t)){if((r=t.length)!=n.length)return!1;for(s=r;0!=s--;)if(!e(t[s],n[s]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((r=(o=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(s=r;0!=s--;)if(!Object.prototype.hasOwnProperty.call(n,o[s]))return!1;for(s=r;0!=s--;){var i=o[s];if(!e(t[i],n[i]))return!1}return!0}return t!=t&&n!=n};class q{constructor({data:e,onChange:t,minRowHeight:n,stickyHeader:r,mergeCells:s}){this.containerElement=null,this.areaHeight=0,this.additionalArea=0,this.lastDataSnapshot={dataHeadColumnsCount:0,headRowsCount:0,offset:0,startRowIndex:0,values:[],headerRows:[],columnsOrder:[]},this.scrollTop=0,this.scrollLeft=0,this.setContainerElement=e=>{this.containerElement!==e&&(this.containerElement&&this.resizeObserver.unobserve(e),this.containerElement=e,this.resizeObserver.observe(e))},this.setScrollPosition=(e,t)=>{this.scrollLeft=t,this.scrollTop!==e&&(this.scrollTop=e,this.commit())},this.setAreaHeight=(e,t)=>{this.areaHeight=e,this.additionalArea=t,this.commit()},this.data=e,this.rowHeights=new Array(e.values.length).fill(n),this.onChange=t,this.stickyHeader=r,this.mergeCells=s,this.resizeObserver=new ResizeObserver((()=>{this.containerElement&&this.setAreaHeight(this.containerElement.clientHeight,.5*this.containerElement.clientHeight)}))}get contentHeight(){return this.rowHeights.reduce(((e,t)=>e+t),0)+1}get visibleTableData(){return this.lastDataSnapshot}getRowInfo(e){var t;if(!this.mergeCells)return{span:1,height:this.rowHeights[e]};const n=null==(t=this.data.values[e])?void 0:t[0];if(!n)return{span:0,height:0};const r=n.span||1;return{span:r,height:this.rowHeights.slice(e,e+r).reduce(((e,t)=>e+t),0)}}commit(){let e=0,t=0,n=this.areaHeight,r=0;this.stickyHeader&&(t=this.data.headRowsCount,n-=this.rowHeights.slice(0,t).reduce(((e,t)=>e+t),0));const s=Math.max(0,this.scrollTop-this.additionalArea),o=this.scrollTop+n+this.additionalArea;let i=this.getRowInfo(t);for(;i.height+e<s;)e+=i.height,t+=i.span,i=this.getRowInfo(t);let a=t;for(i=this.getRowInfo(a);r+e<o&&a<this.data.values.length;)r+=i.height,a+=i.span,i=this.getRowInfo(a);this.lastDataSnapshot.startRowIndex===t&&this.lastDataSnapshot.values.length+this.lastDataSnapshot.startRowIndex===a||(this.lastDataSnapshot={startRowIndex:t,offset:e,dataHeadColumnsCount:this.data.dataHeadColumnsCount,headRowsCount:this.stickyHeader?0:this.data.headRowsCount,values:this.data.values.slice(t,a),headerRows:this.stickyHeader?this.data.values.slice(0,this.data.headRowsCount):null,columnsOrder:this.data.columnsOrder},this.onChange())}containSameData(e){return X(this.data,e)}setRowHeights(e,t){this.rowHeights.splice(e,t.length,...t)}dispose(){this.resizeObserver.disconnect()}}var K="_container_mzagm_1",U="_stickyHeader_mzagm_10";var Z="_table_ldtm3_1";class G{constructor(){this.listeners=[]}on(e){this.listeners.push(e)}dispatch(e){this.listeners.forEach((t=>t(e)))}}function J(e,{onDragMove:t,onDragEnd:n},r=1){const s=e.screenX,o=e.screenY;function i(e){t({deltaX:(e.screenX-s)/r,deltaY:(e.screenY-o)/r})}window.document.body.style.userSelect="none",document.addEventListener("mousemove",i),document.addEventListener("mouseup",(function e(t){document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",e),n({deltaX:(t.screenX-s)/r,deltaY:(t.screenY-o)/r}),window.document.body.style.userSelect=""}))}var Q="_cell_l4u9f_1",ee="_cellContainer_l4u9f_11",te="_columnResizer_l4u9f_18",ne="_rowResizer_l4u9f_28";var re="_container_1bk8e_1",se="_progress_1bk8e_12",oe="_label_1bk8e_19";function ie(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ae(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ae(Object(n),!0).forEach((function(t){ie(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ae(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const ce=new Set(["—"]),ue=new Set(["­"]),de=new Set([" "," "," "," "," "," "," "," "," "," "," "," "," ","　","\t","​","\u2028","\u2029"]),he=new Set(["֊","‐","‒","–","־","་","፡","៘","៚","‧","|","᛫","᛬","᛭","⁖","⁘","⁙","⁚","⁛","⁝","⁞","⸙","⸪","⸫","⸬","⸭","⸰","တ0","တ1","တ2","္F","ွ0","႑F","ቇ0"]),pe=new Set(["´","´"]),fe=new Set(["\n"]);function ge(e,t){t||(t={});const n=Number.parseInt(Oe(t,"base-font-size",16),10),r=Number.parseFloat(e),s=e.replace(r,"");switch(s){case"rem":case"em":return r*n;case"pt":return r*(96/72);case"px":return r}throw new Error("The unit "+s+" is not supported")}function me(e,t){const n=new Set(["inherit","initial","unset","normal"]);let r=0;e&&!n.has(e)&&(r=ge(e));let s=0;return t&&!n.has(t)&&(s=ge(t)),e=>(e.trim().replace(/\s+/gi," ").split(" ").length-1)*r+e.length*s}function we(e,t){const n=[],r=Oe(t,"font-weight",e.getPropertyValue("font-weight"))||"400";["normal","bold","bolder","lighter","100","200","300","400","500","600","700","800","900"].includes(r.toString())&&n.push(r);const s=Oe(t,"font-style",e.getPropertyValue("font-style"));["normal","italic","oblique"].includes(s)&&n.push(s);const o=Oe(t,"font-variant",e.getPropertyValue("font-variant"));["normal","small-caps"].includes(o)&&n.push(o);const i=ge(Oe(t,"font-size",e.getPropertyValue("font-size"))||"16px");n.push(i+"px");const a=Oe(t,"font-family",e.getPropertyValue("font-family"))||"Helvetica, Arial, sans-serif";return n.push(a),n.join(" ")}function ye(e){return e&&"function"==typeof e.getPropertyValue}function ve(e){return be(e)&&e.style&&"undefined"!=typeof window&&"function"==typeof window.getComputedStyle}function be(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:Boolean(e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)}function Ce(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function xe(e,t){const n=le({},t||{}),{style:r}=n;return t||(t={}),ye(r)?r:ve(e)?window.getComputedStyle(e,Oe(t,"pseudoElt",null)):{getPropertyValue:e=>Oe(t,e)}}function ke(e,t){switch(t){case"pre":case"pre-wrap":return e;case"pre-line":return(e||"").replace(/\s+/gm," ").trim();default:return(e||"").replace(/[\r\n]/gm," ").replace(/\s+/gm," ").trim()}}function Se(e,t){switch(t.getPropertyValue("text-transform")){case"uppercase":return e.toUpperCase();case"lowercase":return e.toLowerCase();default:return e}}function $e(e){return e=(e||"").replace(/<wbr>/gi,"​").replace(/<br\s*\/?>/gi,"\n").replace(/&shy;/gi,"­").replace(/&mdash;/gi,"—"),/&#(\d+)(;?)|&#[xX]([a-fA-F\d]+)(;?)|&([\da-zA-Z]+);/g.test(e)&&console&&console.error("text-metrics: Found encoded htmlenties. You may want to use https://mths.be/he to decode your text first."),e}function He(e){return e&&(e.textContent||e.textContent)||""}function Oe(e,t,n){return e&&void 0!==e[t]&&e[t]||n}function Re(e){const t={};for(const n of Object.keys(e||{}))t[n.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase()))]=e[n];return t}function Ee(e){try{const t=document.createElement("canvas").getContext("2d"),n=window.devicePixelRatio||1,r=t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return t.font=e,t.setTransform(n/r,0,0,n/r,0,0),t}catch(t){throw new Error("Canvas support required"+t.message)}}function Ae(e){return(ce.has(e)?"B2":de.has(e)&&"BAI")||ue.has(e)&&"SHY"||he.has(e)&&"BA"||pe.has(e)&&"BB"||fe.has(e)&&"BK"}function Ne({ctx:e,text:t,max:n,wordSpacing:r,letterSpacing:s}){const o=me(r,s),i=[],a=[],l=[];let c="",u="";if(!t)return[];for(const d of t){const e=Ae(d);""===u&&"BAI"===e||(e?(l.push({chr:d,type:e}),a.push(u),u=""):u+=d)}u&&a.push(u);for(const[d,h]of a.entries()){if(0===d){c=h;continue}const t=l[d-1],r="SHY"===t.type?"":t.chr;if("BK"===t.type){i.push(c),c=h;continue}const s=e.measureText(c+r+h).width+o(c+r+h);if(Math.round(s,10)<=n)c+=r+h;else switch(t.type){case"SHY":i.push(c+"-"),c=h;break;case"BA":i.push(c+r),c=h;break;case"BAI":i.push(c),c=h;break;case"BB":i.push(c),c=r+h;break;case"B2":Number.parseInt(e.measureText(c+r).width+o(c+r),10)<=n?(i.push(c+r),c=h):Number.parseInt(e.measureText(r+h).width+o(r+h),10)<=n?(i.push(c),c=r+h):(i.push(c,r),c=h);break;default:throw new Error("Undefoined break")}}return[...c].length>0&&i.push(c),i}function Ie({ctx:e,text:t,max:n,wordSpacing:r,letterSpacing:s}){const o=me(r,s),i=[];let a="",l=0;if(!t)return[];for(const c of t){const r=Ae(c);if("BK"===r){i.push(a),a="";continue}const s=a.length;if(de.has(c)&&(0===s||de.has(a[s-1])))continue;let u=e.measureText(a+c).width+o(a+c),d=Math.ceil(u);if("SHY"===r){const n=t[l+1]||"";u=e.measureText(a+c+n).width+o(a+c+n),d=Math.ceil(u)}if(d>n&&[...a].length>0)switch(r){case"SHY":i.push(a+"-"),a="";break;case"BA":i.push(a+c),a="";break;case"BAI":i.push(a),a="";break;default:i.push(a),a=c}else"­"!==c&&(a+=c);l++}return[...a].length>0&&i.push(a),i}var ze={__proto__:null,addWordAndLetterSpacing:me,getFont:we,isCSSStyleDeclaration:ye,canGetComputedStyle:ve,isElement:be,isObject:Ce,getStyle:xe,normalizeWhitespace:ke,getStyledText:Se,prepareText:$e,getText:He,prop:Oe,normalizeOptions:Re,getContext2d:Ee,computeLinesDefault:Ne,computeLinesBreakAll:Ie};class _e{constructor(e,t={}){!be(e)&&Ce(e)?(this.el=void 0,this.overwrites=Re(e)):(this.el=e,this.overwrites=Re(t)),this.style=xe(this.el,this.overwrites),this.font=Oe(t,"font",null)||we(this.style,this.overwrites)}padding(){return this.el?Number.parseInt(this.style.paddingLeft||0,10)+Number.parseInt(this.style.paddingRight||0,10):0}parseArgs(e,t={},n={}){"object"==typeof e&&e&&(n=t,t=e||{},e=void 0);const r=le(le({},this.overwrites),Re(n)),s=Oe(r,"white-space")||this.style.getPropertyValue("white-space");return t||(t={}),n||(t={}),{text:e=!e&&this.el?ke(He(this.el),s):$e(ke(e,s)),options:t,overwrites:n,styles:r}}width(){const{text:e,options:t,overwrites:n,styles:r}=this.parseArgs(...[].slice.call(arguments));if(!e)return 0;const s=we(this.style,r),o=Oe(r,"letter-spacing")||this.style.getPropertyValue("letter-spacing"),i=me(Oe(r,"word-spacing")||this.style.getPropertyValue("word-spacing"),o),a=Ee(s),l=Se(e,this.style);return t.multiline?this.lines(l,t,n).reduce(((e,t)=>{const n=a.measureText(t).width+i(t);return Math.max(e,n)}),0):a.measureText(l).width+i(l)}height(){const{text:e,options:t,styles:n}=this.parseArgs(...[].slice.call(arguments)),r=Number.parseFloat(Oe(n,"line-height")||this.style.getPropertyValue("line-height"));return Math.ceil(this.lines(e,t,n).length*r||0)}lines(){const{text:e,options:t,overwrites:n,styles:r}=this.parseArgs(...[].slice.call(arguments)),s=we(this.style,r);let o=Number.parseInt(Oe(t,"width")||Oe(n,"width"),10)||Oe(this.el,"offsetWidth",0)||Number.parseInt(Oe(r,"width",0),10)||Number.parseInt(this.style.width,10);o-=this.padding();const i=Oe(r,"word-break")||this.style.getPropertyValue("word-break"),a=Oe(r,"letter-spacing")||this.style.getPropertyValue("letter-spacing"),l=Oe(r,"word-spacing")||this.style.getPropertyValue("word-spacing"),c=Ee(s),u=Se(e,this.style);return"break-all"===i?Ie({ctx:c,text:u,max:o,wordSpacing:l,letterSpacing:a}):Ne({ctx:c,text:u,max:o,wordSpacing:l,letterSpacing:a})}maxFontSize(){const{text:e,options:t,overwrites:n,styles:r}=this.parseArgs(...[].slice.call(arguments)),s=n=>Math.ceil(this.width(e,t,le(le({},r),{},{"font-size":n+"px"})));let o=Number.parseInt(Oe(t,"width")||Oe(n,"width"),10)||Oe(this.el,"offsetWidth",0)||Number.parseInt(Oe(r,"width",0),10)||Number.parseInt(this.style.width,10);o-=this.padding();let i=Math.floor(o/2),a=s(i);if(i=Math.floor(i/a*o),a=s(i),Math.ceil(a)===o)return i?i+"px":void 0;const l=a>o&&i>0;for(;a>o&&i>0;)i-=1,a=s(i);if(!l)for(;a<o;){if(a=s(i+1),a>o)return i?i+"px":void 0;i+=1}return i?i+"px":void 0}}le({},ze);var Pe="_text_e2vs1_1";const Te={text:({data:{value:e,rowResizeId:t},resize:n,resizeSignal:r,callbacks:s,defaultLinesCount:o})=>{var i;let a=t&&(null==(i=null==n?void 0:n.rows)?void 0:i[t])||o,l=null;return r.on((e=>{if(l&&t)if("preview"===e.state){const t=e.size,n=new _e(l,{wordBreak:"break-all"}).lines(),r=l.scrollHeight/n.length,s=Math.ceil(t/r);l.style.webkitLineClamp=String(s)}else{const{onRowResize:e}=s,n=parseInt(l.style.webkitLineClamp,10);l.style.webkitLineClamp=n?String(n):"",e&&!isNaN(n)&&e(t,n)}})),W`<div
    ref=${e=>{l=e}}
    class=${Pe}
    style=${`-webkit-line-clamp: ${a}`}
  >
    ${e}
  </div>`},link:({data:{value:e}})=>W`<a target="blank" href="${e}">${e}</a>`,progress:({data:{value:e}})=>{const t=100*+e+"%";return W`<div class=${re}>
    <div class=${se} style=${`width: ${t}`}></div>
    <div class=${oe}>${t}</div>
  </div>`}};function Le({key:e,row:t,rowIndex:n,dataHeadColumnsCount:r,cell:s,columnsLeft:i}){return W.for(e,n.toString())`<tr
    data-rowIndex=${n}
  >
    ${t.flatMap(((e,t)=>function({data:e,rowIndex:t,columnIndex:n,isRowHeader:r,isColumnHeader:s,meta:o,cellClasses:i,stickySide:a,mergeCells:l,resize:c,columnsOrder:u,callbacks:d,leftOffset:h,defaultLinesCount:p}){var f;if(null==(f=o[t])?void 0:f[n])return[];const g=s||r,m=r&&l?null==e?void 0:e.span:void 0,w=s&&l?null==e?void 0:e.span:void 0,y=null==u?void 0:u[n];if(m)for(let H=1;H<m;++H){const e=o[t]||{};e[n+H]=!0,o[t]=e}if(w)for(let H=1;H<w;++H){const e=t+H,r=o[e]||{};r[n]=!0,o[e]=r}let v="";a&&s&&(v=`left: ${h}px; z-index: 1`);const b=[g?"header":"body"];e.styles&&b.push(...e.styles);const C=b.map((e=>i[e])).filter((e=>null!=e)).join(" "),x=Te[e.type||"text"],k=new G,{onRowResize:S,onColumnResize:$}=d;return W`<td
    class=${`${Q} ${C}`}
    colspan=${m}
    rowspan=${w}
    style=${v}
    .dataset=${{column:n,row:t}}
  >
    <div class=${ee}>
      ${x({data:e,resize:c,resizeSignal:k,callbacks:d,defaultLinesCount:p})}
    </div>
    ${!y||m&&1!==m||!$?null:W`<div
          class=${te}
          onmousedown=${e=>{const t=e.target.parentElement,n=null==t?void 0:t.clientWidth;J(e,{onDragMove:({deltaX:e})=>{t.style.width=`${n+e}px`},onDragEnd:({deltaX:e})=>{t.style.width="",$(y,n+e)}})}}
        ></div>`}
    ${e.rowResizeId&&S?W`<div
          class=${ne}
          onmousedown=${e=>{const t=e.target.parentElement,n=getComputedStyle(t),r=parseInt(n.paddingTop)+parseInt(n.paddingBottom),s=null==t?void 0:t.clientHeight,o=s-r;J(e,{onDragMove:({deltaY:e})=>{t.style.height=`${s+e}px`,k.dispatch({state:"preview",size:o+e})},onDragEnd:()=>{t.style.height="",k.dispatch({state:"end"})}})}}
        ></div>`:null}
  </td>`}(o(o({},s),{data:e,rowIndex:n,columnIndex:t,isColumnHeader:r>t,leftOffset:i[t]}))))}
  </tr>`}function je(e,t,{values:n,headRowsCount:r,dataHeadColumnsCount:s,columnsOrder:o},i,a,l,c,u,d=2){const h={},p=u.onCellClick;let f=[0];return W`
    <table
      class=${Z}
      onclick=${p?e=>{let t=e.target;for(;t&&"TD"!==t.tagName&&t!==e.currentTarget;)t=t.parentElement;const{column:n,row:r}=(null==t?void 0:t.dataset)||{};if(n&&r){const e=parseInt(n,10),t=parseInt(r,10);p({row:t,column:e})}}:null}
    >
      ${o.map(((e,t)=>{const n=c.columns[e]||150;return f[t+1]=f[t]+n,W`<col width=${n} />`}))}
      ${n.map(((n,p)=>{const g=t+p;return Le({key:e,row:n,rowIndex:g,dataHeadColumnsCount:s,columnsLeft:f,cell:{isRowHeader:r>g,meta:h,cellClasses:i,stickySide:a,mergeCells:l,resize:c,callbacks:u,columnsOrder:o,defaultLinesCount:d}})}))}
    </table>
  `}const Be=new Map;function Me({className:e,table:t,target:n,minCellHeight:r=30,cellClasses:s={},callbacks:o={},stickyHeader:i,stickySide:a,mergeCells:l,resize:c={rows:{},columns:{}},defaultLinesCount:u}){const d=function({table:e,target:t,redraw:n,minCellHeight:r,stickyHeader:s,mergeCells:o}){let i=Be.get(t);if(null==i?void 0:i.containSameData(e))return i;i&&i.dispose();const a=new q({data:e,onChange:n,minRowHeight:r,stickyHeader:s,mergeCells:o});return Be.set(t,a),a}({table:t,target:n,redraw:h,minCellHeight:r,stickyHeader:i,mergeCells:l});function h(){const t=d.visibleTableData,r=t.headerRows?je(d,0,{dataHeadColumnsCount:t.dataHeadColumnsCount,headRowsCount:t.headerRows.length,values:t.headerRows,resize:t.resize,columnsOrder:t.columnsOrder},s,a,l,c,o,u):null,i=je(n,t.startRowIndex,t,s,a,l,c,o,u);((e,t)=>{const n="function"==typeof t?t():t,r=F.get(e)||F.set(e,{stack:[],entry:null,wire:null}),s=n instanceof M?j(r,n):n;s!==r.wire&&(r.wire=s,e.textContent="",e.appendChild(s.valueOf()))})(n,function({content:e,headers:t,height:n,offset:r,onScroll:s,setContainerElement:o,className:i=""}){return W`
    <div
      class=${`${i} ${K}`}
      ref=${e=>{o(e)}}
      onscroll=${e=>{const{scrollLeft:t,scrollTop:n}=e.target;s(n,t)}}
      onwheel=${e=>{e.ctrlKey||e.stopPropagation()}}
    >
      <div style=${`height: ${n}px;`}>
        <div class=${U}>${t}</div>
        <div style=${`transform: translateY(${r}px)`}>${e}</div>
      </div>
    </div>
  `}({content:i,headers:r,height:d.contentHeight,offset:t.offset,onScroll:d.setScrollPosition,setContainerElement:d.setContainerElement,className:e}));const h=n.querySelectorAll("table"),p=r?h[0]:null,f=r?h[1]:h[0];function g(e,t){if(t){const n=[...t.children||[]].filter((e=>"TR"===e.tagName)).map((e=>e.clientHeight));d.setRowHeights(e,n)}}g(0,p),g(t.startRowIndex,f)}n.style.setProperty("--table-min-cell-height",`${r}px`),h()}const De=({table:e,className:t,minCellHeight:n,cellClasses:r,resize:s,mergeCells:o=!0,stickyHeader:c=!0,stickySide:u=!0,callbacks:d,defaultLinesCount:h})=>{const p=a(null);return l((()=>{const t=p.current;Me({table:e,target:t,minCellHeight:n,cellClasses:r,mergeCells:o,stickyHeader:c,stickySide:u,callbacks:d,resize:s,defaultLinesCount:h})}),[e,n,r,o,c,u,d,s,h]),l((()=>{const e=p.current;return()=>function(e){const t=Be.get(e);t&&(t.dispose(),Be.delete(e))}(e)}),[]),i.createElement("div",{ref:p,className:t})};export{De as ReactTable};
