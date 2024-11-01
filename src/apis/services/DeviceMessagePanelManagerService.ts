/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_CreateDeviceMessagePanel } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_CreateDeviceMessagePanel';
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelList } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelList';
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_UpdateDeviceMessagePanel } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_UpdateDeviceMessagePanel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeviceMessagePanelManagerService {
    /**
     * @returns FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelList Success
     * @throws ApiError
     */
    public static postApiAppDeviceMessagePanelManager({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_CreateDeviceMessagePanel,
    }): CancelablePromise<FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel-manager',
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
    public static putApiAppDeviceMessagePanelManager({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_UpdateDeviceMessagePanel,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/device-message-panel-manager',
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
    public static deleteApiAppDeviceMessagePanelManager({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/device-message-panel-manager',
            query: {
                'Id': id,
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppDeviceMessagePanelManagerBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel-manager/batch-delete',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppDeviceMessagePanelManagerIsExist({
        id,
    }: {
        id: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel-manager/{id}/is-exist',
            path: {
                'id': id,
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppDeviceMessagePanelManagerRightMessagePanelCache({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelList,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel-manager/right-message-panel-cache',
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
    public static postApiAppDeviceMessagePanelManagerRightMessagePanelCacheAsObject({
        requestBody,
    }: {
        requestBody?: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel-manager/right-message-panel-cache-as-object',
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
    public static postApiAppDeviceMessagePanelManagerAndSendMQByDeviceId({
        deviceId,
        deviceTypeFunctionId,
    }: {
        deviceId?: string,
        deviceTypeFunctionId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel-manager/and-send-mQBy-device-id',
            query: {
                'deviceId': deviceId,
                'DeviceTypeFunctionId': deviceTypeFunctionId,
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppDeviceMessagePanelManagerSaveMessagePanel({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel-manager/{id}/save-message-panel',
            path: {
                'id': id,
            },
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
