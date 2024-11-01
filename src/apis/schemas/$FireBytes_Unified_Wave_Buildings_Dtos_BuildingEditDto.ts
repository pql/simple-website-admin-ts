/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Buildings_Dtos_BuildingEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        buildingName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        buildingAddress: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
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
        siteId: {
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
