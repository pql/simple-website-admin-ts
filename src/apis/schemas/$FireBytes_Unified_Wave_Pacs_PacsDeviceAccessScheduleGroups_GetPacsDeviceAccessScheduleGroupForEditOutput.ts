/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_GetPacsDeviceAccessScheduleGroupForEditOutput = {
    properties: {
        deviceAccessScheduleGroup: {
            type: 'FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupEditDto',
            isRequired: true,
        },
        items: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleItems_Dtos_PacsDeviceAccessScheduleItemEditDto',
            },
            isNullable: true,
        },
    },
} as const;
