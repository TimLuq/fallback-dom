import { querySel } from "./query-selector.js";

const symDefinedTag = Symbol("definedTag");
const symCustomElements = Symbol("customElements");
const symDocument = Symbol("document");
const symTagName = Symbol("tagName");

const symRegReg = Symbol("reg");
const symRegCon = Symbol("con");
const symRegWhen = Symbol("when");
class CustomElementRegistry {
    readonly [symRegReg] = new Map<string, new() => Element>();
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly [symRegCon] = new Map<Function, string>();
    readonly [symRegWhen] = new Map<string, ((a: new() => Element) => void)[]>();

    public define(name: string, constructor: new() => Element) {
        const reg = this[symRegReg];
        if (reg.has(name)) {
            throw new Error("element " + JSON.stringify(name) + " has already been defined");
        }
        const proto = constructor.prototype;
        let e = proto;
        while (e) {
            if (e !== Element.prototype) {
                e = Object.getPrototypeOf(e);
                continue;
            }
            break;
        }
        if (!e) {
            throw new Error("the constructor of element " + JSON.stringify(name) + " is not a decendant of the right kind of Element class");
        }
        const con = this[symRegCon];
        if (Element == constructor || con.has(constructor)) {
            throw new Error("the prototype of element " + JSON.stringify(name) + " must be unique");
        }
        reg.set(name, constructor);
        con.set(constructor, name);
        proto[symTagName] = name;

        const when = this[symRegWhen].get(name);
        if (when) {
            this[symRegWhen].delete(name);
            for (const w of when) {
                w(constructor);
            }
        }
    }

    public upgrade(root: Element) {
        const reg = this[symRegReg];
        const name = root.tagName;
        const cls = reg.get(name);
        if (!cls) {
            return;
        }
        const prev = Object.getPrototypeOf(root);
        if (prev !== Element.prototype) {
            return;
        }
        try {
            Object.setPrototypeOf(root, cls.prototype);
            cls.call(root);
        } catch (e) {
            Object.setPrototypeOf(root, prev);
            throw e;
        }
    }

    public whenDefined(name: string): Promise<new() => Element> {
        const p = this[symRegReg].get(name);
        if (p) {
            return Promise.resolve(p);
        }
        let w = this[symRegWhen].get(name);
        if (!w) {
            w = [];
            this[symRegWhen].set(name, w);
        }
        const ww = w;
        return new Promise((res) => ww.push(res));
    }

    public get(name: string): (new() => Element) | undefined {
        return this[symRegReg].get(name);
    }
    

    // eslint-disable-next-line @typescript-eslint/ban-types
    public [symDefinedTag](cons: Function): string | undefined {
        return this[symRegCon].get(cons);
    }
}

class DOMTokenList {
    private readonly _split: RegExp;
    private readonly _accessor: () => string | null | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly _setter: (v: string) => any;
    private readonly _d = new Set<string>();
    private readonly _comb: string;
    private _lastRead?: string | null;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(split: RegExp, combiner: string, accessor: () => string | null | undefined, setter: (v: string) => any) {
        this._split = split;
        this._accessor = accessor;
        this._setter = setter;
        this._comb = combiner;
    }

    private _upd() {
        const r = this._accessor();
        const d = this._d;
        if (r == this._lastRead) {
            return d;
        }
        this._lastRead = r;
        d.clear();
        if (!r) {
            return d;
        }
        for (const c of r.split(this._split)) {
            c && d.add(c);
        }
        return d;
    }

    public get length() {
        const d = this._upd();
        return d.size;
    }

