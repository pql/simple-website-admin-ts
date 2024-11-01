/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleItems_Dtos_PacsDeviceAccessScheduleItemEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        pacsAccessScheduleId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        sort: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        dayOfAccessSchedule: {
            type: 'string',
            isNullable: true,
            maxLength: 32,
        },
        startTime: {
            type: 'System_TimeSpan',
        },
        endTime: {
            type: 'System_TimeSpan',
        },
    },
} as const;
