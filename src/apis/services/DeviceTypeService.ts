/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto } from '../models/FireBytes_Unified_Shared_NdoDto';
import type { FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_DeviceTypes_Dtos_CreateOrUpdateDeviceTypeInput } from '../models/FireBytes_Unified_Wave_DeviceTypes_Dtos_CreateOrUpdateDeviceTypeInput';
import type { FireBytes_Unified_Wave_DeviceTypes_Dtos_DeviceTypeListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_DeviceTypes_Dtos_DeviceTypeListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_DeviceTypes_Dtos_GetDeviceTypeForEditOutput } from '../models/FireBytes_Unified_Wave_DeviceTypes_Dtos_GetDeviceTypeForEditOutput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeviceTypeService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_DeviceTypes_Dtos_DeviceTypeListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppDeviceTypePaged({
        filterSearch,
        filterDeviceTypeName,
        filterBrandId,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterSearch?: string,
        filterDeviceTypeName?: string,
        filterBrandId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-type/paged',
            query: {
                'Filter.Search': filterSearch,
                'Filter.DeviceTypeName': filterDeviceTypeName,
                'Filter.BrandId': filterBrandId,
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
     * @returns FireBytes_Unified_Wave_DeviceTypes_Dtos_GetDeviceTypeForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppDeviceTypeForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_DeviceTypes_Dtos_GetDeviceTypeForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-type/for-edit',
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
    public static postApiAppDeviceTypeSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_DeviceTypes_Dtos_CreateOrUpdateDeviceTypeInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-type/save',
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
    public static deleteApiAppDeviceType({
        input,
    }: {
        input?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/device-type',
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
    public static postApiAppDeviceTypeBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-type/batch-delete',
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
    public static getApiAppDeviceTypeNdoList({
        filter,
        typeId,
        deviceTypeId,
        deviceTypeName,
        customData,
        dataType,
        notId,
        role,
    }: {
        filter?: string,
        typeId?: string,
        deviceTypeId?: string,
        deviceTypeName?: string,
        customData?: string,
        dataType?: string,
        notId?: string,
        role?: string,
    }): CancelablePromise<Array<FireBytes_Unified_Shared_NdoDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-type/ndo-list',
            query: {
                'Filter': filter,
                'typeId': typeId,
                'deviceTypeId': deviceTypeId,
                'deviceTypeName': deviceTypeName,
                'customData': customData,
                'dataType': dataType,
                'notId': notId,
                'role': role,
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
    public static postApiAppDeviceTypeNameRepeatVerify({
        brandId,
        requestBody,
    }: {
        brandId: string,
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device-type/name-repeat-verify/{brandId}',
            path: {
                'brandId': brandId,
            },
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiAppDeviceTypeDeviceBrand({
        id,
    }: {
        id: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-type/{id}/device-brand',
            path: {
                'id': id,
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiAppDeviceTypeIdByTypeName({
        typeName,
    }: {
        typeName?: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-type/id-by-type-name',
            query: {
                'typeName': typeName,
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiAppDeviceTypeDeviceStatusByTypeId({
        id,
    }: {
        id: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-type/{id}/device-status-by-type-id',
            path: {
                'id': id,
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
    public static getApiAppDeviceTypeComboxNdo({
        name,
        rdoBaseId,
        rdoId,
        ndoId,
        customData,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        name?: string,
        rdoBaseId?: string,
        rdoId?: string,
        ndoId?: string,
        customData?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device-type/combox-ndo',
            query: {
                'Name': name,
                'RdoBaseId': rdoBaseId,
                'RdoId': rdoId,
                'NdoId': ndoId,
                'CustomData': customData,
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
}
