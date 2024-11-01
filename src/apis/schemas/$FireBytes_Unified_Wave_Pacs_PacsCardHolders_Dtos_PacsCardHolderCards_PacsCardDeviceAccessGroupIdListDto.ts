/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardDeviceAccessGroupIdListDto = {
    properties: {
        cardId: {
            type: 'string',
            format: 'uuid',
        },
        deviceAccessGroup: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardDeviceAccessGroups_PacsCardDeviceAccessGroupListDto',
            },
            isNullable: true,
        },
    },
} as const;
