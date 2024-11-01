/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto } from '../models/FireBytes_Unified_Shared_NdoDto';
import type { FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelListDto } from '../models/FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelListDto';
import type { FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_BuildingFloorModels_Dtos_CreateOrUpdateBuildingFloorModelInput } from '../models/FireBytes_Unified_Wave_BuildingFloorModels_Dtos_CreateOrUpdateBuildingFloorModelInput';
import type { FireBytes_Unified_Wave_BuildingFloorModels_Dtos_GetBuildingFloorModelForEditOutput } from '../models/FireBytes_Unified_Wave_BuildingFloorModels_Dtos_GetBuildingFloorModelForEditOutput';
import type { FireBytes_Unified_Wave_BuildingFloorModels_Dtos_GetProjectsDto } from '../models/FireBytes_Unified_Wave_BuildingFloorModels_Dtos_GetProjectsDto';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BuildingFloorModelService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppBuildingFloorModelPaged({
        type,
        buildingFloorModeName,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        type?: number,
        buildingFloorModeName?: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/building-floor-model/paged',
            query: {
                'Type': type,
                'BuildingFloorModeName': buildingFloorModeName,
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
     * @returns FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelListDto Success
     * @throws ApiError
     */
    public static getApiAppBuildingFloorModelById({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelListDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/building-floor-model/{id}/by-id',
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
     * @returns FireBytes_Unified_Wave_BuildingFloorModels_Dtos_GetBuildingFloorModelForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppBuildingFloorModelForEdit({
        id,
    }: {
        id: string,
    }): CancelablePromise<FireBytes_Unified_Wave_BuildingFloorModels_Dtos_GetBuildingFloorModelForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/building-floor-model/{id}/for-edit',
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
    public static postApiAppBuildingFloorModelSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_BuildingFloorModels_Dtos_CreateOrUpdateBuildingFloorModelInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/building-floor-model/save',
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
    public static deleteApiAppBuildingFloorModel({
        input,
    }: {
        input?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/building-floor-model',
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
    public static postApiAppBuildingFloorModelBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/building-floor-model/batch-delete',
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
    public static getApiAppBuildingFloorModelNdoList({
        filter,
        typeId,
        deviceTypeId,
        deviceTypeName,
        customData,
        dataType,
        notId,
        type,
    }: {
        filter?: string,
        typeId?: string,
        deviceTypeId?: string,
        deviceTypeName?: string,
        customData?: string,
        dataType?: string,
        notId?: string,
        type?: number,
    }): CancelablePromise<Array<FireBytes_Unified_Shared_NdoDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/building-floor-model/ndo-list',
            query: {
                'Filter': filter,
                'typeId': typeId,
                'deviceTypeId': deviceTypeId,
                'deviceTypeName': deviceTypeName,
                'customData': customData,
                'dataType': dataType,
                'notId': notId,
                'type': type,
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
     * @returns FireBytes_Unified_Wave_BuildingFloorModels_Dtos_GetProjectsDto Success
     * @throws ApiError
     */
    public static getApiAppBuildingFloorModelProjects(): CancelablePromise<FireBytes_Unified_Wave_BuildingFloorModels_Dtos_GetProjectsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/building-floor-model/projects',
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
    public static postApiAppBuildingFloorModelModelNameVerify({
        type,
        requestBody,
    }: {
        type?: number,
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/building-floor-model/model-name-verify',
            query: {
                'type': type,
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
    public static postApiAppBuildingFloorModelBuildingFloorModelDecompress({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/building-floor-model/{id}/building-floor-model-decompress',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppBuildingFloorModelComboxNdo({
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
            url: '/api/app/building-floor-model/combox-ndo',
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
}
