/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingRequest } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingRequest';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelImageMarkerDto } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelImageMarkerDto';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelMapMarkerDto } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelMapMarkerDto';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_CreateGraphicPanelDevicePointViewInput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_CreateGraphicPanelDevicePointViewInput';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_DeviceBindingDefaultGraphicPanelInput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_DeviceBindingDefaultGraphicPanelInput';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_DeviceUnbindPointViewInput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_DeviceUnbindPointViewInput';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_ExecuteDeviceTypeFunctionRequest } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_ExecuteDeviceTypeFunctionRequest';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceDetailDto } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceDetailDto';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceTypeFunctionByDeviceIdOutput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceTypeFunctionByDeviceIdOutput';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_GetFloorPlanConfigOutput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_GetFloorPlanConfigOutput';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineDto } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineDto';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineInput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineInput';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_SetBuildingFloorPointInput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_SetBuildingFloorPointInput';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_SetFloorPlanViewerConfigInput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_SetFloorPlanViewerConfigInput';
import type { FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto } from '../models/FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ControlPanelService {
    /**
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto Success
     * @throws ApiError
     */
    public static postApiAppControlPanelControlePanelTreeLoading({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingRequest,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/controle-panel-tree-loading',
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
    public static deleteApiAppControlPanel({
        id,
        type,
    }: {
        id?: string,
        type?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/control-panel',
            query: {
                'Id': id,
                'Type': type,
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelMapMarkerDto Success
     * @throws ApiError
     */
    public static postApiAppControlPanelGraphicPanelDevicePointView({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_CreateGraphicPanelDevicePointViewInput,
    }): CancelablePromise<FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelMapMarkerDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/graphic-panel-device-point-view',
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelMapMarkerDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelControlPanelMapMarker({
        type,
        id,
        graphicPanelId,
        isMapViewer,
    }: {
        type?: string,
        id?: string,
        graphicPanelId?: string,
        isMapViewer?: boolean,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelMapMarkerDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/control-panel-map-marker',
            query: {
                'Type': type,
                'Id': id,
                'GraphicPanelId': graphicPanelId,
                'IsMapViewer': isMapViewer,
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelPlanDevicePoints({
        boundBuildingId,
        graphicPanelId,
        isMapViewer,
        deviceId,
    }: {
        boundBuildingId?: string,
        graphicPanelId?: string,
        isMapViewer?: boolean,
        deviceId?: string,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/plan-device-points',
            query: {
                'BoundBuildingId': boundBuildingId,
                'GraphicPanelId': graphicPanelId,
                'IsMapViewer': isMapViewer,
                'DeviceId': deviceId,
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelPlanDevicePointsSingle({
        boundBuildingId,
        graphicPanelId,
        isMapViewer,
        deviceId,
    }: {
        boundBuildingId?: string,
        graphicPanelId?: string,
        isMapViewer?: boolean,
        deviceId?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/plan-device-points-single',
            query: {
                'BoundBuildingId': boundBuildingId,
                'GraphicPanelId': graphicPanelId,
                'IsMapViewer': isMapViewer,
                'DeviceId': deviceId,
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelFilterPlanDevicePoints({
        boundBuildingId,
        graphicPanelId,
        isMapViewer,
        filterDeviceType,
    }: {
        boundBuildingId?: string,
        graphicPanelId?: string,
        isMapViewer?: boolean,
        filterDeviceType?: Array<string>,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/filter-plan-device-points',
            query: {
                'BoundBuildingId': boundBuildingId,
                'GraphicPanelId': graphicPanelId,
                'IsMapViewer': isMapViewer,
                'FilterDeviceType': filterDeviceType,
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelImageMarkerDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelImagePlanDevicePoints({
        boundBuildingId,
        graphicPanelId,
        isMapViewer,
    }: {
        boundBuildingId?: string,
        graphicPanelId?: string,
        isMapViewer?: boolean,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelImageMarkerDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/image-plan-device-points',
            query: {
                'BoundBuildingId': boundBuildingId,
                'GraphicPanelId': graphicPanelId,
                'IsMapViewer': isMapViewer,
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
     * @returns FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelDeviceTypes(): CancelablePromise<Array<FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/device-types',
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelDeviceStatus(): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/device-status',
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
    public static postApiAppControlPanelExecuteDeviceTypeFunction({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_ExecuteDeviceTypeFunctionRequest,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/execute-device-type-function',
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
    public static postApiAppControlPanelPlanGraphicPanelDevicePointView({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_CreateGraphicPanelDevicePointViewInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/plan-graphic-panel-device-point-view',
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceTypeFunctionByDeviceIdOutput Success
     * @throws ApiError
     */
    public static getApiAppControlPanelDeviceTypeFunctionByDeviceId({
        deviceId,
    }: {
        deviceId: string,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceTypeFunctionByDeviceIdOutput>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/device-type-function-by-device-id/{deviceId}',
            path: {
                'deviceId': deviceId,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppControlPanelContrlPanelRightMessagePanel({
        deviceId,
        requireAlertAcknowledgement,
        isAlertConfirm,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        deviceId?: string,
        requireAlertAcknowledgement?: boolean,
        isAlertConfirm?: boolean,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/contrl-panel-right-message-panel',
            query: {
                'DeviceId': deviceId,
                'RequireAlertAcknowledgement': requireAlertAcknowledgement,
                'IsAlertConfirm': isAlertConfirm,
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelMapSidelineMakers({
        buildingId,
    }: {
        buildingId: string,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/map-sideline-makers/{buildingId}',
            path: {
                'buildingId': buildingId,
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
    public static postApiAppControlPanelEditMapSideline({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/edit-map-sideline',
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelDefaultControlPanel(): CancelablePromise<FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/default-control-panel',
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelDefaultCamera(): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/default-camera',
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
    public static postApiAppControlPanelDeviceBindingDefaultGraphicPanel({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_DeviceBindingDefaultGraphicPanelInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/device-binding-default-graphic-panel',
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelControlePanelByBuildingId({
        buildingId,
    }: {
        buildingId: string,
    }): CancelablePromise<FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/controle-panel-by-building-id/{buildingId}',
            path: {
                'buildingId': buildingId,
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
    public static postApiAppControlPanelSetBuildingFloorPoint({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_SetBuildingFloorPointInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/set-building-floor-point',
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceDetailDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelDeviceDetail({
        deviceId,
    }: {
        deviceId: string,
    }): CancelablePromise<FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceDetailDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/device-detail/{deviceId}',
            path: {
                'deviceId': deviceId,
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
    public static postApiAppControlPanelSetFloorPlanViewerConfig({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_SetFloorPlanViewerConfigInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/set-floor-plan-viewer-config',
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_GetFloorPlanConfigOutput Success
     * @throws ApiError
     */
    public static getApiAppControlPanelFloorPlanConfig({
        controlPanelId,
        graphicPanelId,
    }: {
        controlPanelId?: string,
        graphicPanelId?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_ControlPanels_Dto_GetFloorPlanConfigOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel/floor-plan-config',
            query: {
                'ControlPanelId': controlPanelId,
                'GraphicPanelId': graphicPanelId,
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
    public static postApiAppControlPanelDeviceUnbindPointView({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_DeviceUnbindPointViewInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel/device-unbind-point-view',
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
