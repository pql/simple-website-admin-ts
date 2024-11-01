/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
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
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 2048,
        },
    },
} as const;
