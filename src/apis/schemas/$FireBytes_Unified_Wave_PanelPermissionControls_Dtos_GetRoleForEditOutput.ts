/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_PanelPermissionControls_Dtos_GetRoleForEditOutput = {
    properties: {
        role: {
            type: 'FireBytes_Unified_Wave_PanelPermissionControls_Dtos_RoleEditDto',
        },
        permissions: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_PanelPermissionControls_Dtos_FlatPermissionDto',
            },
            isNullable: true,
        },
        grantedPermissionNames: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
