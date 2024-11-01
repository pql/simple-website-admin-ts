/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_CreateOrUpdatePacsActionPlanGroupSettingInput = {
    properties: {
        pacsActionPlanGroupId: {
            type: 'string',
            format: 'uuid',
        },
        pacsActionPlanGroupSettingForList: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_PacsActionPlanGroupSettingEditDto',
            },
            isRequired: true,
        },
    },
} as const;
