/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_CreateOrUpdateDeviceGroupDeviceFunctionsInput } from '../models/FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_CreateOrUpdateDeviceGroupDeviceFunctionsInput';
import type { FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsListDto } from '../models/FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsListDto';
import type { FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_GetDeviceGroupDeviceFunctionsForEditOutput } from '../models/FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_GetDeviceGroupDeviceFunctionsForEditOutput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeviceGroupDeviceFunctionsService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppDeviceGroupDeviceFunctionsPaged({
        deviceGroupId,
        deviceTypeFunction,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        deviceGroupId?: string,
        deviceTypeFunction?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-group-device-functions/paged',
            query: {
                'DeviceGroupId': deviceGroupId,
                'DeviceTypeFunction': deviceTypeFunction,
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
     * @returns FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsListDto Success
     * @throws ApiError
     */
    public static getApiAppDeviceGroupDeviceFunctionsById({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-group-device-functions/by-id/{Id}',
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
     * @returns FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_GetDeviceGroupDeviceFunctionsForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppDeviceGroupDeviceFunctionsForEdit({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_GetDeviceGroupDeviceFunctionsForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-group-device-functions/for-edit',
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
    public static postApiAppDeviceGroupDeviceFunctionsOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_CreateOrUpdateDeviceGroupDeviceFunctionsInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-group-device-functions/or-update',
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
    public static deleteApiAppDeviceGroupDeviceFunctions({
        id,
    }: {
        id?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/device-group-device-functions',
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
    public static postApiAppDeviceGroupDeviceFunctionsBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-group-device-functions/batch-delete',
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
