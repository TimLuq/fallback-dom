import { serializeToString } from "./xml-serializer.js";
import { createHTMLDocument } from "./fallback-dom.js";

const assert = (c) => {
    if (!c()) {
        const m = new Error("assert failed: " + c.toString());
        console.error(m);
        throw m;
    }
};

{
    const doc = createHTMLDocument("test0");
    const ele = doc.body.appendChild(doc.createElement("span"));
    ele.id = "spanId";
    ele.className = "test example";
    ele.textContent = "span-content";
    ele.appendChild(doc.createComment(" comment-content "));

    const checkIt = (e) => {
        assert(() => e.nodeType == 1);
        assert(() => e.localName == "span");
        assert(() => e.prefix === null);
        assert(() => e.namespaceURI == "http://www.w3.org/1999/xhtml");

        assert(() => e.firstChild.nodeType == 3);
        assert(() => e.firstChild.data == "span-content");
        assert(() => e.firstChild.textContent == "span-content");

        assert(() => e.lastChild.nodeType == 8);
        assert(() => e.lastChild.data == " comment-content ");
        assert(() => e.lastChild.textContent == " comment-content ");

        assert(() => e.textContent == "span-content");
        assert(() => e.firstChild.previousSibling === null);
        assert(() => e.firstChild.nextSibling === e.lastChild);
        assert(() => e.lastChild.previousSibling === e.firstChild);
        assert(() => e.lastChild.nextSibling === null);

        assert(() => e.lastChild.parentNode === e);
    };

    checkIt(ele);
    checkIt(ele.cloneNode(true));

    const frag = doc.createDocumentFragment();
    const cloned = Array.from(doc.childNodes).map((x) => x.cloneNode(true));
    frag.append(...cloned);
    console.log(serializeToString(frag));
}

{
    const doc = createHTMLDocument("test1");
    const ele = doc.body.appendChild(doc.createElement("span"));
    ele.id = "spanId";
    ele.className = "test example";
    ele.textContent = "span-content";
    ele.appendChild(doc.createComment(" comment-content "));

    const svg = ele.appendChild(doc.createElementNS("http://www.w3.org/2000/svg", "svg"));
    svg.setAttribute("id", "svgId");
    svg.setAttribute("height", "100");
    svg.setAttribute("width", "100");
    const g = svg.appendChild(doc.createElementNS("http://www.w3.org/2000/svg", "g"));
    g.setAttribute("id", "g1");
    g.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "https://example.com");

    const cstm = ele.appendChild(doc.createElementNS("http://example.com/custom", "ex:custom"));
    cstm.setAttribute("id", "svgId");
    cstm.setAttribute("height", "100");
    cstm.setAttribute("width", "100");
    cstm.appendChild(doc.createElementNS("http://example.com/custom", "ex:subtag")).setAttribute("id", "sub-w-pfx");
    cstm.appendChild(doc.createElementNS("http://example.com/custom", "subtag")).setAttribute("id", "sub-no-pfx");

    const checkIt = (e) => {
        assert(() => doc.lookupNamespaceURI(null) == "http://www.w3.org/1999/xhtml");

        assert(() => e.nodeType == 1);
        assert(() => e.localName == "span");
        assert(() => e.tagName == "span");
        assert(() => e.prefix === null);
        assert(() => e.namespaceURI == "http://www.w3.org/1999/xhtml");

        assert(() => e.firstChild.nodeType == 3);
        assert(() => e.firstChild.data == "span-content");
        assert(() => e.firstChild.textContent == "span-content");

        assert(() => e.lastChild.nodeType == 1);
        assert(() => e.lastChild.localName == "custom");
        assert(() => e.lastChild.tagName == "ex:custom");
        assert(() => e.lastChild.prefix === "ex");
        assert(() => e.lastChild.namespaceURI == "http://example.com/custom");

        assert(() => e.childNodes[2].nodeType == 1);
        assert(() => e.childNodes[2].localName == "svg");
        assert(() => e.childNodes[2].tagName == "svg");
        assert(() => e.childNodes[2].prefix === null);
        assert(() => e.childNodes[2].namespaceURI == "http://www.w3.org/2000/svg");

        assert(() => e.textContent == "span-content");
        assert(() => e.childNodes[1].data == " comment-content ");
        assert(() => e.firstChild.previousSibling === null);
        assert(() => e.firstChild.nextSibling.nextSibling.nextSibling === e.lastChild);
        assert(() => e.lastChild.previousSibling.previousSibling.previousSibling === e.firstChild);
        assert(() => e.lastChild.nextSibling === null);

        assert(() => e.lastChild.parentNode === e);
    };

    checkIt(ele);
    checkIt(ele.cloneNode(true));

    const frag = doc.createDocumentFragment();
    const cloned = Array.from(doc.childNodes).map((x) => x.cloneNode(true));
    frag.append(...cloned);
    console.log(serializeToString(frag));
}
