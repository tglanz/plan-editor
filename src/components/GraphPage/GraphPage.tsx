import React from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';

import Graph from '../Graph/Graph';
import GraphElementCard from '../GraphElementCard/GraphElementCard';

import './GraphPage.css';
import { IEdge, INode } from 'react-digraph';
import GraphToolbox from '../GraphToolbox/GraphToolbox';

export interface IProps {
    selectedGraphElement: INode | IEdge | null
};

class GraphPage extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const {selectedGraphElement} = this.props;

        return (
            <div className="GraphPage">
                <div className="toolbox-container">
                    <GraphToolbox />
                </div>
                <div className="description-container">
                    <h2>Element</h2>
                    <GraphElementCard element={selectedGraphElement} />
                </div>
                <div className="graph-container">
                    <Graph />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state: any) => ({
    selectedGraphElement: state.ui.selectedGraphElement,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GraphPage);