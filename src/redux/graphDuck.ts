import {
    IGraphInput,
    INode,
    IEdge,
    Edge,
} from 'react-digraph';

import * as graphService from '../services/graph';

export interface IAction {
    type: ActionType,
    payload?: any,
};

export enum ActionType {

    SetGraph = "graph/set-graph",

    SelectNode = "graph/select-node",
    CreateNode = "graph/create-node",
    SetNodes = "graph/set-nodes",
    UpdateNode = "graph/update-node",
    UpdateEdge= "graph/update-edge",
    
    CreateEdge = "graph/create-edge",
    SetEdges = "graph/set-edges",
};

/* Action Creators */

export const actionCreators = {

    // mainly for when stuff aren't aligning with react-digraph api.
    // change calls when better apis arise or refactors are made
    setGraph: (graph: IGraphInput) => ({
        type: ActionType.SetGraph,
        payload: graph
    }),

    selectNode: (node: INode) => ({
        type: ActionType.SelectNode,
        payload: node
    }),

    createNode: (node: INode) => ({
        type: ActionType.CreateNode,
        payload: node
    }),

    setNodes: (nodes: INode[]) => ({
        type: ActionType.SetNodes,
        payload: nodes
    }),

    updateNode: (node: INode) => ({
        type: ActionType.UpdateNode,
        payload: node
    }),

    createEdge: (edge: IEdge) => ({
        type: ActionType.CreateEdge,
        payload: edge
    }),

    updateEdge: (edge: IEdge) => ({
        type: ActionType.UpdateEdge,
        payload: edge,
    }),

    setEdges: (edges: IEdge[]) => ({
        type: ActionType.SetEdges,
        payload: edges
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
        case ActionType.SetGraph: {
            return { ...action.payload };
        }
        case ActionType.CreateNode: {
            const newNode = action.payload;
            newNode.id = newNode.id || new Date().getTime();
            return graphService.appendNode(state, newNode);
        }
        case ActionType.SetNodes: {
            console.log("setting nodes");
            return {
                ...state,
                nodes: action.payload
            }
        }
        case ActionType.UpdateNode: {
            const newNode = {...action.payload};
            const nodes = state.nodes.map(node => node.id === newNode.id
                ? newNode : node);
            return {
                nodes: [...nodes],
                edges: [...state.edges],
            };
        }
        case ActionType.CreateEdge: {
            const newEdge = action.payload;
            return {
                nodes: state.nodes,
                edges: [...state.edges, newEdge]
            };
        }
        case ActionType.UpdateEdge: {
            const newEdge = action.payload;
            const edges = state.edges.map(edge => graphService.areEdgesTheSame(edge, newEdge)
                ? newEdge : edge);
            return {
                nodes: [...state.nodes],
                edges,
            };
        }
        case ActionType.SetEdges: {
            return {
            
                ...state,
                edges: action.payload
            };
        }
        default:
            return state;
    }
};