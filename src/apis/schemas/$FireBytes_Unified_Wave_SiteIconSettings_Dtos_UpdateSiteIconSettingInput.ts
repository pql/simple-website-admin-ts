/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_SiteIconSettings_Dtos_UpdateSiteIconSettingInput = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        siteIcon: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        buildingIcon: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        floorIcon: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
