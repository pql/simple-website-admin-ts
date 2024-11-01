/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_CreateOrUpdatePacsDeviceModeSchedulesItemInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_CreateOrUpdatePacsDeviceModeSchedulesItemInput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_CreateOrUpdatePacsDeviceModeSchedulesTypeFunctionInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_CreateOrUpdatePacsDeviceModeSchedulesTypeFunctionInput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_GetPacsDeviceModeSchedulesItemForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_GetPacsDeviceModeSchedulesItemForEditOutput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_PacsDeviceModeSchedulesItemListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_PacsDeviceModeSchedulesItemListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsActionPlanItemsService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_PacsDeviceModeSchedulesItemListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsActionPlanItemsPaged({
        filterPacsActionPlanGroupId,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterPacsActionPlanGroupId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-action-plan-items/paged',
            query: {
                'Filter.PacsActionPlanGroupId': filterPacsActionPlanGroupId,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_PacsDeviceModeSchedulesItemListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsActionPlanItemsPacsActionPlanGroupIdPaged({
        filterPacsActionPlanGroupId,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterPacsActionPlanGroupId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-action-plan-items/pacs-action-plan-group-id-paged',
            query: {
                'Filter.PacsActionPlanGroupId': filterPacsActionPlanGroupId,
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_GetPacsDeviceModeSchedulesItemForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsActionPlanItemsForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_GetPacsDeviceModeSchedulesItemForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-action-plan-items/for-edit',
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
    public static postApiAppPacsActionPlanItemsSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_CreateOrUpdatePacsDeviceModeSchedulesItemInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-action-plan-items/save',
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
    public static postApiAppPacsActionPlanItemsSaveDeviceFunction({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_CreateOrUpdatePacsDeviceModeSchedulesTypeFunctionInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-action-plan-items/save-device-function',
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
    public static deleteApiAppPacsActionPlanItems({
        input,
    }: {
        input?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-action-plan-items',
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
    public static postApiAppPacsActionPlanItemsBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-action-plan-items/batch-delete',
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
    public static postApiAppPacsActionPlanItemsNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-action-plan-items/name-repeat-verify',
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
