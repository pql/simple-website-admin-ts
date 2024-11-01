/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Avue_BladeVisualCategories_Dtos_BladeVisualCategoryEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        categoryKey: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        categoryValue: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        categoryModule: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
