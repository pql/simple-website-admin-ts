/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardDeviceAccessGroups_PacsCardDeviceAccessGroupListDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        accessGroupName: {
            type: 'string',
            isNullable: true,
        },
        pacsDeviceAccessGroupId: {
            type: 'string',
            format: 'uuid',
        },
        startDateTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        endDateTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
    },
} as const;
