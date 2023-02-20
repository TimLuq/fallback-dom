declare const symCustomElements: unique symbol;
declare const symDocument: unique symbol;
declare const symRegReg: unique symbol;
declare const symRegCon: unique symbol;
declare const symRegWhen: unique symbol;
declare const symLocalName: unique symbol;
declare const symPrefix: unique symbol;
declare const symNsUri: unique symbol;
declare const symIsCustomElement: unique symbol;
declare const symCustomElementState: unique symbol;
declare class CustomElementRegistry {
    private readonly [symRegReg];
    private readonly [symRegCon];
    private readonly [symRegWhen];
    define(name: string, constructor: new () => Element): void;
    upgrade(root: Element): void;
    whenDefined(name: string): Promise<new () => Element>;
    get(name: string): (new () => Element) | undefined;
}
declare class DOMTokenList {
    private readonly _split;
    private readonly _accessor;
    private readonly _setter;
    private readonly _d;
    private readonly _comb;
    private _lastRead?;
    constructor(split: RegExp, combiner: string, accessor: () => string | null | undefined, setter: (v: string) => any);
    private _upd;
    get length(): number;
    get value(): string;
    set value(val: string);
    toString(): string;
    add(...tokens: string[]): void;
    contains(token: string): boolean;
    remove(...tokens: string[]): void;
    replace(token: string, newToken: string): boolean;
    toggle(token: string, force?: boolean): boolean;
    forEach(f: (value: string, key: number, parent: DOMTokenList) => void, thisArg?: any): void;
}
declare const symParent: unique symbol;
declare const symPreviousSibling: unique symbol;
declare const symNextSibling: unique symbol;
export declare abstract class Node {
    abstract readonly nodeType: number;
    abstract readonly nodeName: string;
    abstract readonly textContent: string;
    protected readonly [symDocument]: Document | null;
    protected [symParent]: ParentNode | null;
    protected [symPreviousSibling]: Node | null;
    protected [symNextSibling]: Node | null;
    get parentNode(): ParentNode | null;
    get previousSibling(): Node | null;
    get nextSibling(): Node | null;
    get ownerDocument(): Document | null;
    get isConnected(): boolean;
    protected constructor();
    /**
     * Looks up the namespace URI associated to the given prefix, starting from this node.
     *
     * If the `prefix` parameter is `null` or an empty string, the method will return the default namespace URI if any.
     *
     * @param {string | null} prefix the prefix to look for.
     * @returns {string | null} the associated namespace URI or null if none is found.
     */
    lookupNamespaceURI(prefix: string | null): string | null;
    /**
     * Looks up the prefix associated to the given namespace URI, starting from this node.
     * The default namespace declarations are ignored by this method.
     *
     * @param {string | null} namespace the namespace URI to look for
     * @returns {string | null} the associated prefix or null if none is found
     */
    lookupPrefix(namespace: string | null): string | null;
    cloneNode(deep?: boolean): Node;
    protected unsafeSetParent(parentNode: ParentNode | null): void;
    protected unsafeReplaceParent(parentNode: ParentNode | null): void;
    protected unsafeSetPrev(previousSibling: Node | null): void;
    protected unsafeSetNext(nextSibling: Node | null): void;
}
declare const symChildNodes: unique symbol;
declare const symChildren: unique symbol;
declare abstract class ParentNode extends Node {
    private [symChildNodes]?;
    private [symChildren]?;
    /** @type {string} */
    get textContent(): string;
    set textContent(content: string);
    hasChildNodes(): boolean;
    get childNodes(): ArrayLike<Node> & Iterable<Node>;
    get childElementCount(): number;
    get children(): ArrayLike<Element> & Iterable<Element>;
    get firstElementChild(): Element | null;
    get lastElementChild(): Element | null;
    get firstChild(): Node | null;
    get lastChild(): Node | null;
    protected constructor();
    append(...nodes: (Node | string)[]): void;
    prepend(...nodes: (Node | string)[]): void;
    querySelector<E extends Element = Element>(selectors: string): E | null;
    querySelectorAll<E extends Element = Element>(selectors: string): ArrayLike<E> & Iterable<E>;
    replaceChildren(...nodes: (Node | string)[]): void;
    replaceChild<N extends Node>(newChild: Node, oldChild: N): N;
    insertBefore<N extends Node>(a: N, child: Node | null): N;
    appendChild<T extends Node>(a: T): T;
    removeChild<T extends Node>(a: T): T;
    getElementsByClassName(cls: string): ArrayLike<Element> & Iterable<Element>;
    getElementsByTagName(tag: string): ArrayLike<Element> & Iterable<Element>;
    getElementsByTagNameNS(ns: string | null, tag: string): ArrayLike<Element> & Iterable<Element>;
}
declare const symTextContent: unique symbol;
export declare abstract class CharacterData extends Node {
    private [symTextContent];
    get data(): string;
    set data(content: string);
    get length(): number;
    protected constructor(text: string);
    appendData(data: string): void;
}
export declare class Text extends CharacterData {
    get nodeType(): 3;
    get nodeName(): string;
    get textContent(): string;
    set textContent(content: string);
    protected constructor(text: string);
}
export declare class CDATASection extends CharacterData {
    get nodeType(): 4;
    get nodeName(): string;
    get textContent(): string;
    set textContent(content: string);
    protected constructor(text: string);
}
declare const symTarget: unique symbol;
export declare class ProcessingInstruction extends CharacterData {
    private [symTarget];
    get nodeType(): 7;
    get nodeName(): string;
    get target(): string;
    get textContent(): string;
    set textContent(content: string);
    protected constructor(target: string, text: string);
}
export declare class Comment extends CharacterData {
    get nodeType(): 8;
    get nodeName(): string;
    get textContent(): string;
    set textContent(content: string);
    protected constructor(text: string);
}
export declare class DocumentFragment extends ParentNode {
    get nodeType(): 11;
    get nodeName(): string;
    protected constructor();
}
declare abstract class Attr extends Node {
    readonly namespaceURI: string | null;
    readonly ownerElement: Element;
    readonly localName: string;
    readonly prefix: string | null;
    readonly value: string;
    get specified(): boolean;
    get name(): string;
    get nodeType(): number;
    get nodeName(): string;
}
declare const symAttributes: unique symbol;
declare const symClassList: unique symbol;
export declare abstract class Element extends ParentNode {
    protected readonly [symNsUri]: string | null;
    protected readonly [symLocalName]: string;
    protected readonly [symPrefix]: string | null;
    private [symAttributes]?;
    private [symClassList]?;
    private readonly [symIsCustomElement]?;
    private readonly [symCustomElementState]?;
    get nodeType(): 1;
    get nodeName(): string;
    get tagName(): string;
    get localName(): string;
    get prefix(): string | null;
    get namespaceURI(): string | null;
    get [Symbol.toStringTag](): string;
    get id(): string;
    set id(id: string);
    get classList(): DOMTokenList;
    get attributes(): ArrayLike<Attr> & Iterable<Attr>;
    protected constructor();
    disconnectedCallback?(): void;
    connectedCallback?(): void;
    getAttribute(att: string): string | null;
    getAttributeNS(ns: string | null, att: string): string | null;
    setAttribute(att: string, val: string): void;
    setAttributeNS(ns: string | null, att: string, val: string): void;
    removeAttribute(att: string): void;
    removeAttributeNS(ns: string | null, att: string): void;
    remove(): void;
}
declare const symElement: unique symbol;
declare const symDefNs: unique symbol;
export declare abstract class Document extends ParentNode {
    private [symElement];
    private [symCustomElements]?;
    protected [symDefNs]: Map<string, string>;
    get Element(): new () => Element;
    get isConnected(): boolean;
    get customElements(): CustomElementRegistry;
    get nodeType(): 9;
    get nodeName(): string;
    get documentElement(): Element | null;
    protected constructor();
    createElement(tagName: string): Element;
    createElementNS(ns: string | null, qName: string): Element;
    createTextNode(text: string): Text;
    createComment(data: string): Comment;
    createCDATASection(data: string): CDATASection;
    createProcessingInstruction(target: string, data: string): ProcessingInstruction;
    createDocumentFragment(): DocumentFragment;
    getElementById(id: string): Element | null;
}
export declare function createDocument(): Document;
export declare function createHTMLDocument(docTitle?: string): Document;
export declare class DocumentType extends Node {
    get nodeType(): 10;
    get nodeName(): string;
    get internalSubset(): null | string;
    set textContent(content: string);
    get textContent(): string;
    readonly name: string;
    readonly publicId: string;
    readonly systemId: string;
    private constructor();
}
export declare function createDocumentType(qualifiedNameStr: string, publicId?: string, systemId?: string): DocumentType;
export {};
