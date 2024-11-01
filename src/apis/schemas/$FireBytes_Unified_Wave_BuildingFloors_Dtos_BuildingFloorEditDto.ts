/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_BuildingFloors_Dtos_BuildingFloorEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        floor: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
        },
        floorDisplayName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        latitude: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        longitude: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        pointXvalue: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        pointYvalue: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        pointZvalue: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        border: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        buildingId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        graphicPanelId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        graphicType: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
