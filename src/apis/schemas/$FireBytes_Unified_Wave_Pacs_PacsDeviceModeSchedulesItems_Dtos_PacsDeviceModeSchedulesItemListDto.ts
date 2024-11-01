/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_PacsDeviceModeSchedulesItemListDto = {
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
        pacsActionPlanGroupId: {
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
        deviceTypeFunctionId: {
            type: 'string',
            format: 'uuid',
        },
        deviceTypeFunctionName: {
            type: 'string',
            isNullable: true,
        },
        deviceBrandId: {
            type: 'string',
            format: 'uuid',
        },
        deviceBrandName: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
