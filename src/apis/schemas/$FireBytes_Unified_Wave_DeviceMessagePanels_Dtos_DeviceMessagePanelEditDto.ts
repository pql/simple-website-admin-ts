/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        acknowledgedComment: {
            type: 'string',
            isNullable: true,
        },
        acknowledgedDateTime: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        acknowledgedBy: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        details: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
