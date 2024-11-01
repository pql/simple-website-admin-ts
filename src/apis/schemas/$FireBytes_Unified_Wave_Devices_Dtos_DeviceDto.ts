/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Devices_Dtos_DeviceDto = {
    properties: {
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
        interfaceService: {
            type: 'FireBytes_Unified_Wave_Devices_Dtos_InterfaceServiceDto',
        },
        deviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceType: {
            type: 'FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto',
        },
        buildingFloorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        credentialProfileId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceStatusId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceStatusIdCache: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceCategoryId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        buildingFloor: {
            type: 'FireBytes_Unified_Wave_BuildingFloors_Dtos_BuildingFloorDto',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
        },
        devicePointViews: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_DevicePointViews_Dtos_DevicePointViewDto',
            },
            isNullable: true,
        },
        defaultBuildingId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceGroupId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
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
