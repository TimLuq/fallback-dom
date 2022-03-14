declare const symDefinedTag: unique symbol;
declare const symCustomElements: unique symbol;
declare const symDocument: unique symbol;
declare const symTagName: unique symbol;
declare const symRegReg: unique symbol;
declare const symRegCon: unique symbol;
declare const symRegWhen: unique symbol;
declare class CustomElementRegistry {
    readonly [symRegReg]: Map<string, new () => Element>;
    readonly [symRegCon]: Map<Function, string>;
    readonly [symRegWhen]: Map<string, ((a: new () => Element) => void)[]>;
    define(name: string, constructor: new () => Element): void;
    upgrade(root: Element): void;
    whenDefined(name: string): Promise<new () => Element>;
    get(name: string): (new () => Element) | undefined;
    [symDefinedTag](cons: Function): string | undefined;
}
declare const symParent: unique symbol;
declare const symPreviousSibling: unique symbol;
declare const symNextSibling: unique symbol;
export declare abstract class Node {
    abstract readonly nodeType: number;
    abstract readonly textContent: string;
    readonly [symDocument]: Document | null;
    [symParent]: ParentNode | null;
    [symPreviousSibling]: Node | null;
    [symNextSibling]: Node | null;
    get parentNode(): ParentNode | null;
    get previousSibling(): Node | null;
    get nextSibling(): Node | null;
    get ownerDocument(): Document | null;
    protected constructor();
    cloneNode(deep?: boolean): Node;
    protected unsafeSetParent(parentNode: ParentNode | null): void;
    protected unsafeReplaceParent(parentNode: ParentNode | null): void;
    protected unsafeSetPrev(previousSibling: Node | null): void;
    protected unsafeSetNext(nextSibling: Node | null): void;
}
declare const symChildNodes: unique symbol;
declare const symChildren: unique symbol;
declare abstract class ParentNode extends Node {
    [symChildNodes]?: Node[];
    [symChildren]?: Element[];
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
    insertBefore<N extends Node>(a: N, child: Node | null): N;
    appendChild<T extends Node>(a: T): T;
    removeChild<T extends Node>(a: T): T;
    getElementsByClassName(cls: string): ArrayLike<Element> & Iterable<Element>;
    getElementsByTagName(tag: string): ArrayLike<Element> & Iterable<Element>;
}
declare const symTextContent: unique symbol;
export declare abstract class CharacterData extends Node {
    [symTextContent]: string;
    get data(): string;
    set data(content: string);
    get length(): number;
    protected constructor(text: string);
    appendData(data: string): void;
}
export declare class Text extends CharacterData {
    get nodeType(): 3;
    get textContent(): string;
    set textContent(content: string);
    protected constructor(text: string);
}
export declare class CDATASection extends CharacterData {
    get nodeType(): 4;
    get textContent(): string;
    set textContent(content: string);
    protected constructor(text: string);
}
declare const symTarget: unique symbol;
export declare class ProcessingInstruction extends CharacterData {
    [symTarget]: string;
    get nodeType(): 7;
    get target(): string;
    get textContent(): string;
    set textContent(content: string);
    protected constructor(target: string, text: string);
}
export declare class Comment extends CharacterData {
    get nodeType(): 8;
    get textContent(): string;
    set textContent(content: string);
    protected constructor(text: string);
}
export declare class DocumentFragment extends ParentNode {
    get nodeType(): 11;
    protected constructor();
}
declare abstract class Attr extends Node {
    readonly ownerElement: Element;
    readonly name: string;
    readonly value: string;
    get specified(): boolean;
    get prefix(): string | null;
    get localName(): string;
}
declare const symAttributes: unique symbol;
export declare abstract class Element extends ParentNode {
    readonly [symTagName]: string;
    [symAttributes]?: Map<string, string>;
    get nodeType(): 1;
    get tagName(): string;
    get localName(): string;
    get id(): string;
    set id(id: string);
    get attributes(): ArrayLike<Attr> & Iterable<Attr>;
    protected constructor();
    getAttribute(att: string): string | null;
    setAttribute(att: string, val: string): void;
    remove(): void;
}
declare const symElement: unique symbol;
export declare abstract class Document extends ParentNode {
    [symElement]: new () => Element;
    [symCustomElements]?: CustomElementRegistry;
    get Element(): new () => Element;
    get customElements(): CustomElementRegistry;
    get nodeType(): 9;
    get documentElement(): Element | null;
    protected constructor();
    createElement(tagName: string): Element;
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
