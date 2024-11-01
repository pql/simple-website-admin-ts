/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
        serverHostNameOrIp: {
            type: 'string',
            isNullable: true,
        },
        port: {
            type: 'number',
            format: 'int32',
        },
        credentialProfileId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
