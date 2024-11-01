/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsListDto = {
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
        deviceGroupId: {
            type: 'string',
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
        deviceTypeId: {
            type: 'string',
            format: 'uuid',
        },
        deviceTypeName: {
            type: 'string',
            isNullable: true,
        },
        brandId: {
            type: 'string',
            format: 'uuid',
        },
        brandName: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeFunctionId: {
            type: 'string',
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
    },
} as const;
