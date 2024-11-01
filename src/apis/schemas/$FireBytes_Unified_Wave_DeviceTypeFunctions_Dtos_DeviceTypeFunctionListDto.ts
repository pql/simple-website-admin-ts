/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceTypeFunctions_Dtos_DeviceTypeFunctionListDto = {
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
        deviceFunction: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        deviceTypeFunctionCode: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        vendorFunctionCode: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        deviceTypeId: {
            type: 'string',
            format: 'uuid',
        },
        deviceType: {
            type: 'string',
            isNullable: true,
        },
        deviceStatusId: {
            type: 'string',
            format: 'uuid',
        },
        deviceStatus: {
            type: 'string',
            isNullable: true,
        },
        brandId: {
            type: 'string',
            format: 'uuid',
        },
        brand: {
            type: 'string',
            isNullable: true,
        },
        isChangeDeviceStatus: {
            type: 'boolean',
        },
        isSystemFunction: {
            type: 'boolean',
        },
    },
} as const;
