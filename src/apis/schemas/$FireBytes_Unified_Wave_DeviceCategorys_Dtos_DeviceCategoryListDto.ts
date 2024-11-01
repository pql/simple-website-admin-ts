/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceCategorys_Dtos_DeviceCategoryListDto = {
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
        deviceCategoryName: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeId: {
            type: 'string',
            format: 'uuid',
        },
        deviceType: {
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
        icon: {
            type: 'string',
            isNullable: true,
        },
        iconFile: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDefault: {
            type: 'boolean',
        },
    },
} as const;
