/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_SiteIconSettings_Dtos_GetSettingDto } from '../models/FireBytes_Unified_Wave_SiteIconSettings_Dtos_GetSettingDto';
import type { FireBytes_Unified_Wave_SiteIconSettings_Dtos_UpdateSiteIconSettingInput } from '../models/FireBytes_Unified_Wave_SiteIconSettings_Dtos_UpdateSiteIconSettingInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SiteIconSettingService {
    /**
     * @returns FireBytes_Unified_Wave_SiteIconSettings_Dtos_GetSettingDto Success
     * @throws ApiError
     */
    public static getApiAppSiteIconSettingSetting(): CancelablePromise<FireBytes_Unified_Wave_SiteIconSettings_Dtos_GetSettingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/site-icon-setting/setting',
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
    public static putApiAppSiteIconSetting({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_SiteIconSettings_Dtos_UpdateSiteIconSettingInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/site-icon-setting',
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
