/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_WidgetAppServices_Dtos_AlertDeviceConfigDto } from '../models/FireBytes_Unified_Wave_WidgetAppServices_Dtos_AlertDeviceConfigDto';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WidgetService {
    /**
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppWidgetAlertConfirmById({
        id,
    }: {
        id: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/widget/{id}/alert-confirm-by-id',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppWidgetAlertDeleteById({
        id,
    }: {
        id: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/widget/{id}/alert-delete-by-id',
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
     * @returns FireBytes_Unified_Wave_WidgetAppServices_Dtos_AlertDeviceConfigDto Success
     * @throws ApiError
     */
    public static getApiAppWidgetAlertDeviceConfig({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_WidgetAppServices_Dtos_AlertDeviceConfigDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/widget/{id}/alert-device-config',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppWidgetContrlPanelAlertMessagePanel({
        deviceId,
        requireAlertAcknowledgement,
        isAlertConfirm,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        deviceId?: string,
        requireAlertAcknowledgement?: boolean,
        isAlertConfirm?: boolean,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/widget/contrl-panel-alert-message-panel',
            query: {
                'DeviceId': deviceId,
                'RequireAlertAcknowledgement': requireAlertAcknowledgement,
                'IsAlertConfirm': isAlertConfirm,
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppWidgetContrlPanelMessagePanel({
        deviceId,
        requireAlertAcknowledgement,
        isAlertConfirm,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        deviceId?: string,
        requireAlertAcknowledgement?: boolean,
        isAlertConfirm?: boolean,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/widget/contrl-panel-message-panel',
            query: {
                'DeviceId': deviceId,
                'RequireAlertAcknowledgement': requireAlertAcknowledgement,
                'IsAlertConfirm': isAlertConfirm,
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppWidgetContrlPanelNotAlertMessagePanel({
        deviceId,
        requireAlertAcknowledgement,
        isAlertConfirm,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        deviceId?: string,
        requireAlertAcknowledgement?: boolean,
        isAlertConfirm?: boolean,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/widget/contrl-panel-not-alert-message-panel',
            query: {
                'DeviceId': deviceId,
                'RequireAlertAcknowledgement': requireAlertAcknowledgement,
                'IsAlertConfirm': isAlertConfirm,
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
