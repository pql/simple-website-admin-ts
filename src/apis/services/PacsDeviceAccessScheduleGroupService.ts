/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_CreateOrUpdatePacsDeviceAccessScheduleGroupInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_CreateOrUpdatePacsDeviceAccessScheduleGroupInput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_GetPacsDeviceAccessScheduleGroupForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_GetPacsDeviceAccessScheduleGroupForEditOutput';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto';
import type { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsDeviceAccessScheduleGroupService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsDeviceAccessScheduleGroupPaged({
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
            url: '/api/app/pacs-device-access-schedule-group/paged',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto Success
     * @throws ApiError
     */
    public static getApiAppPacsDeviceAccessScheduleGroupDefault(): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-device-access-schedule-group/default',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto Success
     * @throws ApiError
     */
    public static getApiAppPacsDeviceAccessScheduleGroupById({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-device-access-schedule-group/by-id',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_GetPacsDeviceAccessScheduleGroupForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsDeviceAccessScheduleGroupForEdit({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_GetPacsDeviceAccessScheduleGroupForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-device-access-schedule-group/for-edit',
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
    public static postApiAppPacsDeviceAccessScheduleGroupOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_CreateOrUpdatePacsDeviceAccessScheduleGroupInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-device-access-schedule-group/or-update',
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
    public static deleteApiAppPacsDeviceAccessScheduleGroup({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-device-access-schedule-group',
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
    public static postApiAppPacsDeviceAccessScheduleGroupBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-device-access-schedule-group/batch-delete',
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
    public static postApiAppPacsDeviceAccessScheduleGroupNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-device-access-schedule-group/name-repeat-verify',
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
    public static getApiAppPacsDeviceAccessScheduleGroupComboxNdo({
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
            url: '/api/app/pacs-device-access-schedule-group/combox-ndo',
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
