/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Identity_IdentitySessionDto } from '../models/Volo_Abp_Identity_IdentitySessionDto';
import type { Volo_Abp_Identity_IdentitySessionDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_Identity_IdentitySessionDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SessionsService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Abp_Identity_IdentitySessionDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiIdentitySessions({
        userId,
        device,
        clientId,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        userId?: string,
        device?: string,
        clientId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/sessions',
            query: {
                'UserId': userId,
                'Device': device,
                'ClientId': clientId,
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
     * @returns Volo_Abp_Identity_IdentitySessionDto Success
     * @throws ApiError
     */
    public static getApiIdentitySessions1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Identity_IdentitySessionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/sessions/{id}',
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiIdentitySessions({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/sessions/{id}',
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
