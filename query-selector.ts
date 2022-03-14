
export interface ISelNode {
    readonly nodeType: number;
    readonly parentNode: ISelNode | null;
    readonly localName?: string;
    readonly childNodes?: Iterable<ISelNode>;
    readonly previousSibling: null | ISelNode;
    getAttribute?(attr: string): null | string;
}

export function querySel<R extends ISelNode>(context: ISelNode, sel: string) {
    return qSel<R>(context, parse(sel));
}

interface ISel {
    a?: Map<string, (string|((v: string) => boolean)[]|null)>;
    c?: Set<string>;
    i?: string;
    p?: [">" | "+" | "~" | " ", ISel];
    t?: string;
}

function parse(sel: string): ISel[] {
    sel = sel.trim();
    const ret = [];
    let curr: null | ISel = null;
    do {
        let join = "";
        if (curr) {
            const re = sel.match(/^\s*(>|\+|~|,| )\s*/);
            if (!re) {
                throw new Error("Unable to parse joiner at " + JSON.stringify(sel));
            }
            join = re[1] as ">" | "+" | "~" | " " | ",";
            sel = sel.substring(re[0].length);
            if (join == ",") {
                ret.push(curr);
                curr = null;
                join = "";
            }
        }
        if (!sel) {
            throw new Error("unable to parse the empty string as a selector");
        }
        const res = parseStep(sel);
        const next = res[0];
        if (curr) {
            next.p = [join as ">" | "+" | "~" | " ", curr];
        }
        curr = next;
        sel = res[1];
    } while(sel);
    ret.push(curr);
    return ret;
}

