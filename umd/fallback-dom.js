var t,e;t=this,e=function(t){function e(t,e){return o(t,function(t){t=t.trim();const e=[];let r=null;do{let i="";if(r){const n=t.match(/^\s*(>|\+|~|,| )\s*/);if(!n)throw Error("Unable to parse joiner at "+JSON.stringify(t));i=n[1],t=t.substring(n[0].length),","==i&&(e.push(r),r=null,i="")}if(!t)throw Error("unable to parse the empty string as a selector");const s=n(t),o=s[0];r&&(o.p=[i,r]),r=o,t=s[1]}while(t);return e.push(r),e}(e))}function n(t){const e={};{const n=t.match(/^[\p{L}_][0-9\p{L}_-]*/u);n?(e.t=n[0],t=t.substring(n[0].length)):t.startsWith("*")&&(e.t=void 0,t=t.substring(1))}for(;t;){if(t.startsWith("#")){const n=t.match(/^#[\p{L}_][0-9\p{L}_-]*/u);if(n){const r=n[0].substring(1);if(e.i&&e.i!=r)throw Error("selector will always fail, elements can't contain multiple ids");e.i=r,t=t.substring(n[0].length);continue}throw Error("invalid id at "+JSON.stringify(t))}if(t.startsWith(".")){const n=t.match(/^\.[\p{L}_][0-9\p{L}_-]*/u);if(n){e.c||(e.c=new Set),e.c.add(n[0].substring(1)),t=t.substring(n[0].length);continue}throw Error("invalid class at "+JSON.stringify(t))}if(t.startsWith("[")){const n=r(t=t.substring(1)),i=n[0].n;if(e.a){const t=e.a.get(i);e.a.set(i,l(t,n[0].v))}else{const t=new Map,r=n[0].v;t.set(i,void 0===r?null:"string"==typeof r?r:[r]),e.a=t}if((t=n[1]).startsWith("]")){t=t.substring(1);continue}throw Error("unexpected characters in attribute section: "+JSON.stringify(t))}}if(Object.keys(e).length)return[e,t];throw Error("unexpected part at "+JSON.stringify(t))}function r(t){const e=t.match(/^[\p{L}_][0-9\p{L}._-]*/u);if(!e)throw Error("expected attribute name, found "+JSON.stringify(t));const n={n:e[0]};let r;if((t=t.substring(e[0].length)).startsWith("=")?(r="=",t=t.substring(1)):t.startsWith("*=")?(r="*",t=t.substring(2)):t.startsWith("~=")?(r="~",t=t.substring(2)):t.startsWith("|=")?(r="|",t=t.substring(2)):t.startsWith("$=")?(r="$",t=t.substring(2)):t.startsWith("^=")&&(r="^",t=t.substring(2)),r){const e=function(t){if(t.startsWith('"')){const e=t.indexOf('"',1);if(-1!=e)return[t.substring(1,e),t.substring(e+1)];throw Error("no end of string at "+JSON.stringify(t))}const e=t.match(/^[\d\p{L}._-]+/u);if(e)return[e[0],t.substring(e[0].length)];throw Error("unexpected unquoted data at "+JSON.stringify(t))}(t);t=e[1];const s=e[0];"="==r?n.v=s:"*"==r?n.v=t=>t.includes(s):"|"==r?n.v=t=>t==s||t.startsWith(s+"-"):"^"==r?n.v=t=>t.startsWith(s):"$"==r?n.v=t=>t.endsWith(s):"~"==r&&(n.v=t=>i(t,s))}if(t.startsWith("]"))return[n,t.substring(1)];throw Error("expected end of attribute section but found "+JSON.stringify(t))}function i(t,e){let n=0;for(;n!=t.length;){const r=t.indexOf(" ",n+1),i=-1==r?t.length:r;if(i-n==e.length&&t.substring(n,i)==e)return!0;n=i}return!1}function s(t,e,n){t:for(const r of e)if(!r.t||r.t==n.localName){if(r.i){if("function"!=typeof n.getAttribute)continue t;const t=n.getAttribute("id");if(!t||t!=r.i)continue t}if(r.c){if("function"!=typeof n.getAttribute)continue t;const t=n.getAttribute("class");if(!t)continue t;for(const e of r.c)if(!i(t,e))continue t}if(r.a){if("function"!=typeof n.getAttribute)continue t;for(const[t,e]of r.a){const r=n.getAttribute(t);if(!r)continue t;if("string"==typeof e){if(r==e)continue;continue t}if(e)for(const t of e)if(!t(r))continue t}}if(r.p){const e=r.p[0];if("+"==e){const e=n.previousSibling;if(!e)continue t;if(!s(t,[r.p[1]],e))continue t}else if("~"==e){let e=n.previousSibling,i=!1;const o=[r.p[1]];for(;!i&&e;)i=s(t,o,e),e=e.previousSibling;if(!i)continue t}else if(">"==e){const e=n.parentNode;if(!e)continue t;if(!s(t,[r.p[1]],e))continue t}else if(" "==e){let e=n.parentNode,i=!1;const o=[r.p[1]];for(;!i&&e;)i=s(t,o,e),e=e.parentNode;if(!i)continue t}}return!0}return!1}function*o(t,e){const n=t.childNodes;if(n)for(const r of n)1==r.nodeType&&(s(t,e,r)&&(yield r),yield*o(r,e))}function l(t,e){if(void 0===e)return void 0!==t?t:null;if("string"==typeof e){if(null==t)return e;if("string"==typeof t){if(t==e)return t}else{let n=!1;for(const r of t)r(e)||(n=!0);if(!n)return e}}else{if(null==t)return[e];if("string"!=typeof t)return t.push(e),t;if(e(t))return t}throw Error("no possible attribute could ever match")}var u,c,a,h,f,d;const p=Symbol("definedTag"),g=Symbol("customElements"),m=Symbol("document"),b=Symbol("tagName"),y=Symbol("reg"),w=Symbol("con"),v=Symbol("when");class CustomElementRegistry{constructor(){this[u]=new Map,this[c]=new Map,this[a]=new Map}define(t,e){const n=this[y];if(n.has(t))throw Error("element "+JSON.stringify(t)+" has already been defined");const r=e.prototype;let i=r;for(;i&&i!==Element.prototype;)i=Object.getPrototypeOf(i);if(!i)throw Error("the constructor of element "+JSON.stringify(t)+" is not a decendant of the right kind of Element class");const s=this[w];if(Element==e||s.has(e))throw Error("the prototype of element "+JSON.stringify(t)+" must be unique");n.set(t,e),s.set(e,t),r[b]=t;const o=this[v].get(t);if(o){this[v].delete(t);for(const t of o)t(e)}}upgrade(t){const e=this[y],n=t.tagName,r=e.get(n);if(!r)return;const i=Object.getPrototypeOf(t);if(i===Element.prototype)try{Object.setPrototypeOf(t,r.prototype),r.call(t)}catch(e){throw Object.setPrototypeOf(t,i),e}}whenDefined(t){const e=this[y].get(t);if(e)return Promise.resolve(e);let n=this[v].get(t);n||(n=[],this[v].set(t,n));const r=n;return new Promise((t=>r.push(t)))}get(t){return this[y].get(t)}[(u=y,c=w,a=v,p)](t){return this[w].get(t)}}class DOMTokenList{constructor(t,e,n,r){this._d=new Set,this._split=t,this._accessor=n,this._setter=r,this._comb=e}_upd(){const t=this._accessor(),e=this._d;if(t==this._lastRead)return e;if(this._lastRead=t,e.clear(),!t)return e;for(const n of t.split(this._split))n&&e.add(n);return e}get length(){return this._upd().size}get value(){return this._upd(),this._lastRead||""}set value(t){this._upd(),this._setter(t||"")}toString(){return this._upd(),this._lastRead||""}add(...t){const e=this._upd(),n=this._split;for(const r of t)if(r){if(n.test(r))throw Error("invalid token");e.add(r)}this._setter(Array.from(e).join(this._comb))}contains(t){return this._upd().has(t)}remove(...t){const e=this._upd(),n=this._split;for(const r of t)if(r){if(n.test(r))throw Error("invalid token");e.delete(r)}this._setter(Array.from(e).join(this._comb))}replace(t,e){const n=this._upd();if(!n.delete(t))return!1;if(this._split.test(e))throw Error("invalid token");return n.add(e),this._setter(Array.from(n).join(this._comb)),!0}toggle(t,e){const n=this._upd();if(!e&&(n.delete(t)||!1===e))return!1;if(this._split.test(t))throw Error("invalid token");return n.add(t),this._setter(Array.from(n).join(this._comb)),!0}forEach(t,e){this._upd().forEach((n=>t.call(e,n,-1,this)))}}const S=Symbol("parent"),x=Symbol("previousSibling"),E=Symbol("nextSibling");class Node{constructor(){if(this[h]=null,this[f]=null,this[d]=null,void 0===this[m])throw Error("a node must be created by a document")}get parentNode(){return this[S]}get previousSibling(){return this[x]}get nextSibling(){return this[E]}get ownerDocument(){return this[m]}cloneNode(t=!1){const e=9==this.nodeType&&this.constructor!=this.ownerDocument?.Element?new this.constructor:Object.create(Object.getPrototypeOf(this),{[m]:{value:this[m],writable:!0},[S]:{value:null,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0}});{const t=this[O];void 0!==t&&Object.defineProperty(e,O,{value:t,writable:!0})}{const t=this[_];void 0!==t&&Object.defineProperty(e,_,{value:new Map(t),writable:!0})}{const t=this[b];e[b]||void 0===t||Object.defineProperty(e,b,{value:t,writable:!0})}{const t=this[D];e[D]||void 0===t||Object.defineProperty(e,D,{value:t,writable:!1})}if(10==this.nodeType){const t=this;Object.defineProperties(e,{name:{value:t.name,writable:!1},publicId:{value:t.publicId,writable:!1},systemId:{value:t.systemId,writable:!1}})}if(!t||!this[N])return e;const n=this;for(const t of n[N])e.insertBefore(t.cloneNode(!0),null);return e}unsafeSetParent(t){this[S]=t}unsafeReplaceParent(t){const e=this[S];e&&e.removeChild(this),this[S]=t}unsafeSetPrev(t){this[x]=t,t&&(t[E]=this)}unsafeSetNext(t){this[E]=t,t&&(t[x]=this)}}h=S,f=x,d=E;const N=Symbol("childNodes"),C=Symbol("children");class ParentNode extends Node{constructor(){super()}get textContent(){const t=this[N];return t?t.reduce(((t,e)=>{const n=e.nodeType;return 1==n||3==n||4==n?t+e.textContent:t}),""):""}set textContent(t){t=t.toString();const e=this[N]=[];this[C]=[],t&&e.push(this.ownerDocument.createTextNode(t))}hasChildNodes(){const t=this[N];return!!t&&0!=t.length}get childNodes(){const t=this[N];return t?t.slice():[]}get childElementCount(){const t=this[C];return t?t.length:0}get children(){const t=this[C];return t?t.slice():[]}get firstElementChild(){return this[C]?.[0]||null}get lastElementChild(){const t=this[C];if(!t)return null;const e=t?t.length:0;return e?t[e-1]:null}get firstChild(){return this[N]?.[0]||null}get lastChild(){const t=this[N];if(!t)return null;const e=t.length;return e?t[e-1]:null}append(...t){for(const e of t){const t="string"==typeof e?this.ownerDocument.createTextNode(e):"object"==typeof e&&e instanceof Node?e:void 0;if(void 0===t)throw new TypeError("unsupported input type");this.insertBefore(t,null)}}prepend(...t){let e=this[N];e||(e=[],this[N]=e);const n=e[0]||null;for(const e of t){const t="string"==typeof e?this.ownerDocument.createTextNode(e):"object"==typeof e&&e instanceof Node?e:void 0;if(void 0===t)throw new TypeError("unsupported input type");this.insertBefore(t,n)}}querySelector(t){return e(this,t).next().value||null}querySelectorAll(t){return Array.from(e(this,t))}replaceChildren(...t){let e=this[N];if(e){if(e.length){let t=this[C];t?t.length=0:(t=[],this[C]=t);const n=e.slice();e.length=0;for(const t of n)t.unsafeSetParent(null),t.unsafeSetPrev(null),t.unsafeSetNext(null)}}else e=[],this[N]=e;t.length&&this.append(...t)}insertBefore(t,e){if(t.ownerDocument!=this.ownerDocument){const e=this.nodeType;if(9!=e&&11!=e)throw Error("owner document mismatch");if(t.ownerDocument!=this){if(10!=t.nodeType||null!=t.ownerDocument)throw Error("owner document mismatch while inserting to the root");t[m]=this}}if(t.parentNode==this){if(e==t||e==t.nextSibling)return t;this.removeChild(t)}let n=this[N];n||(n=[],this[N]=n);let r=this[C];r||(r=[],this[C]=r);let i=n.length,s=r.length;if(e){if(i=n.indexOf(e),-1==i)throw Error("child does not exist");s=0;for(let t=i;t>=0;t--)if(1==n[t].nodeType){s=r.indexOf(n[t]);break}}if(t instanceof DocumentFragment){const e=t[N]?.slice();if(e&&e.length){for(const t of e)t.unsafeSetParent(this),1==t.nodeType&&r.splice(s++,0,t);e[0].unsafeSetPrev(n[i-1]||null),e[e.length-1].unsafeSetNext(n[i]||null),n.splice(i,0,...e),t[N].length=0,t[C]=[]}}else t.unsafeReplaceParent(this),t.unsafeSetPrev(n[i-1]||null),t.unsafeSetNext(n[i]||null),n.splice(i,0,t),1==t.nodeType&&r.splice(s++,0,t);return t}appendChild(t){return this.insertBefore(t,null)}removeChild(t){{const e=this[N],n=e?e.indexOf(t):-1;if(!e||-1==n)return t;if(e.splice(n,1),1!=t.nodeType)return t}{const e=this[C],n=e?e.indexOf(t):-1;return e&&-1!=n&&e.splice(n,1),t}}getElementsByClassName(t){return this.querySelectorAll("."+t)}getElementsByTagName(t){return this.querySelectorAll(t)}}const O=Symbol("textContent");class CharacterData extends Node{constructor(t){super(),this[O]=t.toString()}get data(){return this[O]}set data(t){this[O]=t.toString()}get length(){return this[O].length}appendData(t){this[O]+=t.toString()}}class Text extends CharacterData{get nodeType(){return 3}get textContent(){return this[O]}set textContent(t){this[O]=t.toString()}constructor(t){super(t)}}class CDATASection extends CharacterData{get nodeType(){return 4}get textContent(){return this[O]}set textContent(t){this[O]=t.toString()}constructor(t){super(t)}}const D=Symbol("target");class ProcessingInstruction extends CharacterData{constructor(t,e){super(e),this[D]=t}get nodeType(){return 7}get target(){return this[D]}get textContent(){return this[O]}set textContent(t){this[O]=t.toString()}}class Comment extends CharacterData{get nodeType(){return 8}get textContent(){return this[O]}set textContent(t){this[O]=t.toString()}constructor(t){super(t)}}class DocumentFragment extends ParentNode{get nodeType(){return 11}constructor(){super()}}class Attr extends Node{get specified(){return!0}get prefix(){const t=this.name.match(/^([^:]+):/);return t?t[1]:null}get localName(){return this.name.replace(/^[^:]+:/,"")}}const _=Symbol("attributes"),T=Symbol("classList");class Element extends ParentNode{constructor(){if(super(),!this[b])throw Error("unexpected element without known tag name")}get nodeType(){return 1}get tagName(){return this[b]}get localName(){return this[b].replace(/^[^:]*:/,"")}get id(){return this.getAttribute("id")||""}set id(t){this.setAttribute("id",t)}get classList(){let t=this[T];return t||(t=new DOMTokenList(/\s+/g," ",(()=>this.getAttribute("class")),(t=>this.setAttribute("class",t))),this[T]=t),t}get attributes(){const t=[],e=this[_];if(!e)return t;for(const[n,r]of e){const e=Object.create(Attr.prototype,{[m]:{value:this.ownerDocument,writable:!0},ownerElement:{value:this,writable:!0},name:{value:n,writable:!1},value:{value:r,writable:!0}});t.push(e)}return t}getAttribute(t){const e=this[_],n=e?e.get(t):null;return void 0===n?null:n}setAttribute(t,e){let n=this[_];n||(n=new Map,this[_]=n),n.set(t,e)}remove(){const t=this.parentNode;t&&t.removeChild(this)}}const A=Symbol("element");function j(t){var e,n;return t[A]=(n=class DOMElement extends Element{constructor(){super(),this[e]=t}},e=m,n),Object.defineProperties(t[A].prototype,{[m]:{value:t,writable:!0},[S]:{value:null,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0}}),t}class Document extends ParentNode{constructor(){super()}get Element(){return this[A]}get customElements(){let t=this[g];return t||(this[g]=t=new CustomElementRegistry),t}get nodeType(){return 9}get documentElement(){return this.firstElementChild}createElement(t){const e=this[g]?.get(t);return e?new e:Object.create(this[A].prototype,{[b]:{value:t,writable:!1}})}createTextNode(t){return Object.create(Text.prototype,{[m]:{value:this,writable:!0},[S]:{value:null,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[O]:{value:t.toString(),writable:!0}})}createComment(t){return Object.create(Comment.prototype,{[m]:{value:this,writable:!0},[S]:{value:null,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[O]:{value:t.toString(),writable:!0}})}createCDATASection(t){return Object.create(CDATASection.prototype,{[m]:{value:this,writable:!0},[S]:{value:null,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[O]:{value:t.toString(),writable:!0}})}createProcessingInstruction(t,e){return Object.create(ProcessingInstruction.prototype,{[m]:{value:this,writable:!0},[S]:{value:null,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0},[D]:{value:t.toString(),writable:!0},[O]:{value:e.toString(),writable:!0}})}createDocumentFragment(){return Object.create(DocumentFragment.prototype,{[m]:{value:this,writable:!0},[S]:{value:null,writable:!1},[x]:{value:null,writable:!1},[E]:{value:null,writable:!1}})}getElementById(t){return this.querySelector("#"+t)}}class DocumentType extends Node{constructor(){throw super(),Error("Constructor should never be called")}get nodeType(){return 10}get internalSubset(){return null}set textContent(t){}get textContent(){return null}}function P(t,e="",n=""){return Object.create(DocumentType.prototype,{[m]:{value:null,writable:!0},name:{value:t,writable:!1},publicId:{value:e,writable:!1},systemId:{value:n,writable:!1},[S]:{value:null,writable:!0},[x]:{value:null,writable:!0},[E]:{value:null,writable:!0}})}t.CDATASection=CDATASection,t.CharacterData=CharacterData,t.Comment=Comment,t.Document=Document,t.DocumentFragment=DocumentFragment,t.DocumentType=DocumentType,t.Element=Element,t.Node=Node,t.ProcessingInstruction=ProcessingInstruction,t.Text=Text,t.createDocument=function(){return j(Object.create(class DOMDocument extends Document{constructor(){super()}}.prototype,{[m]:{value:null}}))},t.createDocumentType=P,t.createHTMLDocument=function(t=""){const e=Object.create(class HTMLDocument extends Document{get body(){for(const t of this.documentElement.children)if("body"==t.localName)return t;return null}get head(){for(const t of this.documentElement.children)if("head"==t.localName)return t;return null}constructor(){super()}}.prototype);e[m]=null,j(e),Object.defineProperty(e.Element.prototype,"className",{get(){return this.getAttribute("class")||""},set(t){this.setAttribute("class",t.trim())}});{e.appendChild(P("html"));const n=e.createElement("html");n.appendChild(e.createElement("head")).appendChild(e.createElement("title")).textContent=t,n.appendChild(e.createElement("body")),e.appendChild(n)}return e},Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).fallbackDom={});
//# sourceMappingURL=fallback-dom.js.map
