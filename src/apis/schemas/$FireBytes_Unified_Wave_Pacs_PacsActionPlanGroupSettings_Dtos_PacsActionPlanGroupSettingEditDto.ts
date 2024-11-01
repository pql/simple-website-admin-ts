/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_PacsActionPlanGroupSettingEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        pacsActionPlanGroupId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        dayOfAccessSchedule: {
            type: 'string',
            isNullable: true,
        },
        time: {
            type: 'System_TimeSpan',
        },
    },
} as const;
