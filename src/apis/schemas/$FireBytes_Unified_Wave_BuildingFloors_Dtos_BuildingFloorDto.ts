/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_BuildingFloors_Dtos_BuildingFloorDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        floor: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 500,
        },
        floorDisplayName: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
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
    },
} as const;
