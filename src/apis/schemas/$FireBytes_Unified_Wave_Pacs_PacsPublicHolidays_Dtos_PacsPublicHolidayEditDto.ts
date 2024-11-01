/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_PacsPublicHolidayEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        holidayName: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
        },
        isEveOfHoliday: {
            type: 'boolean',
        },
        startDate: {
            type: 'string',
            format: 'date',
        },
        endDate: {
            type: 'string',
            format: 'date',
        },
    },
} as const;
