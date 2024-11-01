/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_AmsDeviceDto = {
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
        deviceTypeId: {
            type: 'string',
            format: 'uuid',
        },
        buildingFloorId: {
            type: 'string',
            format: 'uuid',
        },
        serviceId: {
            type: 'string',
            isNullable: true,
        },
        servicePassword: {
            type: 'string',
            isNullable: true,
        },
        deviceStatusId: {
            type: 'string',
            format: 'uuid',
        },
        deviceStatusIcon: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
