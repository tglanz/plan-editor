import React, { ChangeEvent } from 'react';
import { INode } from 'react-digraph';

interface IProps {
    node: INode,
    updateNode: (node: INode) => void,
}

class NodeCard extends React.Component<IProps> {

    onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.updateNode({
            ...this.props.node,
            title: event.target.value
        })
    }

    render() {
        const {node} = this.props;

        return (
            <div className="NodeCard">
                <h3>node</h3>
                <p>Type: {node.type}</p>
                <p>Subtype: {node.subtype}</p>
                <p>Title:
                    <input type="text" maxLength={11} value={node.title} onChange={this.onTitleChange}/>
                </p>
                <p>(X, Y): ({node.x?.toFixed(1)}, {node.y?.toFixed(1)})</p>
            </div>
        );
    }
}

export default NodeCard;