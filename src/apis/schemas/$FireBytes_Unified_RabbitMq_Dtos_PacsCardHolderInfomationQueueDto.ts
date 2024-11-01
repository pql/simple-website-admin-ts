/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderInfomationQueueDto = {
    properties: {
        messageId: {
            type: 'string',
            format: 'uuid',
        },
        id: {
            type: 'string',
            format: 'uuid',
        },
        action: {
            type: 'number',
            format: 'int32',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
        userName: {
            type: 'string',
            isNullable: true,
        },
        pinNumber: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
