function e(e){return t(e,"")}function t(e,n){const a=e.nodeType;if(1==a){const a=e;n+="<"+a.tagName,a.prefix?(a.getAttributeNS("http://www.w3.org/2000/xmlns/",a.prefix)??a.parentNode?.lookupNamespaceURI(a.prefix))!==a.namespaceURI&&(n+=` xmlns:${a.prefix}="${a.namespaceURI||""}"`):a.namespaceURI&&(a.getAttributeNS(null,"xmlns")??a.parentNode?.lookupNamespaceURI(null))!==a.namespaceURI&&(n+=` xmlns="${a.namespaceURI}"`);for(const e of a.attributes){let t=e.localName;e.prefix&&(e.lookupNamespaceURI(e.prefix)!==e.namespaceURI&&(n+=` xmlns:${e.prefix}="${e.namespaceURI||""}"`),t=e.prefix+":"+e.localName),n+=` ${t}="${r(e.value)}"`}if(a.hasChildNodes()){n+=">";for(const e of a.childNodes)n=t(e,n);return n+`</${a.tagName}>`}return n+"/>"}if(3==a)return n+r(e.textContent);if(4==a)return n+`<[CDATA[${e.textContent}]]>`;if(7==a){const t=e;return n+`<?${t.target} ${t.data}?>`}if(8==a)return n+`<!--${e.textContent}-->`;if(9==a||11==a){const r=e;for(const e of r.childNodes)n=t(e,n);return n}if(10==a){const t=e;return n+="<!DOCTYPE "+t.name,t.publicId&&(n+=" "+t.publicId),t.systemId&&(n+=" "+t.systemId),t.internalSubset?n+=` [${t.internalSubset}]>`:n+=">",n}throw Error("Unexpected node type: "+a)}const n={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"};function r(e){return e.replace(/[<>&"']/g,(e=>n[e]))}export{e as serializeToString};
//# sourceMappingURL=xml-serializer.js.map
