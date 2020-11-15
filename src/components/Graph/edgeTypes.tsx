import React from 'react';

export interface IEdgeType {
    typeText: string,
    shapeId: string,
    shape: any
}

export enum EdgeType {
    Circle = "circle",
    Rectangle = "rectangle"
};


export const ALL_EDGE_TYPES = [EdgeType.Circle, EdgeType.Rectangle];

const createEdgeTypesElement = (typeName: EdgeType, shape: any) => ({
    [typeName]: {
        shapeId: `#${typeName}Edge`,
        shape
    }
});

const defaultExport = {
    [EdgeType.Circle]: {
        shapeId: `#${EdgeType.Circle}Edge`,
        shape: (
            <symbol viewBox="0 0 50 50" id={`${EdgeType.Circle}Edge`}>
                <circle cx="25" cy="25" r="8" fill="currentColor" />
            </symbol>
        )
    },
    [EdgeType.Rectangle]: {
        shapeId: `#${EdgeType.Rectangle}Edge`,
        shape: (
            <symbol viewBox="0 0 50 50" id={`${EdgeType.Rectangle}Edge`}>
                <rect width="50" height="50" fill="currentColor" />
            </symbol>
        )
    }
};

export default defaultExport;