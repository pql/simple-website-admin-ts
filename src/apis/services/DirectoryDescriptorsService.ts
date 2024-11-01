/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_FileManagement_Directories_CreateDirectoryInput } from '../models/Volo_FileManagement_Directories_CreateDirectoryInput';
import type { Volo_FileManagement_Directories_DirectoryContentDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_FileManagement_Directories_DirectoryContentDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_FileManagement_Directories_DirectoryDescriptorDto } from '../models/Volo_FileManagement_Directories_DirectoryDescriptorDto';
import type { Volo_FileManagement_Directories_DirectoryDescriptorInfoDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_FileManagement_Directories_DirectoryDescriptorInfoDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_FileManagement_Directories_MoveDirectoryInput } from '../models/Volo_FileManagement_Directories_MoveDirectoryInput';
import type { Volo_FileManagement_Directories_RenameDirectoryInput } from '../models/Volo_FileManagement_Directories_RenameDirectoryInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DirectoryDescriptorsService {
    /**
     * @returns Volo_FileManagement_Directories_DirectoryDescriptorDto Success
     * @throws ApiError
     */
    public static getApiFileManagementDirectoryDescriptor({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_FileManagement_Directories_DirectoryDescriptorDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/directory-descriptor/{id}',
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
     * @returns Volo_FileManagement_Directories_DirectoryDescriptorDto Success
     * @throws ApiError
     */
    public static postApiFileManagementDirectoryDescriptor({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_FileManagement_Directories_RenameDirectoryInput,
    }): CancelablePromise<Volo_FileManagement_Directories_DirectoryDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/directory-descriptor/{id}',
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
    public static deleteApiFileManagementDirectoryDescriptor({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/file-management/directory-descriptor/{id}',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_FileManagement_Directories_DirectoryDescriptorInfoDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiFileManagementDirectoryDescriptorSubDirectories({
        parentId,
    }: {
        parentId?: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/directory-descriptor/sub-directories',
            query: {
                'parentId': parentId,
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
     * @returns Volo_FileManagement_Directories_DirectoryDescriptorDto Success
     * @throws ApiError
     */
    public static postApiFileManagementDirectoryDescriptor1({
        requestBody,
    }: {
        requestBody?: Volo_FileManagement_Directories_CreateDirectoryInput,
    }): CancelablePromise<Volo_FileManagement_Directories_DirectoryDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/directory-descriptor',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_FileManagement_Directories_DirectoryContentDto_Volo_FileManagement_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiFileManagementDirectoryDescriptor1({
        filter,
        id,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        id?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/directory-descriptor',
            query: {
                'Filter': filter,
                'Id': id,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
     * @returns Volo_FileManagement_Directories_DirectoryDescriptorDto Success
     * @throws ApiError
     */
    public static postApiFileManagementDirectoryDescriptorMove({
        requestBody,
    }: {
        requestBody?: Volo_FileManagement_Directories_MoveDirectoryInput,
    }): CancelablePromise<Volo_FileManagement_Directories_DirectoryDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/directory-descriptor/move',
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
