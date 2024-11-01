/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Excel_Enums_ImportExportType } from '../models/FireBytes_Unified_Excel_Enums_ImportExportType';
import type { FireBytes_Unified_SysTem_WaveExcelCommon_Dtos_ImportFileResultDto } from '../models/FireBytes_Unified_SysTem_WaveExcelCommon_Dtos_ImportFileResultDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExcelCommonService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getApiExcelCommonExportExcelTemplateAsync({
        type,
        fileName,
    }: {
        type?: FireBytes_Unified_Excel_Enums_ImportExportType,
        fileName?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ExcelCommon/ExportExcelTemplateAsync',
            query: {
                'type': type,
                'FileName': fileName,
            },
        });
    }
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getApiExcelCommonExportDataAsync({
        type,
        fileName,
    }: {
        type?: FireBytes_Unified_Excel_Enums_ImportExportType,
        fileName?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ExcelCommon/ExportDataAsync',
            query: {
                'type': type,
                'FileName': fileName,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_SysTem_WaveExcelCommon_Dtos_ImportFileResultDto Success
     * @throws ApiError
     */
    public static postApiExcelCommonImportDataAsync({
        formData,
    }: {
        formData?: {
            type?: FireBytes_Unified_Excel_Enums_ImportExportType;
            ContentType?: string;
            ContentDisposition?: string;
            Headers?: Record<string, Array<string>>;
            Length?: number;
            Name?: string;
            FileName?: string;
        },
    }): CancelablePromise<FireBytes_Unified_SysTem_WaveExcelCommon_Dtos_ImportFileResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ExcelCommon/ImportDataAsync',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getApiExcelCommonDownErrorExcel({
        errorGuid,
        fileName,
    }: {
        errorGuid?: string,
        fileName?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ExcelCommon/DownErrorExcel',
            query: {
                'errorGuid': errorGuid,
                'FileName': fileName,
            },
        });
    }
}
