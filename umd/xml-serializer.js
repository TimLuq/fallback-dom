var e,t;e=this,t=function(e){function t(e,n){const r=e.nodeType;if(1==r){const r=e;n+="<"+r.tagName,r.prefix?(r.getAttributeNS("http://www.w3.org/2000/xmlns/",r.prefix)??r.parentNode?.lookupNamespaceURI(r.prefix))!==r.namespaceURI&&(n+=` xmlns:${r.prefix}="${r.namespaceURI||""}"`):r.namespaceURI&&(r.getAttributeNS("http://www.w3.org/2000/xmlns/","xmlns")??r.getAttributeNS(null,"xmlns")??r.parentNode?.lookupNamespaceURI(null))!==r.namespaceURI&&(n+=` xmlns="${r.namespaceURI}"`);for(const e of r.attributes){let t=e.localName;e.prefix&&(e.lookupNamespaceURI(e.prefix)!==e.namespaceURI&&(n+=` xmlns:${e.prefix}="${e.namespaceURI||""}"`),t=e.prefix+":"+e.localName),n+=` ${t}="${o(e.value)}"`}if(r.hasChildNodes()){n+=">";for(const e of r.childNodes)n=t(e,n);return n+`</${r.tagName}>`}return n+"/>"}if(3==r)return n+o(e.textContent);if(4==r)return n+`<[CDATA[${e.textContent}]]>`;if(7==r){const t=e;return n+`<?${t.target} ${t.data}?>`}if(8==r)return n+`<!--${e.textContent}-->`;if(9==r||11==r){const o=e;for(const e of o.childNodes)n=t(e,n);return n}if(10==r){const t=e;return n+="<!DOCTYPE "+t.name,t.publicId&&(n+=" "+t.publicId),t.systemId&&(n+=" "+t.systemId),t.internalSubset?n+=` [${t.internalSubset}]>`:n+=">",n}throw Error("Unexpected node type: "+r)}const n={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"};function o(e){return e.replace(/[<>&"']/g,(e=>n[e]))}e.serializeToString=function(e){return t(e,"")}},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).xmlSerializer={});
//# sourceMappingURL=xml-serializer.js.map
