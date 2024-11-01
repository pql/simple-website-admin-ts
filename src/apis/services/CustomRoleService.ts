/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Identity_IdentityRoleDto } from '../models/Volo_Abp_Identity_IdentityRoleDto';
import type { Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomRoleService {
    /**
     * @returns Volo_Abp_Identity_IdentityRoleDto Success
     * @throws ApiError
     */
    public static getApiAppCustomRoleName({
        name,
    }: {
        name?: string,
    }): CancelablePromise<Volo_Abp_Identity_IdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/custom-role/name',
            query: {
                'name': name,
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiAppCustomRoleList({
        notId,
    }: {
        notId?: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/custom-role/list',
            query: {
                'NotId': notId,
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
