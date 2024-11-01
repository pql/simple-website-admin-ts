/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_RedundantServers_Dtos_CreateOrUpdateRedundantServerInput } from '../models/FireBytes_Unified_Wave_RedundantServers_Dtos_CreateOrUpdateRedundantServerInput';
import type { FireBytes_Unified_Wave_RedundantServers_Dtos_GetRedundantServerForEditOutput } from '../models/FireBytes_Unified_Wave_RedundantServers_Dtos_GetRedundantServerForEditOutput';
import type { FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerCopyDto } from '../models/FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerCopyDto';
import type { FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto } from '../models/FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto';
import type { FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RedundantServerService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppRedundantServerPaged({
        deviceId,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        deviceId?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/redundant-server/paged',
            query: {
                'DeviceId': deviceId,
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
     * @returns FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto Success
     * @throws ApiError
     */
    public static getApiAppRedundantServerById({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/redundant-server/by-id/{Id}',
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
     * @returns FireBytes_Unified_Wave_RedundantServers_Dtos_GetRedundantServerForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppRedundantServerForEdit({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_RedundantServers_Dtos_GetRedundantServerForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/redundant-server/for-edit',
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
    public static postApiAppRedundantServerOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_RedundantServers_Dtos_CreateOrUpdateRedundantServerInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/redundant-server/or-update',
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
    public static deleteApiAppRedundantServer({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/redundant-server',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppRedundantServerBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/redundant-server/batch-delete',
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
    public static postApiAppRedundantServerCopy({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerCopyDto,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/redundant-server/copy',
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
