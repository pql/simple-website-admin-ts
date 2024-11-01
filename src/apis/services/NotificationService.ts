/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Notifications_Dtos_SendBroadCastMessageInput } from '../models/FireBytes_Unified_Notifications_Dtos_SendBroadCastMessageInput';
import type { FireBytes_Unified_Notifications_Dtos_SendCommonMessageInput } from '../models/FireBytes_Unified_Notifications_Dtos_SendCommonMessageInput';
import type { FireBytes_Unified_Notifications_Dtos_SetReadInput } from '../models/FireBytes_Unified_Notifications_Dtos_SetReadInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppNotificationSendCommonWarningMessage({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_SendCommonMessageInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/notification/send-common-warning-message',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppNotificationSendCommonInformationMessage({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_SendCommonMessageInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/notification/send-common-information-message',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppNotificationSendCommonErrorMessage({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_SendCommonMessageInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/notification/send-common-error-message',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppNotificationSendBroadCastWarningMessage({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_SendBroadCastMessageInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/notification/send-broad-cast-warning-message',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppNotificationSendBroadCastInformationMessage({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_SendBroadCastMessageInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/notification/send-broad-cast-information-message',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppNotificationSendBroadCastErrorMessage({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_SendBroadCastMessageInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/notification/send-broad-cast-error-message',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppNotificationSetRead({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_SetReadInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/notification/set-read',
            body: requestBody,
            mediaType: 'application/json',
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
