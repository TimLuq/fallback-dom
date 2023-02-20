import { DocumentFragment, DocumentType, Element, Node, ProcessingInstruction } from "./fallback-dom.js";

export function serializeToString(node: Node) {
    return appendToString(node, "");
}

function appendToString(node: Node, s: string): string {
    const nodeType = node.nodeType;
    if (nodeType == 1) {
        const el = node as Element;
        s += "<" + el.tagName;
        if (el.prefix) {
            const parns = el.getAttributeNS("http://www.w3.org/2000/xmlns/", el.prefix) ?? el.parentNode?.lookupNamespaceURI(el.prefix);
            if (parns !== el.namespaceURI) {
                s += ` xmlns:${el.prefix}="${el.namespaceURI || ""}"`;
            }
        } else if (el.namespaceURI) {
            const parns = el.getAttributeNS(null, "xmlns") ?? el.parentNode?.lookupNamespaceURI(null);
            if (parns !== el.namespaceURI) {
                s += ` xmlns="${el.namespaceURI}"`;
            }
        }
        for (const attr of el.attributes) {
            let n = attr.localName;
            if (attr.prefix) {
                if (attr.lookupNamespaceURI(attr.prefix) !== attr.namespaceURI) {
                    s += ` xmlns:${attr.prefix}="${attr.namespaceURI || ""}"`;
                }
                n = attr.prefix + ":" + attr.localName;
            }
            s += ` ${n}="${xmlesc(attr.value)}"`;
        }
        if (el.hasChildNodes()) {
            s += ">";
            for (const c of el.childNodes) {
                s = appendToString(c, s);
            }
            return s + `</${el.tagName}>`;
        } else {
            return s + "/>";
        }
    }
    if (nodeType == 3) {
        return s + xmlesc(node.textContent);
    }
    if (nodeType == 4) {
        return s + `<[CDATA[${node.textContent}]]>`;
    }
    if (nodeType == 7) {
        const pi = node as ProcessingInstruction;
        return s + `<?${pi.target} ${pi.data}?>`;
    }
    if (nodeType == 8) {
        return s + `<!--${node.textContent}-->`;
    }
    if (nodeType == 9 || nodeType == 11) {
        const el = node as DocumentFragment;
        for (const c of el.childNodes) {
            s = appendToString(c, s);
        }
        return s;
    }
    if (nodeType == 10) {
        const el = node as DocumentType;
        s += "<!DOCTYPE " + el.name;
        if (el.publicId) {
            s += ` ${el.publicId}`;
        }
        if (el.systemId) {
            s += ` ${el.systemId}`;
        }
        if (el.internalSubset) {
            s += ` [${el.internalSubset}]>`;
        } else {
            s += ">";
        }
        return s;
    }
    throw new Error("Unexpected node type: " + nodeType);
}

const repl: { [k: string]: string } = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "\"": "&quot;",
    "'": "&apos;",
};

function xmlesc(data: string) {
    return data.replace(/[<>&"']/g, (m) => repl[m]);
}

