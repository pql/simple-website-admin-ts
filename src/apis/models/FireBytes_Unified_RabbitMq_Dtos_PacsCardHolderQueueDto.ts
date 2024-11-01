/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderQueueDto = {
    messageId?: string;
    id?: string;
    action?: number;
    tenantId?: string | null;
    concurrencyStamp?: string | null;
    channel?: string | null;
    userId?: string;
    cardNumber?: string | null;
    cardStatus?: string | null;
    cardStartDateTime?: string | null;
    cardEndDateTime?: string | null;
    deviceGroupStartDateTime?: string | null;
    deviceGroupEndDateTime?: string | null;
    deviceAccessScheduleGroupIds?: Array<string> | null;
};

