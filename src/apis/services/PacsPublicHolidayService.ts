/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto } from '../models/FireBytes_Unified_Shared_NdoDto';
import type { FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_CreateOrUpdatePacsPublicHolidayInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_CreateOrUpdatePacsPublicHolidayInput';
import type { FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_GetPacsPublicHolidayForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_GetPacsPublicHolidayForEditOutput';
import type { FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_PacsPublicHolidayListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_PacsPublicHolidayListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsPublicHolidayService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_PacsPublicHolidayListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsPublicHolidayPaged({
        holidayName,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        holidayName?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-public-holiday/paged',
            query: {
                'HolidayName': holidayName,
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_GetPacsPublicHolidayForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsPublicHolidayForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_GetPacsPublicHolidayForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-public-holiday/for-edit',
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
    public static postApiAppPacsPublicHolidaySave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_CreateOrUpdatePacsPublicHolidayInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-public-holiday/save',
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
    public static deleteApiAppPacsPublicHoliday({
        input,
    }: {
        input?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-public-holiday',
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
    public static postApiAppPacsPublicHolidayBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-public-holiday/batch-delete',
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
    public static getApiAppPacsPublicHolidayNdoList({
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
            url: '/api/app/pacs-public-holiday/ndo-list',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppPacsPublicHolidayNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-public-holiday/name-repeat-verify',
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
