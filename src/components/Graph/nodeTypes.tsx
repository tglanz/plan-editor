import React from 'react';

export interface INodeType {
    typeText: string,
    shapeId: string,
    shape: any
}

export enum NodeType {
    Circle = "circle",
    Square = "square",
};

const createNodeTypesElement = (typeName: NodeType, typeText: string, shape: any) => ({
    [typeName]: {
        typeText,
        shapeId: `#${typeName}`,
        shape
    }
});

export default {
    ...createNodeTypesElement(NodeType.Circle, "Circle", (
        <symbol viewBox="0 0 50 50" width="154" height="154" id={NodeType.Circle}>
            <circle cx="25" cy="25" r="25" />
        </symbol>
    )),
    ...createNodeTypesElement(NodeType.Square, "Square", (
        <symbol viewBox="0 0 50 50" width="154" height="154" id={NodeType.Square}>
            <rect width="50" height="50" />
        </symbol>
    )),
};