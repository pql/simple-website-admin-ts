/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsDeviceDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
        },
        deviceName: {
            type: 'string',
            isNullable: true,
        },
        deviceVendorSystemId: {
            type: 'string',
            isNullable: true,
        },
        deviceMacAddress: {
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
        deviceHostWebAddress: {
            type: 'string',
            isNullable: true,
        },
        deviceSlaveId: {
            type: 'string',
            isNullable: true,
        },
        deviceModel: {
            type: 'string',
            isNullable: true,
        },
        deviceStatusId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceStatusName: {
            type: 'string',
            isNullable: true,
        },
        deviceStatusCode: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
