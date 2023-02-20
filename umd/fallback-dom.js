var e,t;e=this,t=function(e){function t(e,t){return o(e,function(e){e=e.trim();const t=[];let r=null;do{let i="";if(r){const n=e.match(/^\s*(>|\+|~|,| )\s*/);if(!n)throw Error("Unable to parse joiner at "+JSON.stringify(e));i=n[1],e=e.substring(n[0].length),","==i&&(t.push(r),r=null,i="")}if(!e)throw Error("unable to parse the empty string as a selector");const s=n(e),o=s[0];r&&(o.p=[i,r]),r=o,e=s[1]}while(e);return t.push(r),t}(t))}function n(e){const t={};{const n=e.match(/^[\p{L}_][0-9\p{L}_-]*/u);n?(t.t=n[0],e=e.substring(n[0].length)):e.startsWith("*")&&(t.t=void 0,e=e.substring(1))}for(;e;){if(e.startsWith("#")){const n=e.match(/^#[\p{L}_][0-9\p{L}_-]*/u);if(n){const r=n[0].substring(1);if(t.i&&t.i!=r)throw Error("selector will always fail, elements can't contain multiple ids");t.i=r,e=e.substring(n[0].length);continue}throw Error("invalid id at "+JSON.stringify(e))}if(e.startsWith(".")){const n=e.match(/^\.[\p{L}_][0-9\p{L}_-]*/u);if(n){t.c||(t.c=new Set),t.c.add(n[0].substring(1)),e=e.substring(n[0].length);continue}throw Error("invalid class at "+JSON.stringify(e))}if(e.startsWith("[")){const n=r(e=e.substring(1)),i=n[0].n;if(t.a){const e=t.a.get(i);t.a.set(i,l(e,n[0].v))}else{const e=new Map,r=n[0].v;e.set(i,void 0===r?null:"string"==typeof r?r:[r]),t.a=e}if((e=n[1]).startsWith("]")){e=e.substring(1);continue}throw Error("unexpected characters in attribute section: "+JSON.stringify(e))}}if(Object.keys(t).length)return[t,e];throw Error("unexpected part at "+JSON.stringify(e))}function r(e){const t=e.match(/^[\p{L}_][0-9\p{L}._-]*/u);if(!t)throw Error("expected attribute name, found "+JSON.stringify(e));const n={n:t[0]};let r;if((e=e.substring(t[0].length)).startsWith("=")?(r="=",e=e.substring(1)):e.startsWith("*=")?(r="*",e=e.substring(2)):e.startsWith("~=")?(r="~",e=e.substring(2)):e.startsWith("|=")?(r="|",e=e.substring(2)):e.startsWith("$=")?(r="$",e=e.substring(2)):e.startsWith("^=")&&(r="^",e=e.substring(2)),r){const t=function(e){if(e.startsWith('"')){const t=e.indexOf('"',1);if(-1!=t)return[e.substring(1,t),e.substring(t+1)];throw Error("no end of string at "+JSON.stringify(e))}const t=e.match(/^[\d\p{L}._-]+/u);if(t)return[t[0],e.substring(t[0].length)];throw Error("unexpected unquoted data at "+JSON.stringify(e))}(e);e=t[1];const s=t[0];"="==r?n.v=s:"*"==r?n.v=e=>e.includes(s):"|"==r?n.v=e=>e==s||e.startsWith(s+"-"):"^"==r?n.v=e=>e.startsWith(s):"$"==r?n.v=e=>e.endsWith(s):"~"==r&&(n.v=e=>i(e,s))}if(e.startsWith("]"))return[n,e.substring(1)];throw Error("expected end of attribute section but found "+JSON.stringify(e))}function i(e,t){let n=0;for(;n!=e.length;){const r=e.indexOf(" ",n+1),i=-1==r?e.length:r;if(i-n==t.length&&e.substring(n,i)==t)return!0;n=i}return!1}function s(e,t,n){e:for(const r of t)if(!r.t||r.t==n.localName){if(r.i){if("function"!=typeof n.getAttribute)continue e;const e=n.getAttribute("id");if(!e||e!=r.i)continue e}if(r.c){if("function"!=typeof n.getAttribute)continue e;const e=n.getAttribute("class");if(!e)continue e;for(const t of r.c)if(!i(e,t))continue e}if(r.a){if("function"!=typeof n.getAttribute)continue e;for(const[e,t]of r.a){const r=n.getAttribute(e);if(!r)continue e;if("string"==typeof t){if(r==t)continue;continue e}if(t)for(const e of t)if(!e(r))continue e}}if(r.p){const t=r.p[0];if("+"==t){const t=n.previousSibling;if(!t)continue e;if(!s(e,[r.p[1]],t))continue e}else if("~"==t){let t=n.previousSibling,i=!1;const o=[r.p[1]];for(;!i&&t;)i=s(e,o,t),t=t.previousSibling;if(!i)continue e}else if(">"==t){const t=n.parentNode;if(!t)continue e;if(!s(e,[r.p[1]],t))continue e}else if(" "==t){let t=n.parentNode,i=!1;const o=[r.p[1]];for(;!i&&t;)i=s(e,o,t),t=t.parentNode;if(!i)continue e}}return!0}return!1}function*o(e,t){const n=e.childNodes;if(n)for(const r of n)1==r.nodeType&&(s(e,t,r)&&(yield r),yield*o(r,t))}function l(e,t){if(void 0===t)return void 0!==e?e:null;if("string"==typeof t){if(null==e)return t;if("string"==typeof e){if(e==t)return e}else{let n=!1;for(const r of e)r(t)||(n=!0);if(!n)return t}}else{if(null==e)return[t];if("string"!=typeof e)return e.push(t),e;if(t(e))return e}throw Error("no possible attribute could ever match")}var u,a,c,h,f,m;const b=Symbol("customElements"),d=Symbol("document"),p=Symbol("reg"),g=Symbol("con"),w=Symbol("when"),y=Symbol("localName"),v=Symbol("prefix"),S=Symbol("namespaceURI"),x=Symbol("isCustomElement"),N=Symbol("customElementState");function E(e){const t=e[N];if(!t)return!1;{const[e,n,r]=t;if(r||!e&&!n)return r}return e[N][2]=!0,Promise.resolve().then((()=>{const t=e[N],[n,r]=t;if(t[0]=!1,t[1]=!1,t[2]=!1,r){const t=e.disconnectedCallback;t&&t.call(e)}if(n){const t=e.connectedCallback;t&&t.call(e)}})),!0}class CustomElementRegistry{constructor(){this[u]=new Map,this[a]=new Map,this[c]=new Map}define(e,t){e+="";const n=this[p];if(n.has(e))throw Error("an element with the name "+JSON.stringify(e)+" has already been defined");const r=t.prototype;let i=r;for(;i&&i!==Element.prototype;)i=Object.getPrototypeOf(i);if(!i)throw Error("the constructor of element "+JSON.stringify(e)+" is not a descendant of the right kind of Element class");const s=this[g];if(Element==t||s.has(t))throw Error("the prototype of element "+JSON.stringify(e)+" must be unique");if(r[x])throw Error("the prototype of element "+JSON.stringify(e)+" has already been registered in another registry");n.set(e,t),s.set(t,e),Object.defineProperties(r,{[y]:{value:e,configurable:!1,writable:!1,enumerable:!1},[v]:{value:null,configurable:!1,writable:!1,enumerable:!1},[S]:{value:null,configurable:!1,writable:!1,enumerable:!1},[x]:{value:!0,configurable:!1,writable:!1,enumerable:!1}});const o=this[w].get(e);if(o){this[w].delete(e);for(const e of o)e(t)}}upgrade(e){const t=this[p],n=e.tagName,r=t.get(n);if(!r)return;const i=Object.getPrototypeOf(e);if(i===Element.prototype)try{Object.setPrototypeOf(e,r.prototype),r.call(e),e.isConnected&&e.connectedCallback&&e[N]&&!e[N][2]&&(e[N][0]=!0,E(e))}catch(t){throw Object.setPrototypeOf(e,i),t}}whenDefined(e){const t=this[p].get(e);if(t)return Promise.resolve(t);let n=this[w].get(e);n||(n=[],this[w].set(e,n));const r=n;return new Promise((e=>r.push(e)))}get(e){return this[p].get(e)}}u=p,a=g,c=w;class DOMTokenList{constructor(e,t,n,r){this._d=new Set,this._split=e,this._accessor=n,this._setter=r,this._comb=t}_upd(){const e=this._accessor(),t=this._d;if(e==this._lastRead)return t;if(this._lastRead=e,t.clear(),!e)return t;for(const n of e.split(this._split))n&&t.add(n);return t}get length(){return this._upd().size}get value(){return this._upd(),this._lastRead||""}set value(e){this._upd(),this._setter(e||"")}toString(){return this._upd(),this._lastRead||""}add(...e){const t=this._upd(),n=this._split;for(const r of e)if(r){if(n.test(r))throw Error("invalid token");t.add(r)}this._setter(Array.from(t).join(this._comb))}contains(e){return this._upd().has(e)}remove(...e){const t=this._upd(),n=this._split;for(const r of e)if(r){if(n.test(r))throw Error("invalid token");t.delete(r)}this._setter(Array.from(t).join(this._comb))}replace(e,t){const n=this._upd();if(!n.delete(e))return!1;if(this._split.test(t))throw Error("invalid token");return n.add(t),this._setter(Array.from(n).join(this._comb)),!0}toggle(e,t){const n=this._upd();if(!t&&(n.delete(e)||!1===t))return!1;if(this._split.test(e))throw Error("invalid token");return n.add(e),this._setter(Array.from(n).join(this._comb)),!0}forEach(e,t){this._upd().forEach((n=>e.call(t,n,-1,this)))}}const C=Symbol("parent"),O=Symbol("previousSibling"),D=Symbol("nextSibling");class Node{get parentNode(){return this[C]}get previousSibling(){return this[O]}get nextSibling(){return this[D]}get ownerDocument(){return this[d]}get isConnected(){return this instanceof Document||!!this[C]?.isConnected}constructor(){if(this[h]=null,this[f]=null,this[m]=null,void 0===this[d])throw Error("a node must be created by a document")}lookupNamespaceURI(e){const t=(e=e||null)?"xmlns:"+e:"xmlns";let n=this;for(;n;){const r=n.nodeType;if(9==r)return n[k].get(e||"")||null;if(10==r||11==r)return this.ownerDocument?.[k].get(e||"")||null;if(1==r){const r=n;if(r.prefix==e)return r.namespaceURI;const i=r.getAttribute(t);if(i)return i}n=n[C]}return this.ownerDocument?.[k].get(e||"")||null}lookupPrefix(e){if(!e)return null;if("http://www.w3.org/2000/xmlns/"==e)return"xmlns";if("http://www.w3.org/XML/1998/namespace"==e)return"xml";let t=this;for(;t;){const n=this.nodeType;if(10==n||11==n)return null;if(1==n){const n=t.attributes;for(const t of n)if("http://www.w3.org/2000/xmlns/"==t.namespaceURI&&t.value==e)return t.localName}t=t[C]}return null}cloneNode(e=!1){const t=9==this.nodeType&&this.constructor!=this.ownerDocument?.Element?new this.constructor:Object.create(Object.getPrototypeOf(this),{[d]:{value:this[d],writable:!0,enumerable:!1},[C]:{value:null,writable:!0,enumerable:!1},[O]:{value:null,writable:!0,enumerable:!1},[D]:{value:null,writable:!0,enumerable:!1}});{const e=this[A];void 0!==e&&Object.defineProperty(t,A,{value:e,writable:!0,enumerable:!1})}{const e=this[j];if(void 0!==e){const n=new Map;for(const[t,r]of e){if(!r.size)continue;const e=new Map;for(const[t,[n,i]]of r)e.set(t,[n,i]);n.set(t,e)}Object.defineProperty(t,j,{value:n,writable:!0,enumerable:!1})}}{const e=this[y];t[y]||void 0===e||Object.defineProperty(t,y,{value:e,writable:!0,enumerable:!1})}{const e=this[v];t[v]||void 0===e||Object.defineProperty(t,v,{value:e,writable:!0,enumerable:!1})}{const e=this[S];t[S]||void 0===e||Object.defineProperty(t,S,{value:e,writable:!0,enumerable:!1})}{const e=this[P];t[P]||void 0===e||Object.defineProperty(t,P,{value:e,writable:!1,enumerable:!1})}if(10==this.nodeType){const e=this;Object.defineProperties(t,{name:{value:e.name,writable:!1,enumerable:!0},publicId:{value:e.publicId,writable:!1,enumerable:!0},systemId:{value:e.systemId,writable:!1,enumerable:!0}})}if(!e||!this[T])return t;const n=this;for(const e of n[T])t.insertBefore(e.cloneNode(!0),null);return t}unsafeSetParent(e){const t=this[C];this[C]=e;const n=this[N];e&&e.appendChild(this),n&&(t&&(n[0]||(n[1]=!0),n[0]=!1),e&&e.isConnected?n[0]=!0:n[0]=!1,E(this))}unsafeReplaceParent(e){const t=this[C];t&&t.removeChild(this),this[C]=e}unsafeSetPrev(e){this[O]=e,e&&(e[D]=this)}unsafeSetNext(e){this[D]=e,e&&(e[O]=this)}}h=C,f=O,m=D;const T=Symbol("childNodes"),_=Symbol("children");class ParentNode extends Node{get textContent(){const e=this[T];return e?e.reduce(((e,t)=>{const n=t.nodeType;return 1==n||3==n||4==n?e+t.textContent:e}),""):""}set textContent(e){e=e.toString();const t=this[T]=[];this[_]=[],e&&t.push(this.ownerDocument.createTextNode(e))}hasChildNodes(){const e=this[T];return!!e&&0!=e.length}get childNodes(){const e=this[T];return e?e.slice():[]}get childElementCount(){const e=this[_];return e?e.length:0}get children(){const e=this[_];return e?e.slice():[]}get firstElementChild(){const e=this[_];return e?.[0]||null}get lastElementChild(){const e=this[_];if(!e)return null;const t=e?e.length:0;return t?e[t-1]:null}get firstChild(){const e=this[T];return e?.[0]||null}get lastChild(){const e=this[T];if(!e)return null;const t=e.length;return t?e[t-1]:null}constructor(){super()}append(...e){for(const t of e){const e="string"==typeof t?this.ownerDocument.createTextNode(t):"object"==typeof t&&t instanceof Node?t:void 0;if(void 0===e)throw new TypeError("unsupported input type");this.insertBefore(e,null)}}prepend(...e){let t=this[T];t||(t=[],this[T]=t);const n=t[0]||null;for(const t of e){const e="string"==typeof t?this.ownerDocument.createTextNode(t):"object"==typeof t&&t instanceof Node?t:void 0;if(void 0===e)throw new TypeError("unsupported input type");this.insertBefore(e,n)}}querySelector(e){return t(this,e).next().value||null}querySelectorAll(e){return Array.from(t(this,e))}replaceChildren(...e){let t=this[T];if(t){if(t.length){let e=this[_];e?e.length=0:(e=[],this[_]=e);const n=t.slice();t.length=0;for(const e of n)e.unsafeSetParent(null),e.unsafeSetPrev(null),e.unsafeSetNext(null)}}else t=[],this[T]=t;e.length&&this.append(...e)}replaceChild(e,t){return this.insertBefore(e,t),this.removeChild(t)}insertBefore(e,t){if(e.ownerDocument!=this.ownerDocument){const t=this.nodeType;if(9!=t&&11!=t)throw Error("owner document mismatch");if(e.ownerDocument!=this){if(10!=e.nodeType||null!=e.ownerDocument)throw Error("owner document mismatch while inserting to the root");e[d]=this}}{let t=this;for(;t&&t!=e;)t=t.parentNode;if(t)throw Error("node insertion would lead to circularity")}if(e.parentNode==this){if(t==e||t==e.nextSibling)return e;this.removeChild(e)}let n=this[T];n||(n=[],this[T]=n);let r=this[_];r||(r=[],this[_]=r);let i=n.length,s=r.length;if(t){if(i=n.indexOf(t),-1==i)throw Error("child does not exist");s=0;for(let e=i;e>=0;e--)if(1==n[e].nodeType){s=r.indexOf(n[e]);break}}if(e instanceof DocumentFragment){const t=e[T]?.slice();if(t&&t.length){for(const e of t)e.unsafeSetParent(this),1==e.nodeType&&r.splice(s++,0,e);t[0].unsafeSetPrev(n[i-1]||null),t[t.length-1].unsafeSetNext(n[i]||null),n.splice(i,0,...t),e[T].length=0,e[_]=[]}}else e.unsafeSetPrev(n[i-1]||null),e.unsafeSetNext(n[i]||null),n.splice(i,0,e),1==e.nodeType&&r.splice(s++,0,e),e.unsafeReplaceParent(this);return e}appendChild(e){return this.insertBefore(e,null)}removeChild(e){{const t=this[T],n=t?t.indexOf(e):-1;if(!t||-1==n)return e;if(t.splice(n,1),1!=e.nodeType)return e}{const t=this[_],n=t?t.indexOf(e):-1;return t&&-1!=n&&t.splice(n,1),e}}getElementsByClassName(e){return this.querySelectorAll("."+e)}getElementsByTagName(e){return this.querySelectorAll(e)}getElementsByTagNameNS(e,t){return Array.from(this.querySelectorAll(t)).filter((t=>t.namespaceURI==e))}}Object.defineProperties(ParentNode.prototype,{[T]:{enumerable:!1,writable:!0},[_]:{enumerable:!1,writable:!0}});const A=Symbol("textContent");class CharacterData extends Node{get data(){return this[A]}set data(e){this[A]=e.toString()}get length(){return this[A].length}constructor(e){super(),this[A]=e.toString()}appendData(e){this[A]+=e.toString()}}class Text extends CharacterData{get nodeType(){return 3}get nodeName(){return"#text"}get textContent(){return this[A]}set textContent(e){this[A]=e.toString()}constructor(e){super(e)}}class CDATASection extends CharacterData{get nodeType(){return 4}get nodeName(){return"#cdata-section"}get textContent(){return this[A]}set textContent(e){this[A]=e.toString()}constructor(e){super(e)}}const P=Symbol("target");class ProcessingInstruction extends CharacterData{get nodeType(){return 7}get nodeName(){return this[P]}get target(){return this[P]}get textContent(){return this[A]}set textContent(e){this[A]=e.toString()}constructor(e,t){super(t),this[P]=e}}class Comment extends CharacterData{get nodeType(){return 8}get nodeName(){return"#comment"}get textContent(){return this[A]}set textContent(e){this[A]=e.toString()}constructor(e){super(e)}}class DocumentFragment extends ParentNode{get nodeType(){return 11}get nodeName(){return"#document-fragment"}constructor(){super()}}class Attr extends Node{get specified(){return!0}get name(){return this.prefix?`${this.prefix}:${this.localName}`:this.localName}get nodeType(){return 2}get nodeName(){return this.name}}const j=Symbol("attributes"),M=Symbol("classList");class Element extends ParentNode{get nodeType(){return 1}get nodeName(){return this.tagName}get tagName(){return this[v]?`${this[v]}:${this[y]}`:this[y]}get localName(){return this[y]}get prefix(){return this[v]}get namespaceURI(){return this[S]}get[Symbol.toStringTag](){return this[v]?`${this[v]}:${this[y]}`:this[y]}get id(){return this.getAttribute("id")||""}set id(e){this.setAttribute("id",e)}get classList(){let e=this[M];return e||(e=new DOMTokenList(/\s+/g," ",(()=>this.getAttribute("class")),(e=>this.setAttribute("class",e))),this[M]=e),e}get attributes(){const e=[],t=this[j];if(!t)return e;for(const[n,r]of t)for(const[t,[i,s]]of r){const r=Object.create(Attr.prototype,{[d]:{value:this.ownerDocument,writable:!1,enumerable:!1},[C]:{value:this,writable:!1,enumerable:!1},namespaceURI:{value:n,writable:!1,enumerable:!0},ownerElement:{value:this,writable:!1,enumerable:!0},localName:{value:t,writable:!1,enumerable:!0},value:{value:i,writable:!1,enumerable:!0},prefix:{value:s,writable:!1,enumerable:!0}});e.push(r)}return e}constructor(){if(super(),!this[y])throw Error("unexpected element without known tag name");this[x]&&(this[N]=[!1,!1,!1])}getAttribute(e){const t=this[j];if(!t)return null;const n=t.get("")?.get(e);if(void 0!==n)return n[0];const r=e.indexOf(":"),i=-1!==r?e.substring(0,r):null,s=-1!==r?e.substring(r+1):e;for(const e of t.values()){const t=e.get(s);if(void 0!==t&&t[1]===i)return t[0]}return null}getAttributeNS(e,t){null===e&&(e="");const n=this[j],r=n?.get(e)?.get(t);return void 0===r?null:r[0]}setAttribute(e,t){let n=this[j];n||(n=new Map,this[j]=n);let r=n.get("");r||(r=new Map,n.set("",r)),r.set(e,[t,null])}setAttributeNS(e,t,n){null===e&&(e="");let r=this[j];r||(r=new Map,this[j]=r);let i=r.get(e);i||(i=new Map,r.set(e,i));const s=t.indexOf(":"),o=-1!==s?t.substring(0,s):null,l=-1!==s?t.substring(s+1):t,u=i.get(l);u?u[0]=n:i.set(l,[n,o])}removeAttribute(e){const t=this[j];if(!t)return;const n=t.get("")?.delete(e);if(n)return;const r=e.indexOf(":"),i=-1!==r?e.substring(0,r):null,s=-1!==r?e.substring(r+1):e;for(const e of t.values()){const t=e.get(s);if(void 0!==t&&t[1]===i)return void e.delete(s)}}removeAttributeNS(e,t){null===e&&(e="");const n=this[j];n?.get(e)?.delete(t)}remove(){const e=this.parentNode;e&&e.removeChild(this)}}const I=Symbol("element");function L(e){var t,n;return e[I]=(n=class DOMElement extends Element{constructor(){super(),this[t]=e}},t=d,n),Object.defineProperties(e[I].prototype,{[d]:{value:e,writable:!0,enumerable:!1},[C]:{value:null,writable:!0,enumerable:!1},[O]:{value:null,writable:!0,enumerable:!1},[D]:{value:null,writable:!0,enumerable:!1}}),e}const k=Symbol("defNs"),W=[["xmlns","http://www.w3.org/2000/xmlns/"],["xml","http://www.w3.org/XML/1998/namespace"]];class Document extends ParentNode{get Element(){return this[I]}get isConnected(){return!0}get customElements(){let e=this[b];return e||(this[b]=e=new CustomElementRegistry),e}get nodeType(){return 9}get nodeName(){return"#document"}get documentElement(){return this.firstElementChild}constructor(){super()}createElement(e){const t=this[k]?.get("")||null,n=this[b]?.get(e);return n?new n:(t&&"http://www.w3.org/1999/xhtml"===t&&(e=e.toLowerCase()),Object.create(this[I].prototype,{[y]:{value:e,writable:!1,enumerable:!1},[v]:{value:null,writable:!1,enumerable:!1},[S]:{value:t,writable:!1,enumerable:!0}}))}createElementNS(e,t){if(!e)return this.createElement(t);const n=t.indexOf(":"),r=-1!==n?t.substring(0,n):null,i=-1!==n?t.substring(n+1):t;return Object.create(this[I].prototype,{[y]:{value:i,writable:!1,enumerable:!1},[v]:{value:r,writable:!1,enumerable:!1},[S]:{value:e,writable:!1,enumerable:!0}})}createTextNode(e){return Object.create(Text.prototype,{[d]:{value:this,writable:!0,enumerable:!1},[C]:{value:null,writable:!0,enumerable:!1},[O]:{value:null,writable:!0,enumerable:!1},[D]:{value:null,writable:!0,enumerable:!1},[A]:{value:e.toString(),writable:!0,enumerable:!1}})}createComment(e){return Object.create(Comment.prototype,{[d]:{value:this,writable:!0,enumerable:!1},[C]:{value:null,writable:!0,enumerable:!1},[O]:{value:null,writable:!0,enumerable:!1},[D]:{value:null,writable:!0,enumerable:!1},[A]:{value:e.toString(),writable:!0,enumerable:!1}})}createCDATASection(e){return Object.create(CDATASection.prototype,{[d]:{value:this,writable:!0,enumerable:!1},[C]:{value:null,writable:!0,enumerable:!1},[O]:{value:null,writable:!0,enumerable:!1},[D]:{value:null,writable:!0,enumerable:!1},[A]:{value:e.toString(),writable:!0,enumerable:!1}})}createProcessingInstruction(e,t){return Object.create(ProcessingInstruction.prototype,{[d]:{value:this,writable:!0,enumerable:!1},[C]:{value:null,writable:!0,enumerable:!1},[O]:{value:null,writable:!0,enumerable:!1},[D]:{value:null,writable:!0,enumerable:!1},[P]:{value:e.toString(),writable:!0,enumerable:!1},[A]:{value:t.toString(),writable:!0,enumerable:!1}})}createDocumentFragment(){return Object.create(DocumentFragment.prototype,{[d]:{value:this,writable:!0,enumerable:!1},[C]:{value:null,writable:!1,enumerable:!1},[O]:{value:null,writable:!1,enumerable:!1},[D]:{value:null,writable:!1,enumerable:!1}})}getElementById(e){return this.querySelector("#"+e)}}class DocumentType extends Node{get nodeType(){return 10}get nodeName(){return this.name}get internalSubset(){return null}set textContent(e){}get textContent(){return null}constructor(){throw super(),Error("Constructor should never be called")}}function R(e,t="",n=""){return Object.create(DocumentType.prototype,{[d]:{value:null,writable:!0,enumerable:!1},name:{value:e,writable:!1},publicId:{value:t,writable:!1},systemId:{value:n,writable:!1},[C]:{value:null,writable:!0,enumerable:!1},[O]:{value:null,writable:!0,enumerable:!1},[D]:{value:null,writable:!0,enumerable:!1}})}e.CDATASection=CDATASection,e.CharacterData=CharacterData,e.Comment=Comment,e.Document=Document,e.DocumentFragment=DocumentFragment,e.DocumentType=DocumentType,e.Element=Element,e.Node=Node,e.ProcessingInstruction=ProcessingInstruction,e.Text=Text,e.createDocument=function(){return L(Object.create(class DOMDocument extends Document{constructor(){super()}}.prototype,{[d]:{value:null,writable:!0,enumerable:!1},[k]:{value:new Map(W),writable:!0,enumerable:!1}}))},e.createDocumentType=R,e.createHTMLDocument=function(e=""){const t=Object.create(class HTMLDocument extends Document{get body(){for(const e of this.documentElement.children)if("body"==e.localName)return e;return null}get head(){for(const e of this.documentElement.children)if("head"==e.localName)return e;return null}constructor(){super()}}.prototype,{[d]:{value:null,writable:!0,enumerable:!1},[k]:{value:new Map([...W,["","http://www.w3.org/1999/xhtml"]]),writable:!0,enumerable:!1}});L(t),Object.defineProperty(t.Element.prototype,"className",{get(){return this.getAttribute("class")||""},set(e){this.setAttribute("class",e.trim())}});{t.appendChild(R("html"));const n=t.createElement("html");n.appendChild(t.createElement("head")).appendChild(t.createElement("title")).textContent=e,n.appendChild(t.createElement("body")),t.appendChild(n)}return t}},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).fallbackDom={});
//# sourceMappingURL=fallback-dom.js.map
