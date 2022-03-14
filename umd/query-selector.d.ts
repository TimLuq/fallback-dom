export interface ISelNode {
    readonly nodeType: number;
    readonly parentNode: ISelNode | null;
    readonly localName?: string;
    readonly childNodes?: Iterable<ISelNode>;
    readonly previousSibling: null | ISelNode;
    getAttribute?(attr: string): null | string;
}
export declare function querySel<R extends ISelNode>(context: ISelNode, sel: string): IterableIterator<R>;
