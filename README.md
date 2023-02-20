# fallback-dom

A lightweight standalone partial DOM implementation written in TypeScript.
It should work in all modern environments without any hassle or external dependencies. (Feel free to open an issue and prove me wrong!)
This could be useful for tests and other scenarios where a DOM is required but not available per default.

This is not a full implementation of DOM, but the aim is to behave close to spec for every exposed API, and expose the most common or simple parts.
Notable exceptions to this are events and where the spec wants the returned value to be a live representation of matched nodes as long as the object lives, currently in this implementation they are computed at call time.
These special cases includes `Element.prototype.childNodes`, `Element.prototype.querySelectorAll`, etc.

Supports namespaces and a partial version of `CustomElements`.

This package has three module files available for use:

- `fallback-dom` (has a dependency on `query-selector`.)
- `query-selector`
- `xml-serializer`

This repo contains pre-built JS files to be able to be used as a git dependency without extra build steps. The only real source files are the ones matching `./*.ts`.

## Module: fallback-dom

Main module that exposes the partial DOM implementation.

### Imports

```js
import { querySel } from "./query-selector.js";
```

### Base classes

These should never be extended or initialized. An exception to this rule is `Element` which may be extended if the extended class then is registered on `Document.prototype.customElements`.

```js
export { CDATASection, Comment, DocumentType, Element, Node, ProcessingInstruction, Text };
```

Functions:

```js
export { createDocument, createDocumentType, createHTMLDocument };
```

## Module: query-selector

Helper module that applies a subset of CSS selectors to find matching elements.

Functions:

```js
export { querySel };
```

## Module: xml-serializer

Extension module that can be used to serialize the DOM to a string.

Functions:

```js
export { serializeToString };
```
