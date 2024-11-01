/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Commons_Dtos_KeyValueDto } from '../models/FireBytes_Unified_Commons_Dtos_KeyValueDto';
import type { FireBytes_Unified_Shared_NameVerifyInput } from '../models/FireBytes_Unified_Shared_NameVerifyInput';
import type { FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Shared_NdoDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_CreateOrUpdatePacsCardHolderInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_CreateOrUpdatePacsCardHolderInput';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardHolderCardListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardHolderCardListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCompanys_PacsCardHolderCompanyListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCompanys_PacsCardHolderCompanyListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDevices_PacsCardHolderDeviceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDevices_PacsCardHolderDeviceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsHolderFaceProfiles_PacsHolderFaceProfileEditDto } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsHolderFaceProfiles_PacsHolderFaceProfileEditDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsUserViewInfo } from '../models/FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsUserViewInfo';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsCardHolderService {
    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPaged({
        filterSearch,
        filterName,
        filterDepartmentName,
        filterPositionName,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterSearch?: string,
        filterName?: string,
        filterDepartmentName?: string,
        filterPositionName?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/paged',
            query: {
                'Filter.Search': filterSearch,
                'Filter.Name': filterName,
                'Filter.DepartmentName': filterDepartmentName,
                'Filter.PositionName': filterPositionName,
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderForEdit({
        input,
    }: {
        input?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/for-edit',
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderForUserEdit({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/for-user-edit/{UserId}',
            path: {
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderForSystemUser({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/for-system-user/{UserId}',
            path: {
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
    public static postApiAppPacsCardHolderSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_CreateOrUpdatePacsCardHolderInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder/save',
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
    public static deleteApiAppPacsCardHolder({
        input,
    }: {
        input?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/pacs-card-holder',
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
    public static postApiAppPacsCardHolderBatchDelete({
        requestBody,
    }: {
        requestBody?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder/batch-delete',
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
     * @returns FireBytes_Unified_Commons_Dtos_KeyValueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPacsCardHolderTypeList({
        filterCardHolderTypeName,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterCardHolderTypeName?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Array<FireBytes_Unified_Commons_Dtos_KeyValueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/pacs-card-holder-type-list',
            query: {
                'Filter.CardHolderTypeName': filterCardHolderTypeName,
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
     * @returns FireBytes_Unified_Commons_Dtos_KeyValueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPacsDepartmentList({
        filterDepartment,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterDepartment?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Array<FireBytes_Unified_Commons_Dtos_KeyValueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/pacs-department-list',
            query: {
                'Filter.Department': filterDepartment,
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
     * @returns FireBytes_Unified_Commons_Dtos_KeyValueDto Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPacsPositionList({
        filterPosition,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterPosition?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Array<FireBytes_Unified_Commons_Dtos_KeyValueDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/pacs-position-list',
            query: {
                'Filter.Position': filterPosition,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCompanys_PacsCardHolderCompanyListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPacsCompanyPaged({
        pacsCardHolderId,
        selectedCompanyIdList,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        pacsCardHolderId?: string,
        selectedCompanyIdList?: Array<string>,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/pacs-company-paged',
            query: {
                'PacsCardHolderId': pacsCardHolderId,
                'SelectedCompanyIdList': selectedCompanyIdList,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardHolderCardListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPacsCardsPaged({
        pacsCardHolderId,
        selectedCardIdList,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        pacsCardHolderId?: string,
        selectedCardIdList?: Array<string>,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/pacs-cards-paged',
            query: {
                'PacsCardHolderId': pacsCardHolderId,
                'SelectedCardIdList': selectedCardIdList,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDevices_PacsCardHolderDeviceListDto_FireBytes_Unified_Application_Contracts_Version_1_0_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPacsDevicePaged({
        pacsCardHolderId,
        selectedDeviceIdList,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        pacsCardHolderId?: string,
        selectedDeviceIdList?: Array<string>,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/pacs-device-paged',
            query: {
                'PacsCardHolderId': pacsCardHolderId,
                'SelectedDeviceIdList': selectedDeviceIdList,
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsHolderFaceProfiles_PacsHolderFaceProfileEditDto Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPacsFaceProfile({
        id,
        pacsCardHolderId,
    }: {
        id?: string,
        pacsCardHolderId?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsHolderFaceProfiles_PacsHolderFaceProfileEditDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/pacs-face-profile',
            query: {
                'Id': id,
                'PacsCardHolderId': pacsCardHolderId,
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
    public static postApiAppPacsCardHolderNameRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder/name-repeat-verify',
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
    public static postApiAppPacsCardHolderEmailRepeatVerify({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Shared_NameVerifyInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-card-holder/email-repeat-verify',
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
    public static getApiAppPacsCardHolderComboxNdo({
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
            url: '/api/app/pacs-card-holder/combox-ndo',
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
    public static getApiAppPacsCardHolderSearchDepartmentIdList({
        search,
        isLike = true,
    }: {
        search?: string,
        isLike?: boolean,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/search-department-id-list',
            query: {
                'search': search,
                'isLike': isLike,
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
    public static getApiAppPacsCardHolderSearchPositionIdList({
        search,
        isLike = true,
    }: {
        search?: string,
        isLike?: boolean,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/search-position-id-list',
            query: {
                'search': search,
                'isLike': isLike,
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
     * @returns FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsUserViewInfo Success
     * @throws ApiError
     */
    public static getApiAppPacsCardHolderPacsUserViewInfo({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsUserViewInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/pacs-card-holder/pacs-user-view-info/{userId}',
            path: {
                'userId': userId,
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
