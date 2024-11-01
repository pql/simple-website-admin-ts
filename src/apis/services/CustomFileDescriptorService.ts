/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_FileDescriptors_Dtos_DecompressingFilesDto } from '../models/FireBytes_Unified_FileDescriptors_Dtos_DecompressingFilesDto';
import type { FireBytes_Unified_FileDescriptors_Dtos_PreviewImagesDto } from '../models/FireBytes_Unified_FileDescriptors_Dtos_PreviewImagesDto';
import type { FireBytes_Unified_PageFilters_Dto_FirstInfo } from '../models/FireBytes_Unified_PageFilters_Dto_FirstInfo';
import type { Volo_FileManagement_Files_DownloadTokenResultDto } from '../models/Volo_FileManagement_Files_DownloadTokenResultDto';
import type { Volo_FileManagement_Files_FileDescriptorDto } from '../models/Volo_FileManagement_Files_FileDescriptorDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomFileDescriptorService {
    /**
     * @returns FireBytes_Unified_FileDescriptors_Dtos_DecompressingFilesDto Success
     * @throws ApiError
     */
    public static postApiAppCustomFileDescriptorDecompressingFiles({
        fileId,
        folder,
    }: {
        fileId: string,
        folder?: string,
    }): CancelablePromise<FireBytes_Unified_FileDescriptors_Dtos_DecompressingFilesDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/custom-file-descriptor/decompressing-files/{fileId}',
            path: {
                'fileId': fileId,
            },
            query: {
                'folder': folder,
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
    public static getApiAppCustomFileDescriptorPreview({
        id,
        tenantId,
        download = false,
    }: {
        id: string,
        tenantId: string,
        download?: boolean,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/custom-file-descriptor/{id}/preview/{tenantId}',
            path: {
                'id': id,
                'tenantId': tenantId,
            },
            query: {
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
     * @returns FireBytes_Unified_FileDescriptors_Dtos_PreviewImagesDto Success
     * @throws ApiError
     */
    public static postApiAppCustomFileDescriptorPreviewImages({
        fileId,
    }: {
        fileId: string,
    }): CancelablePromise<FireBytes_Unified_FileDescriptors_Dtos_PreviewImagesDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/custom-file-descriptor/preview-images/{fileId}',
            path: {
                'fileId': fileId,
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
     * @returns FireBytes_Unified_PageFilters_Dto_FirstInfo Success
     * @throws ApiError
     */
    public static getApiAppCustomFileDescriptorFirstInfo({
        id,
        decompressingFilesId,
        folder,
    }: {
        id?: string,
        decompressingFilesId?: string,
        folder?: string,
    }): CancelablePromise<FireBytes_Unified_PageFilters_Dto_FirstInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/custom-file-descriptor/first-info',
            query: {
                'Id': id,
                'DecompressingFilesId': decompressingFilesId,
                'folder': folder,
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
     * @returns Volo_FileManagement_Files_FileDescriptorDto Success
     * @throws ApiError
     */
    public static postApiAppCustomFileDescriptorUpload({
        name,
        directoryId,
        overrideExisting,
        extraProperties,
        formData,
    }: {
        name: string,
        directoryId?: string,
        overrideExisting?: boolean,
        extraProperties?: Record<string, any>,
        formData?: {
            File?: Blob;
        },
    }): CancelablePromise<Volo_FileManagement_Files_FileDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/custom-file-descriptor/upload',
            query: {
                'directoryId': directoryId,
                'Name': name,
                'OverrideExisting': overrideExisting,
                'ExtraProperties': extraProperties,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * @returns Volo_FileManagement_Files_DownloadTokenResultDto Success
     * @throws ApiError
     */
    public static getApiAppCustomFileDescriptorDownloadToken({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_FileManagement_Files_DownloadTokenResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/custom-file-descriptor/download/{id}/token',
            path: {
                'id': id,
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
     * @returns binary Success
     * @throws ApiError
     */
    public static getApiAppCustomFileDescriptorDownload({
        id,
        token,
    }: {
        id: string,
        token?: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/custom-file-descriptor/download/{id}',
            path: {
                'id': id,
            },
            query: {
                'token': token,
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
