/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Sites_Dtos_SiteEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        siteName: {
            type: 'string',
            isNullable: true,
        },
        country: {
            type: 'string',
            isNullable: true,
        },
        siteAddress: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        latitude: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        longitude: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        pointXvalue: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        pointYvalue: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        pointZvalue: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        border: {
            type: 'number',
            isNullable: true,
            format: 'double',
        },
        graphicPanelId: {
            type: 'string',
            format: 'uuid',
        },
        graphicType: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
