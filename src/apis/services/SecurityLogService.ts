/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Identity_IdentitySecurityLogDto } from '../models/Volo_Abp_Identity_IdentitySecurityLogDto';
import type { Volo_Abp_Identity_IdentitySecurityLogDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_Identity_IdentitySecurityLogDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SecurityLogService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Abp_Identity_IdentitySecurityLogDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiIdentitySecurityLogs({
        startTime,
        endTime,
        applicationName,
        identity,
        action,
        userName,
        clientId,
        correlationId,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        startTime?: string,
        endTime?: string,
        applicationName?: string,
        identity?: string,
        action?: string,
        userName?: string,
        clientId?: string,
        correlationId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/security-logs',
            query: {
                'StartTime': startTime,
                'EndTime': endTime,
                'ApplicationName': applicationName,
                'Identity': identity,
                'Action': action,
                'UserName': userName,
                'ClientId': clientId,
                'CorrelationId': correlationId,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
                'ExtraProperties': extraProperties,
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
     * @returns Volo_Abp_Identity_IdentitySecurityLogDto Success
     * @throws ApiError
     */
    public static getApiIdentitySecurityLogs1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Identity_IdentitySecurityLogDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/security-logs/{id}',
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
}