function parseStep(sel: string): [ISel, string] {
    const ret: ISel = {};
    {
        const tagCheck = sel.match(/^[\p{L}_][0-9\p{L}_-]*/u);
        if (tagCheck) {
            ret.t = tagCheck[0];
            sel = sel.substring(tagCheck[0].length);
        } else if (sel.startsWith("*")) {
            ret.t = undefined;
            sel = sel.substring(1);
        }
    }
    while (sel) {
        if (sel.startsWith("#")) {
            const tagCheck = sel.match(/^#[\p{L}_][0-9\p{L}_-]*/u);
            if (tagCheck) {
                const id = tagCheck[0].substring(1);
                if (ret.i && ret.i != id) {
                    throw new Error("selector will always fail, elements can't contain multiple ids");
                }
                ret.i = id;
                sel = sel.substring(tagCheck[0].length);
                continue;
            }
            throw new Error("invalid id at " + JSON.stringify(sel));
        }
        if (sel.startsWith(".")) {
            const tagCheck = sel.match(/^\.[\p{L}_][0-9\p{L}_-]*/u);
            if (tagCheck) {
                if (!ret.c) {
                    ret.c = new Set();
                }
                ret.c.add(tagCheck[0].substring(1));
                sel = sel.substring(tagCheck[0].length);
                continue;
            }
            throw new Error("invalid class at " + JSON.stringify(sel));
        }
        if (sel.startsWith("[")) {
            sel = sel.substring(1);
            const res = parseAttr(sel);
            const n = res[0].n;
            if (ret.a) {
                const j = ret.a.get(n);
                ret.a.set(n, joinAttr(j, res[0].v));
            } else {
                const a = new Map();
                const v = res[0].v;
                a.set(n, v === undefined ? null : typeof v == "string" ? v : [v]);
                ret.a = a;
            }
            sel = res[1];
            if (sel.startsWith("]")) {
                sel = sel.substring(1);
                continue;
            }
            throw new Error("unexpected characters in attribute section: " + JSON.stringify(sel));
        }
    }
    if (Object.keys(ret).length) {
        return [ret, sel];
    }
    throw new Error("unexpected part at " + JSON.stringify(sel));
}
interface IAttrRes {
    n: string;
    v?: string | ((v: string) => boolean);
}
function parseAttr(sel: string): [IAttrRes, string] {
    const nameCheck = sel.match(/^[\p{L}_][0-9\p{L}._-]*/u);
    if (!nameCheck) {
        throw new Error("expected attribute name, found " + JSON.stringify(sel));
    }
    const ret: IAttrRes = { n: nameCheck[0] } as IAttrRes;
    sel = sel.substring(nameCheck[0].length);
    let op = undefined;
    if (sel.startsWith("=")) {
        op = "=";
        sel = sel.substring(1);
    } else if (sel.startsWith("*=")) {
        op = "*";
        sel = sel.substring(2);
    } else if (sel.startsWith("~=")) {
        op = "~";
        sel = sel.substring(2);
    } else if (sel.startsWith("|=")) {
        op = "|";
        sel = sel.substring(2);
    } else if (sel.startsWith("$=")) {
        op = "$";
        sel = sel.substring(2);
    } else if (sel.startsWith("^=")) {
        op = "^";
        sel = sel.substring(2);
    }
    if (op) {
        const vres = parseNameOrString(sel);
        sel = vres[1];
        const va = vres[0];
        if (op == "=") {
            ret.v = va;
        } else if (op == "*") {
            ret.v = (v) => v.includes(va);
        } else if (op == "|") {
            ret.v = (v) => v == va || v.startsWith(va + "-");
        } else if (op == "^") {
            ret.v = (v) => v.startsWith(va);
        } else if (op == "$") {
            ret.v = (v) => v.endsWith(va);
        } else if (op == "~") {
            ret.v = (v) => spaceEq(v, va);
        }
    }
    // TODO: add support for [n=v i/s] ?
    if (sel.startsWith("]")) {
        return [ret, sel.substring(1)];
    }
    throw new Error("expected end of attribute section but found " + JSON.stringify(sel));
}

function spaceEq(haystack: string, needle: string) {
    let i = 0;
    while (i != haystack.length) {
        const next = haystack.indexOf(" ", i + 1);
        const end = next == -1 ? haystack.length : next;
        if ((end - i) == needle.length && haystack.substring(i, end) == needle) {
            return true;
        }
        i = end;
    }
    return false;
}

function parseNameOrString(sel: string): [string, string] {
    if (sel.startsWith("\"")) {
        const e = sel.indexOf("\"", 1);
        if (e != -1) {
            return [sel.substring(1, e), sel.substring(e + 1)];
        }
        throw new Error("no end of string at " + JSON.stringify(sel));
    }
    const m = sel.match(/^[\d\p{L}._-]+/u);
    if (m) {
        return [m[0], sel.substring(m[0].length)];
    }
    throw new Error("unexpected unquoted data at " + JSON.stringify(sel));
}

function isMatch(context: ISelNode, match: ISel[], node: ISelNode): boolean {
    branch: for (const m of match) {
        if (m.t && m.t != node.localName) {
            continue branch;
        }
        if (m.i) {
            if (typeof node.getAttribute != "function") {
                continue branch;
            }
            const cl = node.getAttribute("id");
            if (!cl || cl != m.i) {
                continue branch;
            }
        }
        if (m.c) {
            if (typeof node.getAttribute != "function") {
                continue branch;
            }
            const cl = node.getAttribute("class");
            if (!cl) {
                continue branch;
            }
            for (const c of m.c) {
                if (!spaceEq(cl, c)) {
                    continue branch;
                }
            }
        }
        if (m.a) {
            if (typeof node.getAttribute != "function") {
                continue branch;
            }
            for (const [a, av] of m.a) {
                const cl = node.getAttribute(a);
                if (!cl) {
                    continue branch;
                }
                if (typeof av == "string") {
                    if (cl == av) {
                        continue;
                    }
                    continue branch;
                }
                if (av) {
                    for (const c of av) {
                        if (!c(cl)) {
                            continue branch;
                        }
                    }
                }
            }
        }
        if (m.p) {
            const op = m.p[0];
            if (op == "+") {
                const prev = node.previousSibling;
                if (!prev) {
                    continue branch;
                }
                if (!isMatch(context, [m.p[1]], prev)) {
                    continue branch;
                }
            } else if (op == "~") {
                let prev = node.previousSibling;
                let mat = false;
                const a = [m.p[1]];
                while (!mat && prev) {
                    mat = isMatch(context, a, prev);
                    prev = prev.previousSibling;
                }
                if (!mat) {
                    continue branch;
                }
            } else if (op == ">") {
                const prev = node.parentNode;
                if (!prev) {
                    continue branch;
                }
                if (!isMatch(context, [m.p[1]], prev)) {
                    continue branch;
                }
            } else if (op == " ") {
                let prev = node.parentNode;
                let mat = false;
                const a = [m.p[1]];
                while (!mat && prev) {
                    mat = isMatch(context, a, prev);
                    prev = prev.parentNode;
                }
                if (!mat) {
                    continue branch;
                }
            }
        }

        return true;
    }
    return false;
}

function* qSel<R extends ISelNode>(context: ISelNode, match: ISel[]): IterableIterator<R> {
    const cn = context.childNodes;
    if (!cn) {
        return;
    }
    for (const c of cn) {
        if (c.nodeType != 1) {
            continue;
        }
        if (isMatch(context, match, c)) {
            yield c as R;
        }
        yield* qSel(c, match);
    }
}

function joinAttr(attr: undefined | null | string | ((v: string) => boolean)[], add: undefined | string | ((v: string) => boolean)): null | string | ((v: string) => boolean)[] {
    if (add === undefined) {
        return attr !== undefined ? attr : null;
    }
    if (typeof add == "string") {
        if (attr === undefined || attr === null) {
            return add;
        }
        if (typeof attr == "string") {
            if (attr == add) {
                return attr;
            }
        } else {
            let inv = false;
            for (const f of attr) {
                if (!f(add)) {
                    inv = true;
                }
            }
            if (!inv) {
                return add;
            }
        }
    } else if (attr === undefined || attr === null) {
        return [add];
    } else if (typeof attr == "string") {
        if (add(attr)) {
            return attr;
        }
    } else {
        attr.push(add);
        return attr;
    }
    throw new Error("no possible attribute could ever match");
}
