/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput = {
    properties: {
        pacsCardHolder: {
            type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderEditDto',
            isRequired: true,
        },
        pacsCardHolderCards: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardHolderCardListDto',
            },
            isNullable: true,
        },
        pacsCardHolderCompanys: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCompanys_PacsCardHolderCompanyListDto',
            },
            isNullable: true,
        },
        pacsCardHolderDevices: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDevices_PacsCardHolderDeviceListDto',
            },
            isNullable: true,
        },
    },
} as const;
