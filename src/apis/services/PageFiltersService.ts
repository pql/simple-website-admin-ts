/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_PageFilters_Dtos_PageFilterDto } from '../models/FireBytes_Unified_PageFilters_Dtos_PageFilterDto';
import type { FireBytes_Unified_PageFilters_Dtos_SavePageFilterAsPersonalInput } from '../models/FireBytes_Unified_PageFilters_Dtos_SavePageFilterAsPersonalInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PageFiltersService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiAppPageFiltersPersonalPageFilter({
        pageFilterName,
    }: {
        pageFilterName?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/page-filters/personal-page-filter',
            query: {
                'pageFilterName': pageFilterName,
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
     * @returns FireBytes_Unified_PageFilters_Dtos_PageFilterDto Success
     * @throws ApiError
     */
    public static getApiAppPageFiltersPageFilter({
        pageFilterName,
        userId,
    }: {
        pageFilterName?: string,
        userId?: string,
    }): CancelablePromise<FireBytes_Unified_PageFilters_Dtos_PageFilterDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/page-filters/page-filter',
            query: {
                'PageFilterName': pageFilterName,
                'UserId': userId,
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
    public static postApiAppPageFiltersAdminSavePageFilterAsPersonal({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_PageFilters_Dtos_SavePageFilterAsPersonalInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/page-filters/admin-save-page-filter-as-personal',
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
    public static postApiAppPageFiltersSavePageFilterAsPersonal({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_PageFilters_Dtos_SavePageFilterAsPersonalInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/page-filters/save-page-filter-as-personal',
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
