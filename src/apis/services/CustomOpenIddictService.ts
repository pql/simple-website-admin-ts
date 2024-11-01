/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomOpenIddictService {
    /**
     * @returns boolean Success
     * @throws ApiError
     */
    public static deleteApiAppCustomOpenIddictByIds({
        ids,
    }: {
        ids?: Array<string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/custom-open-iddict/by-ids',
            query: {
                'ids': ids,
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
