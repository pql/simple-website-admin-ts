/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto } from '../models/FireBytes_Unified_Shared_NdoDto';
import type { FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Devices_Dtos_AlarmCameraListDto } from '../models/FireBytes_Unified_Wave_Devices_Dtos_AlarmCameraListDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_CameraViewerGetDeviceServiceConfigDto } from '../models/FireBytes_Unified_Wave_Devices_Dtos_CameraViewerGetDeviceServiceConfigDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_CreateOrUpdateDeviceInput } from '../models/FireBytes_Unified_Wave_Devices_Dtos_CreateOrUpdateDeviceInput';
import type { FireBytes_Unified_Wave_Devices_Dtos_DeviceDto } from '../models/FireBytes_Unified_Wave_Devices_Dtos_DeviceDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_DeviceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Devices_Dtos_DeviceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Devices_Dtos_GetBuildingDevicePointOutput } from '../models/FireBytes_Unified_Wave_Devices_Dtos_GetBuildingDevicePointOutput';
import type { FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForDetailsOutput } from '../models/FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForDetailsOutput';
import type { FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForEditOutput } from '../models/FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForEditOutput';
import type { FireBytes_Unified_Wave_Devices_Dtos_GetDeviceTypeSettingDto } from '../models/FireBytes_Unified_Wave_Devices_Dtos_GetDeviceTypeSettingDto';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeviceService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Devices_Dtos_DeviceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppDevicePaged({
        filterSearch,
        filterDeviceName,
        filterInterfaceServiceId,
        filterDeviceTypeId,
        filterBuildingFloorId,
        filterDeviceStatusId,
        filterCredentialProfileId,
        filterDeviceCategoryId,
        filterNotIdList,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterSearch?: string,
        filterDeviceName?: string,
        filterInterfaceServiceId?: string,
        filterDeviceTypeId?: string,
        filterBuildingFloorId?: string,
        filterDeviceStatusId?: string,
        filterCredentialProfileId?: string,
        filterDeviceCategoryId?: string,
        filterNotIdList?: Array<string>,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device/paged',
            query: {
                'Filter.Search': filterSearch,
                'Filter.DeviceName': filterDeviceName,
                'Filter.InterfaceServiceId': filterInterfaceServiceId,
                'Filter.DeviceTypeId': filterDeviceTypeId,
                'Filter.BuildingFloorId': filterBuildingFloorId,
                'Filter.DeviceStatusId': filterDeviceStatusId,
                'Filter.CredentialProfileId': filterCredentialProfileId,
                'Filter.DeviceCategoryId': filterDeviceCategoryId,
                'Filter.NotIdList': filterNotIdList,
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
     * @returns FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppDeviceForEdit({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device/for-edit',
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
     * @returns FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForDetailsOutput Success
     * @throws ApiError
     */
    public static getApiAppDeviceForDetails({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForDetailsOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device/for-details/{Id}',
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
     * @returns string Success
     * @throws ApiError
     */
    public static postApiAppDeviceOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Devices_Dtos_CreateOrUpdateDeviceInput,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device/or-update',
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
     * @returns string Success
     * @throws ApiError
     */
    public static deleteApiAppDevice({
        id,
    }: {
        id?: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/device',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppDeviceForceDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device/{id}/force-delete',
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
     * @returns string Success
     * @throws ApiError
     */
    public static postApiAppDeviceBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device/batch-delete',
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
    public static getApiAppDeviceNdoList({
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
            url: '/api/app/device/ndo-list',
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
     * @returns FireBytes_Unified_Wave_Devices_Dtos_CameraViewerGetDeviceServiceConfigDto Success
     * @throws ApiError
     */
    public static postApiAppDeviceCameraViewerGetDeviceServiceConfig({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Devices_Dtos_CameraViewerGetDeviceServiceConfigDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device/camera-viewer-get-device-service-config',
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
    public static postApiAppDeviceNameRepeatVerify({
        isStitchingViewCamera,
        requestBody,
    }: {
        isStitchingViewCamera?: boolean,
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device/name-repeat-verify',
            query: {
                'isStitchingViewCamera': isStitchingViewCamera,
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppDeviceDeviceVendorSystemIdVerify({
        isStitchingViewCamera,
        requestBody,
    }: {
        isStitchingViewCamera?: boolean,
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device/device-vendor-system-id-verify',
            query: {
                'isStitchingViewCamera': isStitchingViewCamera,
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiAppDeviceDeviceTypeIdByDeviceId({
        id,
    }: {
        id: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device/{id}/device-type-id-by-device-id',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Devices_Dtos_DeviceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppDeviceStitchingCameraPaged({
        filterDeviceName,
        filterInterfaceServiceId,
        filterCredentialProfileId,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterDeviceName?: string,
        filterInterfaceServiceId?: string,
        filterCredentialProfileId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device/stitching-camera-paged',
            query: {
                'Filter.DeviceName': filterDeviceName,
                'Filter.InterfaceServiceId': filterInterfaceServiceId,
                'Filter.CredentialProfileId': filterCredentialProfileId,
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
    public static postApiAppDeviceEditControlPanelTreeNode({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Devices_Dtos_DeviceDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/device/edit-control-panel-tree-node',
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
    public static getApiAppDeviceComboxNdo({
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
            url: '/api/app/device/combox-ndo',
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
    /**
     * @returns FireBytes_Unified_Wave_Devices_Dtos_GetDeviceTypeSettingDto Success
     * @throws ApiError
     */
    public static getApiAppDeviceDeviceTypeSetting({
        deviceTypeId,
    }: {
        deviceTypeId: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Devices_Dtos_GetDeviceTypeSettingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device/device-type-setting/{deviceTypeId}',
            path: {
                'deviceTypeId': deviceTypeId,
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
     * @returns FireBytes_Unified_Wave_Devices_Dtos_AlarmCameraListDto Success
     * @throws ApiError
     */
    public static getApiAppDeviceAlarmCameraList({
        boundBuildingId,
    }: {
        boundBuildingId: string,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_Devices_Dtos_AlarmCameraListDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device/alarm-camera-list/{boundBuildingId}',
            path: {
                'boundBuildingId': boundBuildingId,
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
     * @returns FireBytes_Unified_Wave_Devices_Dtos_GetBuildingDevicePointOutput Success
     * @throws ApiError
     */
    public static getApiAppDeviceBuildingDevicePoint({
        buildingId,
        messagePanelId,
    }: {
        buildingId?: string,
        messagePanelId?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Devices_Dtos_GetBuildingDevicePointOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/device/building-device-point',
            query: {
                'BuildingId': buildingId,
                'MessagePanelId': messagePanelId,
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
