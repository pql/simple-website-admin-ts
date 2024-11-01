/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
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
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        creatorName: {
            type: 'string',
            isNullable: true,
        },
        lastModifierName: {
            type: 'string',
            isNullable: true,
        },
        deleterName: {
            type: 'string',
            isNullable: true,
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
            format: 'uuid',
        },
        credentialProfile: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
