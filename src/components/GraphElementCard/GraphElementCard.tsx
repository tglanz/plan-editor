import React from 'react';
import { IEdge, INode } from 'react-digraph';

import './GraphElementCard.css';

import NodeCard from './NodeCard';
import EdgeCard from './EdgeCard';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {actionCreators as uiActionCreators} from '../../redux/uiDuck';
import {actionCreators as graphActionCreators} from '../../redux/graphDuck';

interface IProps {
    element: IEdge | INode | null,
    updateNode: (node: INode) => void,
    updateEdge: (edge: IEdge) => void,
    selectGraphElement: (graphElement: INode | IEdge | null) => void,
}

class GraphElementCard extends React.Component<IProps> {

    render() {
        const {element, updateNode, updateEdge, selectGraphElement} = this.props;

        if (element == null) {
            return <p>No element selected</p>;
        }

        if (element.hasOwnProperty("id")) {
            return <NodeCard node={element as INode} updateNode={ node => {
                updateNode(node);
                selectGraphElement(node);
            }}/>
        }

        if (element.hasOwnProperty("source") && element.hasOwnProperty("target")) {
            return <EdgeCard edge={element as IEdge} updateEdge={ edge => {
                updateEdge(edge);
                selectGraphElement(edge);
            }} />
        }
        
        return <p>Unknown: {JSON.stringify(element)}</p>;
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    updateNode: graphActionCreators.updateNode,
    updateEdge: graphActionCreators.updateEdge,
    selectGraphElement: uiActionCreators.selectGraphElement
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GraphElementCard);