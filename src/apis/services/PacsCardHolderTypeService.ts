/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_CreateOrUpdatePacsCardHolderTypeInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_CreateOrUpdatePacsCardHolderTypeInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_GetPacsCardHolderTypeForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_GetPacsCardHolderTypeForEditOutput';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_PacsCardHolderTypeListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_PacsCardHolderTypeListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsCardHolderTypeService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_PacsCardHolderTypeListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderTypePaged({
        filterCardHolderTypeName,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterCardHolderTypeName?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder-type/paged',
            query: {
                'Filter.CardHolderTypeName': filterCardHolderTypeName,
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_GetPacsCardHolderTypeForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderTypeForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_GetPacsCardHolderTypeForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder-type/for-edit',
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
    public static postApiAppPacsCardHolderTypeSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsCardHolderTypes_Dtos_CreateOrUpdatePacsCardHolderTypeInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder-type/save',
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
    public static deleteApiAppPacsCardHolderType({
        input,
    }: {
        input?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-card-holder-type',
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
    public static postApiAppPacsCardHolderTypeBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder-type/batch-delete',
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
    public static postApiAppPacsCardHolderTypeNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder-type/name-repeat-verify',
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
