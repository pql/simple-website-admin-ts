/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardListDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        creatorName: {
            type: 'string',
            isNullable: true,
        },
        lastModifierName: {
            type: 'string',
            isNullable: true,
        },
        deleterName: {
            type: 'string',
            isNullable: true,
        },
        cardFormatId: {
            type: 'string',
            format: 'uuid',
        },
        cardFormat: {
            type: 'string',
            isNullable: true,
        },
        cardNumber: {
            type: 'string',
            isNullable: true,
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
        cardStatus: {
            type: 'string',
            isNullable: true,
        },
        assignedToPacsUserId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        assignedToPacsUser: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
