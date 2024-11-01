/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        cardFormatId: {
            type: 'string',
            format: 'uuid',
        },
        cardNumber: {
            type: 'string',
            isNullable: true,
            maxLength: 100,
        },
        facilityCode: {
            type: 'number',
            format: 'int32',
        },
        startDateTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        endDateTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        isVirtualCard: {
            type: 'boolean',
        },
        badgeTemplateId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        cardStatus: {
            type: 'string',
            isNullable: true,
            maxLength: 32,
        },
        assignedToPacsUserId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        pinNumber: {
            type: 'string',
            isNullable: true,
        },
        descriptions: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
    },
} as const;
