import React from 'react';
import NodeTypes, {NodeType} from './nodeTypes';
import EdgeTypes, {EdgeType} from './edgeTypes';
import './Graph.css';

import {
    GraphView,
    IEdge,
    INode,
    IGraphInput,
} from 'react-digraph';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {actionCreators as graphActionCreators} from '../../redux/graph';

interface IGraphState {
    selected: INode | null
};

export interface IGraphProps {
    graph: IGraphInput,
    createNode: (node: INode) => void;
    updateNode: (node: INode) => void;
    createEdge: (edge: IEdge) => void;
};

class Graph extends React.Component<IGraphProps, IGraphState> {

    graphViewRef: any;

    constructor(props: IGraphProps) {
        super(props);
        this.state = {
            selected: null
        };
        this.graphViewRef = React.createRef()
    }

    onBackgroundClick = (x: number, y: number, event: any) => {
        console.debug({ where: "onBackgroundClick", x, y, event });
    }

    onCopySelected = () => {
        console.debug({ where: "onCopySelected" });
    }

    onCreateEdge = (sourceNode: INode, targetNode: INode) => {
        console.debug({ where: "onCreateEdge", sourceNode, targetNode });
        this.props.createEdge({
            source: sourceNode.id,
            target: targetNode.id
        });
    }

    onCreateNode = (x: number, y: number, event: any) => {
        console.debug({ where: "onCreateNode", x, y, event });
        this.props.createNode({
            type: NodeType.Circle,
            title: "some title",
            x,
            y
        });
    }

    onDeleteEdge = (selectedEdge: IEdge, edges: IEdge[]) => {
        console.debug({ where: "onDeleteEdge", selectedEdge, edges });
    }

    onDeleteNode = (selected: any, nodeId: string, nodes: any[]) => {
        console.debug({ where: "onDeleteNode", selected, nodeId, nodes });
    }

    onPasteSelected = (selectedNode: INode, xyCoords?: { x: number, y: number }) => {
        console.debug({ where: "onPasteSelected", selectedNode, xyCoords });
    }

    onSelectEdge = (selectedEdge: IEdge) => {
        console.debug({ where: "onSelectEdge", selectedEdge });
    }

    onSelectNode = (node: INode | null, event: any) => {
        console.debug({ where: "onSelectNode", node, event });
        this.setState({ selected: node });
    }

    onSwapEdge = (sourceNode: INode, targetNode: INode, edge: IEdge) => {
        console.debug({ where: "onSwapEdge", sourceNode, targetNode, edge });
    }

    onUndo = () => {
        console.debug({ where: "onUndo" });
    }

    onUpdateNode = (node: INode) => {
        console.debug({ where: "onUpdateNode", node });
        this.props.updateNode(node);
    }

    render = () => {
        const nodes = this.props.graph.nodes;
        const edges = this.props.graph.edges;
        const selected = this.state.selected;

        return (
            <div className='Graph'>
                <GraphView ref={element => this.graphViewRef = element}
                    nodeKey={"id"}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
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
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    graph: state.graph
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    ...graphActionCreators
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Graph);