/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_InterfaceServices_Dtos_InterfaceServiceListDto = {
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
        serviceName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        serviceIp: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        servicePort: {
            type: 'number',
            format: 'int32',
        },
        serviceId: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        servicePassword: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
        },
        interfaceBrandId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        interfaceBrand: {
            type: 'string',
            isNullable: true,
        },
        lastHeartbeatTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        isEnableSSL: {
            type: 'boolean',
        },
    },
} as const;
