/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_CreateGraphicPanelDevicePointViewInput = {
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
        deviceId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        graphicPanelId: {
            type: 'string',
            format: 'uuid',
        },
        isDefultBoundBuilding: {
            type: 'boolean',
        },
        boundBuildingId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
