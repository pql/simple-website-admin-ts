/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_CreateOrUpdatePacsDeviceAccessGroupInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_CreateOrUpdatePacsDeviceAccessGroupInput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_GetPacsDeviceAccessGroupForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_GetPacsDeviceAccessGroupForEditOutput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupGroupByIdInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupGroupByIdInput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupListDto } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupListDto';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsDeviceAccessGroupService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsDeviceAccessGroupPaged({
        notIdList,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        notIdList?: Array<string>,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-device-access-group/paged',
            query: {
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static postApiAppPacsDeviceAccessGroupByIdList({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupGroupByIdInput,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-device-access-group/by-id-list',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupListDto Success
     * @throws ApiError
     */
    public static getApiAppPacsDeviceAccessGroupById({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_PacsDeviceAccessGroupListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-device-access-group/by-id',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_GetPacsDeviceAccessGroupForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsDeviceAccessGroupForEdit({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_GetPacsDeviceAccessGroupForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-device-access-group/for-edit',
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
    public static postApiAppPacsDeviceAccessGroupOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_CreateOrUpdatePacsDeviceAccessGroupInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-device-access-group/or-update',
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
    public static deleteApiAppPacsDeviceAccessGroup({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-device-access-group',
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
    public static postApiAppPacsDeviceAccessGroupBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-device-access-group/batch-delete',
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
    public static postApiAppPacsDeviceAccessGroupNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-device-access-group/name-repeat-verify',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsDeviceAccessGroupComboxNdo({
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
            url: '/api/app/pacs-device-access-group/combox-ndo',
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
