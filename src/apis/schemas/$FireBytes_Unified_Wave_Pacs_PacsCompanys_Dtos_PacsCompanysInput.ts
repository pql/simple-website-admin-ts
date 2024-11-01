/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanysInput = {
    properties: {
        pacsCardHolderId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        idList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
