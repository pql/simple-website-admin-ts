/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroupItemss_Dtos_PacsPacsDeviceAccessGroupItemsEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        pacsDeviceAccessGroupId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        sort: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
        pacsDeviceAccessScheduleGroupId: {
            type: 'string',
            format: 'uuid',
        },
        description: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
