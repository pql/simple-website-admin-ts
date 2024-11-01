/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_PanelPermissionControls_Dtos_ControlTreeLoadingInput } from '../models/FireBytes_Unified_Wave_PanelPermissionControls_Dtos_ControlTreeLoadingInput';
import type { FireBytes_Unified_Wave_PanelPermissionControls_Dtos_CreateOrUpdatePanelPermissionControlInput } from '../models/FireBytes_Unified_Wave_PanelPermissionControls_Dtos_CreateOrUpdatePanelPermissionControlInput';
import type { FireBytes_Unified_Wave_PanelPermissionControls_Dtos_DevicePermissionListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_PanelPermissionControls_Dtos_DevicePermissionListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_PanelPermissionControls_Dtos_GetPanelPermissionControlForEditOutput } from '../models/FireBytes_Unified_Wave_PanelPermissionControls_Dtos_GetPanelPermissionControlForEditOutput';
import type { FireBytes_Unified_Wave_PanelPermissionControls_Dtos_PanelPermissionControlListDto } from '../models/FireBytes_Unified_Wave_PanelPermissionControls_Dtos_PanelPermissionControlListDto';
import type { FireBytes_Unified_Wave_PanelPermissionControls_Dtos_PanelPermissionControlListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_PanelPermissionControls_Dtos_PanelPermissionControlListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto } from '../models/FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PanelPermissionControlService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_PanelPermissionControls_Dtos_PanelPermissionControlListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPanelPermissionControlPaged({
        filterDeviceTypeId,
        filterDeviceType,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterDeviceTypeId?: string,
        filterDeviceType?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/panel-permission-control/paged',
            query: {
                'FilterDeviceTypeId': filterDeviceTypeId,
                'FilterDeviceType': filterDeviceType,
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
     * @returns FireBytes_Unified_Wave_PanelPermissionControls_Dtos_PanelPermissionControlListDto Success
     * @throws ApiError
     */
    public static getApiAppPanelPermissionControlById({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_PanelPermissionControls_Dtos_PanelPermissionControlListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/panel-permission-control/by-id',
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
     * @returns FireBytes_Unified_Wave_PanelPermissionControls_Dtos_GetPanelPermissionControlForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPanelPermissionControlForEdit({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_PanelPermissionControls_Dtos_GetPanelPermissionControlForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/panel-permission-control/for-edit/{Id}',
            path: {
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
    public static postApiAppPanelPermissionControlOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_PanelPermissionControls_Dtos_CreateOrUpdatePanelPermissionControlInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/panel-permission-control/or-update',
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
    public static deleteApiAppPanelPermissionControl({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/panel-permission-control',
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
    public static postApiAppPanelPermissionControlBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/panel-permission-control/batch-delete',
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
     * @returns FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto Success
     * @throws ApiError
     */
    public static postApiAppPanelPermissionControlSiteTreeLoading(): CancelablePromise<Array<FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/panel-permission-control/site-tree-loading',
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
     * @returns FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto Success
     * @throws ApiError
     */
    public static postApiAppPanelPermissionControlDeviceTreeLoading(): CancelablePromise<Array<FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/panel-permission-control/device-tree-loading',
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
     * @returns FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto Success
     * @throws ApiError
     */
    public static postApiAppPanelPermissionControlControlTreeLoading(): CancelablePromise<Array<FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/panel-permission-control/control-tree-loading',
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
     * @returns FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto Success
     * @throws ApiError
     */
    public static postApiAppPanelPermissionControlControlTreeByDeviceTypeLoading({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_PanelPermissionControls_Dtos_ControlTreeLoadingInput,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/panel-permission-control/control-tree-by-device-type-loading',
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
    public static postApiAppPanelPermissionControlAdminDefaultAddPermission({
        controlId,
        treeKey,
        isDevice,
    }: {
        controlId: string,
        treeKey?: string,
        isDevice?: boolean,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/panel-permission-control/admin-default-add-permission/{controlId}',
            path: {
                'controlId': controlId,
            },
            query: {
                'treeKey': treeKey,
                'isDevice': isDevice,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_PanelPermissionControls_Dtos_DevicePermissionListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPanelPermissionControlDevicePermissionPaged({
        filterDeviceTypeId,
        filterDeviceType,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterDeviceTypeId?: string,
        filterDeviceType?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/panel-permission-control/device-permission-paged',
            query: {
                'FilterDeviceTypeId': filterDeviceTypeId,
                'FilterDeviceType': filterDeviceType,
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiAppPanelPermissionControlUserPermission(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/panel-permission-control/user-permission',
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
