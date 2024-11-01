/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto } from '../models/Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto';
import type { Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto_Volo_Abp_OpenIddict_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto_Volo_Abp_OpenIddict_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto } from '../models/Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto';
import type { Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput } from '../models/Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput';
import type { Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput } from '../models/Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApplicationsService {
    /**
     * @returns Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto Success
     * @throws ApiError
     */
    public static getApiOpeniddictApplications({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/openiddict/applications/{id}',
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
     * @returns Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto Success
     * @throws ApiError
     */
    public static putApiOpeniddictApplications({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput,
    }): CancelablePromise<Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/openiddict/applications/{id}',
            path: {
                'id': id,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto_Volo_Abp_OpenIddict_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiOpeniddictApplications1({
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
            url: '/api/openiddict/applications',
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
     * @returns Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto Success
     * @throws ApiError
     */
    public static postApiOpeniddictApplications({
        requestBody,
    }: {
        requestBody?: Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput,
    }): CancelablePromise<Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/openiddict/applications',
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
    public static deleteApiOpeniddictApplications({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/openiddict/applications',
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
     * @returns Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto Success
     * @throws ApiError
     */
    public static getApiOpeniddictApplicationsTokenLifetime({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/openiddict/applications/{id}/token-lifetime',
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
    public static putApiOpeniddictApplicationsTokenLifetime({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/openiddict/applications/{id}/token-lifetime',
            path: {
                'id': id,
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
}
