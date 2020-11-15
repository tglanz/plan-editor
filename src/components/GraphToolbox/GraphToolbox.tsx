import React from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import classnames from 'classnames';

import './GraphToolbox.css';

import {ALL_NODE_TYPES, NodeType} from '../Graph/nodeTypes';
import {actionCreators as uiActionCreators} from '../../redux/uiDuck';
import { ALL_EDGE_TYPES, EdgeType } from '../Graph/edgeTypes';

export interface IGraphToolbox {
    selectedNodeType: NodeType,
    selectNodeType: (nodeType: NodeType) => void,

    selectedEdgeType: EdgeType,
    selectEdgeType: (edgeType: EdgeType) => void,
};

interface INodeTypeToolProps {
    nodeType: NodeType,
    selectedNodeType: NodeType,
    selectNodeType: (nodeType: NodeType) => void
}

interface IEdgeTypeToolProps {
    edgeType: EdgeType,
    selectedEdgeType: EdgeType,
    selectEdgeType: (edgeType: EdgeType) => void
}

const NodeTypeTool: React.FunctionComponent<INodeTypeToolProps> = ({nodeType, selectedNodeType, selectNodeType}) => (
    <span
        className={classnames('tool', 'button', {active: nodeType === selectedNodeType})}
        onClick={() => selectNodeType(nodeType)}>
        {nodeType}
    </span>
);

const EdgeTypeTool: React.FunctionComponent<IEdgeTypeToolProps> = ({edgeType, selectedEdgeType, selectEdgeType}) => (
    <span
        className={classnames('tool', 'button', {active: edgeType === selectedEdgeType})}
        onClick={() => selectEdgeType(edgeType)}>
        {edgeType}
    </span>
);


class GraphToolbox extends React.Component<IGraphToolbox> {
    render() {
        const {
            selectedNodeType, selectNodeType,
            selectedEdgeType, selectEdgeType
        } = this.props;

        return (
            <div className="GraphToolbox">
                <h3>Node Tool</h3>
                <div className="nodes tools">
                    <div>{
                        ALL_NODE_TYPES.map(nodeType => <NodeTypeTool
                            key={nodeType}
                            nodeType={nodeType}
                            selectedNodeType={selectedNodeType}
                            selectNodeType={selectNodeType}
                            />)
                    }</div>
                </div>
                <h3>Edge Tool</h3>
                <div className="edges tools">
                    <div>{
                        ALL_EDGE_TYPES.map(edgeType => <EdgeTypeTool
                            key={edgeType}
                            edgeType={edgeType}
                            selectedEdgeType={selectedEdgeType}
                            selectEdgeType={selectEdgeType}
                            />)
                    }</div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state: any) => ({
    selectedNodeType: state.ui.selectedNodeType,
    selectedEdgeType: state.ui.selectedEdgeType,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    selectNodeType: uiActionCreators.selectNodeType,
    selectEdgeType: uiActionCreators.selectEdgeType,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GraphToolbox);