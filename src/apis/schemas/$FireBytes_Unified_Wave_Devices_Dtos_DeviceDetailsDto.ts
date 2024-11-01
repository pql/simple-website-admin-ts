/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Devices_Dtos_DeviceDetailsDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
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
            isNullable: true,
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
            isNullable: true,
            format: 'uuid',
        },
        interfaceServiceName: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceTypeName: {
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
        buildingFloorId: {
            type: 'string',
            isNullable: true,
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
        zoneList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        deviceCategoryId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceGroupId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        cameraIdList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        deviceEditCustomFields: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Devices_Dtos_DeviceDetailsCustomFields',
            },
            isNullable: true,
        },
        commandSettings: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Devices_Dtos_CommandSettingDto',
            },
            isNullable: true,
        },
        isStitchingViewCamera: {
            type: 'boolean',
        },
        masterDeviceId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        slaveDeviceIdList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        redundantInterfaceServiceIdList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        network: {
            type: 'string',
            isNullable: true,
        },
        status: {
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
        timezone: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
