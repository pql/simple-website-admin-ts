/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Devices_Dtos_CameraViewerGetDeviceServiceConfigDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        deviceId: {
            type: 'string',
            isNullable: true,
        },
        deviceName: {
            type: 'string',
            isNullable: true,
        },
        serviceIp: {
            type: 'string',
            isNullable: true,
        },
        servicePort: {
            type: 'number',
            format: 'int32',
        },
        serviceId: {
            type: 'string',
            isNullable: true,
        },
        servicePassword: {
            type: 'string',
            isNullable: true,
        },
        loginId: {
            type: 'string',
            isReadOnly: true,
            isNullable: true,
        },
        isEnableSSL: {
            type: 'boolean',
        },
    },
} as const;
