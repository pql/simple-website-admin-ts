/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Notifications_Enums_MessageLevel } from '../models/FireBytes_Unified_Notifications_Enums_MessageLevel';
import type { FireBytes_Unified_Notifications_Enums_MessageType } from '../models/FireBytes_Unified_Notifications_Enums_MessageType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationHubService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppNotificationHubSendMessage({
        id,
        receiverUserId,
        title,
        content,
        messageType,
        messageLevel,
    }: {
        id: string,
        receiverUserId: string,
        title?: string,
        content?: string,
        messageType?: FireBytes_Unified_Notifications_Enums_MessageType,
        messageLevel?: FireBytes_Unified_Notifications_Enums_MessageLevel,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/notification-hub/{id}/send-message/{receiverUserId}',
            path: {
                'id': id,
                'receiverUserId': receiverUserId,
            },
            query: {
                'title': title,
                'content': content,
                'messageType': messageType,
                'messageLevel': messageLevel,
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
