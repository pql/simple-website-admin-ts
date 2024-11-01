/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Saas_Host_Dtos_EditionLookupDto } from '../models/Volo_Saas_Host_Dtos_EditionLookupDto';
import type { Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto } from '../models/Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto';
import type { Volo_Saas_Host_Dtos_SaasTenantCreateDto } from '../models/Volo_Saas_Host_Dtos_SaasTenantCreateDto';
import type { Volo_Saas_Host_Dtos_SaasTenantDatabasesDto } from '../models/Volo_Saas_Host_Dtos_SaasTenantDatabasesDto';
import type { Volo_Saas_Host_Dtos_SaasTenantDto } from '../models/Volo_Saas_Host_Dtos_SaasTenantDto';
import type { Volo_Saas_Host_Dtos_SaasTenantDto_Volo_Saas_Host_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Saas_Host_Dtos_SaasTenantDto_Volo_Saas_Host_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto } from '../models/Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto';
import type { Volo_Saas_Host_Dtos_SaasTenantUpdateDto } from '../models/Volo_Saas_Host_Dtos_SaasTenantUpdateDto';
import type { Volo_Saas_TenantActivationState } from '../models/Volo_Saas_TenantActivationState';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TenantService {
    /**
     * @returns Volo_Saas_Host_Dtos_SaasTenantDto Success
     * @throws ApiError
     */
    public static getApiSaasTenants({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Saas_Host_Dtos_SaasTenantDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/tenants/{id}',
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
     * @returns Volo_Saas_Host_Dtos_SaasTenantDto Success
     * @throws ApiError
     */
    public static putApiSaasTenants({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Saas_Host_Dtos_SaasTenantUpdateDto,
    }): CancelablePromise<Volo_Saas_Host_Dtos_SaasTenantDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/saas/tenants/{id}',
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiSaasTenants({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/saas/tenants/{id}',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Saas_Host_Dtos_SaasTenantDto_Volo_Saas_Host_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiSaasTenants1({
        filter,
        getEditionNames,
        editionId,
        expirationDateMin,
        expirationDateMax,
        activationState,
        activationEndDateMin,
        activationEndDateMax,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        getEditionNames?: boolean,
        editionId?: string,
        expirationDateMin?: string,
        expirationDateMax?: string,
        activationState?: Volo_Saas_TenantActivationState,
        activationEndDateMin?: string,
        activationEndDateMax?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/tenants',
            query: {
                'Filter': filter,
                'GetEditionNames': getEditionNames,
                'EditionId': editionId,
                'ExpirationDateMin': expirationDateMin,
                'ExpirationDateMax': expirationDateMax,
                'ActivationState': activationState,
                'ActivationEndDateMin': activationEndDateMin,
                'ActivationEndDateMax': activationEndDateMax,
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
     * @returns Volo_Saas_Host_Dtos_SaasTenantDto Success
     * @throws ApiError
     */
    public static postApiSaasTenants({
        requestBody,
    }: {
        requestBody?: Volo_Saas_Host_Dtos_SaasTenantCreateDto,
    }): CancelablePromise<Volo_Saas_Host_Dtos_SaasTenantDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/saas/tenants',
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
     * @returns Volo_Saas_Host_Dtos_SaasTenantDatabasesDto Success
     * @throws ApiError
     */
    public static getApiSaasTenantsDatabases(): CancelablePromise<Volo_Saas_Host_Dtos_SaasTenantDatabasesDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/tenants/databases',
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
     * @returns Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto Success
     * @throws ApiError
     */
    public static getApiSaasTenantsConnectionStrings({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/tenants/{id}/connection-strings',
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
    public static putApiSaasTenantsConnectionStrings({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/saas/tenants/{id}/connection-strings',
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiSaasTenantsApplyDatabaseMigrations({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/saas/tenants/{id}/apply-database-migrations',
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
     * @returns Volo_Saas_Host_Dtos_EditionLookupDto Success
     * @throws ApiError
     */
    public static getApiSaasTenantsLookupEditions(): CancelablePromise<Array<Volo_Saas_Host_Dtos_EditionLookupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/tenants/lookup/editions',
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
    public static getApiSaasTenantsCheckConnectionString({
        connectionString,
    }: {
        connectionString?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/tenants/check-connection-string',
            query: {
                'connectionString': connectionString,
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
    public static putApiSaasTenantsSetPassword({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/saas/tenants/{id}/set-password',
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
