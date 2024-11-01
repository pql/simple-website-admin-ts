/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceTypes_Dtos_DeviceTypeListDto = {
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
        brandName: {
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
        redundantServer: {
            type: 'boolean',
        },
        redundantInterfaceService: {
            type: 'boolean',
        },
    },
} as const;
