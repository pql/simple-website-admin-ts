/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelImageMarkerDto = {
    properties: {
        devicePointViewId: {
            type: 'string',
            format: 'uuid',
        },
        title: {
            type: 'string',
            isNullable: true,
        },
        deviceStatusId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        pointXvalue: {
            type: 'number',
            format: 'double',
        },
        pointYvalue: {
            type: 'number',
            format: 'double',
        },
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
        deviceType: {
            type: 'string',
            isNullable: true,
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
    },
} as const;
