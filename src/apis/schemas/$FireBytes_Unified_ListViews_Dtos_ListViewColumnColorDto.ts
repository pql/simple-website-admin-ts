/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto = {
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
        listViewColumnsId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        colFieldName: {
            type: 'string',
            isNullable: true,
            maxLength: 100,
        },
        determineType: {
            type: 'string',
            isNullable: true,
            maxLength: 16,
        },
        value: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
        },
        color: {
            type: 'string',
            isNullable: true,
            maxLength: 32,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
