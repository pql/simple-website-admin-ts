/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Identity_ClaimTypeDto } from '../models/Volo_Abp_Identity_ClaimTypeDto';
import type { Volo_Abp_Identity_DownloadTokenResultDto } from '../models/Volo_Abp_Identity_DownloadTokenResultDto';
import type { Volo_Abp_Identity_ExternalLoginProviderDto } from '../models/Volo_Abp_Identity_ExternalLoginProviderDto';
import type { Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Identity_IdentityRoleLookupDto } from '../models/Volo_Abp_Identity_IdentityRoleLookupDto';
import type { Volo_Abp_Identity_IdentityUserClaimDto } from '../models/Volo_Abp_Identity_IdentityUserClaimDto';
import type { Volo_Abp_Identity_IdentityUserCreateDto } from '../models/Volo_Abp_Identity_IdentityUserCreateDto';
import type { Volo_Abp_Identity_IdentityUserDto } from '../models/Volo_Abp_Identity_IdentityUserDto';
import type { Volo_Abp_Identity_IdentityUserDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_Identity_IdentityUserDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Identity_IdentityUserUpdateDto } from '../models/Volo_Abp_Identity_IdentityUserUpdateDto';
import type { Volo_Abp_Identity_IdentityUserUpdatePasswordInput } from '../models/Volo_Abp_Identity_IdentityUserUpdatePasswordInput';
import type { Volo_Abp_Identity_IdentityUserUpdateRolesDto } from '../models/Volo_Abp_Identity_IdentityUserUpdateRolesDto';
import type { Volo_Abp_Identity_ImportExternalUserInput } from '../models/Volo_Abp_Identity_ImportExternalUserInput';
import type { Volo_Abp_Identity_ImportUsersFromFileOutput } from '../models/Volo_Abp_Identity_ImportUsersFromFileOutput';
import type { Volo_Abp_Identity_ImportUsersFromFileType } from '../models/Volo_Abp_Identity_ImportUsersFromFileType';
import type { Volo_Abp_Identity_OrganizationUnitDto } from '../models/Volo_Abp_Identity_OrganizationUnitDto';
import type { Volo_Abp_Identity_OrganizationUnitLookupDto } from '../models/Volo_Abp_Identity_OrganizationUnitLookupDto';
import type { Volo_Abp_Identity_OrganizationUnitWithDetailsDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_Identity_OrganizationUnitWithDetailsDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * @returns Volo_Abp_Identity_IdentityUserDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsers({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/{id}',
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
     * @returns Volo_Abp_Identity_IdentityUserDto Success
     * @throws ApiError
     */
    public static putApiIdentityUsers({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_IdentityUserUpdateDto,
    }): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}',
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
    public static deleteApiIdentityUsers({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/users/{id}',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Abp_Identity_IdentityUserDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiIdentityUsers1({
        filter,
        roleId,
        organizationUnitId,
        userName,
        phoneNumber,
        emailAddress,
        name,
        surname,
        isLockedOut,
        notActive,
        emailConfirmed,
        isExternal,
        maxCreationTime,
        minCreationTime,
        maxModifitionTime,
        minModifitionTime,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        filter?: string,
        roleId?: string,
        organizationUnitId?: string,
        userName?: string,
        phoneNumber?: string,
        emailAddress?: string,
        name?: string,
        surname?: string,
        isLockedOut?: boolean,
        notActive?: boolean,
        emailConfirmed?: boolean,
        isExternal?: boolean,
        maxCreationTime?: string,
        minCreationTime?: string,
        maxModifitionTime?: string,
        minModifitionTime?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users',
            query: {
                'Filter': filter,
                'RoleId': roleId,
                'OrganizationUnitId': organizationUnitId,
                'UserName': userName,
                'PhoneNumber': phoneNumber,
                'EmailAddress': emailAddress,
                'Name': name,
                'Surname': surname,
                'IsLockedOut': isLockedOut,
                'NotActive': notActive,
                'EmailConfirmed': emailConfirmed,
                'IsExternal': isExternal,
                'MaxCreationTime': maxCreationTime,
                'MinCreationTime': minCreationTime,
                'MaxModifitionTime': maxModifitionTime,
                'MinModifitionTime': minModifitionTime,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
                'ExtraProperties': extraProperties,
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
     * @returns Volo_Abp_Identity_IdentityUserDto Success
     * @throws ApiError
     */
    public static postApiIdentityUsers({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentityUserCreateDto,
    }): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/users',
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
     * @returns Volo_Abp_Identity_IdentityUserDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersById({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/by-id/{id}',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiIdentityUsersRoles({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/{id}/roles',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putApiIdentityUsersRoles({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_IdentityUserUpdateRolesDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}/roles',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiIdentityUsersAssignableRoles(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/assignable-roles',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_Abp_Identity_OrganizationUnitWithDetailsDto_Volo_Abp_Identity_Pro_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiIdentityUsersAvailableOrganizationUnits(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/available-organization-units',
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
     * @returns Volo_Abp_Identity_ClaimTypeDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersAllClaimTypes(): CancelablePromise<Array<Volo_Abp_Identity_ClaimTypeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/all-claim-types',
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
     * @returns Volo_Abp_Identity_IdentityUserClaimDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersClaims({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<Volo_Abp_Identity_IdentityUserClaimDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/{id}/claims',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putApiIdentityUsersClaims({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Array<Volo_Abp_Identity_IdentityUserClaimDto>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}/claims',
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
     * @returns Volo_Abp_Identity_OrganizationUnitDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersOrganizationUnits({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<Volo_Abp_Identity_OrganizationUnitDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/{id}/organization-units',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putApiIdentityUsersLock({
        id,
        lockoutEnd,
    }: {
        id: string,
        lockoutEnd: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}/lock/{lockoutEnd}',
            path: {
                'id': id,
                'lockoutEnd': lockoutEnd,
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
     * @returns any Success
     * @throws ApiError
     */
    public static putApiIdentityUsersUnlock({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}/unlock',
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
     * @returns Volo_Abp_Identity_IdentityUserDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersByUsername({
        username,
    }: {
        username: string,
    }): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/by-username/{username}',
            path: {
                'username': username,
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
     * @returns Volo_Abp_Identity_IdentityUserDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersByEmail({
        email,
    }: {
        email: string,
    }): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/by-email/{email}',
            path: {
                'email': email,
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static getApiIdentityUsersTwoFactorEnabled({
        id,
    }: {
        id: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/{id}/two-factor-enabled',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putApiIdentityUsersTwoFactor({
        id,
        enabled,
    }: {
        id: string,
        enabled: boolean,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}/two-factor/{enabled}',
            path: {
                'id': id,
                'enabled': enabled,
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
     * @returns any Success
     * @throws ApiError
     */
    public static putApiIdentityUsersChangePassword({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_IdentityUserUpdatePasswordInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}/change-password',
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
     * @returns Volo_Abp_Identity_IdentityRoleLookupDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersLookupRoles(): CancelablePromise<Array<Volo_Abp_Identity_IdentityRoleLookupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/roles',
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
     * @returns Volo_Abp_Identity_OrganizationUnitLookupDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersLookupOrganizationUnits(): CancelablePromise<Array<Volo_Abp_Identity_OrganizationUnitLookupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/organization-units',
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
     * @returns Volo_Abp_Identity_ExternalLoginProviderDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersExternalLoginProviders(): CancelablePromise<Array<Volo_Abp_Identity_ExternalLoginProviderDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/external-login-Providers',
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
     * @returns Volo_Abp_Identity_IdentityUserDto Success
     * @throws ApiError
     */
    public static postApiIdentityUsersImportExternalUser({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_ImportExternalUserInput,
    }): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/users/import-external-user',
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
     * @returns binary Success
     * @throws ApiError
     */
    public static getApiIdentityUsersExportAsExcel({
        token,
        filter,
        roleId,
        organizationUnitId,
        userName,
        phoneNumber,
        emailAddress,
        name,
        surname,
        isLockedOut,
        notActive,
        emailConfirmed,
        isExternal,
        maxCreationTime,
        minCreationTime,
        maxModifitionTime,
        minModifitionTime,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        token: string,
        filter?: string,
        roleId?: string,
        organizationUnitId?: string,
        userName?: string,
        phoneNumber?: string,
        emailAddress?: string,
        name?: string,
        surname?: string,
        isLockedOut?: boolean,
        notActive?: boolean,
        emailConfirmed?: boolean,
        isExternal?: boolean,
        maxCreationTime?: string,
        minCreationTime?: string,
        maxModifitionTime?: string,
        minModifitionTime?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/export-as-excel',
            query: {
                'Token': token,
                'Filter': filter,
                'RoleId': roleId,
                'OrganizationUnitId': organizationUnitId,
                'UserName': userName,
                'PhoneNumber': phoneNumber,
                'EmailAddress': emailAddress,
                'Name': name,
                'Surname': surname,
                'IsLockedOut': isLockedOut,
                'NotActive': notActive,
                'EmailConfirmed': emailConfirmed,
                'IsExternal': isExternal,
                'MaxCreationTime': maxCreationTime,
                'MinCreationTime': minCreationTime,
                'MaxModifitionTime': maxModifitionTime,
                'MinModifitionTime': minModifitionTime,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
                'ExtraProperties': extraProperties,
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
    public static getApiIdentityUsersExportAsCsv({
        token,
        filter,
        roleId,
        organizationUnitId,
        userName,
        phoneNumber,
        emailAddress,
        name,
        surname,
        isLockedOut,
        notActive,
        emailConfirmed,
        isExternal,
        maxCreationTime,
        minCreationTime,
        maxModifitionTime,
        minModifitionTime,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        token: string,
        filter?: string,
        roleId?: string,
        organizationUnitId?: string,
        userName?: string,
        phoneNumber?: string,
        emailAddress?: string,
        name?: string,
        surname?: string,
        isLockedOut?: boolean,
        notActive?: boolean,
        emailConfirmed?: boolean,
        isExternal?: boolean,
        maxCreationTime?: string,
        minCreationTime?: string,
        maxModifitionTime?: string,
        minModifitionTime?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/export-as-csv',
            query: {
                'Token': token,
                'Filter': filter,
                'RoleId': roleId,
                'OrganizationUnitId': organizationUnitId,
                'UserName': userName,
                'PhoneNumber': phoneNumber,
                'EmailAddress': emailAddress,
                'Name': name,
                'Surname': surname,
                'IsLockedOut': isLockedOut,
                'NotActive': notActive,
                'EmailConfirmed': emailConfirmed,
                'IsExternal': isExternal,
                'MaxCreationTime': maxCreationTime,
                'MinCreationTime': minCreationTime,
                'MaxModifitionTime': maxModifitionTime,
                'MinModifitionTime': minModifitionTime,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
                'ExtraProperties': extraProperties,
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
     * @returns Volo_Abp_Identity_DownloadTokenResultDto Success
     * @throws ApiError
     */
    public static getApiIdentityUsersDownloadToken(): CancelablePromise<Volo_Abp_Identity_DownloadTokenResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/download-token',
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
    public static getApiIdentityUsersImportUsersSampleFile({
        token,
        fileType,
    }: {
        token: string,
        fileType?: Volo_Abp_Identity_ImportUsersFromFileType,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/import-users-sample-file',
            query: {
                'FileType': fileType,
                'Token': token,
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
     * @returns Volo_Abp_Identity_ImportUsersFromFileOutput Success
     * @throws ApiError
     */
    public static postApiIdentityUsersImportUsersFromFile({
        fileType,
        formData,
    }: {
        fileType?: Volo_Abp_Identity_ImportUsersFromFileType,
        formData?: {
            File?: Blob;
        },
    }): CancelablePromise<Volo_Abp_Identity_ImportUsersFromFileOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/users/import-users-from-file',
            query: {
                'FileType': fileType,
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
     * @returns binary Success
     * @throws ApiError
     */
    public static getApiIdentityUsersDownloadImportInvalidUsersFile({
        token,
    }: {
        token: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/download-import-invalid-users-file',
            query: {
                'Token': token,
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
