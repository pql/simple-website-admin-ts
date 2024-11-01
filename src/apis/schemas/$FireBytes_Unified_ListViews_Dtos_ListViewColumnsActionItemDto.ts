/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto = {
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
        name: {
            type: 'string',
            isNullable: true,
        },
        label: {
            type: 'string',
            isNullable: true,
        },
        icon: {
            type: 'string',
            isNullable: true,
        },
        type: {
            type: 'string',
            isNullable: true,
        },
        acl: {
            type: 'string',
            isNullable: true,
        },
        color: {
            type: 'string',
            isNullable: true,
        },
        buttons: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto',
            },
            isNullable: true,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
