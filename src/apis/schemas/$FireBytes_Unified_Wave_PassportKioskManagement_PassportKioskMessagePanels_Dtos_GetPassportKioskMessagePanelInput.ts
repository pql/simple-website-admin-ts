/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_GetPassportKioskMessagePanelInput = {
    properties: {
        maxResultCount: {
            type: 'number',
            format: 'int32',
            maximum: 2147483647,
            minimum: 1,
        },
        skipCount: {
            type: 'number',
            format: 'int32',
            maximum: 2147483647,
        },
        filter: {
            type: 'string',
            isNullable: true,
        },
        sorting: {
            type: 'string',
            isNullable: true,
        },
        messageType: {
            type: 'string',
            isNullable: true,
        },
        startTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        endTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        faceIsMatch: {
            type: 'boolean',
            isNullable: true,
        },
        irisMatch: {
            type: 'boolean',
            isNullable: true,
        },
    },
} as const;
