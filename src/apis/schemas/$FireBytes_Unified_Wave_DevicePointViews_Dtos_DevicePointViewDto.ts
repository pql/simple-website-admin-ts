/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DevicePointViews_Dtos_DevicePointViewDto = {
    properties: {
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
            isNullable: true,
            format: 'uuid',
        },
        device: {
            type: 'FireBytes_Unified_Wave_Devices_Dtos_DeviceDto',
        },
        graphicPanelId: {
            type: 'string',
            format: 'uuid',
        },
        boundBuildingId: {
            type: 'string',
            format: 'uuid',
        },
        graphicPanel: {
            type: 'FireBytes_Unified_Wave_Devices_Dtos_GraphicPanelDto',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
