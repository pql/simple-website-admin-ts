/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceStatuss_Dtos_DeviceStatusListDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        creatorName: {
            type: 'string',
            isNullable: true,
        },
        lastModifierName: {
            type: 'string',
            isNullable: true,
        },
        deleterName: {
            type: 'string',
            isNullable: true,
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
        deviceTypeId: {
            type: 'string',
            format: 'uuid',
        },
        messageBackgroundColorCode: {
            type: 'string',
            isNullable: true,
        },
        requireAlertAcknowledgement: {
            type: 'boolean',
        },
        messagePriority: {
            type: 'number',
            format: 'int32',
        },
        isAlert: {
            type: 'boolean',
        },
        deviceType: {
            type: 'string',
            isNullable: true,
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
        },
        enableDisplayControlPanel: {
            type: 'boolean',
        },
        enableDeviceStatusIdCache: {
            type: 'boolean',
        },
        triggerDeviceStatusIdCache: {
            type: 'boolean',
        },
    },
} as const;
