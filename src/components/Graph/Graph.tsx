import React from 'react';
import NodeTypes, {NodeType} from './nodeTypes';
import EdgeTypes, { EdgeType } from './edgeTypes';

import './Graph.css';

import {
    GraphView,
    IEdge,
    IGraphInput,
    INode,
} from 'react-digraph';

import * as graphServices from '../../services/graph';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {actionCreators as uiActionCreators} from '../../redux/uiDuck';
import {actionCreators as graphActionCreators} from '../../redux/graphDuck';

interface IGraphState {
};

export interface IGraphProps {
    nodes: INode[],
    edges: IEdge[],

    selectedGraphElement: INode | null,
    selectedNodeType: NodeType,
    selectedEdgeType: EdgeType,

    setGraph: (graph: IGraphInput) => void;
    createNode: (node: INode) => void;
    setNodes: (nodes: INode[]) => void;
    updateNode: (node: INode) => void;
    selectGraphElement: (element: INode | IEdge | null) => void;
    createEdge: (edge: IEdge) => void;
    setEdges: (edges: IEdge[]) => void;
};

class Graph extends React.Component<IGraphProps, IGraphState> {

    graphViewRef: any;

    constructor(props: IGraphProps) {
        super(props);
        this.graphViewRef = React.createRef()
    }

    onBackgroundClick = (x: number, y: number, event: any) => {
    }

    onCopySelected = () => {
    }

    onCreateEdge = (sourceNode: INode, targetNode: INode) => {
        this.props.createEdge({
            source: sourceNode.id,
            target: targetNode.id,
            type: this.props.selectedEdgeType
        });
    }

    onCreateNode = (x: number, y: number, event: any) => {
        this.props.createNode({
            type: this.props.selectedNodeType,
            title: "[[title]]",
            x,
            y
        });
    }

    onDeleteEdge = (selectedEdge: IEdge, edges: IEdge[]) => {
        this.props.setEdges(edges.filter(edge => !graphServices.areEdgesTheSame(selectedEdge, edge)));
    }

    onDeleteNode = (selected: any, nodeId: string, nodes: any[]) => {
        
        if (this.props.edges.find(edge => graphServices.isEdgeConnected(edge, nodeId))) {
            // TODO: handle this; somehow notify the user
            return;
        }

        this.props.setNodes(nodes.filter(node => node.id !== nodeId));
    }

    onPasteSelected = (selectedNode: INode, xyCoords?: { x: number, y: number }) => {
    }

    onSelectEdge = (selectedEdge: IEdge) => {
        this.props.selectGraphElement(selectedEdge);
    }

    onSelectNode = (selectedNode: INode | null, event: any) => {
        this.props.selectGraphElement(selectedNode);
    }

    onSwapEdge = (sourceNode: INode, targetNode: INode, edge: IEdge) => {
    }

    onUndo = () => {
    }

    onUpdateNode = (node: INode) => {
        this.props.updateNode(node);
    }

    render = () => {
        const {nodes, edges, selectedGraphElement} = this.props;

        const Untyped = GraphView as any;

        return (
            <Untyped
                ref={(element: any) => this.graphViewRef = element}
                disableBackspace={true}
                nodeKey={"id"}
                nodes={nodes}
                edges={edges}
                selected={selectedGraphElement}
                nodeTypes={NodeTypes}
                nodeSubtypes={{}}
                edgeTypes={EdgeTypes}
                onSelectNode={this.onSelectNode}
                onCreateNode={this.onCreateNode}
                onUpdateNode={this.onUpdateNode}
                onDeleteNode={this.onDeleteNode}
                onSelectEdge={this.onSelectEdge}
                onCreateEdge={this.onCreateEdge}
                onSwapEdge={this.onSwapEdge}
                onDeleteEdge={this.onDeleteEdge}
                />
        );
    }
}

const mapStateToProps = (state: any) => ({
    nodes: state.graph.nodes,
    edges: state.graph.edges,
    selectedGraphElement: state.ui.selectedGraphElement,
    selectedNodeType: state.ui.selectedNodeType,
    selectedEdgeType: state.ui.selectedEdgeType,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    selectGraphElement: uiActionCreators.selectGraphElement,
    setGraph: graphActionCreators.setGraph,
    createNode: graphActionCreators.createNode,
    setNodes: graphActionCreators.setNodes,
    updateNode: graphActionCreators.updateNode,
    createEdge: graphActionCreators.createEdge,
    setEdges: graphActionCreators.setEdges,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Graph);