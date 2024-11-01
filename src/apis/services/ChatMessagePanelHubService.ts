/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Notifications_Dtos_RefreshDeviceStatusDto } from '../models/FireBytes_Unified_Notifications_Dtos_RefreshDeviceStatusDto';
import type { FireBytes_Unified_Notifications_Dtos_RefreshPassportKioskMessageDto } from '../models/FireBytes_Unified_Notifications_Dtos_RefreshPassportKioskMessageDto';
import type { FireBytes_Unified_Notifications_Dtos_ShowAlarmCameraDto } from '../models/FireBytes_Unified_Notifications_Dtos_ShowAlarmCameraDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatMessagePanelHubService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppChatMessagePanelHubRefreshMessagePanel(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/chat-message-panel-hub/refresh-message-panel',
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
    public static postApiAppChatMessagePanelHubRefreshDeviceStatus({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_RefreshDeviceStatusDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/chat-message-panel-hub/refresh-device-status',
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
    public static postApiAppChatMessagePanelHubShowAlarmCamera({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_ShowAlarmCameraDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/chat-message-panel-hub/show-alarm-camera',
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
    public static postApiAppChatMessagePanelHubRefreshPassportKioskMessage({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Notifications_Dtos_RefreshPassportKioskMessageDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/chat-message-panel-hub/refresh-passport-kiosk-message',
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
