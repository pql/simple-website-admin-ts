/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceCredentialProfiles_Dtos_DeviceCredentialProfileEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        credentialProfileName: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        deviceLoginId: {
            type: 'string',
            isNullable: true,
        },
        deviceLoginPassword: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
