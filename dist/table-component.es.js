var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,n=Object.getOwnPropertySymbols,s=Object.prototype.propertyIsEnumerable,r=(t,n,s)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s,o=(e,o)=>{for(var l in o||(o={}))t.call(o,l)&&r(e,l,o[l]);if(n)for(var l of n(o))s.call(o,l)&&r(e,l,o[l]);return e};import l,{useRef as a,useEffect as i}from"react";var c=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const u=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,d=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,h=/<[a-z][^>]+$/i,p=/>[^<>]*$/,f=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,m=/\s+$/,g=(e,t)=>0<t--&&(h.test(e[t])||!p.test(e[t])&&g(e,t)),w=(e,t,n)=>d.test(t)?e:`<${t}${n.replace(m,"")}></${t}>`;const{isArray:y}=Array,{indexOf:v,slice:b}=[],C=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;const x=(e,t)=>{let n,s=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(s=s.toLowerCase()),t=>{const r=y(t)?t:[t,!1];n!==r[0]&&(n&&e.removeEventListener(s,n,r[1]),(n=r[0])&&e.addEventListener(s,n,r[1]))}};
/*! (c) Andrea Giammarchi - ISC */
var k=function(e){var t="fragment",n="template",s="content"in o(n)?function(e){var t=o(n);return t.innerHTML=e,t.content}:function(e){var s=o(t),l=o(n),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var i=RegExp.$1;l.innerHTML="<table>"+e+"</table>",a=l.querySelectorAll(i)}else l.innerHTML=e,a=l.childNodes;return r(s,a),s};return function(e,t){return("svg"===t?l:s)(e)};function r(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function o(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function l(e){var n=o(t),s=o("div");return s.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",r(n,s.firstChild.childNodes),n}}(document);const $=({childNodes:e},t)=>e[t],S=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(v.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:H,importNode:I}=document,O=1!=I.length,R=O?(e,t,n)=>I.call(document,k(e,t,n),!0):k,E=O?e=>H.call(document,e,129,null,!1):e=>H.call(document,e,129),N=(e,t,n)=>((e,t,n,s,r)=>{const o=n.length;let l=t.length,a=o,i=0,c=0,u=null;for(;i<l||c<a;)if(l===i){const t=a<o?c?s(n[c-1],-0).nextSibling:s(n[a-c],0):r;for(;c<a;)e.insertBefore(s(n[c++],1),t)}else if(a===c)for(;i<l;)u&&u.has(t[i])||e.removeChild(s(t[i],-1)),i++;else if(t[i]===n[c])i++,c++;else if(t[l-1]===n[a-1])l--,a--;else if(t[i]===n[a-1]&&n[c]===t[l-1]){const r=s(t[--l],-1).nextSibling;e.insertBefore(s(n[c++],1),s(t[i++],-1).nextSibling),e.insertBefore(s(n[--a],1),r),t[l]=n[a]}else{if(!u){u=new Map;let e=c;for(;e<a;)u.set(n[e],e++)}if(u.has(t[i])){const r=u.get(t[i]);if(c<r&&r<a){let o=i,d=1;for(;++o<l&&o<a&&u.get(t[o])===r+d;)d++;if(d>r-c){const o=s(t[i],0);for(;c<r;)e.insertBefore(s(n[c++],1),o)}else e.replaceChild(s(n[c++],1),s(t[i++],-1))}else i++}else e.removeChild(s(t[i++],-1))}return n})(e.parentNode,t,n,C,e),_=(e,t)=>{switch(t[0]){case"?":return((e,t,n)=>s=>{n!==!!s&&((n=!!s)?e.setAttribute(t,""):e.removeAttribute(t))})(e,t.slice(1),!1);case".":return((e,t)=>"dataset"===t?(({dataset:e})=>t=>{for(const n in t){const s=t[n];null==s?delete e[n]:e[n]=s}})(e):n=>{e[t]=n})(e,t.slice(1));case"@":return x(e,"on"+t.slice(1));case"o":if("n"===t[1])return x(e,t)}switch(t){case"ref":return(e=>{let t;return n=>{t!==n&&(t=n,"function"==typeof n?n(e):n.current=e)}})(e);case"aria":return(e=>t=>{for(const n in t){const s="role"===n?n:`aria-${n}`,r=t[n];null==r?e.removeAttribute(s):e.setAttribute(s,r)}})(e)}return((e,t)=>{let n,s=!0;const r=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?s||(e.removeAttributeNode(r),s=!0):(r.value=t,s&&(e.setAttributeNodeNS(r),s=!1)))}})(e,t)};function A(e){const{type:t,path:n}=e,s=n.reduceRight($,this);return"node"===t?(e=>{let t,n,s=[];const r=o=>{switch(typeof o){case"string":case"number":case"boolean":t!==o&&(t=o,n||(n=document.createTextNode("")),n.data=o,s=N(e,s,[n]));break;case"object":case"undefined":if(null==o){t!=o&&(t=o,s=N(e,s,[]));break}if(y(o)){t=o,0===o.length?s=N(e,s,[]):"object"==typeof o[0]?s=N(e,s,o):r(String(o));break}t!==o&&"ELEMENT_NODE"in o&&(t=o,s=N(e,s,11===o.nodeType?b.call(o.childNodes):[o]));break;case"function":r(o(e))}};return r})(s):"attr"===t?_(s,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(s)}const z=c(new WeakMap),L=/^(?:plaintext|script|style|textarea|title|xmp)$/i,P=(e,t)=>{const n=((e,t,n)=>{const s=[],{length:r}=e;for(let l=1;l<r;l++){const n=e[l-1];s.push(u.test(n)&&g(e,l)?n.replace(u,((e,n,s)=>`${t}${l-1}=${s||'"'}${n}${s?"":'"'}`)):`${n}\x3c!--${t}${l-1}--\x3e`)}s.push(e[r-1]);const o=s.join("").trim();return n?o:o.replace(f,w)})(t,"isµ","svg"===e),s=R(n,e),r=E(s),o=[],l=t.length-1;let a=0,i=`isµ${a}`;for(;a<l;){const e=r.nextNode();if(!e)throw`bad template: ${n}`;if(8===e.nodeType)e.data===i&&(o.push({type:"node",path:S(e)}),i="isµ"+ ++a);else{for(;e.hasAttribute(i);)o.push({type:"attr",path:S(e),name:e.getAttribute(i)}),e.removeAttribute(i),i="isµ"+ ++a;L.test(e.tagName)&&e.textContent.trim()===`\x3c!--${i}--\x3e`&&(e.textContent="",o.push({type:"text",path:S(e)}),i="isµ"+ ++a)}}return{content:s,nodes:o}},T=(e,t)=>{const{content:n,nodes:s}=z.get(t)||z.set(t,P(e,t)),r=I.call(document,n,!0);return{content:r,updates:s.map(A,r)}},j=(e,{type:t,template:n,values:s})=>{const{length:r}=s;D(e,s,r);let{entry:o}=e;o&&o.template===n&&o.type===t||(e.entry=o=((e,t)=>{const{content:n,updates:s}=T(e,t);return{type:e,template:t,content:n,updates:s,wire:null}})(t,n));const{content:l,updates:a,wire:i}=o;for(let c=0;c<r;c++)a[c](s[c]);return i||(o.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const s=b.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:s[0],lastChild:s[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(s[t++])}return e}}})(l))},D=({stack:e},t,n)=>{for(let s=0;s<n;s++){const n=t[s];n instanceof M?t[s]=j(e[s]||(e[s]={stack:[],entry:null,wire:null}),n):y(n)?D(e[s]||(e[s]={stack:[],entry:null,wire:null}),n,n.length):e[s]=null}n<e.length&&e.splice(n)};function M(e,t,n){this.type=e,this.template=t,this.values=n}const{create:B,defineProperties:V}=Object,Y=e=>{const t=c(new WeakMap);return V(((t,...n)=>new M(e,t,n)),{for:{value(n,s){const r=t.get(n)||t.set(n,B(null));return r[s]||(r[s]=(o={stack:[],entry:null,wire:null},(t,...n)=>j(o,{type:e,template:t,values:n})));var o}},node:{value:(t,...n)=>j({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},W=c(new WeakMap),F=Y("html");Y("svg");var X=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var s,r,o;if(Array.isArray(t)){if((s=t.length)!=n.length)return!1;for(r=s;0!=r--;)if(!e(t[r],n[r]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((s=(o=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(r=s;0!=r--;)if(!Object.prototype.hasOwnProperty.call(n,o[r]))return!1;for(r=s;0!=r--;){var l=o[r];if(!e(t[l],n[l]))return!1}return!0}return t!=t&&n!=n};class K{constructor({data:e,onChange:t,minRowHeight:n,stickyHeader:s,mergeCells:r,showCollapseIcons:o=!1}){if(this.containerElement=null,this.areaHeight=0,this.additionalArea=0,this.collapseData={},this.collapseHeaders=[],this.lastDataSnapshot={dataHeadColumnsCount:0,headRowsCount:0,offset:0,startRowIndex:0,values:[],headerRows:[],columnsOrder:[],contentHeight:0,hiddenRows:[]},this.scrollTop=0,this.scrollLeft=0,this.setContainerElement=e=>{this.containerElement!==e&&(this.containerElement&&this.resizeObserver.unobserve(e),this.containerElement=e,this.resizeObserver.observe(e))},this.setScrollPosition=(e,t)=>{this.scrollLeft=t,this.scrollTop!==e&&(this.scrollTop=e,this.commit())},this.setAreaHeight=(e,t)=>{this.areaHeight=e,this.additionalArea=t,this.commit()},this.getCollapseKey=(e,t)=>`${e}:${t}`,this.isCollapsed=(e,t)=>!!this.collapseData[this.getCollapseKey(e,t)],this.hasCollapseIcon=(e,t)=>{var n,s,r;if(!this.showCollapseIcons||t>=this.data.dataHeadColumnsCount)return!1;if(e===this.data.headRowsCount-1)return!!(null==(n=this.collapseHeaders[t])?void 0:n.length);const o=null==(r=null==(s=this.data.values[e])?void 0:s[t])?void 0:r.span;return!!o&&o>1},this.setCollapsedImpl=({rowIndex:e,columnIndex:t,value:n})=>{if(e===this.data.headRowsCount-1){const e=this.collapseHeaders[t];e&&e.forEach((e=>{this.setCollapsedImpl({rowIndex:e,columnIndex:t,value:n})}))}const s=this.getCollapseKey(e,t);n?this.collapseData[s]=!0:delete this.collapseData[s],this.commit()},this.setCollapsed=({rowIndex:e,columnIndex:t,value:n})=>{this.setCollapsedImpl({rowIndex:e,columnIndex:t,value:n}),this.commit(!0)},this.data=e,this.rowHeights=new Array(e.values.length).fill(n),this.onChange=t,this.stickyHeader=s,this.mergeCells=r,this.showCollapseIcons=o,o&&r)for(let l=0;l<e.dataHeadColumnsCount-1;++l)this.collapseHeaders.push(this.getCellsWithCollapse(l));this.resizeObserver=new ResizeObserver((()=>{this.containerElement&&this.setAreaHeight(this.containerElement.clientHeight,.5*this.containerElement.clientHeight)}))}getContentHeight(e){return this.rowHeights.reduce(((t,n,s)=>e.includes(s)?t:t+n),0)+1}get visibleTableData(){return this.lastDataSnapshot}get hiddenRows(){var e,t;const n=[];for(const s of Object.keys(this.collapseData)){const[r,o]=s.split(":");if(r&&o){const s=parseInt(r,10),l=parseInt(o,10),a=null==(t=null==(e=this.data.values[s])?void 0:e[l])?void 0:t.span;if(a)for(let e=1;e<a;++e)n.push(s+e)}}return n}getCellsWithCollapse(e){var t;const n=[],s=this.data.values;for(let r=0;r<s.length;++r){const o=null==(t=s[r])?void 0:t[e];o.span&&o.span>1&&(n.push(r),r+=o.span-1)}return n}getRowInfo(e,t){var n;if(t.includes(e))return{span:1,height:0};if(!this.mergeCells||t.includes(e+1))return{span:1,height:this.rowHeights[e]};const s=null==(n=this.data.values[e])?void 0:n[0];if(!s)return{span:0,height:0};const r=s.span||1;return{span:r,height:this.rowHeights.slice(e,e+r).reduce(((e,t)=>e+t),0)}}commit(e=!1){let t=0,n=0,s=this.areaHeight,r=0;const o=this.hiddenRows,l=this.getContentHeight(o);this.stickyHeader&&(n=this.data.headRowsCount,s-=this.rowHeights.slice(0,n).reduce(((e,t)=>e+t),0));const a=Math.max(0,this.scrollTop-this.additionalArea),i=this.scrollTop+s+this.additionalArea;let c=this.getRowInfo(n,o);for(;c.height+t<a;)t+=c.height,n+=c.span,c=this.getRowInfo(n,o);let u=n;for(c=this.getRowInfo(u,o);r+t<i&&u<this.data.values.length;)r+=c.height,u+=c.span,c=this.getRowInfo(u,o);(e||this.lastDataSnapshot.startRowIndex!==n||this.lastDataSnapshot.values.length+this.lastDataSnapshot.startRowIndex!==u||this.lastDataSnapshot.contentHeight!==l)&&(this.lastDataSnapshot={startRowIndex:n,offset:t,dataHeadColumnsCount:this.data.dataHeadColumnsCount,headRowsCount:this.stickyHeader?0:this.data.headRowsCount,values:this.data.values.slice(n,u),headerRows:this.stickyHeader?this.data.values.slice(0,this.data.headRowsCount):null,columnsOrder:this.data.columnsOrder,contentHeight:l,hiddenRows:o},this.onChange())}containSameData(e){return X(this.data,e)}setRowHeights(e,t){for(let n=0;n<t.length;++n){const s=t[n];s&&(this.rowHeights[e+n]=s)}}dispose(){this.resizeObserver.disconnect()}}var q="_container_mzagm_1",U="_stickyHeader_mzagm_10";var Z="_table_ldtm3_1";class G{constructor(){this.listeners=[]}on(e){this.listeners.push(e)}dispatch(e){this.listeners.forEach((t=>t(e)))}}function J(e,{onDragMove:t,onDragEnd:n},s=1){const r=e.screenX,o=e.screenY;function l(e){t({deltaX:(e.screenX-r)/s,deltaY:(e.screenY-o)/s})}window.document.body.style.userSelect="none",document.addEventListener("mousemove",l),document.addEventListener("mouseup",(function e(t){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",e),n({deltaX:(t.screenX-r)/s,deltaY:(t.screenY-o)/s}),window.document.body.style.userSelect=""}))}var Q="_cell_l4u9f_1",ee="_cellContainer_l4u9f_11",te="_columnResizer_l4u9f_18",ne="_rowResizer_l4u9f_28";var se="_collapseIcon_14dbr_1",re="_expanded_14dbr_7";var oe="_container_1bk8e_1",le="_progress_1bk8e_12",ae="_label_1bk8e_19";function ie(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ce(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function ue(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ce(Object(n),!0).forEach((function(t){ie(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ce(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const de=new Set(["—"]),he=new Set(["­"]),pe=new Set([" "," "," "," "," "," "," "," "," "," "," "," "," ","　","\t","​","\u2028","\u2029"]),fe=new Set(["֊","‐","‒","–","־","་","፡","៘","៚","‧","|","᛫","᛬","᛭","⁖","⁘","⁙","⁚","⁛","⁝","⁞","⸙","⸪","⸫","⸬","⸭","⸰","တ0","တ1","တ2","္F","ွ0","႑F","ቇ0"]),me=new Set(["´","´"]),ge=new Set(["\n"]);function we(e,t){t||(t={});const n=Number.parseInt(Re(t,"base-font-size",16),10),s=Number.parseFloat(e),r=e.replace(s,"");switch(r){case"rem":case"em":return s*n;case"pt":return s*(96/72);case"px":return s}throw new Error("The unit "+r+" is not supported")}function ye(e,t){const n=new Set(["inherit","initial","unset","normal"]);let s=0;e&&!n.has(e)&&(s=we(e));let r=0;return t&&!n.has(t)&&(r=we(t)),e=>(e.trim().replace(/\s+/gi," ").split(" ").length-1)*s+e.length*r}function ve(e,t){const n=[],s=Re(t,"font-weight",e.getPropertyValue("font-weight"))||"400";["normal","bold","bolder","lighter","100","200","300","400","500","600","700","800","900"].includes(s.toString())&&n.push(s);const r=Re(t,"font-style",e.getPropertyValue("font-style"));["normal","italic","oblique"].includes(r)&&n.push(r);const o=Re(t,"font-variant",e.getPropertyValue("font-variant"));["normal","small-caps"].includes(o)&&n.push(o);const l=we(Re(t,"font-size",e.getPropertyValue("font-size"))||"16px");n.push(l+"px");const a=Re(t,"font-family",e.getPropertyValue("font-family"))||"Helvetica, Arial, sans-serif";return n.push(a),n.join(" ")}function be(e){return e&&"function"==typeof e.getPropertyValue}function Ce(e){return xe(e)&&e.style&&"undefined"!=typeof window&&"function"==typeof window.getComputedStyle}function xe(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:Boolean(e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)}function ke(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function $e(e,t){const n=ue({},t||{}),{style:s}=n;return t||(t={}),be(s)?s:Ce(e)?window.getComputedStyle(e,Re(t,"pseudoElt",null)):{getPropertyValue:e=>Re(t,e)}}function Se(e,t){switch(t){case"pre":case"pre-wrap":return e;case"pre-line":return(e||"").replace(/\s+/gm," ").trim();default:return(e||"").replace(/[\r\n]/gm," ").replace(/\s+/gm," ").trim()}}function He(e,t){switch(t.getPropertyValue("text-transform")){case"uppercase":return e.toUpperCase();case"lowercase":return e.toLowerCase();default:return e}}function Ie(e){return e=(e||"").replace(/<wbr>/gi,"​").replace(/<br\s*\/?>/gi,"\n").replace(/&shy;/gi,"­").replace(/&mdash;/gi,"—"),/&#(\d+)(;?)|&#[xX]([a-fA-F\d]+)(;?)|&([\da-zA-Z]+);/g.test(e)&&console&&console.error("text-metrics: Found encoded htmlenties. You may want to use https://mths.be/he to decode your text first."),e}function Oe(e){return e&&(e.textContent||e.textContent)||""}function Re(e,t,n){return e&&void 0!==e[t]&&e[t]||n}function Ee(e){const t={};for(const n of Object.keys(e||{}))t[n.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase()))]=e[n];return t}function Ne(e){try{const t=document.createElement("canvas").getContext("2d"),n=window.devicePixelRatio||1,s=t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return t.font=e,t.setTransform(n/s,0,0,n/s,0,0),t}catch(t){throw new Error("Canvas support required"+t.message)}}function _e(e){return(de.has(e)?"B2":pe.has(e)&&"BAI")||he.has(e)&&"SHY"||fe.has(e)&&"BA"||me.has(e)&&"BB"||ge.has(e)&&"BK"}function Ae({ctx:e,text:t,max:n,wordSpacing:s,letterSpacing:r}){const o=ye(s,r),l=[],a=[],i=[];let c="",u="";if(!t)return[];for(const d of t){const e=_e(d);""===u&&"BAI"===e||(e?(i.push({chr:d,type:e}),a.push(u),u=""):u+=d)}u&&a.push(u);for(const[d,h]of a.entries()){if(0===d){c=h;continue}const t=i[d-1],s="SHY"===t.type?"":t.chr;if("BK"===t.type){l.push(c),c=h;continue}const r=e.measureText(c+s+h).width+o(c+s+h);if(Math.round(r,10)<=n)c+=s+h;else switch(t.type){case"SHY":l.push(c+"-"),c=h;break;case"BA":l.push(c+s),c=h;break;case"BAI":l.push(c),c=h;break;case"BB":l.push(c),c=s+h;break;case"B2":Number.parseInt(e.measureText(c+s).width+o(c+s),10)<=n?(l.push(c+s),c=h):Number.parseInt(e.measureText(s+h).width+o(s+h),10)<=n?(l.push(c),c=s+h):(l.push(c,s),c=h);break;default:throw new Error("Undefoined break")}}return[...c].length>0&&l.push(c),l}function ze({ctx:e,text:t,max:n,wordSpacing:s,letterSpacing:r}){const o=ye(s,r),l=[];let a="",i=0;if(!t)return[];for(const c of t){const s=_e(c);if("BK"===s){l.push(a),a="";continue}const r=a.length;if(pe.has(c)&&(0===r||pe.has(a[r-1])))continue;let u=e.measureText(a+c).width+o(a+c),d=Math.ceil(u);if("SHY"===s){const n=t[i+1]||"";u=e.measureText(a+c+n).width+o(a+c+n),d=Math.ceil(u)}if(d>n&&[...a].length>0)switch(s){case"SHY":l.push(a+"-"),a="";break;case"BA":l.push(a+c),a="";break;case"BAI":l.push(a),a="";break;default:l.push(a),a=c}else"­"!==c&&(a+=c);i++}return[...a].length>0&&l.push(a),l}var Le={__proto__:null,addWordAndLetterSpacing:ye,getFont:ve,isCSSStyleDeclaration:be,canGetComputedStyle:Ce,isElement:xe,isObject:ke,getStyle:$e,normalizeWhitespace:Se,getStyledText:He,prepareText:Ie,getText:Oe,prop:Re,normalizeOptions:Ee,getContext2d:Ne,computeLinesDefault:Ae,computeLinesBreakAll:ze};class Pe{constructor(e,t={}){!xe(e)&&ke(e)?(this.el=void 0,this.overwrites=Ee(e)):(this.el=e,this.overwrites=Ee(t)),this.style=$e(this.el,this.overwrites),this.font=Re(t,"font",null)||ve(this.style,this.overwrites)}padding(){return this.el?Number.parseInt(this.style.paddingLeft||0,10)+Number.parseInt(this.style.paddingRight||0,10):0}parseArgs(e,t={},n={}){"object"==typeof e&&e&&(n=t,t=e||{},e=void 0);const s=ue(ue({},this.overwrites),Ee(n)),r=Re(s,"white-space")||this.style.getPropertyValue("white-space");return t||(t={}),n||(t={}),{text:e=!e&&this.el?Se(Oe(this.el),r):Ie(Se(e,r)),options:t,overwrites:n,styles:s}}width(){const{text:e,options:t,overwrites:n,styles:s}=this.parseArgs(...[].slice.call(arguments));if(!e)return 0;const r=ve(this.style,s),o=Re(s,"letter-spacing")||this.style.getPropertyValue("letter-spacing"),l=ye(Re(s,"word-spacing")||this.style.getPropertyValue("word-spacing"),o),a=Ne(r),i=He(e,this.style);return t.multiline?this.lines(i,t,n).reduce(((e,t)=>{const n=a.measureText(t).width+l(t);return Math.max(e,n)}),0):a.measureText(i).width+l(i)}height(){const{text:e,options:t,styles:n}=this.parseArgs(...[].slice.call(arguments)),s=Number.parseFloat(Re(n,"line-height")||this.style.getPropertyValue("line-height"));return Math.ceil(this.lines(e,t,n).length*s||0)}lines(){const{text:e,options:t,overwrites:n,styles:s}=this.parseArgs(...[].slice.call(arguments)),r=ve(this.style,s);let o=Number.parseInt(Re(t,"width")||Re(n,"width"),10)||Re(this.el,"offsetWidth",0)||Number.parseInt(Re(s,"width",0),10)||Number.parseInt(this.style.width,10);o-=this.padding();const l=Re(s,"word-break")||this.style.getPropertyValue("word-break"),a=Re(s,"letter-spacing")||this.style.getPropertyValue("letter-spacing"),i=Re(s,"word-spacing")||this.style.getPropertyValue("word-spacing"),c=Ne(r),u=He(e,this.style);return"break-all"===l?ze({ctx:c,text:u,max:o,wordSpacing:i,letterSpacing:a}):Ae({ctx:c,text:u,max:o,wordSpacing:i,letterSpacing:a})}maxFontSize(){const{text:e,options:t,overwrites:n,styles:s}=this.parseArgs(...[].slice.call(arguments)),r=n=>Math.ceil(this.width(e,t,ue(ue({},s),{},{"font-size":n+"px"})));let o=Number.parseInt(Re(t,"width")||Re(n,"width"),10)||Re(this.el,"offsetWidth",0)||Number.parseInt(Re(s,"width",0),10)||Number.parseInt(this.style.width,10);o-=this.padding();let l=Math.floor(o/2),a=r(l);if(l=Math.floor(l/a*o),a=r(l),Math.ceil(a)===o)return l?l+"px":void 0;const i=a>o&&l>0;for(;a>o&&l>0;)l-=1,a=r(l);if(!i)for(;a<o;){if(a=r(l+1),a>o)return l?l+"px":void 0;l+=1}return l?l+"px":void 0}}ue({},Le);var Te="_text_e2vs1_1";const je={text:({data:{value:e,rowResizeId:t},resize:n,resizeSignal:s,callbacks:r,defaultLinesCount:o})=>{var l;let a=t&&(null==(l=null==n?void 0:n.rows)?void 0:l[t])||o,i=null;return s.on((e=>{if(i&&t)if("preview"===e.state){const t=e.size,n=new Pe(i,{wordBreak:"break-all"}).lines(),s=i.scrollHeight/n.length,r=Math.ceil(t/s);i.style.webkitLineClamp=String(r)}else{const{onRowResize:e}=r,n=parseInt(i.style.webkitLineClamp,10);i.style.webkitLineClamp=n?String(n):"",e&&!isNaN(n)&&e(t,n)}})),F`<div
    ref=${e=>{i=e}}
    class=${Te}
    style=${`-webkit-line-clamp: ${a}`}
  >
    ${e}
  </div>`},link:({data:{value:e}})=>F`<a target="blank" href="${e}">${e}</a>`,progress:({data:{value:e}})=>{const t=100*+e+"%";return F`<div class=${oe}>
    <div class=${le} style=${`width: ${t}`}></div>
    <div class=${ae}>${t}</div>
  </div>`}};function De({data:e,rowIndex:t,columnIndex:n,isRowHeader:s,isColumnHeader:r,meta:o,cellClasses:l,stickySide:a,mergeCells:i,resize:c,columnsOrder:u,callbacks:d,leftOffset:h,defaultLinesCount:p,controller:f}){var m;if(null==(m=o[t])?void 0:m[n])return[];const g=r||s,w=s&&i?null==e?void 0:e.span:void 0,y=r&&i?null==e?void 0:e.span:void 0,v=null==u?void 0:u[n],b=f.hasCollapseIcon(t,n);if(w)for(let R=1;R<w;++R){const e=o[t]||{};e[n+R]=!0,o[t]=e}if(y)for(let R=1;R<y;++R){const e=t+R,s=o[e]||{};s[n]=!0,o[e]=s}let C="";a&&r&&(C=`left: ${h}px; z-index: 1`);const x=[g?"header":"body"];e.styles&&x.push(...e.styles);const k=x.map((e=>l[e])).filter((e=>null!=e)).join(" "),$=je[e.type||"text"],S=new G,{onRowResize:H,onColumnResize:I}=d,O=f.isCollapsed(t,n);return F`<td
    class=${`${Q} ${k}`}
    colspan=${w}
    rowspan=${y}
    style=${C}
    .dataset=${{column:n,row:t}}
  >
    <div class=${ee}>
      ${b?function({className:e,onClick:t,collapsed:n}){let s=`${e} ${se}`;return n||(s+=` ${re}`),F`<button class=${s} onclick=${t}>></button>`}({className:"",collapsed:O,onClick:()=>f.setCollapsed({rowIndex:t,columnIndex:n,value:!O})}):null}
      ${$({data:e,resize:c,resizeSignal:S,callbacks:d,defaultLinesCount:p})}
    </div>
    ${!v||w&&1!==w||!I?null:F`<div
          class=${te}
          onmousedown=${e=>{const t=e.target.parentElement,n=null==t?void 0:t.clientWidth;J(e,{onDragMove:({deltaX:e})=>{t.style.width=`${n+e}px`},onDragEnd:({deltaX:e})=>{t.style.width="",I(v,n+e)}})}}
        ></div>`}
    ${e.rowResizeId&&H?F`<div
          class=${ne}
          onmousedown=${e=>{const t=e.target.parentElement,n=getComputedStyle(t),s=parseInt(n.paddingTop)+parseInt(n.paddingBottom),r=null==t?void 0:t.clientHeight,o=r-s;J(e,{onDragMove:({deltaY:e})=>{t.style.height=`${r+e}px`,S.dispatch({state:"preview",size:o+e})},onDragEnd:()=>{t.style.height="",S.dispatch({state:"end"})}})}}
        ></div>`:null}
  </td>`}function Me(e){return e?t=>{const n=function(e){let t=e.target;for(;t&&"TD"!==t.tagName&&t!==e.currentTarget;)t=t.parentElement;const{column:n,row:s}=(null==t?void 0:t.dataset)||{};if(n&&s){const e=parseInt(n,10);return{row:parseInt(s,10),column:e}}return null}(t);if(n){const{row:s,column:r}=n;e({row:s,column:r,event:t})}}:null}function Be({key:e,start:t,tableData:{values:n,headRowsCount:s,dataHeadColumnsCount:r,columnsOrder:l},cellClasses:a,stickySide:i,mergeCells:c,resize:u,callbacks:d,controller:h,hiddenRows:p,defaultLinesCount:f=2}){const m={};let g=[0];const w=function({onMouseOver:e,onMouseOut:t}){let n=null;return{mouseOver:e?Me((t=>{const{row:s,column:r}=t;n||(n={row:s,column:r},e(t))})):null,mouseOut:t?Me((e=>{if(n){const{row:s,column:r}=e;s===n.row&&r===n.column||(t(o(o({},n),{event:e.event})),n=null)}})):null}}(d);return F`
    <table
      class=${Z}
      onclick=${Me(d.onCellClick)}
      oncontextmenu=${Me(d.onContextMenu)}
      onmouseover=${w.mouseOver}
      onmouseout=${w.mouseOut}
    >
      ${l.map(((e,t)=>{const n=u.columns[e]||150;return g[t+1]=g[t]+n,F`<col width=${n} />`}))}
      ${n.map(((n,w)=>{const y=t+w;return p.includes(y)?F`<tr />`:function({key:e,row:t,rowIndex:n,dataHeadColumnsCount:s,cell:r,columnsLeft:l}){return F.for(e,n.toString())`<tr
    data-rowIndex=${n}
  >
    ${t.flatMap(((e,t)=>De(o(o({},r),{data:e,rowIndex:n,columnIndex:t,isColumnHeader:s>t,leftOffset:l[t]}))))}
  </tr>`}({key:e,row:n,rowIndex:y,dataHeadColumnsCount:r,columnsLeft:g,cell:{isRowHeader:s>y,meta:m,cellClasses:a,stickySide:i,mergeCells:c,resize:u,callbacks:d,columnsOrder:l,defaultLinesCount:f,controller:h}})}))}
    </table>
  `}const Ve=new Map;function Ye({className:e,table:t,target:n,minCellHeight:s=30,cellClasses:r={},callbacks:o={},stickyHeader:l,stickySide:a,mergeCells:i,resize:c={rows:{},columns:{}},defaultLinesCount:u,showCollapseIcons:d=!1}){const h=function({table:e,target:t,redraw:n,minCellHeight:s,stickyHeader:r,mergeCells:o,showCollapseIcons:l}){let a=Ve.get(t);if(null==a?void 0:a.containSameData(e))return a;a&&a.dispose();const i=new K({data:e,onChange:n,minRowHeight:s,stickyHeader:r,mergeCells:o,showCollapseIcons:l});return Ve.set(t,i),i}({table:t,target:n,redraw:p,minCellHeight:s,stickyHeader:l,mergeCells:i,showCollapseIcons:d});function p(){const t=h.visibleTableData,s=t.headerRows?Be({key:h,start:0,tableData:{dataHeadColumnsCount:t.dataHeadColumnsCount,headRowsCount:t.headerRows.length,values:t.headerRows,resize:t.resize,columnsOrder:t.columnsOrder},cellClasses:r,stickySide:a,mergeCells:i,resize:c,callbacks:o,controller:h,hiddenRows:t.hiddenRows,defaultLinesCount:u}):null,l=Be({key:n,start:t.startRowIndex,tableData:t,cellClasses:r,stickySide:a,mergeCells:i,resize:c,callbacks:o,controller:h,hiddenRows:t.hiddenRows,defaultLinesCount:u});((e,t)=>{const n="function"==typeof t?t():t,s=W.get(e)||W.set(e,{stack:[],entry:null,wire:null}),r=n instanceof M?j(s,n):n;r!==s.wire&&(s.wire=r,e.textContent="",e.appendChild(r.valueOf()))})(n,function({content:e,headers:t,height:n,offset:s,onScroll:r,setContainerElement:o,className:l=""}){return F`
    <div
      class=${`${l} ${q}`}
      ref=${e=>{o(e)}}
      onscroll=${e=>{const{scrollLeft:t,scrollTop:n}=e.target;r(n,t)}}
      onwheel=${e=>{e.ctrlKey||e.stopPropagation()}}
    >
      <div style=${`height: ${n}px;`}>
        <div class=${U}>${t}</div>
        <div style=${`transform: translateY(${s}px)`}>${e}</div>
      </div>
    </div>
  `}({content:l,headers:s,height:t.contentHeight,offset:t.offset,onScroll:h.setScrollPosition,setContainerElement:h.setContainerElement,className:e}));const d=n.querySelectorAll("table"),p=s?d[0]:null,f=s?d[1]:d[0];function m(e,t){if(t){const n=[...t.children||[]].filter((e=>"TR"===e.tagName)).map((e=>e.clientHeight));h.setRowHeights(e,n)}}m(0,p),m(t.startRowIndex,f)}n.style.setProperty("--table-min-cell-height",`${s}px`),p()}const We=({table:e,className:t,minCellHeight:n,cellClasses:s,resize:r,mergeCells:o=!0,stickyHeader:c=!0,stickySide:u=!0,callbacks:d,defaultLinesCount:h,showCollapseIcons:p})=>{const f=a(null);return i((()=>{const t=f.current;Ye({table:e,target:t,minCellHeight:n,cellClasses:s,mergeCells:o,stickyHeader:c,stickySide:u,callbacks:d,resize:r,defaultLinesCount:h,showCollapseIcons:p})}),[e,n,s,o,c,u,d,r,h,p]),i((()=>{const e=f.current;return()=>function(e){const t=Ve.get(e);t&&(t.dispose(),Ve.delete(e))}(e)}),[]),l.createElement("div",{ref:f,className:t})};export{We as ReactTable};
