/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceTypes_Dtos_DeviceTypeEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
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
            isNullable: true,
            format: 'int32',
        },
        brandId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isShowMapViewer: {
            type: 'boolean',
            isNullable: true,
        },
        isSettingCamera: {
            type: 'boolean',
            isNullable: true,
        },
        cameraLimitNumber: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        isSettingDeviceGroup: {
            type: 'boolean',
            isNullable: true,
        },
        isSysteam: {
            type: 'boolean',
            isNullable: true,
        },
        customFields: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Shared_CustomFields',
            },
            isNullable: true,
        },
        commandMode: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeRole: {
            type: 'string',
            isNullable: true,
        },
        redundantServer: {
            type: 'boolean',
            isNullable: true,
        },
        redundantInterfaceService: {
            type: 'boolean',
            isNullable: true,
        },
        masterDeviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
