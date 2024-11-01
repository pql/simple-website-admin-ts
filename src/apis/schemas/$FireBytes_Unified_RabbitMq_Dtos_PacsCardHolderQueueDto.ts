/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderQueueDto = {
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
        channel: {
            type: 'string',
            isNullable: true,
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        cardNumber: {
            type: 'string',
            isNullable: true,
        },
        cardStatus: {
            type: 'string',
            isNullable: true,
        },
        cardStartDateTime: {
            type: 'string',
            isNullable: true,
        },
        cardEndDateTime: {
            type: 'string',
            isNullable: true,
        },
        deviceGroupStartDateTime: {
            type: 'string',
            isNullable: true,
        },
        deviceGroupEndDateTime: {
            type: 'string',
            isNullable: true,
        },
        deviceAccessScheduleGroupIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
