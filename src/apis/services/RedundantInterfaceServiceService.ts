/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_CreateOrUpdateRedundantInterfaceServiceInput } from '../models/FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_CreateOrUpdateRedundantInterfaceServiceInput';
import type { FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_GetRedundantInterfaceServiceForEditOutput } from '../models/FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_GetRedundantInterfaceServiceForEditOutput';
import type { FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_RedundantInterfaceServiceListDto } from '../models/FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_RedundantInterfaceServiceListDto';
import type { FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_RedundantInterfaceServiceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_RedundantInterfaceServiceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RedundantInterfaceServiceService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_RedundantInterfaceServiceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppRedundantInterfaceServicePaged({
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
            url: '/api/app/redundant-interface-service/paged',
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
     * @returns FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_RedundantInterfaceServiceListDto Success
     * @throws ApiError
     */
    public static getApiAppRedundantInterfaceServiceById({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_RedundantInterfaceServiceListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/redundant-interface-service/by-id/{Id}',
            path: {
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
     * @returns FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_GetRedundantInterfaceServiceForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppRedundantInterfaceServiceForEdit({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_GetRedundantInterfaceServiceForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/redundant-interface-service/for-edit',
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
    public static postApiAppRedundantInterfaceServiceOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_RedundantInterfaceServices_Dtos_CreateOrUpdateRedundantInterfaceServiceInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/redundant-interface-service/or-update',
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
    public static deleteApiAppRedundantInterfaceService({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/redundant-interface-service',
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
    public static postApiAppRedundantInterfaceServiceBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/redundant-interface-service/batch-delete',
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
