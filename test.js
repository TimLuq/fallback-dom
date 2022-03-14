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

assert(() => ele.firstChild.nodeType == 3);
assert(() => ele.firstChild.data == "span-content");
assert(() => ele.firstChild.textContent == "span-content");

assert(() => ele.lastChild.nodeType == 8);
assert(() => ele.lastChild.data == " comment-content ");
assert(() => ele.lastChild.textContent == " comment-content ");

assert(() => ele.textContent == "span-content");
assert(() => ele.firstChild.previousSibling === null);
assert(() => ele.firstChild.nextSibling === ele.lastChild);
assert(() => ele.lastChild.previousSibling === ele.firstChild);
assert(() => ele.lastChild.nextSibling === null);

console.log(serializeToString(doc));
