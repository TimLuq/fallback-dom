!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).querySelector={})}(this,(function(t){"use strict";function n(t){const n={};{const i=t.match(/^[\p{L}_][0-9\p{L}_-]*/u);i?(n.t=i[0],t=t.substring(i[0].length)):t.startsWith("*")&&(n.t=void 0,t=t.substring(1))}for(;t;){if(t.startsWith("#")){const i=t.match(/^#[\p{L}_][0-9\p{L}_-]*/u);if(i){const e=i[0].substring(1);if(n.i&&n.i!=e)throw Error("selector will always fail, elements can't contain multiple ids");n.i=e,t=t.substring(i[0].length);continue}throw Error("invalid id at "+JSON.stringify(t))}if(t.startsWith(".")){const i=t.match(/^\.[\p{L}_][0-9\p{L}_-]*/u);if(i){n.c||(n.c=new Set),n.c.add(i[0].substring(1)),t=t.substring(i[0].length);continue}throw Error("invalid class at "+JSON.stringify(t))}if(t.startsWith("[")){const e=i(t=t.substring(1)),r=e[0].n;if(n.a){const t=n.a.get(r);n.a.set(r,o(t,e[0].v))}else{const t=new Map,i=e[0].v;t.set(r,void 0===i?null:"string"==typeof i?i:[i]),n.a=t}if((t=e[1]).startsWith("]")){t=t.substring(1);continue}throw Error("unexpected characters in attribute section: "+JSON.stringify(t))}}if(Object.keys(n).length)return[n,t];throw Error("unexpected part at "+JSON.stringify(t))}function i(t){const n=t.match(/^[\p{L}_][0-9\p{L}._-]*/u);if(!n)throw Error("expected attribute name, found "+JSON.stringify(t));const i={n:n[0]};let r;if((t=t.substring(n[0].length)).startsWith("=")?(r="=",t=t.substring(1)):t.startsWith("*=")?(r="*",t=t.substring(2)):t.startsWith("~=")?(r="~",t=t.substring(2)):t.startsWith("|=")?(r="|",t=t.substring(2)):t.startsWith("$=")?(r="$",t=t.substring(2)):t.startsWith("^=")&&(r="^",t=t.substring(2)),r){const n=function(t){if(t.startsWith('"')){const n=t.indexOf('"',1);if(-1!=n)return[t.substring(1,n),t.substring(n+1)];throw Error("no end of string at "+JSON.stringify(t))}const n=t.match(/^[\d\p{L}._-]+/u);if(n)return[n[0],t.substring(n[0].length)];throw Error("unexpected unquoted data at "+JSON.stringify(t))}(t);t=n[1];const s=n[0];"="==r?i.v=s:"*"==r?i.v=t=>t.includes(s):"|"==r?i.v=t=>t==s||t.startsWith(s+"-"):"^"==r?i.v=t=>t.startsWith(s):"$"==r?i.v=t=>t.endsWith(s):"~"==r&&(i.v=t=>e(t,s))}if(t.startsWith("]"))return[i,t.substring(1)];throw Error("expected end of attribute section but found "+JSON.stringify(t))}function e(t,n){let i=0;for(;i!=t.length;){const e=t.indexOf(" ",i+1),r=-1==e?t.length:e;if(r-i==n.length&&t.substring(i,r)==n)return!0;i=r}return!1}function r(t,n,i){t:for(const s of n)if(!s.t||s.t==i.localName){if(s.i){if("function"!=typeof i.getAttribute)continue t;const t=i.getAttribute("id");if(!t||t!=s.i)continue t}if(s.c){if("function"!=typeof i.getAttribute)continue t;const t=i.getAttribute("class");if(!t)continue t;for(const n of s.c)if(!e(t,n))continue t}if(s.a){if("function"!=typeof i.getAttribute)continue t;for(const[t,n]of s.a){const e=i.getAttribute(t);if(!e)continue t;if("string"==typeof n){if(e==n)continue;continue t}if(n)for(const t of n)if(!t(e))continue t}}if(s.p){const n=s.p[0];if("+"==n){const n=i.previousSibling;if(!n)continue t;if(!r(t,[s.p[1]],n))continue t}else if("~"==n){let n=i.previousSibling,e=!1;const o=[s.p[1]];for(;!e&&n;)e=r(t,o,n),n=n.previousSibling;if(!e)continue t}else if(">"==n){const n=i.parentNode;if(!n)continue t;if(!r(t,[s.p[1]],n))continue t}else if(" "==n){let n=i.parentNode,e=!1;const o=[s.p[1]];for(;!e&&n;)e=r(t,o,n),n=n.parentNode;if(!e)continue t}}return!0}return!1}function*s(t,n){const i=t.childNodes;if(i)for(const e of i)1==e.nodeType&&(r(t,n,e)&&(yield e),yield*s(e,n))}function o(t,n){if(void 0===n)return void 0!==t?t:null;if("string"==typeof n){if(null==t)return n;if("string"==typeof t){if(t==n)return t}else{let i=!1;for(const e of t)e(n)||(i=!0);if(!i)return n}}else{if(null==t)return[n];if("string"!=typeof t)return t.push(n),t;if(n(t))return t}throw Error("no possible attribute could ever match")}t.querySel=function(t,i){return s(t,function(t){t=t.trim();const i=[];let e=null;do{let r="";if(e){const n=t.match(/^\s*(>|\+|~|,| )\s*/);if(!n)throw Error("Unable to parse joiner at "+JSON.stringify(t));r=n[1],t=t.substring(n[0].length),","==r&&(i.push(e),e=null,r="")}if(!t)throw Error("unable to parse the empty string as a selector");const s=n(t),o=s[0];e&&(o.p=[r,e]),e=o,t=s[1]}while(t);return i.push(e),i}(i))},Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=query-selector.js.map
