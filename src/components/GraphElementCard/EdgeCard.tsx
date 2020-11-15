import React, { ChangeEvent } from 'react';
import { IEdge } from 'react-digraph';

interface IProps {
    edge: IEdge,
    updateEdge: (edge: IEdge) => void,
}

class EdgeCard extends React.Component<IProps> {

    onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.updateEdge({
            ...this.props.edge,
            handleText: event.target.value
        })
    }

    onLabelFromChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.updateEdge({
            ...this.props.edge,
            // fuck is this?
            label_from: event.target.value
        })
    }

    onLabelToChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.updateEdge({
            ...this.props.edge,
            // fuck is this?
            label_to: event.target.value
        })
    }

    render() {
        const {edge} = this.props;

        return (
            <div className="EdgeCard">
                <h3>Edge</h3>

                <p>Source: {edge.source}</p>
                <p>Target: {edge.target}</p>

                <p>Title:
                    <input type="text" maxLength={11} value={edge.title} onChange={this.onTitleChange}/>
                </p>

                <p>LabelFrom:
                    <input type="text" maxLength={11} value={edge.label_from} onChange={this.onLabelFromChange}/>
                </p>

                <p>Label To:
                    <input type="text" maxLength={11} value={edge.label_to} onChange={this.onLabelToChange}/>
                </p>
            </div>
        );
    }
}

export default EdgeCard;