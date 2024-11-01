/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_ControlPanels_Dto_ExecuteDeviceTypeFunctionRequest } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_ExecuteDeviceTypeFunctionRequest';
import type { FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceTypeFunctionByDeviceIdOutput } from '../models/FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceTypeFunctionByDeviceIdOutput';
import type { FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserDeviceInput } from '../models/FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserDeviceInput';
import type { FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserDeviceInput2 } from '../models/FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserDeviceInput2';
import type { FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserInfoDto } from '../models/FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserInfoDto';
import type { FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetUserCardListDto } from '../models/FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetUserCardListDto';
import type { FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsDeviceDto } from '../models/FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsDeviceDto';
import type { FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsUserCamerasDto } from '../models/FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsUserCamerasDto';
import type { FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsUserDeviceDto } from '../models/FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsUserDeviceDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MobileService {
    /**
     * @returns FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserInfoDto Success
     * @throws ApiError
     */
    public static getApiAppMobileGetPacsUserInfo(): CancelablePromise<FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserInfoDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/mobile/GetPacsUserInfo',
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
     * @returns FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetUserCardListDto Success
     * @throws ApiError
     */
    public static getApiAppMobileGetUserCardList(): CancelablePromise<Array<FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetUserCardListDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/mobile/GetUserCardList',
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
     * @returns FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsUserDeviceDto Success
     * @throws ApiError
     */
    public static postApiAppMobileGetUserDeviceList({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserDeviceInput,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsUserDeviceDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mobile/GetUserDeviceList',
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
     * @returns FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsUserCamerasDto Success
     * @throws ApiError
     */
    public static postApiAppMobileGetUserCamerasList({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserDeviceInput2,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsUserCamerasDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mobile/GetUserCamerasList',
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
     * @returns FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsDeviceDto Success
     * @throws ApiError
     */
    public static getApiAppMobileGetDeviceById({
        deviceId,
    }: {
        deviceId?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Mobile_Pacs_Dtos_PacsDeviceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/mobile/GetDeviceById',
            query: {
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
     * @returns FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceTypeFunctionByDeviceIdOutput Success
     * @throws ApiError
     */
    public static getApiAppMobileGetDeviceTypeFunctionByDeviceId({
        deviceId,
    }: {
        deviceId?: string,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceTypeFunctionByDeviceIdOutput>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/mobile/GetDeviceTypeFunctionByDeviceId',
            query: {
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
     * @returns void
     * @throws ApiError
     */
    public static getApiAppMobilePreviewAsync({
        id,
        tenantId,
        download = false,
    }: {
        id?: string,
        tenantId?: string,
        download?: boolean,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/mobile/PreviewAsync',
            query: {
                'id': id,
                'tenantId': tenantId,
                'download': download,
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
    public static postApiAppMobileExecuteDeviceTypeFunction({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanels_Dto_ExecuteDeviceTypeFunctionRequest,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mobile/ExecuteDeviceTypeFunction',
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
