# fallback-dom

A lightweight standalone partial DOM implementation written in TypeScript. This could be useful for tests and other scenarios where a DOM is required but not available per default.

This package has three module files available for use:
- `fallback-dom` (has a dependency on `query-selector`.)
- `query-selector`
- `xml-serializer`

This repo contains pre-built JS files to be able to be used as a git dependency without extra build steps. The only real source files are the ones matching `./*.ts`.

## Module: fallback-dom

Main module that exposes the partial DOM implementation.

Imports:
```js
import { querySel } from "./query-selector.js";
```

Base classes (should never be extended or initialized):
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
