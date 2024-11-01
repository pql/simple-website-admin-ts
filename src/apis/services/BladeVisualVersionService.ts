/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Avue_BladeVisualVersions_Dtos_BladeVisualVersionEditDto } from '../models/FireBytes_Unified_Avue_BladeVisualVersions_Dtos_BladeVisualVersionEditDto';
import type { FireBytes_Unified_Avue_BladeVisualVersions_Dtos_BladeVisualVersionListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Avue_BladeVisualVersions_Dtos_BladeVisualVersionListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BladeVisualVersionService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Avue_BladeVisualVersions_Dtos_BladeVisualVersionListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppBladeVisualVersionPaged({
        bladeVisualId,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        bladeVisualId?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/blade-visual-version/paged',
            query: {
                'BladeVisualId': bladeVisualId,
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
     * @returns FireBytes_Unified_Avue_BladeVisualVersions_Dtos_BladeVisualVersionEditDto Success
     * @throws ApiError
     */
    public static getApiAppBladeVisualVersionForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Avue_BladeVisualVersions_Dtos_BladeVisualVersionEditDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/blade-visual-version/for-edit',
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
    public static postApiAppBladeVisualVersionSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Avue_BladeVisualVersions_Dtos_BladeVisualVersionEditDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/blade-visual-version/save',
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