    public get value() {
        this._upd();
        return this._lastRead || "";
    }
    public set value(val: string) {
        this._upd();
        this._setter(val || "");
    }
    public toString() {
        this._upd();
        return this._lastRead || "";
    }
    public add(...tokens: string[]) {
        const d = this._upd();
        const s = this._split;
        for (const t of tokens) {
            if (!t) {
                continue;
            }
            if (s.test(t)) {
                throw new Error("invalid token");
            }
            d.add(t);
        }
        this._setter(Array.from(d).join(this._comb));
    }
    public contains(token: string): boolean {
        const d = this._upd();
        return d.has(token);
    }
    public remove(...tokens: string[]) {
        const d = this._upd();
        const s = this._split;
        for (const t of tokens) {
            if (!t) {
                continue;
            }
            if (s.test(t)) {
                throw new Error("invalid token");
            }
            d.delete(t);
        }
        this._setter(Array.from(d).join(this._comb));
    }
    public replace(token: string, newToken: string): boolean {
        const d = this._upd();
        if (!d.delete(token)) {
            return false;
        }
        if (this._split.test(newToken)) {
            throw new Error("invalid token");
        }
        d.add(newToken);
        this._setter(Array.from(d).join(this._comb));
        return true;
    }
    public toggle(token: string, force?: boolean): boolean {
        const d = this._upd();
        if (!force) {
            if (d.delete(token) || force === false) {
                return false;
            }
        }
        if (this._split.test(token)) {
            throw new Error("invalid token");
        }
        d.add(token);
        this._setter(Array.from(d).join(this._comb));
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public forEach(f: (value: string, key: number, parent: DOMTokenList) => void, thisArg?: any): void {
        const d = this._upd();
        d.forEach((v) => f.call(thisArg, v, -1, this));
    }
}

const symParent = Symbol("parent");
const symPreviousSibling = Symbol("previousSibling");
const symNextSibling = Symbol("nextSibling");
export abstract class Node {
    public abstract readonly nodeType: number;
    public abstract readonly textContent: string;

    readonly [symDocument]: Document | null;
    [symParent]: ParentNode | null = null;
    [symPreviousSibling]: Node | null = null;
    [symNextSibling]: Node | null = null;

    public get parentNode(): ParentNode | null {
        return this[symParent];
    }
    public get previousSibling(): Node | null {
        return this[symPreviousSibling];
    }
    public get nextSibling(): Node | null {
        return this[symNextSibling];
    }
    public get ownerDocument(): Document | null {
        return this[symDocument];
    }

    protected constructor() {
        if (this[symDocument] === undefined) {
            throw new Error("a node must be created by a document");
        }
    }

    public cloneNode(deep = false): Node {
        const base: Node = this.nodeType == 9 && this.constructor != this.ownerDocument?.Element
            ? new (this.constructor as new() => Element)()
            : Object.create(Object.getPrototypeOf(this), {
                [symDocument]: { value: this[symDocument], writable: true },
                [symParent]: { value: null, writable: true },
                [symPreviousSibling]: { value: null, writable: true },
                [symNextSibling]: { value: null, writable: true },
            });
        
        {
            const tcont = (this as Node as Text)[symTextContent];
            if (typeof tcont != "undefined") {
                Object.defineProperty(base, symTextContent, { value: tcont, writable: true });
            }
        }
        {
            const tatt = (this as Node as Element)[symAttributes];
            if (typeof tatt != "undefined") {
                Object.defineProperty(base, symAttributes, { value: new Map<string, string>(tatt), writable: true });
            }
        }
        {
            const tatt = (this as Node as Element)[symTagName];
            if (!(base as Element)[symTagName] && typeof tatt != "undefined") {
                Object.defineProperty(base, symTagName, { value: tatt, writable: true });
            }
        }
        {
            const tatt = (this as Node as ProcessingInstruction)[symTarget];
            if (!(base as ProcessingInstruction)[symTarget] && typeof tatt != "undefined") {
                Object.defineProperty(base, symTarget, { value: tatt, writable: false });
            }
        }
        if (this.nodeType == 10) {
            const t = this as Node as DocumentType;
            Object.defineProperties(base, {
                name: { value: t.name, writable: false },
                publicId: { value: t.publicId, writable: false },
                systemId: { value: t.systemId, writable: false },
            });
        }
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!deep || !(this as any)[symChildNodes]) {
            return base;
        }
        const t = this as Node as ParentNode;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        for (const c of t[symChildNodes]!) {
            (base as ParentNode).insertBefore(c.cloneNode(true), null);
        }
        return base;
    }

    protected unsafeSetParent(parentNode: ParentNode | null) {
        this[symParent] = parentNode;
    }
    protected unsafeReplaceParent(parentNode: ParentNode | null) {
        const p = this[symParent];
        if (p) {
            p.removeChild(this);
        }
        this[symParent] = parentNode;
    }
    protected unsafeSetPrev(previousSibling: Node | null) {
        this[symPreviousSibling] = previousSibling;
        if (previousSibling) {
            previousSibling[symNextSibling] = this;
        }
    }
    protected unsafeSetNext(nextSibling: Node | null) {
        this[symNextSibling] = nextSibling;
        if (nextSibling) {
            nextSibling[symPreviousSibling] = this;
        }
    }
}

