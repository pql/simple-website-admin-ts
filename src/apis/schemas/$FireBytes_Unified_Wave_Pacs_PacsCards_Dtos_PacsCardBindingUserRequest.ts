/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardBindingUserRequest = {
    properties: {
        assignedToPacsUserId: {
            type: 'string',
            format: 'uuid',
        },
        idList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
