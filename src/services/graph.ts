import { lchmodSync } from 'fs';
import {
    IGraphInput,
    IEdge,
    INode,
} from 'react-digraph';

export const removeNode = (graph: IGraphInput, removeNodeId: string) => ({
    nodes: graph.nodes.filter(node => node.id !== removeNodeId),
    edges: graph.edges.filter(edge => edge.source !== removeNodeId && edge.target !== removeNodeId)
});

export const removeEdge = (graph: IGraphInput, removeSourceId: string, removeTargetId: string) => ({
    nodes: graph.nodes,
    edges: graph.edges.filter(edge => edge.source !== removeSourceId && edge.target !== removeTargetId)
});

export const appendNode = (graph: IGraphInput, node: INode) => ({
    nodes: [...graph.nodes, node],
    edges: [...graph.edges],
})

export const areEdgesTheSame = (lhs: IEdge, rhs: IEdge) => lhs.source === rhs.source && lhs.target === rhs.target;

export const isEdgeConnected = (edge: IEdge, nodeId: string) => edge.source == nodeId || edge.target === nodeId;