const symChildNodes = Symbol("childNodes");
const symChildren = Symbol("children");
abstract class ParentNode extends Node {
    [symChildNodes]?: Node[];
    [symChildren]?: Element[];

    /** @type {string} */
    public get textContent() {
        const nodes = this[symChildNodes];
        return nodes
            ? nodes.reduce(
                (p, a) => {
                    const t = a.nodeType;
                    return t == 1 || t == 3 || t == 4 ? p + a.textContent : p;
                },
                ""
            )
            : "";
    }
    public set textContent(content) {
        content = content.toString();
        const nodes = this[symChildNodes] = [] as Node[];
        this[symChildren] = [];
        if (content) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            nodes.push(this.ownerDocument!.createTextNode(content));
        }
    }

    
    public hasChildNodes(): boolean {
        const nodes = this[symChildNodes];
        return !!nodes && nodes.length != 0;
    }
    public get childNodes(): ArrayLike<Node> & Iterable<Node> {
        const nodes = this[symChildNodes];
        return nodes ? nodes.slice() : [];
    }

    public get childElementCount(): number {
        const nodes = this[symChildren];
        return nodes ? nodes.length : 0;
    }
    public get children(): ArrayLike<Element> & Iterable<Element> {
        const nodes = this[symChildren];
        return nodes ? nodes.slice() : [];
    }
    public get firstElementChild(): Element | null {
        const nodes = this[symChildren];
        return nodes?.[0] || null;
    }
    public get lastElementChild(): Element | null {
        const nodes = this[symChildren];
        if (!nodes) {
            return null;
        }
        const l = nodes ? nodes.length : 0;
        return !l ? null : nodes[l - 1];
    }
    public get firstChild(): Node | null {
        const nodes = this[symChildNodes];
        return nodes?.[0] || null;
    }
    public get lastChild(): Node | null {
        const c = this[symChildNodes];
        if (!c) {
            return null;
        }
        const l = c.length;
        return !l ? null : c[l - 1];
    }

    protected constructor() {
        super();
    }

    public append(...nodes: (Node | string)[]): void {
        for (const n of nodes) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const c = typeof n == "string" ? this.ownerDocument!.createTextNode(n)
                : typeof n == "object" && n instanceof Node ? n : undefined;
            if (c !== undefined) {
                this.insertBefore(c, null);
                continue;
            }
            throw new TypeError("unsupported input type");
        }
    }
    public prepend(...nodes: (Node | string)[]): void {
        // TODO: optimize for multi-insert?
        let childNodes = this[symChildNodes];
        if (!childNodes) {
            childNodes = [];
            this[symChildNodes] = childNodes;
        }
        const before = childNodes[0] || null;
        for (const n of nodes) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const c = typeof n == "string" ? this.ownerDocument!.createTextNode(n)
                : typeof n == "object" && n instanceof Node ? n : undefined;
            if (c !== undefined) {
                this.insertBefore(c, before);
                continue;
            }
            throw new TypeError("unsupported input type");
        }
    }

    public querySelector<E extends Element = Element>(selectors: string): E | null {
        const it = querySel<E>(this, selectors);
        return it.next().value || null;
    }
    public querySelectorAll<E extends Element = Element>(selectors: string): ArrayLike<E> & Iterable<E> {
        return Array.from(querySel<E>(this, selectors));
    }

    public replaceChildren(...nodes: (Node | string)[]): void {
        let childNodes = this[symChildNodes];
        if (!childNodes) {
            childNodes = [];
            this[symChildNodes] = childNodes;
        } else if (childNodes.length) {
            let children = this[symChildren];
            if (!children) {
                children = [];
                this[symChildren] = children;
            } else {
                children.length = 0;
            }
            const cbak = childNodes.slice();
            childNodes.length = 0;
            for (const c of cbak) {
                (c as ParentNode).unsafeSetParent(null);
                (c as ParentNode).unsafeSetPrev(null);
                (c as ParentNode).unsafeSetNext(null);
            }
        }
        if (nodes.length) {
            this.append(...nodes);
        }
    }

    public insertBefore<N extends Node>(a: N, child: Node | null): N {
        if (a.ownerDocument != this.ownerDocument) {
            const nt = this.nodeType;
            if (nt != 9 && nt != 11) {
                throw new Error("owner document mismatch");
            }
            if (a.ownerDocument != (this as unknown as Document)) {
                if (a.nodeType == 10 && a.ownerDocument == null) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (a as any)[symDocument] = this;
                } else {
                    throw new Error("owner document mismatch while inserting to the root");
                }
            }
        }
        if (a.parentNode == this) {
            if (child == a || child == a.nextSibling) {
                return a;
            }
            this.removeChild(a);
        }
        let childNodes = this[symChildNodes];
        if (!childNodes) {
            childNodes = [];
            this[symChildNodes] = childNodes;
        }
        let children = this[symChildren];
        if (!children) {
            children = [];
            this[symChildren] = children;
        }
        let i = childNodes.length;
        let j = children.length;
        if (child) {
            i = childNodes.indexOf(child);
            if (i == -1) {
                throw new Error("child does not exist");
            }
            j = 0;
            for (let k = i; k >= 0; k--) {
                if (childNodes[k].nodeType == 1) {
                    j = children.indexOf(childNodes[k] as Element);
                    break;
                }
            }
        }
        if (a instanceof DocumentFragment) {
            const nodes = a[symChildNodes]?.slice();
            if (nodes && nodes.length) {
                for (const c of nodes) {
                    (c as ParentNode).unsafeSetParent(this);
                    if (c.nodeType == 1) {
                        children.splice(j++, 0, c as Element);
                    }
                }
                (nodes[0] as ParentNode).unsafeSetPrev(childNodes[i - 1] || null);
                (nodes[nodes.length - 1] as ParentNode).unsafeSetNext(childNodes[i] || null);
                childNodes.splice(i, 0, ...nodes);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                a[symChildNodes]!.length = 0;
                a[symChildren] = [];
            }
        } else {
            (a as Node as ParentNode).unsafeReplaceParent(this);
            (a as Node as ParentNode).unsafeSetPrev(childNodes[i - 1] || null);
            (a as Node as ParentNode).unsafeSetNext(childNodes[i] || null);
            childNodes.splice(i, 0, a);
            if (a.nodeType == 1) {
                children.splice(j++, 0, a as Node as Element);
            }
        }
        return a;
    }
    public appendChild<T extends Node>(a: T): T {
        return this.insertBefore(a, null);
    }
    public removeChild<T extends Node>(a: T): T {
        {
            const childNodes = this[symChildNodes];
            const p = childNodes ? childNodes.indexOf(a) : -1;
            if (!childNodes || p == -1) {
                return a;
            }
            childNodes.splice(p, 1);
            if (a.nodeType != 1) {
                return a;
            }
        }
        {
            const children = this[symChildren];
            const p1 = children ? children.indexOf(a as Node as Element) : -1;
            if (children && p1 != -1) {
                children.splice(p1, 1);
            }
            return a;
        }
    }

    public getElementsByClassName(cls: string) {
        return this.querySelectorAll("." + cls);
    }

    public getElementsByTagName(tag: string) {
        return this.querySelectorAll(tag);
    }
}

