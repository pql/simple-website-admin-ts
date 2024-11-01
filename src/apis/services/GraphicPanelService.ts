/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_GraphicPanels_Dtos_CreateOrUpdateGraphicPanelInput } from '../models/FireBytes_Unified_Wave_GraphicPanels_Dtos_CreateOrUpdateGraphicPanelInput';
import type { FireBytes_Unified_Wave_GraphicPanels_Dtos_GetGraphicPanelForEditOutput } from '../models/FireBytes_Unified_Wave_GraphicPanels_Dtos_GetGraphicPanelForEditOutput';
import type { FireBytes_Unified_Wave_GraphicPanels_Dtos_GPNdoDto } from '../models/FireBytes_Unified_Wave_GraphicPanels_Dtos_GPNdoDto';
import type { FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto } from '../models/FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto';
import type { FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_GraphicPanels_Dtos_SetFloorPlanHideObjectIdInput } from '../models/FireBytes_Unified_Wave_GraphicPanels_Dtos_SetFloorPlanHideObjectIdInput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GraphicPanelService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppGraphicPanelPaged({
        filterSearch,
        filterGraphicName,
        filterGraphicTypeId,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterSearch?: string,
        filterGraphicName?: string,
        filterGraphicTypeId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/graphic-panel/paged',
            query: {
                'Filter.Search': filterSearch,
                'Filter.GraphicName': filterGraphicName,
                'Filter.GraphicTypeId': filterGraphicTypeId,
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
     * @returns FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto Success
     * @throws ApiError
     */
    public static getApiAppGraphicPanelById({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/graphic-panel/{id}/by-id',
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
     * @returns FireBytes_Unified_Wave_GraphicPanels_Dtos_GetGraphicPanelForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppGraphicPanelForEdit({
        id,
    }: {
        id?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_GraphicPanels_Dtos_GetGraphicPanelForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/graphic-panel/for-edit',
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
    public static postApiAppGraphicPanelOrUpdate({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_GraphicPanels_Dtos_CreateOrUpdateGraphicPanelInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/graphic-panel/or-update',
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
    public static deleteApiAppGraphicPanel({
        id,
    }: {
        id?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/graphic-panel',
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
    public static postApiAppGraphicPanelBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/graphic-panel/batch-delete',
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
     * @returns FireBytes_Unified_Wave_GraphicPanels_Dtos_GPNdoDto Success
     * @throws ApiError
     */
    public static getApiAppGraphicPanelNdoList({
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
    }): CancelablePromise<Array<FireBytes_Unified_Wave_GraphicPanels_Dtos_GPNdoDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/graphic-panel/ndo-list',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppGraphicPanelNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/graphic-panel/name-repeat-verify',
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
    public static postApiAppGraphicPanelSetFloorPlanHideObjectId({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_GraphicPanels_Dtos_SetFloorPlanHideObjectIdInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/graphic-panel/set-floor-plan-hide-object-id',
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
    public static getApiAppGraphicPanelComboxNdo({
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
            url: '/api/app/graphic-panel/combox-ndo',
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiAppGraphicPanelGraphicPanelTypeNameById({
        id,
    }: {
        id: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/graphic-panel/{id}/graphic-panel-type-name-by-id',
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
