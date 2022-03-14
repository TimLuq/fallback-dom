!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).fallbackDom={})}(this,(function(t){"use strict";function e(t,e){return o(t,function(t){t=t.trim();const e=[];let r=null;do{let i="";if(r){const n=t.match(/^\s*(>|\+|~|,| )\s*/);if(!n)throw Error("Unable to parse joiner at "+JSON.stringify(t));i=n[1],t=t.substring(n[0].length),","==i&&(e.push(r),r=null,i="")}if(!t)throw Error("unable to parse the empty string as a selector");const s=n(t),o=s[0];r&&(o.p=[i,r]),r=o,t=s[1]}while(t);return e.push(r),e}(e))}function n(t){const e={};{const n=t.match(/^[\p{L}_][0-9\p{L}_-]*/u);n?(e.t=n[0],t=t.substring(n[0].length)):t.startsWith("*")&&(e.t=void 0,t=t.substring(1))}for(;t;){if(t.startsWith("#")){const n=t.match(/^#[\p{L}_][0-9\p{L}_-]*/u);if(n){const r=n[0].substring(1);if(e.i&&e.i!=r)throw Error("selector will always fail, elements can't contain multiple ids");e.i=r,t=t.substring(n[0].length);continue}throw Error("invalid id at "+JSON.stringify(t))}if(t.startsWith(".")){const n=t.match(/^\.[\p{L}_][0-9\p{L}_-]*/u);if(n){e.c||(e.c=new Set),e.c.add(n[0].substring(1)),t=t.substring(n[0].length);continue}throw Error("invalid class at "+JSON.stringify(t))}if(t.startsWith("[")){const n=r(t=t.substring(1)),i=n[0].n;if(e.a){const t=e.a.get(i);e.a.set(i,l(t,n[0].v))}else{const t=new Map,r=n[0].v;t.set(i,void 0===r?null:"string"==typeof r?r:[r]),e.a=t}if((t=n[1]).startsWith("]")){t=t.substring(1);continue}throw Error("unexpected characters in attribute section: "+JSON.stringify(t))}}if(Object.keys(e).length)return[e,t];throw Error("unexpected part at "+JSON.stringify(t))}function r(t){const e=t.match(/^[\p{L}_][0-9\p{L}._-]*/u);if(!e)throw Error("expected attribute name, found "+JSON.stringify(t));const n={n:e[0]};let r;if((t=t.substring(e[0].length)).startsWith("=")?(r="=",t=t.substring(1)):t.startsWith("*=")?(r="*",t=t.substring(2)):t.startsWith("~=")?(r="~",t=t.substring(2)):t.startsWith("|=")?(r="|",t=t.substring(2)):t.startsWith("$=")?(r="$",t=t.substring(2)):t.startsWith("^=")&&(r="^",t=t.substring(2)),r){const e=function(t){if(t.startsWith('"')){const e=t.indexOf('"',1);if(-1!=e)return[t.substring(1,e),t.substring(e+1)];throw Error("no end of string at "+JSON.stringify(t))}const e=t.match(/^[\d\p{L}._-]+/u);if(e)return[e[0],t.substring(e[0].length)];throw Error("unexpected unquoted data at "+JSON.stringify(t))}(t);t=e[1];const s=e[0];"="==r?n.v=s:"*"==r?n.v=t=>t.includes(s):"|"==r?n.v=t=>t==s||t.startsWith(s+"-"):"^"==r?n.v=t=>t.startsWith(s):"$"==r?n.v=t=>t.endsWith(s):"~"==r&&(n.v=t=>i(t,s))}if(t.startsWith("]"))return[n,t.substring(1)];throw Error("expected end of attribute section but found "+JSON.stringify(t))}function i(t,e){let n=0;for(;n!=t.length;){const r=t.indexOf(" ",n+1),i=-1==r?t.length:r;if(i-n==e.length&&t.substring(n,i)==e)return!0;n=i}return!1}function s(t,e,n){t:for(const r of e)if(!r.t||r.t==n.localName){if(r.i){if("function"!=typeof n.getAttribute)continue t;const t=n.getAttribute("id");if(!t||t!=r.i)continue t}if(r.c){if("function"!=typeof n.getAttribute)continue t;const t=n.getAttribute("class");if(!t)continue t;for(const e of r.c)if(!i(t,e))continue t}if(r.a){if("function"!=typeof n.getAttribute)continue t;for(const[t,e]of r.a){const r=n.getAttribute(t);if(!r)continue t;if("string"==typeof e){if(r==e)continue;continue t}if(e)for(const t of e)if(!t(r))continue t}}if(r.p){const e=r.p[0];if("+"==e){const e=n.previousSibling;if(!e)continue t;if(!s(t,[r.p[1]],e))continue t}else if("~"==e){let e=n.previousSibling,i=!1;const o=[r.p[1]];for(;!i&&e;)i=s(t,o,e),e=e.previousSibling;if(!i)continue t}else if(">"==e){const e=n.parentNode;if(!e)continue t;if(!s(t,[r.p[1]],e))continue t}else if(" "==e){let e=n.parentNode,i=!1;const o=[r.p[1]];for(;!i&&e;)i=s(t,o,e),e=e.parentNode;if(!i)continue t}}return!0}return!1}function*o(t,e){const n=t.childNodes;if(n)for(const r of n)1==r.nodeType&&(s(t,e,r)&&(yield r),yield*o(r,e))}function l(t,e){if(void 0===e)return void 0!==t?t:null;if("string"==typeof e){if(null==t)return e;if("string"==typeof t){if(t==e)return t}else{let n=!1;for(const r of t)r(e)||(n=!0);if(!n)return e}}else{if(null==t)return[e];if("string"!=typeof t)return t.push(e),t;if(e(t))return t}throw Error("no possible attribute could ever match")}var u,c,a,h,f,p;const d=Symbol("definedTag"),g=Symbol("customElements"),b=Symbol("document"),m=Symbol("tagName"),y=Symbol("reg"),w=Symbol("con"),v=Symbol("when");class S{constructor(){this[u]=new Map,this[c]=new Map,this[a]=new Map}define(t,e){const n=this[y];if(n.has(t))throw Error("element "+JSON.stringify(t)+" has already been defined");const r=e.prototype;let i=r;for(;i&&i!==k.prototype;)i=Object.getPrototypeOf(i);if(!i)throw Error("the constructor of element "+JSON.stringify(t)+" is not a decendant of the right kind of Element class");const s=this[w];if(k==e||s.has(e))throw Error("the prototype of element "+JSON.stringify(t)+" must be unique");n.set(t,e),s.set(e,t),r[m]=t;const o=this[v].get(t);if(o){this[v].delete(t);for(const t of o)t(e)}}upgrade(t){const e=this[y],n=t.tagName,r=e.get(n);if(!r)return;const i=Object.getPrototypeOf(t);if(i===k.prototype)try{Object.setPrototypeOf(t,r.prototype),r.call(t)}catch(e){throw Object.setPrototypeOf(t,i),e}}whenDefined(t){const e=this[y].get(t);if(e)return Promise.resolve(e);let n=this[v].get(t);n||(n=[],this[v].set(t,n));const r=n;return new Promise((t=>r.push(t)))}get(t){return this[y].get(t)}[(u=y,c=w,a=v,d)](t){return this[w].get(t)}}const x=Symbol("parent"),E=Symbol("previousSibling"),N=Symbol("nextSibling");class C{constructor(){if(this[h]=null,this[f]=null,this[p]=null,void 0===this[b])throw Error("a node must be created by a document")}get parentNode(){return this[x]}get previousSibling(){return this[E]}get nextSibling(){return this[N]}get ownerDocument(){return this[b]}unsafeSetParent(t){this[x]=t}unsafeReplaceParent(t){const e=this[x];e&&e.removeChild(this),this[x]=t}unsafeSetPrev(t){this[E]=t,t&&(t[N]=this)}unsafeSetNext(t){this[N]=t,t&&(t[E]=this)}}h=x,f=E,p=N;const O=Symbol("childNodes"),T=Symbol("children");class j extends C{constructor(){super()}get textContent(){const t=this[O];return t?t.reduce(((t,e)=>{const n=e.nodeType;return 1==n||3==n||4==n?t+e.textContent:t}),""):""}set textContent(t){t=t.toString();const e=this[O]=[];this[T]=[],t&&e.push(this.ownerDocument.createTextNode(t))}hasChildNodes(){const t=this[O];return!!t&&0!=t.length}get childNodes(){const t=this[O];return t?t.slice():[]}get childElementCount(){const t=this[T];return t?t.length:0}get children(){const t=this[T];return t?t.slice():[]}get firstElementChild(){return this[T]?.[0]||null}get lastElementChild(){const t=this[T];if(!t)return null;const e=t?t.length:0;return e?t[e-1]:null}get firstChild(){return this[O]?.[0]||null}get lastChild(){const t=this[O];if(!t)return null;const e=t.length;return e?t[e-1]:null}append(...t){for(const e of t){const t="string"==typeof e?this.ownerDocument.createTextNode(e):"object"==typeof e&&e instanceof C?e:void 0;if(void 0===t)throw new TypeError("unsupported input type");this.insertBefore(t,null)}}prepend(...t){let e=this[O];e||(e=[],this[O]=e);const n=e[0]||null;for(const e of t){const t="string"==typeof e?this.ownerDocument.createTextNode(e):"object"==typeof e&&e instanceof C?e:void 0;if(void 0===t)throw new TypeError("unsupported input type");this.insertBefore(t,n)}}querySelector(t){return e(this,t).next().value||null}querySelectorAll(t){return Array.from(e(this,t))}replaceChildren(...t){let e=this[O];if(e){if(e.length){let t=this[T];t?t.length=0:(t=[],this[T]=t);const n=e.slice();e.length=0;for(const t of n)t.unsafeSetParent(null),t.unsafeSetPrev(null),t.unsafeSetNext(null)}}else e=[],this[O]=e;t.length&&this.append(...t)}insertBefore(t,e){if(t.ownerDocument!=this.ownerDocument){if(9!=this.nodeType)throw Error("owner document mismatch");if(t.ownerDocument!=this){if(10!=t.nodeType||null!=t.ownerDocument)throw Error("owner document mismatch while inserting to the root");t[b]=this}}if(t.parentNode==this){if(e==t||e==t.nextSibling)return t;this.removeChild(t)}let n=this[O];n||(n=[],this[O]=n);let r=this[T];r||(r=[],this[T]=r);let i=n.length,s=r.length;if(e){if(i=n.indexOf(e),-1==i)throw Error("child does not exist");s=0;for(let t=i;t>=0;t--)if(1==n[t].nodeType){s=r.indexOf(n[t]);break}}if(t instanceof q){const e=t[O]?.slice();if(e&&e.length){for(const t of e)t.unsafeSetParent(this),1==t.nodeType&&r.splice(s++,0,t);e[0].unsafeSetPrev(n[i-1]||null),e[e.length-1].unsafeSetNext(n[i]||null),n.splice(i,0,...e),t[O].length=0,t[T]=[]}}else t.unsafeReplaceParent(this),t.unsafeSetPrev(n[i-1]||null),t.unsafeSetNext(n[i]||null),n.splice(i,0,t),1==t.nodeType&&r.splice(s++,0,t);return t}appendChild(t){return this.insertBefore(t,null)}removeChild(t){{const e=this[O],n=e?e.indexOf(t):-1;if(!e||-1==n)return t;if(e.splice(n,1),1!=t.nodeType)return t}{const e=this[T],n=e?e.indexOf(t):-1;return e&&-1!=n&&e.splice(n,1),t}}getElementsByClassName(t){return this.querySelectorAll("."+t)}getElementsByTagName(t){return this.querySelectorAll(t)}}const D=Symbol("textContent");class A extends C{constructor(t){super(),this[D]=t.toString()}get data(){return this[D]}set data(t){this[D]=t.toString()}get length(){return this[D].length}appendData(t){this[D]+=t.toString()}}class P extends A{get nodeType(){return 3}get textContent(){return this[D]}set textContent(t){this[D]=t.toString()}constructor(t){super(t)}}class W extends A{get nodeType(){return 4}get textContent(){return this[D]}set textContent(t){this[D]=t.toString()}constructor(t){super(t)}}const J=Symbol("target");class _ extends A{constructor(t,e){super(e),this[J]=t}get nodeType(){return 7}get target(){return this[J]}get textContent(){return this[D]}set textContent(t){this[D]=t.toString()}}class L extends A{get nodeType(){return 8}get textContent(){return this[D]}set textContent(t){this[D]=t.toString()}constructor(t){super(t)}}class q extends j{get nodeType(){return 11}constructor(){super()}}class B extends C{get specified(){return!0}get prefix(){const t=this.name.match(/^([^:]+):/);return t?t[1]:null}get localName(){return this.name.replace(/^[^:]+:/,"")}}const M=Symbol("attributes");class k extends j{constructor(){if(super(),!this[m])throw Error("unexpected element without known tag name")}get nodeType(){return 1}get tagName(){return this[m]}get localName(){return this[m].replace(/^[^:]*:/,"")}get id(){return this.getAttribute("id")||""}set id(t){this.setAttribute("id",t)}get attributes(){const t=[],e=this[M];if(!e)return t;for(const[n,r]of e){const e=Object.create(B.prototype,{[b]:{value:this.ownerDocument,writable:!0},ownerElement:{value:this,writable:!0},name:{value:n,writable:!1},value:{value:r,writable:!0}});t.push(e)}return t}getAttribute(t){const e=this[M],n=e?e.get(t):null;return void 0===n?null:n}setAttribute(t,e){let n=this[M];n||(n=new Map,this[M]=n),n.set(t,e)}remove(){const t=this.parentNode;t&&t.removeChild(this)}}const I=Symbol("element");function $(t){var e,n;return t[I]=(n=class extends k{constructor(){super(),this[e]=t}},e=b,n),Object.defineProperties(t[I].prototype,{[b]:{value:t,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[N]:{value:null,writable:!0}}),t}class F extends j{constructor(){super()}get Element(){return this[I]}get customElements(){let t=this[g];return t||(this[g]=t=new S),t}get nodeType(){return 9}get documentElement(){return this.firstElementChild}createElement(t){const e=this[g]?.get(t);return e?new e:Object.create(this[I].prototype,{[m]:{value:t,writable:!1}})}createTextNode(t){return Object.create(P.prototype,{[b]:{value:this,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[N]:{value:null,writable:!0},[D]:{value:t.toString(),writable:!0}})}createComment(t){return Object.create(L.prototype,{[b]:{value:this,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[N]:{value:null,writable:!0},[D]:{value:t.toString(),writable:!0}})}createCDATASection(t){return Object.create(W.prototype,{[b]:{value:this,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[N]:{value:null,writable:!0},[D]:{value:t.toString(),writable:!0}})}createProcessingInstruction(t,e){return Object.create(_.prototype,{[b]:{value:this,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[N]:{value:null,writable:!0},[J]:{value:t.toString(),writable:!0},[D]:{value:e.toString(),writable:!0}})}createDocumentFragment(){return Object.create(q.prototype,{[b]:{value:this,writable:!0},[x]:{value:null,writable:!1},[E]:{value:null,writable:!1},[N]:{value:null,writable:!1}})}getElementById(t){return this.querySelector("#"+t)}}class R extends C{constructor(){throw super(),Error("Constructor should never be called")}get nodeType(){return 10}get internalSubset(){return null}set textContent(t){}get textContent(){return null}}function H(t,e="",n=""){return Object.create(R.prototype,{[b]:{value:null,writable:!0},name:{value:t,writable:!1},publicId:{value:e,writable:!1},systemId:{value:n,writable:!1}})}t.CDATASection=W,t.CharacterData=A,t.Comment=L,t.Document=F,t.DocumentFragment=q,t.DocumentType=R,t.Element=k,t.Node=C,t.ProcessingInstruction=_,t.Text=P,t.createDocument=function(){return $(Object.create(class extends F{constructor(){super()}}.prototype,{[b]:{value:null}}))},t.createDocumentType=H,t.createHTMLDocument=function(t=""){const e=Object.create(class extends F{get body(){for(const t of this.documentElement.children)if("body"==t.localName)return t;return null}get head(){for(const t of this.documentElement.children)if("head"==t.localName)return t;return null}constructor(){super()}}.prototype);e[b]=null,$(e),Object.defineProperty(e.Element.prototype,"className",{get(){return this.getAttribute("class")||""},set(t){this.setAttribute("class",t.trim())}});{e.appendChild(H("html"));const n=e.createElement("html");n.appendChild(e.createElement("head")).appendChild(e.createElement("title")).textContent=t,n.appendChild(e.createElement("body")),e.appendChild(n)}return e},Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=fallback-dom.js.map