const symTextContent = Symbol("textContent");
export abstract class CharacterData extends Node {
    [symTextContent]: string;

    public get data() {
        return this[symTextContent];
    }
    public set data(content) {
        this[symTextContent] = content.toString();
    }
    public get length() {
        return this[symTextContent].length;
    }

    protected constructor(text: string) {
        super();
        this[symTextContent] = text.toString();
    }

    public appendData(data: string) {
        this[symTextContent] += data.toString();
    }
}
export class Text extends CharacterData {
    get nodeType(): 3 {
        return 3;
    }

    public get textContent() {
        return this[symTextContent];
    }
    public set textContent(content) {
        this[symTextContent] = content.toString();
    }

    protected constructor(text: string) {
        super(text);
    }
}

export class CDATASection extends CharacterData {
    get nodeType(): 4 {
        return 4;
    }

    public get textContent() {
        return this[symTextContent];
    }
    public set textContent(content) {
        this[symTextContent] = content.toString();
    }

    protected constructor(text: string) {
        super(text);
    }
}

const symTarget = Symbol("target");
export class ProcessingInstruction extends CharacterData {
    [symTarget]: string;
    get nodeType(): 7 {
        return 7;
    }

    public get target(): string {
        return this[symTarget];
    }
    public get textContent() {
        return this[symTextContent];
    }
    public set textContent(content) {
        this[symTextContent] = content.toString();
    }

