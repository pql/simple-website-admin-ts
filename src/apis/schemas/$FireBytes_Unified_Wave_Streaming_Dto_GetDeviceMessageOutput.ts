/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Streaming_Dto_GetDeviceMessageOutput = {
    properties: {
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
        deviceName: {
            type: 'string',
            isNullable: true,
        },
        vendorSystemId: {
            type: 'string',
            isNullable: true,
        },
        deviceHostNameOrIp: {
            type: 'string',
            isNullable: true,
        },
        deviceHostPort: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        deviceSlaveId: {
            type: 'string',
            isNullable: true,
        },
        isStitchingViewCamera: {
            type: 'boolean',
        },
        deviceEditCustomFieldsJson: {
            type: 'string',
            isNullable: true,
        },
        masterDeviceId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceTypeName: {
            type: 'string',
            isNullable: true,
        },
        deviceBrandName: {
            type: 'string',
            isNullable: true,
        },
        deviceServerList: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Streaming_Dto_DeviceServer',
            },
            isNullable: true,
        },
    },
} as const;
