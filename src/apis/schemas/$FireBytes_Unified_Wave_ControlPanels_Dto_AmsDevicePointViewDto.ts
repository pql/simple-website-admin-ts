/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_AmsDevicePointViewDto = {
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
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
        graphicPanelId: {
            type: 'string',
            format: 'uuid',
        },
        deviceName: {
            type: 'string',
            isNullable: true,
        },
        graphicPanelName: {
            type: 'string',
            isNullable: true,
        },
        boundBuildingId: {
            type: 'string',
            format: 'uuid',
        },
    },
} as const;