    protected constructor(target: string, text: string) {
        super(text);
        this[symTarget] = target;
    }
}

export class Comment extends CharacterData {
    get nodeType(): 8 {
        return 8;
    }

    public get textContent() {
        return this[symTextContent];
    }
    public set textContent(content) {
        this[symTextContent] = content.toString();
    }

    protected constructor(text: string) {
        super(text);
    }
}

export class DocumentFragment extends ParentNode {
    public get nodeType(): 11 {
        return 11;
    }
    protected constructor() {
        super();
    }
}

abstract class Attr extends Node {
    public readonly ownerElement!: Element;
    public readonly name!: string;
    public readonly value!: string;
    public get specified() {
        return true;
    }
    public get prefix() {
        const m = this.name.match(/^([^:]+):/);
        return m ? m[1] : null;
    }
    public get localName() {
        return this.name.replace(/^[^:]+:/, "");
    }
}

const symAttributes = Symbol("attributes");
const symClassList = Symbol("classList");
export abstract class Element extends ParentNode {
    readonly [symTagName]!: string;
    [symAttributes]?: Map<string, string>;
    [symClassList]?: DOMTokenList;

    public get nodeType(): 1 {
        return 1;
    }
    public get tagName() {
        return this[symTagName];
    }
    public get localName() {
        return this[symTagName].replace(/^[^:]*:/, "");
    }

    public get id() {
        return this.getAttribute("id") || "";
    }
    public set id(id: string) {
        this.setAttribute("id", id);
    }

    public get classList() {
        let cl = this[symClassList];
        if (!cl) {
            cl = new DOMTokenList(/\s+/g, " ", () => this.getAttribute("class"), (v) => this.setAttribute("class", v));
            this[symClassList] = cl;
        }
        return cl;
    }

    public get attributes(): ArrayLike<Attr> & Iterable<Attr> {
        const ret: Attr[] = [];
        const attrs = this[symAttributes];
        if (!attrs) {
            return ret;
        }
        for (const [k, v] of attrs) {
            const attr = Object.create(Attr.prototype, {
                [symDocument]: { value: this.ownerDocument, writable: true },
                ownerElement: { value: this, writable: true },
                name: { value: k, writable: false },
                value: { value: v, writable: true },
            });
            // (Attr as new() => Attr).call(attr);
            ret.push(attr);
        }
        return ret;
    }

    protected constructor() {
        super();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const t = this[symTagName];
        if (!t) {
            throw new Error("unexpected element without known tag name");
        }
    }

    public getAttribute(att: string): string | null {
        const attrs = this[symAttributes];
        const r = attrs ? attrs.get(att) : null;
        return r === undefined ? null : r;
    }
    public setAttribute(att: string, val: string) {
        let attrs = this[symAttributes];
        if (!attrs) {
            attrs = new Map();
            this[symAttributes] = attrs;
        }
        attrs.set(att, val);
    }
    public remove() {
        const p = this.parentNode;
        p && p.removeChild(this);
    }
}

const symElement = Symbol("element");

