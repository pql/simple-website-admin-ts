/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_CreateOrUpdateDeviceMessagePanelInput } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_CreateOrUpdateDeviceMessagePanelInput';
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto';
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelForEditOutput } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelForEditOutput';
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelsInput } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelsInput';
import type { FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetMessagePanelButtonBumber } from '../models/FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetMessagePanelButtonBumber';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeviceMessagePanelService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static postApiAppDeviceMessagePanelPaged({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelsInput,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel/paged',
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
     * @returns FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto Success
     * @throws ApiError
     */
    public static getApiAppDeviceMessagePanelById({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-message-panel/by-id/{Id}',
            path: {
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
     * @returns FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppDeviceMessagePanelForEdit({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-message-panel/for-edit/{Id}',
            path: {
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
    public static postApiAppDeviceMessagePanelOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_CreateOrUpdateDeviceMessagePanelInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-message-panel/or-update',
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
     * @returns FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetMessagePanelButtonBumber Success
     * @throws ApiError
     */
    public static getApiAppDeviceMessagePanelMessagePanelButtonBumber(): CancelablePromise<FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetMessagePanelButtonBumber> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-message-panel/message-panel-button-bumber',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppDeviceMessagePanelRealTimeData({
        realTime,
    }: {
        realTime?: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-message-panel/real-time-data',
            query: {
                'realTime': realTime,
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
