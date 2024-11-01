/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Streaming_Dto_GetDeviceMessageOutput } from '../models/FireBytes_Unified_Wave_Streaming_Dto_GetDeviceMessageOutput';
import type { FireBytes_Unified_Wave_Streaming_Dto_InterfaceServiceHeartbeatInput } from '../models/FireBytes_Unified_Wave_Streaming_Dto_InterfaceServiceHeartbeatInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StreamingService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppStreamingInterfaceServiceHeartbeat({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_Streaming_Dto_InterfaceServiceHeartbeatInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/streaming/interface-service-heartbeat',
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
     * @returns FireBytes_Unified_Wave_Streaming_Dto_GetDeviceMessageOutput Success
     * @throws ApiError
     */
    public static getApiAppStreamingDeviceMessage({
        deviceId,
    }: {
        deviceId: string,
    }): CancelablePromise<FireBytes_Unified_Wave_Streaming_Dto_GetDeviceMessageOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/streaming/device-message/{DeviceId}',
            path: {
                'DeviceId': deviceId,
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
