import React from 'react';

export interface IEdgeType {
    typeText: string,
    shapeId: string,
    shape: any
}

export enum EdgeType {
    Empty = "empty",
};

const createEdgeTypesElement = (typeName: EdgeType, innerShape: any) => ({
    [typeName]: {
        shapeId: `#${typeName}Edge`,
        shape: (
            <symbol viewBox="0 0 50 50" id={`${typeName}Edge`}>
                {innerShape}
            </symbol>
        )
    }
});

export default {
    ...createEdgeTypesElement(EdgeType.Empty, (
        <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
    )),
};