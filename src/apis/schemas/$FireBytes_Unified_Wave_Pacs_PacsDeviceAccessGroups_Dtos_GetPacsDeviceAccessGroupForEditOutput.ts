/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_GetPacsDeviceAccessGroupForEditOutput = {
    properties: {
        deviceAccessGroup: {
            type: 'FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupEditDto',
            isRequired: true,
        },
        items: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroupItemss_Dtos_PacsPacsDeviceAccessGroupItemsEditDto',
            },
            isNullable: true,
        },
    },
} as const;
