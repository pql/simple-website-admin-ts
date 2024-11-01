/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelMapMarkerDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        title: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        type: {
            type: 'string',
            isNullable: true,
        },
        deviceStatus: {
            type: 'FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto',
        },
        deviceStatusId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        latitude: {
            type: 'number',
            format: 'double',
        },
        longitude: {
            type: 'number',
            format: 'double',
        },
        commandMode: {
            type: 'string',
            isNullable: true,
        },
        peopleAround: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        isIndoorTrackingDevice: {
            type: 'boolean',
        },
        decompressingFileId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        fileIName: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
