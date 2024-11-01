/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Workflows_Dtos_DeviceControlInput } from '../models/FireBytes_Unified_Wave_Workflows_Dtos_DeviceControlInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WorkflowService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppWorkflowDeviceControl({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Workflows_Dtos_DeviceControlInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/workflow/device-control',
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
