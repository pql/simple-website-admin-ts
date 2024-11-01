/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_CreateOrUpdatePacsCompanyInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_CreateOrUpdatePacsCompanyInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_GetPacsCompanyForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_GetPacsCompanyForEditOutput';
import type { FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto } from '../models/FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanysInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanysInput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsCompanyService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsCompanyPaged({
        pacsCompanyTypeId,
        pacsUserId,
        isSelect,
        selectedCompanyIdList,
        companyName,
        notIdList,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        pacsCompanyTypeId?: string,
        pacsUserId?: string,
        isSelect?: boolean,
        selectedCompanyIdList?: Array<string>,
        companyName?: string,
        notIdList?: Array<string>,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-company/paged',
            query: {
                'PacsCompanyTypeId': pacsCompanyTypeId,
                'PacsUserId': pacsUserId,
                'IsSelect': isSelect,
                'SelectedCompanyIdList': selectedCompanyIdList,
                'CompanyName': companyName,
                'NotIdList': notIdList,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static postApiAppPacsCompanyIdList({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanysInput,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-company/id-list',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto Success
     * @throws ApiError
     */
    public static getApiAppPacsCompanyById({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_PacsCompanyListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-company/by-id',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_GetPacsCompanyForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsCompanyForEdit({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_GetPacsCompanyForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-company/for-edit',
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
    public static postApiAppPacsCompanySave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsCompanys_Dtos_CreateOrUpdatePacsCompanyInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-company/save',
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
    public static deleteApiAppPacsCompany({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-company',
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
    public static postApiAppPacsCompanyBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-company/batch-delete',
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
    public static postApiAppPacsCompanyNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-company/name-repeat-verify',
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
