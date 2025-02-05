/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_FileManagement_Files_DownloadTokenResultDto } from '../models/Volo_FileManagement_Files_DownloadTokenResultDto';
import type { Volo_FileManagement_Files_FileDescriptorDto } from '../models/Volo_FileManagement_Files_FileDescriptorDto';
import type { Volo_FileManagement_Files_FileDescriptorDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_FileManagement_Files_FileDescriptorDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_FileManagement_Files_FileUploadPreInfoDto } from '../models/Volo_FileManagement_Files_FileUploadPreInfoDto';
import type { Volo_FileManagement_Files_FileUploadPreInfoRequest } from '../models/Volo_FileManagement_Files_FileUploadPreInfoRequest';
import type { Volo_FileManagement_Files_MoveFileInput } from '../models/Volo_FileManagement_Files_MoveFileInput';
import type { Volo_FileManagement_Files_RenameFileInput } from '../models/Volo_FileManagement_Files_RenameFileInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FileDescriptorsService {
    /**
     * @returns Volo_FileManagement_Files_FileDescriptorDto Success
     * @throws ApiError
     */
    public static getApiFileManagementFileDescriptor({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_FileManagement_Files_FileDescriptorDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/file-descriptor/{id}',
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
     * @returns Volo_FileManagement_Files_FileDescriptorDto Success
     * @throws ApiError
     */
    public static postApiFileManagementFileDescriptor({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_FileManagement_Files_RenameFileInput,
    }): CancelablePromise<Volo_FileManagement_Files_FileDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/file-descriptor/{id}',
            path: {
                'id': id,
            },
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiFileManagementFileDescriptor({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/file-management/file-descriptor/{id}',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_FileManagement_Files_FileDescriptorDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiFileManagementFileDescriptor1({
        directoryId,
    }: {
        directoryId?: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/file-descriptor',
            query: {
                'directoryId': directoryId,
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
    public static postApiFileManagementFileDescriptorUpload({
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
            url: '/api/file-management/file-descriptor/upload',
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
     * @returns Volo_FileManagement_Files_FileDescriptorDto Success
     * @throws ApiError
     */
    public static postApiFileManagementFileDescriptorMove({
        requestBody,
    }: {
        requestBody?: Volo_FileManagement_Files_MoveFileInput,
    }): CancelablePromise<Volo_FileManagement_Files_FileDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/file-descriptor/move',
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
     * @returns Volo_FileManagement_Files_FileUploadPreInfoDto Success
     * @throws ApiError
     */
    public static postApiFileManagementFileDescriptorPreUploadInfo({
        requestBody,
    }: {
        requestBody?: Array<Volo_FileManagement_Files_FileUploadPreInfoRequest>,
    }): CancelablePromise<Array<Volo_FileManagement_Files_FileUploadPreInfoDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/file-descriptor/pre-upload-info',
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiFileManagementFileDescriptorContent({
        id,
    }: {
        id?: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/file-descriptor/content',
            query: {
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
     * @returns Volo_FileManagement_Files_DownloadTokenResultDto Success
     * @throws ApiError
     */
    public static getApiFileManagementFileDescriptorDownloadToken({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_FileManagement_Files_DownloadTokenResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/file-descriptor/download/{id}/token',
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
    public static getApiFileManagementFileDescriptorDownload({
        id,
        token,
    }: {
        id: string,
        token?: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/file-descriptor/download/{id}',
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
