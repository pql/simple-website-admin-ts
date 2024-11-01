/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanGroupItemsQueueDto = {
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
        deviceTypeFunctions: {
            type: 'string',
            isNullable: true,
        },
        actionPlanGroupIds: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
