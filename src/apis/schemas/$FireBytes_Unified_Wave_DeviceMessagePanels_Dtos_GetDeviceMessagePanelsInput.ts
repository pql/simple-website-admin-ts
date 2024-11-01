/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelsInput = {
    properties: {
        maxResultCount: {
            type: 'number',
            format: 'int32',
            maximum: 2147483647,
            minimum: 1,
        },
        skipCount: {
            type: 'number',
            format: 'int32',
            maximum: 2147483647,
        },
        filter: {
            type: 'FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_MessagePanelTableFilterDto',
        },
        sorting: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
