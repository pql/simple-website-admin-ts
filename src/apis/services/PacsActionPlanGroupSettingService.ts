/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_CreateOrUpdatePacsActionPlanGroupSettingInput } from '../models/FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_CreateOrUpdatePacsActionPlanGroupSettingInput';
import type { FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_GetPacsActionPlanGroupSettingForEditOutput } from '../models/FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_GetPacsActionPlanGroupSettingForEditOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PacsActionPlanGroupSettingService {
    /**
     * @returns FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_GetPacsActionPlanGroupSettingForEditOutput Success
     * @throws ApiError
     */
    public static postApiAppPacsActionPlanGroupSettingSettingGetForEdit({
        pacsActionPlanGroupId,
    }: {
        pacsActionPlanGroupId: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_GetPacsActionPlanGroupSettingForEditOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-action-plan-group-setting/setting-get-for-edit/{pacsActionPlanGroupId}',
            path: {
                'pacsActionPlanGroupId': pacsActionPlanGroupId,
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
    public static postApiAppPacsActionPlanGroupSettingSettingPostSave({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_CreateOrUpdatePacsActionPlanGroupSettingInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/pacs-action-plan-group-setting/setting-post-save',
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
