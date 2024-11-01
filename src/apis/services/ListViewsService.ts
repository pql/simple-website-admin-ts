/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_ListViews_Dtos_ListViewDto } from '../models/FireBytes_Unified_ListViews_Dtos_ListViewDto';
import type { FireBytes_Unified_ListViews_Dtos_SaveListViewAsPersonalInput } from '../models/FireBytes_Unified_ListViews_Dtos_SaveListViewAsPersonalInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ListViewsService {
    /**
     * @returns FireBytes_Unified_ListViews_Dtos_ListViewDto Success
     * @throws ApiError
     */
    public static getApiAppListViewsColumnsOfListView({
        listViewName,
        userId,
        isDefaultColumn,
    }: {
        listViewName?: string,
        userId?: string,
        isDefaultColumn?: boolean,
    }): CancelablePromise<FireBytes_Unified_ListViews_Dtos_ListViewDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/list-views/columns-of-list-view',
            query: {
                'ListViewName': listViewName,
                'UserId': userId,
                'IsDefaultColumn': isDefaultColumn,
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
    public static postApiAppListViewsAdminSaveListViewAsPersonal({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_ListViews_Dtos_SaveListViewAsPersonalInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/list-views/admin-save-list-view-as-personal',
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
    public static deleteApiAppListViewsListViewColumnColor({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/list-views/{id}/list-view-column-color',
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
    public static deleteApiAppListViewsPersonalListView({
        listViewName,
    }: {
        listViewName?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/list-views/personal-list-view',
            query: {
                'listViewName': listViewName,
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
    public static postApiAppListViewsSaveListViewAsPersonal({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_ListViews_Dtos_SaveListViewAsPersonalInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/list-views/save-list-view-as-personal',
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
