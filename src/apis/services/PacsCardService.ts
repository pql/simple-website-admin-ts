/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Commons_Dtos_KeyValueDto } from '../models/FireBytes_Unified_Commons_Dtos_KeyValueDto';
import type { FireBytes_Unified_Shared_GetQueryFilterInput2 } from '../models/FireBytes_Unified_Shared_GetQueryFilterInput2';
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto } from '../models/FireBytes_Unified_Shared_NdoDto';
import type { FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_CreateOrUpdatePacsCardInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_CreateOrUpdatePacsCardInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_GetPacsCardForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_GetPacsCardForEditOutput';
import type { FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardBindingUserRequest } from '../models/FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardBindingUserRequest';
import type { FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_PacsCards_Dtos_UpdatePacsCardValidTillDateInput } from '../models/FireBytes_Unified_Wave_PacsCards_Dtos_UpdatePacsCardValidTillDateInput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsCardService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsCardPaged({
        filterCardNumber,
        filterSearch,
        filterIdList,
        filterNotIdList,
        filterIsBindingCardHolder,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterCardNumber?: string,
        filterSearch?: string,
        filterIdList?: Array<string>,
        filterNotIdList?: Array<string>,
        filterIsBindingCardHolder?: boolean,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card/paged',
            query: {
                'Filter.CardNumber': filterCardNumber,
                'Filter.Search': filterSearch,
                'Filter.IdList': filterIdList,
                'Filter.NotIdList': filterNotIdList,
                'Filter.IsBindingCardHolder': filterIsBindingCardHolder,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static postApiAppPacsCardIdlist({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardInput,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card/idlist',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_GetPacsCardForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsCardForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_GetPacsCardForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card/for-edit',
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
    public static postApiAppPacsCardSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_CreateOrUpdatePacsCardInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card/save',
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
    public static postApiAppPacsCardCardBindingUser({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardBindingUserRequest,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card/card-binding-user',
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
    public static deleteApiAppPacsCard({
        input,
    }: {
        input?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-card',
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
    public static postApiAppPacsCardBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card/batch-delete',
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
    public static postApiAppPacsCardBatchUpdateValidTillDate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_PacsCards_Dtos_UpdatePacsCardValidTillDateInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card/batch-update-valid-till-date',
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
     * @returns FireBytes_Unified_Commons_Dtos_KeyValueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsCardCardsStatus(): CancelablePromise<Array<FireBytes_Unified_Commons_Dtos_KeyValueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card/cards-status',
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
    public static postApiAppPacsCardNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card/name-repeat-verify',
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
     * @returns FireBytes_Unified_Shared_NdoDto Success
     * @throws ApiError
     */
    public static getApiAppPacsCardNdoList({
        filter,
        typeId,
        deviceTypeId,
        deviceTypeName,
        customData,
        dataType,
        notId,
    }: {
        filter?: string,
        typeId?: string,
        deviceTypeId?: string,
        deviceTypeName?: string,
        customData?: string,
        dataType?: string,
        notId?: string,
    }): CancelablePromise<Array<FireBytes_Unified_Shared_NdoDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card/ndo-list',
            query: {
                'Filter': filter,
                'typeId': typeId,
                'deviceTypeId': deviceTypeId,
                'deviceTypeName': deviceTypeName,
                'customData': customData,
                'dataType': dataType,
                'notId': notId,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static postApiAppPacsCardComboxNdo({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_GetQueryFilterInput2,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card/combox-ndo',
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
