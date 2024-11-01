/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_GetPassportKioskMessagePanelInput } from '../models/FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_GetPassportKioskMessagePanelInput';
import type { FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto } from '../models/FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto';
import type { FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PassportKioskMessagePanelService {
    /**
     * @returns FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto Success
     * @throws ApiError
     */
    public static getApiAppPassportKioskMessagePanelById({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/passport-kiosk-message-panel/{id}/by-id',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static postApiAppPassportKioskMessagePanelPaged({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_GetPassportKioskMessagePanelInput,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/passport-kiosk-message-panel/paged',
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
     * @returns string Success
     * @throws ApiError
     */
    public static postApiAppPassportKioskMessagePanelSavePassportKioskMessagePanel({
        requestBody,
    }: {
        requestBody?: any,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/passport-kiosk-message-panel/save-passport-kiosk-message-panel',
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
