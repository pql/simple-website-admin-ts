/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceStatuss_Dtos_DeviceStatusEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        statusName: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        statusIconFont: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        statusCode: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        messageBackgroundColorCode: {
            type: 'string',
            isNullable: true,
        },
        requireAlertAcknowledgement: {
            type: 'boolean',
            isNullable: true,
        },
        messagePriority: {
            type: 'number',
            format: 'int32',
        },
        isAlert: {
            type: 'boolean',
            isNullable: true,
        },
        deviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        vendorStatusCode: {
            type: 'string',
            isNullable: true,
        },
        workflowId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDefault: {
            type: 'boolean',
            isNullable: true,
        },
        associateMasterDeviceStatus: {
            type: 'boolean',
            isNullable: true,
        },
        masterDeviceStatus: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        enableDisplayControlPanel: {
            type: 'boolean',
            isNullable: true,
        },
        enableDeviceStatusIdCache: {
            type: 'boolean',
            isNullable: true,
        },
        triggerDeviceStatusIdCache: {
            type: 'boolean',
            isNullable: true,
        },
    },
} as const;
