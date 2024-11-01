/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanScheduleItemsQueueDto = {
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
        actionPlanGroupId: {
            type: 'string',
            format: 'uuid',
        },
        dayOfAccessSchedule: {
            type: 'number',
            format: 'int32',
        },
        date: {
            type: 'string',
            isNullable: true,
        },
        time: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
