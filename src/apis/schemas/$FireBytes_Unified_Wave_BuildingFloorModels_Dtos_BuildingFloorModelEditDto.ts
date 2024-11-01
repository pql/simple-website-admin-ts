/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        modelName: {
            type: 'string',
            isNullable: true,
        },
        fileId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        type: {
            type: 'number',
            isRequired: true,
            format: 'int32',
        },
    },
} as const;
