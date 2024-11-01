/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        deviceTypeName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        deviceTypeIcon: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
        },
        releaseNote: {
            type: 'string',
            isNullable: true,
        },
        vendorSoftwareNote: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
        },
        displayOrder: {
            type: 'number',
            format: 'int32',
        },
        brandId: {
            type: 'string',
            format: 'uuid',
        },
        brand: {
            type: 'FireBytes_Unified_Wave_Brands_Dtos_BrandDto',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
        },
        isShowMapViewer: {
            type: 'boolean',
        },
        isSettingCamera: {
            type: 'boolean',
        },
        cameraLimitNumber: {
            type: 'number',
            format: 'int32',
        },
        isSettingDeviceGroup: {
            type: 'boolean',
        },
        isSysteam: {
            type: 'boolean',
        },
        commandMode: {
            type: 'string',
            isNullable: true,
        },
        customFieldsJson: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeRole: {
            type: 'string',
            isNullable: true,
        },
        redundantServer: {
            type: 'boolean',
        },
        redundantInterfaceService: {
            type: 'boolean',
        },
        masterDeviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
