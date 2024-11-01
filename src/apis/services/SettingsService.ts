/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_AuditLogging_AuditLogGlobalSettingsDto } from '../models/Volo_Abp_AuditLogging_AuditLogGlobalSettingsDto';
import type { Volo_Abp_AuditLogging_AuditLogSettingsDto } from '../models/Volo_Abp_AuditLogging_AuditLogSettingsDto';
import type { Volo_Abp_Identity_IdentityLdapSettingsDto } from '../models/Volo_Abp_Identity_IdentityLdapSettingsDto';
import type { Volo_Abp_Identity_IdentityOAuthSettingsDto } from '../models/Volo_Abp_Identity_IdentityOAuthSettingsDto';
import type { Volo_Abp_Identity_IdentitySessionSettingsDto } from '../models/Volo_Abp_Identity_IdentitySessionSettingsDto';
import type { Volo_Abp_Identity_IdentitySettingsDto } from '../models/Volo_Abp_Identity_IdentitySettingsDto';
import type { Volo_Chat_Settings_ChatSettingsDto } from '../models/Volo_Chat_Settings_ChatSettingsDto';
import type { Volo_Chat_Settings_SendOnEnterSettingDto } from '../models/Volo_Chat_Settings_SendOnEnterSettingDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SettingsService {
    /**
     * @returns Volo_Abp_AuditLogging_AuditLogSettingsDto Success
     * @throws ApiError
     */
    public static getApiAuditLoggingSettings(): CancelablePromise<Volo_Abp_AuditLogging_AuditLogSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/settings',
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
    public static putApiAuditLoggingSettings({
        requestBody,
    }: {
        requestBody?: Volo_Abp_AuditLogging_AuditLogSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/audit-logging/settings',
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
     * @returns Volo_Abp_AuditLogging_AuditLogGlobalSettingsDto Success
     * @throws ApiError
     */
    public static getApiAuditLoggingSettingsGlobal(): CancelablePromise<Volo_Abp_AuditLogging_AuditLogGlobalSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/settings/global',
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
    public static putApiAuditLoggingSettingsGlobal({
        requestBody,
    }: {
        requestBody?: Volo_Abp_AuditLogging_AuditLogGlobalSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/audit-logging/settings/global',
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
     * @returns Volo_Abp_Identity_IdentitySettingsDto Success
     * @throws ApiError
     */
    public static getApiIdentitySettings(): CancelablePromise<Volo_Abp_Identity_IdentitySettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/settings',
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
    public static putApiIdentitySettings({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentitySettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/settings',
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
     * @returns Volo_Abp_Identity_IdentityLdapSettingsDto Success
     * @throws ApiError
     */
    public static getApiIdentitySettingsLdap(): CancelablePromise<Volo_Abp_Identity_IdentityLdapSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/settings/ldap',
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
    public static putApiIdentitySettingsLdap({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentityLdapSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/settings/ldap',
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
     * @returns Volo_Abp_Identity_IdentityOAuthSettingsDto Success
     * @throws ApiError
     */
    public static getApiIdentitySettingsOauth(): CancelablePromise<Volo_Abp_Identity_IdentityOAuthSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/settings/oauth',
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
    public static putApiIdentitySettingsOauth({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentityOAuthSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/settings/oauth',
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
     * @returns Volo_Abp_Identity_IdentitySessionSettingsDto Success
     * @throws ApiError
     */
    public static getApiIdentitySettingsSession(): CancelablePromise<Volo_Abp_Identity_IdentitySessionSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/settings/session',
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
    public static putApiIdentitySettingsSession({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentitySessionSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/settings/session',
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
    public static postApiChatSettingsSendOnEnter({
        requestBody,
    }: {
        requestBody?: Volo_Chat_Settings_SendOnEnterSettingDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/settings/send-on-enter',
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
     * @returns Volo_Chat_Settings_ChatSettingsDto Success
     * @throws ApiError
     */
    public static getApiChatSettings(): CancelablePromise<Volo_Chat_Settings_ChatSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/settings',
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
    public static putApiChatSettings({
        requestBody,
    }: {
        requestBody?: Volo_Chat_Settings_ChatSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/chat/settings',
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
