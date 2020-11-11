import {
    IGraphInput,
    INode,
    IEdge
} from 'react-digraph';

export interface IAction {
    type: ActionType,
    payload?: any,
};

export enum ActionType {
    CreateNode = "graph/create-node",
    UpdateNode = "graph/update-node",
    CreateEdge = "graph/create-edge",
};

/* Action Creators */

export const actionCreators = {
    createNode: (node: INode) => ({
        type: ActionType.CreateNode,
        payload: node
    }),

    updateNode: (node: INode) => ({
        type: ActionType.UpdateNode,
        payload: node
    }),

    createEdge: (edge: IEdge) => ({
        type: ActionType.CreateEdge,
        payload: edge
    }),
};

/* Selectors */

/* Reducer */

interface IState extends IGraphInput {
}

const initialState = {
    nodes: [],
    edges: [],
};

export const reducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case ActionType.CreateNode: {
            const newNode = action.payload;
            newNode.id = newNode.id || new Date().getTime();
            return {
                nodes: [...state.nodes, newNode],
                edges: state.edges
            };
        }
        case ActionType.UpdateNode: {
            const newNode = action.payload;
            const nodes = state.nodes.map(node => node.id === newNode.id
                ? newNode : node);
            return {
                nodes,
                edges: state.edges
            };
        }
        case ActionType.CreateEdge: {
            const newEdge = action.payload;
            return {
                nodes: state.nodes,
                edges: [...state.edges, newEdge]
            };
        }
        default:
            return state;
    }
};