function docInit(doc: Document) {
    doc[symElement] = class DOMElement extends Element {
        readonly [symDocument] = doc;
        public constructor() {
            super();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.defineProperties(doc[symElement].prototype, {
        [symDocument]: { value: doc, writable: true },
        [symParent]: { value: null, writable: true },
        [symPreviousSibling]: { value: null, writable: true },
        [symNextSibling]: { value: null, writable: true },
    });
    return doc;
}

export abstract class Document extends ParentNode {
    [symElement]: new() => Element;
    [symCustomElements]?: CustomElementRegistry;

    public get Element() {
        return this[symElement];
    }

    public get customElements() {
        let cust = this[symCustomElements];
        if (!cust) {
            this[symCustomElements] = cust = new CustomElementRegistry();
        }
        return cust;
    }

    public get nodeType(): 9 {
        return 9;
    }

    public get documentElement() {
        return this.firstElementChild;
    }

    protected constructor() {
        super();
    }

    public createElement(tagName: string): Element {
        const cons = this[symCustomElements]?.get(tagName);
        if (cons) {
            return new cons();
        }
        return Object.create(this[symElement].prototype, {
            [symTagName]: { value: tagName, writable: false },
        });
    }
    public createTextNode(text: string): Text {
        return Object.create(Text.prototype, {
            [symDocument]: { value: this, writable: true },
            [symParent]: { value: null, writable: true },
            [symPreviousSibling]: { value: null, writable: true },
            [symNextSibling]: { value: null, writable: true },
            [symTextContent]: { value: text.toString(), writable: true },
        });
    }
    public createComment(data: string): Comment {
        return Object.create(Comment.prototype, {
            [symDocument]: { value: this, writable: true },
            [symParent]: { value: null, writable: true },
            [symPreviousSibling]: { value: null, writable: true },
            [symNextSibling]: { value: null, writable: true },
            [symTextContent]: { value: data.toString(), writable: true },
        });
    }
    public createCDATASection(data: string): CDATASection {
        return Object.create(CDATASection.prototype, {
            [symDocument]: { value: this, writable: true },
            [symParent]: { value: null, writable: true },
            [symPreviousSibling]: { value: null, writable: true },
            [symNextSibling]: { value: null, writable: true },
            [symTextContent]: { value: data.toString(), writable: true },
        });
    }
    public createProcessingInstruction(target: string, data: string): ProcessingInstruction {
        return Object.create(ProcessingInstruction.prototype, {
            [symDocument]: { value: this, writable: true },
            [symParent]: { value: null, writable: true },
            [symPreviousSibling]: { value: null, writable: true },
            [symNextSibling]: { value: null, writable: true },
            [symTarget]: { value: target.toString(), writable: true },
            [symTextContent]: { value: data.toString(), writable: true },
        });
    }
    public createDocumentFragment(): DocumentFragment {
        return Object.create(DocumentFragment.prototype, {
            [symDocument]: { value: this, writable: true },
            [symParent]: { value: null, writable: false },
            [symPreviousSibling]: { value: null, writable: false },
            [symNextSibling]: { value: null, writable: false },
        });
    }

    public getElementById(id: string) {
        return this.querySelector("#" + id);
    }
}

export function createDocument(): Document {
    class DOMDocument extends Document {
        public constructor() {
            super();
        }
    }
    return docInit(Object.create(DOMDocument.prototype, { [symDocument]: { value: null }}));
}

export function createHTMLDocument(docTitle = ""): Document {
    class HTMLDocument extends Document {
        public get body() {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            for (const c of this.documentElement!.children) {
                if (c.localName == "body") {
                    return c;
                }
            }
            return null;
        }
        public get head() {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            for (const c of this.documentElement!.children) {
                if (c.localName == "head") {
                    return c;
                }
            }
            return null;
        }
        public constructor() {
            super();
        }
    }
    const doc = Object.create(HTMLDocument.prototype) as HTMLDocument;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc as any)[symDocument] = null;
    docInit(doc);
    Object.defineProperty(doc.Element.prototype, "className", {
        get() { return this.getAttribute("class") || ""; },
        set(cls: string) { this.setAttribute("class", cls.trim()); }
    });
    {
        doc.appendChild(createDocumentType("html"));
        const html = doc.createElement("html");
        const head = html.appendChild(doc.createElement("head"));
        const title = head.appendChild(doc.createElement("title"));
        title.textContent = docTitle;
        html.appendChild(doc.createElement("body"));
        doc.appendChild(html);
    }
    return doc;
}


export class DocumentType extends Node {
    public get nodeType(): 10 {
        return 10;
    }
    public get internalSubset(): null | string {
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public set textContent(content: string) {}
    public get textContent(): string {
        return null as unknown as string;
    }
    readonly name: string;
    readonly publicId: string;
    readonly systemId: string;

    private constructor() {
        super();
        throw new Error("Constructor should never be called");
    }
}
export function createDocumentType(qualifiedNameStr: string, publicId = "", systemId = ""): DocumentType {
    return Object.create(DocumentType.prototype, {
        [symDocument]: { value: null, writable: true },
        name: { value: qualifiedNameStr, writable: false },
        publicId: { value: publicId, writable: false },
        systemId: { value: systemId, writable: false },
        [symParent]: { value: null, writable: true },
        [symPreviousSibling]: { value: null, writable: true },
        [symNextSibling]: { value: null, writable: true },
    });
}
