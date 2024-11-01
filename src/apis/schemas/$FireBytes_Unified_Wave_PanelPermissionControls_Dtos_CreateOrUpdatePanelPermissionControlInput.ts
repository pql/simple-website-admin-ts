/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_PanelPermissionControls_Dtos_CreateOrUpdatePanelPermissionControlInput = {
    properties: {
        roleId: {
            type: 'string',
            format: 'uuid',
        },
        isControlPermissionChange: {
            type: 'boolean',
        },
        selectedControlPermissions: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
