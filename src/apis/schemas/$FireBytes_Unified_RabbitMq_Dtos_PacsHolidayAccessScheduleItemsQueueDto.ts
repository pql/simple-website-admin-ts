/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_RabbitMq_Dtos_PacsHolidayAccessScheduleItemsQueueDto = {
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
        deviceAccessScheduleGroupId: {
            type: 'string',
            format: 'uuid',
        },
        holidayAccessSchedule: {
            type: 'number',
            format: 'int32',
        },
        startDate: {
            type: 'string',
            isNullable: true,
        },
        startTime: {
            type: 'string',
            isNullable: true,
        },
        endDate: {
            type: 'string',
            isNullable: true,
        },
        endTime: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
