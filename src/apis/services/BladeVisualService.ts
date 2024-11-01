/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Avue_BladeVisualConfigs_Dtos_BladeVisualConfigEditDto } from '../models/FireBytes_Unified_Avue_BladeVisualConfigs_Dtos_BladeVisualConfigEditDto';
import type { FireBytes_Unified_Avue_BladeVisuals_Dtos_BladeVisualListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Avue_BladeVisuals_Dtos_BladeVisualListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Avue_BladeVisuals_Dtos_CreateOrUpdateBladeVisualInput } from '../models/FireBytes_Unified_Avue_BladeVisuals_Dtos_CreateOrUpdateBladeVisualInput';
import type { FireBytes_Unified_Avue_BladeVisuals_Dtos_GetBladeVisualForEditOutput } from '../models/FireBytes_Unified_Avue_BladeVisuals_Dtos_GetBladeVisualForEditOutput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BladeVisualService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Avue_BladeVisuals_Dtos_BladeVisualListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppBladeVisualPaged({
        bladeVisualCategoryId,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        bladeVisualCategoryId?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/blade-visual/paged',
            query: {
                'BladeVisualCategoryId': bladeVisualCategoryId,
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
     * @returns FireBytes_Unified_Avue_BladeVisuals_Dtos_GetBladeVisualForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppBladeVisual({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Avue_BladeVisuals_Dtos_GetBladeVisualForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/blade-visual/{id}',
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
    public static putApiAppBladeVisual({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Avue_BladeVisuals_Dtos_CreateOrUpdateBladeVisualInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/blade-visual',
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
    public static deleteApiAppBladeVisual({
        input,
    }: {
        input?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/blade-visual',
            query: {
                'input': input,
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
    public static postApiAppBladeVisualOrUpdateConfig({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Avue_BladeVisualConfigs_Dtos_BladeVisualConfigEditDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/blade-visual/or-update-config',
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
    public static postApiAppBladeVisualCopy({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/blade-visual/{id}/copy',
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
}
