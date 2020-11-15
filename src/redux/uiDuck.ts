import {
    INode,
    IEdge,
} from 'react-digraph';
import { EdgeType } from '../components/Graph/edgeTypes';

import {NodeType} from '../components/Graph/nodeTypes';

export interface IAction {
    type: ActionType,
    payload?: any,
};

export enum ActionType {
    SelectGraphElement = "ui/select-graph-element",
    SelectNodeType = "ui/select-node-type",
    SelectEdgeType = "ui/select-edge-type",
};

/* Action Creators */

export const actionCreators = {

    selectGraphElement: (element: INode | IEdge | null) => ({
        type: ActionType.SelectGraphElement,
        payload: element
    }),

    selectNodeType: (nodeType: NodeType) => ({
        type: ActionType.SelectNodeType,
        payload: nodeType
    }),

    selectEdgeType: (edgeType: EdgeType) => ({
        type: ActionType.SelectEdgeType,
        payload: edgeType
    }),

};

/* Selectors */

/* Reducer */

interface IState {
    selectedGraphElement: INode | IEdge | null,
    selectedNodeType: NodeType,
    selectedEdgeType: EdgeType,
}

const initialState = {
    selectedGraphElement: null,
    selectedNodeType: NodeType.Circle,
    selectedEdgeType: EdgeType.Circle,
};

export const reducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case ActionType.SelectGraphElement: {
            return {
                ...state,
                selectedGraphElement: action.payload
            };
        }
        case ActionType.SelectNodeType: {
            return {
                ...state,
                selectedNodeType: action.payload
            }
        }
        case ActionType.SelectEdgeType: {
            return {
                ...state,
                selectedEdgeType: action.payload
            }
        }
        default:
            return state;
    }
};