/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Workflows_Dtos_DeviceControlInput = {
    properties: {
        deviceOrZone: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceTypeFunctionId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        idList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
