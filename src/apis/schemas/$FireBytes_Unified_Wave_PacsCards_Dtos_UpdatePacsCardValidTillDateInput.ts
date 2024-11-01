/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_PacsCards_Dtos_UpdatePacsCardValidTillDateInput = {
    properties: {
        ids: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        startDateTime: {
            type: 'string',
            format: 'date-time',
        },
        endDateTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
