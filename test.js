import { serializeToString } from "./xml-serializer.js";
import { createHTMLDocument } from "./fallback-dom.js";

const assert = (c) => {
    if (!c()) {
        throw new Error("assert failed: " + c.toString());
    }
};

const doc = createHTMLDocument("test");
const ele = doc.body.appendChild(doc.createElement("span"));
ele.id = "spanId";
ele.className = "test example";
ele.textContent = "span-content";
ele.appendChild(doc.createComment(" comment-content "));

const checkIt = (e) => {

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
