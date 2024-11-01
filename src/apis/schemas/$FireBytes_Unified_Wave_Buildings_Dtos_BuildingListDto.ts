/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Buildings_Dtos_BuildingListDto = {
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
        creatorName: {
            type: 'string',
            isNullable: true,
        },
        lastModifierName: {
            type: 'string',
            isNullable: true,
        },
        deleterName: {
            type: 'string',
            isNullable: true,
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
            format: 'double',
        },
        longitude: {
            type: 'number',
            format: 'double',
        },
        pointXvalue: {
            type: 'number',
            format: 'double',
        },
        pointYvalue: {
            type: 'number',
            format: 'double',
        },
        pointZvalue: {
            type: 'number',
            format: 'double',
        },
        border: {
            type: 'number',
            format: 'double',
        },
        siteId: {
            type: 'string',
            format: 'uuid',
        },
        siteName: {
            type: 'string',
            isNullable: true,
        },
        graphicPanelId: {
            type: 'string',
            format: 'uuid',
        },
        graphicName: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
