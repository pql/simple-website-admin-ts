/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto } from '../models/FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ButtonGroupsService {
    /**
     * @returns FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto Success
     * @throws ApiError
     */
    public static getApiAppButtonGroupsButtonGroups({
        buttonGroupsName,
        userId,
    }: {
        buttonGroupsName?: string,
        userId?: string,
    }): CancelablePromise<FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/button-groups/button-groups',
            query: {
                'ButtonGroupsName': buttonGroupsName,
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
}
