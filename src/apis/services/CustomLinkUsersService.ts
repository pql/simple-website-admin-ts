/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_LinkUsers_Dtos_SaveLinkUsersDto } from '../models/FireBytes_Unified_LinkUsers_Dtos_SaveLinkUsersDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomLinkUsersService {
    /**
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppCustomLinkUsers({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_LinkUsers_Dtos_SaveLinkUsersDto,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/custom-link-users',
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
