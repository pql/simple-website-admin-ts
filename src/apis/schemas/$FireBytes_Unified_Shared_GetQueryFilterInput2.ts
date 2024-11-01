/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Shared_GetQueryFilterInput2 = {
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
        name: {
            type: 'string',
            isNullable: true,
        },
        rdoBaseId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        rdoId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        ndoId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        customData: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
