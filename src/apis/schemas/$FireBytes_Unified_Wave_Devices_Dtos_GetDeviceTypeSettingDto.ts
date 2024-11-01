/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Devices_Dtos_GetDeviceTypeSettingDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        isShowMapViewer: {
            type: 'boolean',
        },
        isSettingCamera: {
            type: 'boolean',
        },
        cameraLimitNumber: {
            type: 'number',
            format: 'int32',
        },
        isSettingDeviceGroup: {
            type: 'boolean',
        },
        deviceTypeRole: {
            type: 'string',
            isNullable: true,
        },
        redundantServer: {
            type: 'boolean',
        },
        redundantInterfaceService: {
            type: 'boolean',
        },
        deviceEditCustomFields: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Devices_Dtos_DeviceEditCustomFields',
            },
            isNullable: true,
        },
    },
} as const;
