var __defProp=Object.defineProperty,__hasOwnProp=Object.prototype.hasOwnProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,n)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,__assign=(e,t)=>{for(var n in t||(t={}))__hasOwnProp.call(t,n)&&__defNormalProp(e,n,t[n]);if(__getOwnPropSymbols)for(var n of __getOwnPropSymbols(t))__propIsEnum.call(t,n)&&__defNormalProp(e,n,t[n]);return e};!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TableComponent={},e.React)}(this,(function(e,t){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=n(t),r=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const o=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,l=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,a=/<[a-z][^>]+$/i,i=/>[^<>]*$/,c=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,u=/\s+$/,d=(e,t)=>0<t--&&(a.test(e[t])||!i.test(e[t])&&d(e,t)),h=(e,t,n)=>l.test(t)?e:`<${t}${n.replace(u,"")}></${t}>`;const{isArray:p}=Array,{indexOf:f,slice:m}=[],g=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;const w=(e,t)=>{let n,s=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(s=s.toLowerCase()),t=>{const r=p(t)?t:[t,!1];n!==r[0]&&(n&&e.removeEventListener(s,n,r[1]),(n=r[0])&&e.addEventListener(s,n,r[1]))}};
/*! (c) Andrea Giammarchi - ISC */
var y=function(e){var t="fragment",n="template",s="content"in o(n)?function(e){var t=o(n);return t.innerHTML=e,t.content}:function(e){var s=o(t),l=o(n),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var i=RegExp.$1;l.innerHTML="<table>"+e+"</table>",a=l.querySelectorAll(i)}else l.innerHTML=e,a=l.childNodes;return r(s,a),s};return function(e,t){return("svg"===t?l:s)(e)};function r(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function o(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function l(e){var n=o(t),s=o("div");return s.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",r(n,s.firstChild.childNodes),n}}(document);const v=({childNodes:e},t)=>e[t],b=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(f.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:C,importNode:x}=document,k=1!=x.length,S=k?(e,t,n)=>x.call(document,y(e,t,n),!0):y,$=k?e=>C.call(document,e,129,null,!1):e=>C.call(document,e,129),_=(e,t,n)=>((e,t,n,s,r)=>{const o=n.length;let l=t.length,a=o,i=0,c=0,u=null;for(;i<l||c<a;)if(l===i){const t=a<o?c?s(n[c-1],-0).nextSibling:s(n[a-c],0):r;for(;c<a;)e.insertBefore(s(n[c++],1),t)}else if(a===c)for(;i<l;)u&&u.has(t[i])||e.removeChild(s(t[i],-1)),i++;else if(t[i]===n[c])i++,c++;else if(t[l-1]===n[a-1])l--,a--;else if(t[i]===n[a-1]&&n[c]===t[l-1]){const r=s(t[--l],-1).nextSibling;e.insertBefore(s(n[c++],1),s(t[i++],-1).nextSibling),e.insertBefore(s(n[--a],1),r),t[l]=n[a]}else{if(!u){u=new Map;let e=c;for(;e<a;)u.set(n[e],e++)}if(u.has(t[i])){const r=u.get(t[i]);if(c<r&&r<a){let o=i,d=1;for(;++o<l&&o<a&&u.get(t[o])===r+d;)d++;if(d>r-c){const o=s(t[i],0);for(;c<r;)e.insertBefore(s(n[c++],1),o)}else e.replaceChild(s(n[c++],1),s(t[i++],-1))}else i++}else e.removeChild(s(t[i++],-1))}return n})(e.parentNode,t,n,g,e),O=(e,t)=>{switch(t[0]){case"?":return((e,t,n)=>s=>{n!==!!s&&((n=!!s)?e.setAttribute(t,""):e.removeAttribute(t))})(e,t.slice(1),!1);case".":return((e,t)=>"dataset"===t?(({dataset:e})=>t=>{for(const n in t){const s=t[n];null==s?delete e[n]:e[n]=s}})(e):n=>{e[t]=n})(e,t.slice(1));case"@":return w(e,"on"+t.slice(1));case"o":if("n"===t[1])return w(e,t)}switch(t){case"ref":return(e=>{let t;return n=>{t!==n&&(t=n,"function"==typeof n?n(e):n.current=e)}})(e);case"aria":return(e=>t=>{for(const n in t){const s="role"===n?n:`aria-${n}`,r=t[n];null==r?e.removeAttribute(s):e.setAttribute(s,r)}})(e)}return((e,t)=>{let n,s=!0;const r=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?s||(e.removeAttributeNode(r),s=!0):(r.value=t,s&&(e.setAttributeNodeNS(r),s=!1)))}})(e,t)};function H(e){const{type:t,path:n}=e,s=n.reduceRight(v,this);return"node"===t?(e=>{let t,n,s=[];const r=o=>{switch(typeof o){case"string":case"number":case"boolean":t!==o&&(t=o,n||(n=document.createTextNode("")),n.data=o,s=_(e,s,[n]));break;case"object":case"undefined":if(null==o){t!=o&&(t=o,s=_(e,s,[]));break}if(p(o)){t=o,0===o.length?s=_(e,s,[]):"object"==typeof o[0]?s=_(e,s,o):r(String(o));break}t!==o&&"ELEMENT_NODE"in o&&(t=o,s=_(e,s,11===o.nodeType?m.call(o.childNodes):[o]));break;case"function":r(o(e))}};return r})(s):"attr"===t?O(s,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(s)}const I="isµ",R=r(new WeakMap),E=/^(?:plaintext|script|style|textarea|title|xmp)$/i,N=(e,t)=>{const n=((e,t,n)=>{const s=[],{length:r}=e;for(let a=1;a<r;a++){const n=e[a-1];s.push(o.test(n)&&d(e,a)?n.replace(o,((e,n,s)=>`${t}${a-1}=${s||'"'}${n}${s?"":'"'}`)):`${n}\x3c!--${t}${a-1}--\x3e`)}s.push(e[r-1]);const l=s.join("").trim();return n?l:l.replace(c,h)})(t,I,"svg"===e),s=S(n,e),r=$(s),l=[],a=t.length-1;let i=0,u=`isµ${i}`;for(;i<a;){const e=r.nextNode();if(!e)throw`bad template: ${n}`;if(8===e.nodeType)e.data===u&&(l.push({type:"node",path:b(e)}),u="isµ"+ ++i);else{for(;e.hasAttribute(u);)l.push({type:"attr",path:b(e),name:e.getAttribute(u)}),e.removeAttribute(u),u="isµ"+ ++i;E.test(e.tagName)&&e.textContent.trim()===`\x3c!--${u}--\x3e`&&(e.textContent="",l.push({type:"text",path:b(e)}),u="isµ"+ ++i)}}return{content:s,nodes:l}},P=(e,t)=>{const{content:n,nodes:s}=R.get(t)||R.set(t,N(e,t)),r=x.call(document,n,!0);return{content:r,updates:s.map(H,r)}},A=(e,{type:t,template:n,values:s})=>{const{length:r}=s;z(e,s,r);let{entry:o}=e;o&&o.template===n&&o.type===t||(e.entry=o=((e,t)=>{const{content:n,updates:s}=P(e,t);return{type:e,template:t,content:n,updates:s,wire:null}})(t,n));const{content:l,updates:a,wire:i}=o;for(let c=0;c<r;c++)a[c](s[c]);return i||(o.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const s=m.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:s[0],lastChild:s[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(s[t++])}return e}}})(l))},z=({stack:e},t,n)=>{for(let s=0;s<n;s++){const n=t[s];n instanceof T?t[s]=A(e[s]||(e[s]={stack:[],entry:null,wire:null}),n):p(n)?z(e[s]||(e[s]={stack:[],entry:null,wire:null}),n,n.length):e[s]=null}n<e.length&&e.splice(n)};function T(e,t,n){this.type=e,this.template=t,this.values=n}const{create:L,defineProperties:j}=Object,D=e=>{const t=r(new WeakMap);return j(((t,...n)=>new T(e,t,n)),{for:{value(n,s){const r=t.get(n)||t.set(n,L(null));return r[s]||(r[s]=(o={stack:[],entry:null,wire:null},(t,...n)=>A(o,{type:e,template:t,values:n})));var o}},node:{value:(t,...n)=>A({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},M=r(new WeakMap),B=D("html");D("svg");var V=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var s,r,o;if(Array.isArray(t)){if((s=t.length)!=n.length)return!1;for(r=s;0!=r--;)if(!e(t[r],n[r]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((s=(o=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(r=s;0!=r--;)if(!Object.prototype.hasOwnProperty.call(n,o[r]))return!1;for(r=s;0!=r--;){var l=o[r];if(!e(t[l],n[l]))return!1}return!0}return t!=t&&n!=n};class Y{constructor({data:e,onChange:t,minRowHeight:n,stickyHeader:s,mergeCells:r,showCollapseIcons:o=!1}){if(this.containerElement=null,this.areaHeight=0,this.additionalArea=0,this.collapseData={},this.collapseHeaders=[],this.hoverCell=null,this.lastDataSnapshot={dataHeadColumnsCount:0,headRowsCount:0,offset:0,startRowIndex:0,values:[],headerRows:[],columnsOrder:[],contentHeight:0,hiddenRows:[]},this.scrollTop=0,this.scrollLeft=0,this.setContainerElement=e=>{this.containerElement!==e&&(this.containerElement&&this.resizeObserver.unobserve(e),this.containerElement=e,this.resizeObserver.observe(e))},this.setScrollPosition=(e,t)=>{this.scrollLeft=t,this.scrollTop!==e&&(this.scrollTop=e,this.commit())},this.setAreaHeight=(e,t)=>{this.areaHeight=e,this.additionalArea=t,this.commit()},this.getCollapseKey=(e,t)=>`${e}:${t}`,this.isCollapsed=(e,t)=>!!this.collapseData[this.getCollapseKey(e,t)],this.hasCollapseIcon=(e,t)=>{var n,s,r;if(!this.showCollapseIcons||t>=this.data.dataHeadColumnsCount)return!1;if(e===this.data.headRowsCount-1)return!!(null==(n=this.collapseHeaders[t])?void 0:n.length);const o=null==(r=null==(s=this.data.values[e])?void 0:s[t])?void 0:r.span;return!!o&&o>1},this.setCollapsedImpl=({rowIndex:e,columnIndex:t,value:n})=>{if(e===this.data.headRowsCount-1){const e=this.collapseHeaders[t];e&&e.forEach((e=>{this.setCollapsedImpl({rowIndex:e,columnIndex:t,value:n})}))}const s=this.getCollapseKey(e,t);n?this.collapseData[s]=!0:delete this.collapseData[s],this.commit()},this.setCollapsed=({rowIndex:e,columnIndex:t,value:n})=>{this.setCollapsedImpl({rowIndex:e,columnIndex:t,value:n}),this.commit(!0)},this.data=e,this.rowHeights=new Array(e.values.length).fill(n),this.onChange=t,this.stickyHeader=s,this.mergeCells=r,this.showCollapseIcons=o,o&&r)for(let l=0;l<e.dataHeadColumnsCount-1;++l)this.collapseHeaders.push(this.getCellsWithCollapse(l));this.resizeObserver=new ResizeObserver((()=>{this.containerElement&&this.setAreaHeight(this.containerElement.clientHeight,.5*this.containerElement.clientHeight)}))}getContentHeight(e){return this.rowHeights.reduce(((t,n,s)=>e.includes(s)?t:t+n),0)+1}get visibleTableData(){return this.lastDataSnapshot}get hiddenRows(){var e,t;const n=[];for(const s of Object.keys(this.collapseData)){const[r,o]=s.split(":");if(r&&o){const s=parseInt(r,10),l=parseInt(o,10),a=null==(t=null==(e=this.data.values[s])?void 0:e[l])?void 0:t.span;if(a)for(let e=1;e<a;++e)n.push(s+e)}}return n}getCellsWithCollapse(e){var t;const n=[],s=this.data.values;for(let r=0;r<s.length;++r){const o=null==(t=s[r])?void 0:t[e];o.span&&o.span>1&&(n.push(r),r+=o.span-1)}return n}getRowInfo(e,t){var n;if(t.includes(e))return{span:1,height:0};if(!this.mergeCells||t.includes(e+1))return{span:1,height:this.rowHeights[e]};const s=null==(n=this.data.values[e])?void 0:n[0];if(!s)return{span:0,height:0};const r=s.span||1;return{span:r,height:this.rowHeights.slice(e,e+r).reduce(((e,t)=>e+t),0)}}commit(e=!1){let t=0,n=0,s=this.areaHeight,r=0;const o=this.hiddenRows,l=this.getContentHeight(o);this.stickyHeader&&(n=this.data.headRowsCount,s-=this.rowHeights.slice(0,n).reduce(((e,t)=>e+t),0));const a=Math.max(0,this.scrollTop-this.additionalArea),i=this.scrollTop+s+this.additionalArea;let c=this.getRowInfo(n,o);for(;c.height+t<a;)t+=c.height,n+=c.span,c=this.getRowInfo(n,o);let u=n;for(c=this.getRowInfo(u,o);r+t<i&&u<this.data.values.length;)r+=c.height,u+=c.span,c=this.getRowInfo(u,o);(e||this.lastDataSnapshot.startRowIndex!==n||this.lastDataSnapshot.values.length+this.lastDataSnapshot.startRowIndex!==u||this.lastDataSnapshot.contentHeight!==l)&&(this.lastDataSnapshot={startRowIndex:n,offset:t,dataHeadColumnsCount:this.data.dataHeadColumnsCount,headRowsCount:this.stickyHeader?0:this.data.headRowsCount,values:this.data.values.slice(n,u),headerRows:this.stickyHeader?this.data.values.slice(0,this.data.headRowsCount):null,columnsOrder:this.data.columnsOrder,contentHeight:l,hiddenRows:o},this.onChange())}containSameData(e){return V(this.data,e)}setRowHeights(e,t){for(let n=0;n<t.length;++n){const s=t[n];s&&(this.rowHeights[e+n]=s)}}dispose(){this.resizeObserver.disconnect()}}var W="_container_mzagm_1",F="_stickyHeader_mzagm_10";var X="_table_ldtm3_1";class K{constructor(){this.listeners=[]}on(e){this.listeners.push(e)}dispatch(e){this.listeners.forEach((t=>t(e)))}}function q(e,{onDragMove:t,onDragEnd:n},s=1){const r=e.screenX,o=e.screenY;function l(e){t({deltaX:(e.screenX-r)/s,deltaY:(e.screenY-o)/s})}window.document.body.style.userSelect="none",document.addEventListener("mousemove",l),document.addEventListener("mouseup",(function e(t){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",e),n({deltaX:(t.screenX-r)/s,deltaY:(t.screenY-o)/s}),window.document.body.style.userSelect=""}))}var U="_cell_l4u9f_1",Z="_cellContainer_l4u9f_11",G="_columnResizer_l4u9f_18",J="_rowResizer_l4u9f_28";var Q="_collapseIcon_1d7mc_1",ee="_expanded_1d7mc_17";var te="_container_1bk8e_1",ne="_progress_1bk8e_12",se="_label_1bk8e_19";function re(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(n),!0).forEach((function(t){re(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):oe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const ae=new Set(["—"]),ie=new Set(["­"]),ce=new Set([" "," "," "," "," "," "," "," "," "," "," "," "," ","　","\t","​","\u2028","\u2029"]),ue=new Set(["֊","‐","‒","–","־","་","፡","៘","៚","‧","|","᛫","᛬","᛭","⁖","⁘","⁙","⁚","⁛","⁝","⁞","⸙","⸪","⸫","⸬","⸭","⸰","တ0","တ1","တ2","္F","ွ0","႑F","ቇ0"]),de=new Set(["´","´"]),he=new Set(["\n"]);function pe(e,t){t||(t={});const n=Number.parseInt($e(t,"base-font-size",16),10),s=Number.parseFloat(e),r=e.replace(s,"");switch(r){case"rem":case"em":return s*n;case"pt":return s*(96/72);case"px":return s}throw new Error("The unit "+r+" is not supported")}function fe(e,t){const n=new Set(["inherit","initial","unset","normal"]);let s=0;e&&!n.has(e)&&(s=pe(e));let r=0;return t&&!n.has(t)&&(r=pe(t)),e=>(e.trim().replace(/\s+/gi," ").split(" ").length-1)*s+e.length*r}function me(e,t){const n=[],s=$e(t,"font-weight",e.getPropertyValue("font-weight"))||"400";["normal","bold","bolder","lighter","100","200","300","400","500","600","700","800","900"].includes(s.toString())&&n.push(s);const r=$e(t,"font-style",e.getPropertyValue("font-style"));["normal","italic","oblique"].includes(r)&&n.push(r);const o=$e(t,"font-variant",e.getPropertyValue("font-variant"));["normal","small-caps"].includes(o)&&n.push(o);const l=pe($e(t,"font-size",e.getPropertyValue("font-size"))||"16px");n.push(l+"px");const a=$e(t,"font-family",e.getPropertyValue("font-family"))||"Helvetica, Arial, sans-serif";return n.push(a),n.join(" ")}function ge(e){return e&&"function"==typeof e.getPropertyValue}function we(e){return ye(e)&&e.style&&"undefined"!=typeof window&&"function"==typeof window.getComputedStyle}function ye(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:Boolean(e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)}function ve(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function be(e,t){const n=le({},t||{}),{style:s}=n;return t||(t={}),ge(s)?s:we(e)?window.getComputedStyle(e,$e(t,"pseudoElt",null)):{getPropertyValue:e=>$e(t,e)}}function Ce(e,t){switch(t){case"pre":case"pre-wrap":return e;case"pre-line":return(e||"").replace(/\s+/gm," ").trim();default:return(e||"").replace(/[\r\n]/gm," ").replace(/\s+/gm," ").trim()}}function xe(e,t){switch(t.getPropertyValue("text-transform")){case"uppercase":return e.toUpperCase();case"lowercase":return e.toLowerCase();default:return e}}function ke(e){return e=(e||"").replace(/<wbr>/gi,"​").replace(/<br\s*\/?>/gi,"\n").replace(/&shy;/gi,"­").replace(/&mdash;/gi,"—"),/&#(\d+)(;?)|&#[xX]([a-fA-F\d]+)(;?)|&([\da-zA-Z]+);/g.test(e)&&console&&console.error("text-metrics: Found encoded htmlenties. You may want to use https://mths.be/he to decode your text first."),e}function Se(e){return e&&(e.textContent||e.textContent)||""}function $e(e,t,n){return e&&void 0!==e[t]&&e[t]||n}function _e(e){const t={};for(const n of Object.keys(e||{}))t[n.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase()))]=e[n];return t}function Oe(e){try{const t=document.createElement("canvas").getContext("2d"),n=window.devicePixelRatio||1,s=t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return t.font=e,t.setTransform(n/s,0,0,n/s,0,0),t}catch(t){throw new Error("Canvas support required"+t.message)}}function He(e){return(ae.has(e)?"B2":ce.has(e)&&"BAI")||ie.has(e)&&"SHY"||ue.has(e)&&"BA"||de.has(e)&&"BB"||he.has(e)&&"BK"}function Ie({ctx:e,text:t,max:n,wordSpacing:s,letterSpacing:r}){const o=fe(s,r),l=[],a=[],i=[];let c="",u="";if(!t)return[];for(const d of t){const e=He(d);""===u&&"BAI"===e||(e?(i.push({chr:d,type:e}),a.push(u),u=""):u+=d)}u&&a.push(u);for(const[d,h]of a.entries()){if(0===d){c=h;continue}const t=i[d-1],s="SHY"===t.type?"":t.chr;if("BK"===t.type){l.push(c),c=h;continue}const r=e.measureText(c+s+h).width+o(c+s+h);if(Math.round(r,10)<=n)c+=s+h;else switch(t.type){case"SHY":l.push(c+"-"),c=h;break;case"BA":l.push(c+s),c=h;break;case"BAI":l.push(c),c=h;break;case"BB":l.push(c),c=s+h;break;case"B2":Number.parseInt(e.measureText(c+s).width+o(c+s),10)<=n?(l.push(c+s),c=h):Number.parseInt(e.measureText(s+h).width+o(s+h),10)<=n?(l.push(c),c=s+h):(l.push(c,s),c=h);break;default:throw new Error("Undefoined break")}}return[...c].length>0&&l.push(c),l}function Re({ctx:e,text:t,max:n,wordSpacing:s,letterSpacing:r}){const o=fe(s,r),l=[];let a="",i=0;if(!t)return[];for(const c of t){const s=He(c);if("BK"===s){l.push(a),a="";continue}const r=a.length;if(ce.has(c)&&(0===r||ce.has(a[r-1])))continue;let u=e.measureText(a+c).width+o(a+c),d=Math.ceil(u);if("SHY"===s){const n=t[i+1]||"";u=e.measureText(a+c+n).width+o(a+c+n),d=Math.ceil(u)}if(d>n&&[...a].length>0)switch(s){case"SHY":l.push(a+"-"),a="";break;case"BA":l.push(a+c),a="";break;case"BAI":l.push(a),a="";break;default:l.push(a),a=c}else"­"!==c&&(a+=c);i++}return[...a].length>0&&l.push(a),l}var Ee={__proto__:null,addWordAndLetterSpacing:fe,getFont:me,isCSSStyleDeclaration:ge,canGetComputedStyle:we,isElement:ye,isObject:ve,getStyle:be,normalizeWhitespace:Ce,getStyledText:xe,prepareText:ke,getText:Se,prop:$e,normalizeOptions:_e,getContext2d:Oe,computeLinesDefault:Ie,computeLinesBreakAll:Re};class Ne{constructor(e,t={}){!ye(e)&&ve(e)?(this.el=void 0,this.overwrites=_e(e)):(this.el=e,this.overwrites=_e(t)),this.style=be(this.el,this.overwrites),this.font=$e(t,"font",null)||me(this.style,this.overwrites)}padding(){return this.el?Number.parseInt(this.style.paddingLeft||0,10)+Number.parseInt(this.style.paddingRight||0,10):0}parseArgs(e,t={},n={}){"object"==typeof e&&e&&(n=t,t=e||{},e=void 0);const s=le(le({},this.overwrites),_e(n)),r=$e(s,"white-space")||this.style.getPropertyValue("white-space");return t||(t={}),n||(t={}),{text:e=!e&&this.el?Ce(Se(this.el),r):ke(Ce(e,r)),options:t,overwrites:n,styles:s}}width(){const{text:e,options:t,overwrites:n,styles:s}=this.parseArgs(...[].slice.call(arguments));if(!e)return 0;const r=me(this.style,s),o=$e(s,"letter-spacing")||this.style.getPropertyValue("letter-spacing"),l=fe($e(s,"word-spacing")||this.style.getPropertyValue("word-spacing"),o),a=Oe(r),i=xe(e,this.style);return t.multiline?this.lines(i,t,n).reduce(((e,t)=>{const n=a.measureText(t).width+l(t);return Math.max(e,n)}),0):a.measureText(i).width+l(i)}height(){const{text:e,options:t,styles:n}=this.parseArgs(...[].slice.call(arguments)),s=Number.parseFloat($e(n,"line-height")||this.style.getPropertyValue("line-height"));return Math.ceil(this.lines(e,t,n).length*s||0)}lines(){const{text:e,options:t,overwrites:n,styles:s}=this.parseArgs(...[].slice.call(arguments)),r=me(this.style,s);let o=Number.parseInt($e(t,"width")||$e(n,"width"),10)||$e(this.el,"offsetWidth",0)||Number.parseInt($e(s,"width",0),10)||Number.parseInt(this.style.width,10);o-=this.padding();const l=$e(s,"word-break")||this.style.getPropertyValue("word-break"),a=$e(s,"letter-spacing")||this.style.getPropertyValue("letter-spacing"),i=$e(s,"word-spacing")||this.style.getPropertyValue("word-spacing"),c=Oe(r),u=xe(e,this.style);return"break-all"===l?Re({ctx:c,text:u,max:o,wordSpacing:i,letterSpacing:a}):Ie({ctx:c,text:u,max:o,wordSpacing:i,letterSpacing:a})}maxFontSize(){const{text:e,options:t,overwrites:n,styles:s}=this.parseArgs(...[].slice.call(arguments)),r=n=>Math.ceil(this.width(e,t,le(le({},s),{},{"font-size":n+"px"})));let o=Number.parseInt($e(t,"width")||$e(n,"width"),10)||$e(this.el,"offsetWidth",0)||Number.parseInt($e(s,"width",0),10)||Number.parseInt(this.style.width,10);o-=this.padding();let l=Math.floor(o/2),a=r(l);if(l=Math.floor(l/a*o),a=r(l),Math.ceil(a)===o)return l?l+"px":void 0;const i=a>o&&l>0;for(;a>o&&l>0;)l-=1,a=r(l);if(!i)for(;a<o;){if(a=r(l+1),a>o)return l?l+"px":void 0;l+=1}return l?l+"px":void 0}}le({},Ee);var Pe="_text_e2vs1_1";const Ae={text:({data:{value:e,rowResizeId:t},resize:n,resizeSignal:s,callbacks:r,defaultLinesCount:o})=>{var l;let a=t&&(null==(l=null==n?void 0:n.rows)?void 0:l[t])||o,i=null;return s.on((e=>{if(i&&t)if("preview"===e.state){const t=e.size,n=new Ne(i,{wordBreak:"break-all"}).lines(),s=i.scrollHeight/n.length,r=Math.ceil(t/s);i.style.webkitLineClamp=String(r)}else{const{onRowResize:e}=r,n=parseInt(i.style.webkitLineClamp,10);i.style.webkitLineClamp=n?String(n):"",e&&!isNaN(n)&&e(t,n)}})),B`<div
    ref=${e=>{i=e}}
    class=${Pe}
    style=${`-webkit-line-clamp: ${a}`}
  >
    ${e}
  </div>`},link:({data:{value:e}})=>B`<a target="blank" href="${e}">${e}</a>`,progress:({data:{value:e}})=>{const t=100*+e+"%";return B`<div class=${te}>
    <div class=${ne} style=${`width: ${t}`}></div>
    <div class=${se}>${t}</div>
  </div>`}};function ze({data:e,rowIndex:t,columnIndex:n,isRowHeader:s,isColumnHeader:r,meta:o,cellClasses:l,stickySide:a,mergeCells:i,resize:c,columnsOrder:u,callbacks:d,leftOffset:h,defaultLinesCount:p,controller:f}){var m;if(null==(m=o[t])?void 0:m[n])return[];const g=r||s,w=s&&i?null==e?void 0:e.span:void 0,y=r&&i?null==e?void 0:e.span:void 0,v=null==u?void 0:u[n],b=f.hasCollapseIcon(t,n);if(w)for(let I=1;I<w;++I){const e=o[t]||{};e[n+I]=!0,o[t]=e}if(y)for(let I=1;I<y;++I){const e=t+I,s=o[e]||{};s[n]=!0,o[e]=s}let C=e.styleAttribute||"";a&&r&&(C+=`;left: ${h}px; z-index: 1`);const x=[g?"header":"body"];e.styles&&x.push(...e.styles);const k=x.map((e=>l[e])).filter((e=>null!=e)).join(" "),S=Ae[e.type||"text"],$=new K,{onRowResize:_,onColumnResize:O}=d,H=f.isCollapsed(t,n);return B`<td
    class=${`${U} ${k}`}
    colspan=${w}
    rowspan=${y}
    style=${C}
    .dataset=${{column:n,row:t}}
  >
    <div class=${Z}>
      ${b?function({className:e,onClick:t,collapsed:n}){let s=`${e} ${Q}`;return n||(s+=` ${ee}`),B`<button class=${s} type="button" onclick=${t}>
    <svg viewBox="0 0 24 24" fill="currentcolor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
    </svg>
  </button>`}({className:l.collapse,collapsed:H,onClick:()=>f.setCollapsed({rowIndex:t,columnIndex:n,value:!H})}):null}
      ${S({data:e,resize:c,resizeSignal:$,callbacks:d,defaultLinesCount:p})}
    </div>
    ${!v||w&&1!==w||!O?null:B`<div
          class=${G}
          onmousedown=${e=>{const t=e.target.parentElement,n=null==t?void 0:t.clientWidth;q(e,{onDragMove:({deltaX:e})=>{t.style.width=`${n+e}px`},onDragEnd:({deltaX:e})=>{t.style.width="",O(v,n+e)}})}}
        ></div>`}
    ${e.rowResizeId&&_?B`<div
          class=${J}
          onmousedown=${e=>{const t=e.target.parentElement,n=getComputedStyle(t),s=parseInt(n.paddingTop)+parseInt(n.paddingBottom),r=null==t?void 0:t.clientHeight,o=r-s;q(e,{onDragMove:({deltaY:e})=>{t.style.height=`${r+e}px`,$.dispatch({state:"preview",size:o+e})},onDragEnd:()=>{t.style.height="",$.dispatch({state:"end"})}})}}
        ></div>`:null}
  </td>`}function Te(e,t=!1){return e?n=>{const s=function(e){let t=e.target;for(;t&&"TD"!==t.tagName&&t!==e.currentTarget;)t=t.parentElement;const{column:n,row:s}=(null==t?void 0:t.dataset)||{};if(n&&s){const e=parseInt(n,10);return{row:parseInt(s,10),column:e}}return null}(n);if(s){const{row:t,column:r}=s;e({row:t,column:r,event:n})}else t&&e({row:-1,column:-1,event:n})}:null}function Le({key:e,start:t,tableData:{values:n,headRowsCount:s,dataHeadColumnsCount:r,columnsOrder:o},cellClasses:l,stickySide:a,mergeCells:i,resize:c,callbacks:u,controller:d,hiddenRows:h,defaultLinesCount:p=2}){const f={};let m=[0];const g=function({onCellMouseOver:e,onCellMouseOut:t},n){return e||t?{mouseOver:Te((t=>{const{row:s,column:r}=t;n.hoverCell||(n.hoverCell={row:s,column:r},e&&e(t))})),mouseOut:Te((e=>{if(n.hoverCell){const{row:s,column:r}=e;s===n.hoverCell.row&&r===n.hoverCell.column||(t&&t(__assign(__assign({},n.hoverCell),{event:e.event})),n.hoverCell=null)}}),!0)}:{mouseOver:null,mouseOut:null}}(u,d);return B`
    <table
      class=${X}
      onclick=${Te(u.onCellClick)}
      onmousedown=${Te(u.onCellMouseDown)}
      onmouseup=${Te(u.onCellMouseUp)}
      oncontextmenu=${Te(u.onContextMenu)}
      onmouseover=${g.mouseOver}
      onmouseout=${g.mouseOut}
    >
      ${o.map(((e,t)=>{const n=c.columns[e]||150;return m[t+1]=m[t]+n,B`<col width=${n} />`}))}
      ${n.map(((n,g)=>{const w=t+g;return h.includes(w)?B`<tr />`:function({key:e,row:t,rowIndex:n,dataHeadColumnsCount:s,cell:r,columnsLeft:o}){return B.for(e,n.toString())`<tr
    data-rowIndex=${n}
  >
    ${t.flatMap(((e,t)=>ze(__assign(__assign({},r),{data:e,rowIndex:n,columnIndex:t,isColumnHeader:s>t,leftOffset:o[t]}))))}
  </tr>`}({key:e,row:n,rowIndex:w,dataHeadColumnsCount:r,columnsLeft:m,cell:{isRowHeader:s>w,meta:f,cellClasses:l,stickySide:a,mergeCells:i,resize:c,callbacks:u,columnsOrder:o,defaultLinesCount:p,controller:d}})}))}
    </table>
  `}const je=new Map;function De({className:e,table:t,target:n,minCellHeight:s=30,cellClasses:r={},callbacks:o={},stickyHeader:l,stickySide:a,mergeCells:i,resize:c={rows:{},columns:{}},defaultLinesCount:u,showCollapseIcons:d=!1}){const h=function({table:e,target:t,redraw:n,minCellHeight:s,stickyHeader:r,mergeCells:o,showCollapseIcons:l}){let a=je.get(t);if(null==a?void 0:a.containSameData(e))return a;a&&a.dispose();const i=new Y({data:e,onChange:n,minRowHeight:s,stickyHeader:r,mergeCells:o,showCollapseIcons:l});return je.set(t,i),i}({table:t,target:n,redraw:p,minCellHeight:s,stickyHeader:l,mergeCells:i,showCollapseIcons:d});function p(){const t=h.visibleTableData,s=t.headerRows?Le({key:h,start:0,tableData:{dataHeadColumnsCount:t.dataHeadColumnsCount,headRowsCount:t.headerRows.length,values:t.headerRows,resize:t.resize,columnsOrder:t.columnsOrder},cellClasses:r,stickySide:a,mergeCells:i,resize:c,callbacks:o,controller:h,hiddenRows:t.hiddenRows,defaultLinesCount:u}):null,l=Le({key:n,start:t.startRowIndex,tableData:t,cellClasses:r,stickySide:a,mergeCells:i,resize:c,callbacks:o,controller:h,hiddenRows:t.hiddenRows,defaultLinesCount:u});((e,t)=>{const n="function"==typeof t?t():t,s=M.get(e)||M.set(e,{stack:[],entry:null,wire:null}),r=n instanceof T?A(s,n):n;r!==s.wire&&(s.wire=r,e.textContent="",e.appendChild(r.valueOf()))})(n,function({content:e,headers:t,height:n,offset:s,onScroll:r,setContainerElement:o,className:l=""}){return B`
    <div
      class=${`${l} ${W}`}
      ref=${e=>{o(e)}}
      onscroll=${e=>{const{scrollLeft:t,scrollTop:n}=e.target;r(n,t)}}
      onwheel=${e=>{e.ctrlKey||e.stopPropagation()}}
    >
      <div style=${`height: ${n}px;`}>
        <div class=${F}>${t}</div>
        <div style=${`transform: translateY(${s}px)`}>${e}</div>
      </div>
    </div>
  `}({content:l,headers:s,height:t.contentHeight,offset:t.offset,onScroll:h.setScrollPosition,setContainerElement:h.setContainerElement,className:e}));const d=n.querySelectorAll("table"),p=s?d[0]:null,f=s?d[1]:d[0];function m(e,t){if(t){const n=[...t.children||[]].filter((e=>"TR"===e.tagName)).map((e=>e.clientHeight));h.setRowHeights(e,n)}}m(0,p),m(t.startRowIndex,f)}n.style.setProperty("--table-min-cell-height",`${s}px`),p()}e.ReactTable=({table:e,className:n,minCellHeight:r,cellClasses:o,resize:l,mergeCells:a=!0,stickyHeader:i=!0,stickySide:c=!0,callbacks:u,defaultLinesCount:d,showCollapseIcons:h})=>{const p=t.useRef(null);return t.useEffect((()=>{const t=p.current;De({table:e,target:t,minCellHeight:r,cellClasses:o,mergeCells:a,stickyHeader:i,stickySide:c,callbacks:u,resize:l,defaultLinesCount:d,showCollapseIcons:h})}),[e,r,o,a,i,c,u,l,d,h]),t.useEffect((()=>{const e=p.current;return()=>function(e){const t=je.get(e);t&&(t.dispose(),je.delete(e))}(e)}),[]),s.default.createElement("div",{ref:p,className:n})},Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module"}));
