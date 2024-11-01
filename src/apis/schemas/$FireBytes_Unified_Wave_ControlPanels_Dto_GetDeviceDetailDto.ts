/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceDetailDto = {
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
        interfaceService: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceType: {
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
        statusModificationTime: {
            type: 'string',
            format: 'date-time',
        },
        buildingFloorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        buildingFloor: {
            type: 'string',
            isNullable: true,
        },
        credentialProfileId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        credentialProfile: {
            type: 'string',
            isNullable: true,
        },
        zones: {
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
        cameras: {
            type: 'string',
            isNullable: true,
        },
        deviceEditCustomFields: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Devices_Dtos_DeviceEditCustomFields',
            },
            isNullable: true,
        },
        commandSettings: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_ControlPanels_Dto_CommandSettingDetailDto',
            },
            isNullable: true,
        },
    },
} as const;
