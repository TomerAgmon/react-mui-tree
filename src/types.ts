

//export type Node<T extends {id: string, children?: Array<T>}> = {}
export type NodeData<T> = T & {id: string, children?: Array<NodeData<T>>};




