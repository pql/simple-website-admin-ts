/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_CreateOrUpdatePacsCardHolderConfigCustomInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_CreateOrUpdatePacsCardHolderConfigCustomInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsCardHolderConfigCustomService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderConfigCustomPaged({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder-config-custom/paged',
            query: {
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderConfigCustomForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder-config-custom/for-edit',
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
    public static postApiAppPacsCardHolderConfigCustomSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_CreateOrUpdatePacsCardHolderConfigCustomInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder-config-custom/save',
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
    public static deleteApiAppPacsCardHolderConfigCustom({
        input,
    }: {
        input?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-card-holder-config-custom',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppPacsCardHolderConfigCustomBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder-config-custom/batch-delete',
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
    public static postApiAppPacsCardHolderConfigCustomNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder-config-custom/name-repeat-verify',
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
