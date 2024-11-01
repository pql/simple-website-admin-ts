/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto = {
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
        companyName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        address1: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        address2: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        city: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        state: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        zip: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        pacsCompanyTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        pacsCompanyTypeName: {
            type: 'string',
            isNullable: true,
        },
        pacsCardHolderCompanyId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 2048,
        },
        pacsCardHolderId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
