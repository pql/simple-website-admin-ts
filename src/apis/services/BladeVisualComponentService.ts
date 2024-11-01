/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Avue_BladeVisualComponents_Dtos_BladeVisualComponentEditDto } from '../models/FireBytes_Unified_Avue_BladeVisualComponents_Dtos_BladeVisualComponentEditDto';
import type { FireBytes_Unified_Avue_BladeVisualComponents_Dtos_BladeVisualComponentListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Avue_BladeVisualComponents_Dtos_BladeVisualComponentListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BladeVisualComponentService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Avue_BladeVisualComponents_Dtos_BladeVisualComponentListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppBladeVisualComponentPaged({
        module,
        type,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        module?: string,
        type?: number,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/blade-visual-component/paged',
            query: {
                'Module': module,
                'Type': type,
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
     * @returns FireBytes_Unified_Avue_BladeVisualComponents_Dtos_BladeVisualComponentEditDto Success
     * @throws ApiError
     */
    public static getApiAppBladeVisualComponentForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Avue_BladeVisualComponents_Dtos_BladeVisualComponentEditDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/blade-visual-component/for-edit',
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
    public static postApiAppBladeVisualComponentSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Avue_BladeVisualComponents_Dtos_BladeVisualComponentEditDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/blade-visual-component/save',
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
    public static deleteApiAppBladeVisualComponent({
        input,
    }: {
        input?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/blade-visual-component',
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
}
