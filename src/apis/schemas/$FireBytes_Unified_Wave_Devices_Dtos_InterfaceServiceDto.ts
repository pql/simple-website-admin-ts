/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Devices_Dtos_InterfaceServiceDto = {
    properties: {
        serviceName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        serviceIp: {
            type: 'string',
            isNullable: true,
            maxLength: 50,
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
            maxLength: 50,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
        },
        interfaceBrandId: {
            type: 'string',
            format: 'uuid',
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
