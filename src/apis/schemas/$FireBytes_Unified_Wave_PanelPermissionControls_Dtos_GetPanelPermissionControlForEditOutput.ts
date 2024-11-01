/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_PanelPermissionControls_Dtos_GetPanelPermissionControlForEditOutput = {
    properties: {
        siteBuildingFloorPermissions: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        devicePermissions: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        controlPermissions: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        getRoleForEditOutput: {
            type: 'FireBytes_Unified_Wave_PanelPermissionControls_Dtos_GetRoleForEditOutput',
        },
    },
} as const;
