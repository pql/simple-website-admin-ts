/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Gdpr_DownloadTokenResultDto } from '../models/Volo_Abp_Gdpr_DownloadTokenResultDto';
import type { Volo_Abp_Gdpr_GdprRequestDto_Volo_Abp_Gdpr_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_Gdpr_GdprRequestDto_Volo_Abp_Gdpr_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GdprRequestService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiGdprRequestsPrepareData(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gdpr/requests/prepare-data',
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
     * @returns Volo_Abp_Gdpr_DownloadTokenResultDto Success
     * @throws ApiError
     */
    public static getApiGdprRequestsDownloadToken({
        id,
    }: {
        id?: string,
    }): CancelablePromise<Volo_Abp_Gdpr_DownloadTokenResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gdpr/requests/download-token',
            query: {
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
     * @returns binary Success
     * @throws ApiError
     */
    public static getApiGdprRequestsData({
        requestId,
        token,
    }: {
        requestId: string,
        token?: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gdpr/requests/data/{requestId}',
            path: {
                'requestId': requestId,
            },
            query: {
                'token': token,
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
    public static getApiGdprRequestsIsRequestAllowed(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gdpr/requests/is-request-allowed',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Abp_Gdpr_GdprRequestDto_Volo_Abp_Gdpr_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiGdprRequestsList({
        userId,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        userId: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gdpr/requests/list',
            query: {
                'UserId': userId,
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiGdprRequests(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/gdpr/requests',
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
