/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_SysTem_WaveEnumCommon_EnumMap } from '../models/FireBytes_Unified_SysTem_WaveEnumCommon_EnumMap';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EnumService {
    /**
     * @returns FireBytes_Unified_SysTem_WaveEnumCommon_EnumMap Success
     * @throws ApiError
     */
    public static getApiEnumGetEnumMaps(): CancelablePromise<Record<string, Array<FireBytes_Unified_SysTem_WaveEnumCommon_EnumMap>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Enum/GetEnumMaps',
        });
    }
    /**
     * @returns FireBytes_Unified_SysTem_WaveEnumCommon_EnumMap Success
     * @throws ApiError
     */
    public static getApiEnumGetEnumMapsByName({
        name,
    }: {
        name?: string,
    }): CancelablePromise<Record<string, Array<FireBytes_Unified_SysTem_WaveEnumCommon_EnumMap>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Enum/GetEnumMapsByName',
            query: {
                'name': name,
            },
        });
    }
}
