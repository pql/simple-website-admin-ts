/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Devices_Dtos_DeviceListDto = {
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
        deviceName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        deviceHostNameOrIp: {
            type: 'string',
            isNullable: true,
            maxLength: 20,
        },
        deviceHostPort: {
            type: 'number',
            format: 'int32',
        },
        deviceHostWebAddress: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        deviceSlaveId: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        deviceMacAddress: {
            type: 'string',
            isNullable: true,
            maxLength: 100,
        },
        deviceModel: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        deviceVendorSystemId: {
            type: 'string',
            isNullable: true,
            maxLength: 100,
        },
        interfaceServiceId: {
            type: 'string',
            format: 'uuid',
        },
        interfaceServiceName: {
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
        buildingFloorId: {
            type: 'string',
            format: 'uuid',
        },
        buildingFloorName: {
            type: 'string',
            isNullable: true,
        },
        credentialProfileId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        credentialProfileName: {
            type: 'string',
            isNullable: true,
        },
        deviceStatusId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceStatus: {
            type: 'string',
            isNullable: true,
        },
        deviceCategoryId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceCategory: {
            type: 'string',
            isNullable: true,
        },
        channel: {
            type: 'string',
            isNullable: true,
        },
        position: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
