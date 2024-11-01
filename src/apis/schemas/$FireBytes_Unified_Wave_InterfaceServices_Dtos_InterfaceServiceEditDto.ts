/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_InterfaceServices_Dtos_InterfaceServiceEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
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
        isEnableSSL: {
            type: 'boolean',
            isNullable: true,
        },
    },
} as const;
