/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanGroupItemsQueueDto } from '../models/FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanGroupItemsQueueDto';
import type { FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanScheduleItemsQueueDto } from '../models/FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanScheduleItemsQueueDto';
import type { FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderInfomationQueueDto } from '../models/FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderInfomationQueueDto';
import type { FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderQueueDto } from '../models/FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderQueueDto';
import type { FireBytes_Unified_RabbitMq_Dtos_PacsHolidayAccessScheduleItemsQueueDto } from '../models/FireBytes_Unified_RabbitMq_Dtos_PacsHolidayAccessScheduleItemsQueueDto';
import type { FireBytes_Unified_RabbitMq_Dtos_PacsWeekAccessScheduleItemsQueueDto } from '../models/FireBytes_Unified_RabbitMq_Dtos_PacsWeekAccessScheduleItemsQueueDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsMqDataAsyncService {
    /**
     * @returns FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderInfomationQueueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsMqDataAsyncGetPacsPerson({
        deviceVendorSystemId,
        code,
    }: {
        deviceVendorSystemId?: string,
        code?: string,
    }): CancelablePromise<Array<FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderInfomationQueueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-mq-data-async/get-pacs-person',
            query: {
                'DeviceVendorSystemId': deviceVendorSystemId,
                'Code': code,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_RabbitMq_Dtos_PacsWeekAccessScheduleItemsQueueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsMqDataAsyncGetWeekAccessSchedule({
        deviceVendorSystemId,
        code,
    }: {
        deviceVendorSystemId?: string,
        code?: string,
    }): CancelablePromise<Array<FireBytes_Unified_RabbitMq_Dtos_PacsWeekAccessScheduleItemsQueueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-mq-data-async/get-week-access-schedule',
            query: {
                'DeviceVendorSystemId': deviceVendorSystemId,
                'Code': code,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_RabbitMq_Dtos_PacsHolidayAccessScheduleItemsQueueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsMqDataAsyncGetHolidayAccessSchedule({
        deviceVendorSystemId,
        code,
    }: {
        deviceVendorSystemId?: string,
        code?: string,
    }): CancelablePromise<Array<FireBytes_Unified_RabbitMq_Dtos_PacsHolidayAccessScheduleItemsQueueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-mq-data-async/get-holiday-access-schedule',
            query: {
                'DeviceVendorSystemId': deviceVendorSystemId,
                'Code': code,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderQueueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsMqDataAsyncGetCardHolder({
        deviceVendorSystemId,
        code,
    }: {
        deviceVendorSystemId?: string,
        code?: string,
    }): CancelablePromise<Array<FireBytes_Unified_RabbitMq_Dtos_PacsCardHolderQueueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-mq-data-async/get-card-holder',
            query: {
                'DeviceVendorSystemId': deviceVendorSystemId,
                'Code': code,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanScheduleItemsQueueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsMqDataAsyncGetPlanSchedule({
        deviceVendorSystemId,
        code,
    }: {
        deviceVendorSystemId?: string,
        code?: string,
    }): CancelablePromise<Array<FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanScheduleItemsQueueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-mq-data-async/get-plan-schedule',
            query: {
                'DeviceVendorSystemId': deviceVendorSystemId,
                'Code': code,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanGroupItemsQueueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsMqDataAsyncGetExecutionplan({
        deviceVendorSystemId,
        code,
    }: {
        deviceVendorSystemId?: string,
        code?: string,
    }): CancelablePromise<Array<FireBytes_Unified_RabbitMq_Dtos_PacsActionPlanGroupItemsQueueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-mq-data-async/get-executionplan',
            query: {
                'DeviceVendorSystemId': deviceVendorSystemId,
                'Code': code,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
}
