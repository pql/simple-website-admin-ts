/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
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
        pageFilterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        sortNum: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        field: {
            type: 'string',
            isNullable: true,
        },
        filterTitle: {
            type: 'string',
            isNullable: true,
        },
        filterWidth: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        queryType: {
            type: 'string',
            isNullable: true,
        },
        componentName: {
            type: 'string',
            isNullable: true,
        },
        skipValueIsNull: {
            type: 'boolean',
            isNullable: true,
        },
        args: {
            type: 'dictionary',
            contains: {
                properties: {
                },
                isNullable: true,
            },
            isNullable: true,
        },
        valueChange: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        isAdvanced: {
            type: 'boolean',
            isNullable: true,
        },
        ifShow: {
            type: 'boolean',
            isNullable: true,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
